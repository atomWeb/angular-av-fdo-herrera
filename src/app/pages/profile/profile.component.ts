import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  public profileForm!: FormGroup;
  public user!: User;
  public imageToUpload!: File;
  public tmpImage: any = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUpService: FileUploadService
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: [this.user.username, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  updateProfile(): void {
    // console.log(this.profileForm.value);
    this.userService.profileUpdate(this.profileForm.value).subscribe(
      (resp) => {
        const { username, email } = this.profileForm.value;
        this.user.username = username;
        this.user.email = email;

        Swal.fire('Guardado', 'Cambios realizados correctamente.', 'success');
        // console.log(resp);
      },
      (err) => {
        Swal.fire('Error', err.error.error, 'error');
      }
    );
  }

  imageChanger(e: any) {
    const file: File = e.target.files[0];
    if (!file) {
      this.tmpImage = null;
      return;
    }
    this.imageToUpload = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.tmpImage = reader.result;
    };
  }

  fileUploader() {
    this.fileUpService
      .updatePicture(this.imageToUpload, 'users', this.user.uid!)
      .then((img) => {
        this.user.image = img;
        Swal.fire('Guardado', 'Imagen modificada correctamente.', 'success');
      })
      .catch((err) => {
        Swal.fire('Error', err.error.error, 'error');
      });
  }
}
