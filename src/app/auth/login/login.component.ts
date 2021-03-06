import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private formSubmitted: boolean = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    // console.log(this.loginForm.value);
    // this.router.navigateByUrl('/');
    this.userService.login(this.loginForm.value).subscribe(
      (resp) => {
        localStorage.removeItem('email');
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        }
        // Navegar al dashboard
        this.router.navigateByUrl('/');
      },
      (err) => {
        Swal.fire('Error', err.error.error, 'error');
      }
    );
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });
    this.startApp();
  }

  async startApp() {
    await this.userService.googleInit();
    this.auth2 = this.userService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element: any) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.userService.loginGoogle(id_token).subscribe((resp) => {
          this.ngZone.run(() => {
            // Navegar al dashboard
            this.router.navigateByUrl('/');
          });
        });
        // console.log(id_token);
        // console.log('Signed in: ', googleUser.getBasicProfile().getName());
      },
      (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
