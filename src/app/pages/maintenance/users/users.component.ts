import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';
import { SearchesService } from 'src/app/services/searches.service';
import { UserService } from 'src/app/services/user.service';
import { ModalImageService } from 'src/app/services/modal-image.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
    `
      .cursor {
        cursor: pointer;
      }
    `,
  ],
})
export class UsersComponent implements OnInit, OnDestroy {
  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public tokenPag: number = 0;
  public topPage: boolean = false;
  public loading: boolean = true;
  private imgSubs!: Subscription;

  constructor(
    private userService: UserService,
    private searchService: SearchesService,
    private modalImageService: ModalImageService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();
    this.imgSubs = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe((img) => this.loadUsers());
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.loadUsers(this.tokenPag).subscribe(({ total, users }) => {
      this.totalUsers = total;
      this.users = users;
      this.usersTemp = users;
      this.loading = false;
    });
  }

  paginate(increment: number) {
    this.tokenPag += increment;
    this.topPage = false;

    if (this.tokenPag < 0) {
      this.tokenPag = 0;
    } else if (this.tokenPag >= this.totalUsers) {
      this.tokenPag -= increment;
      this.topPage = true;
    }
    this.loadUsers();
  }

  find(term: string) {
    if (term.length === 0) {
      this.users = this.usersTemp;
      return;
    }
    this.searchService
      .finder('users', term)
      .subscribe((resp) => (this.users = resp));
  }

  deleteUser(user: User) {
    if (user.uid === this.userService.uid) {
      Swal.fire('Error!', "Can't erase itself", 'error');
      return;
    }
    Swal.fire({
      title: 'Delete user?',
      text: `You are going to delete the user ${user.username}, are you sure?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.uid!).subscribe((resp) => {
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
          this.loadUsers();
        });
      }
    });
  }

  changeRole(user: User): void {
    this.userService.updateUser(user).subscribe((result) => {});
  }

  showModal(user: User): void {
    this.modalImageService.openModal('users', user.uid!, user.image);
  }
}
