import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `
      .btnCursor {
        cursor: pointer;
      }
    `,
  ],
})
export class HeaderComponent {
  constructor(private userService: UserService) {}

  logout() {
    this.userService.logOut();
  }
}
