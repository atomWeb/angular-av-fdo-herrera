import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { User } from '../models/user.model';

const url_base = environment.url_base;
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public auth2: any;
  public user!: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${url_base}/users`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.data); // Ojo resp.token
      })
    );
  }

  profileUpdate(data: { usename: string; email: string, role: string }) {
    data = {
      ...data,
      role: this.user.role!
    }
    return this.http.put(`${url_base}/users/${this.uid}`, data, {
      headers: {
        'x-token': this.token,
      },
    });
  }

  login(formData: LoginForm) {
    // console.log(formData);
    return this.http.post(`${url_base}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.data); // Ojo resp.token
      })
    );
  }

  loginGoogle(token: string) {
    // console.log(formData);
    return this.http.post(`${url_base}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.data); // Ojo resp.token
      })
    );
  }

  validateToken(): Observable<boolean> {
    return this.http
      .get(`${url_base}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { email, google, role, uid, username, image = '' } = resp.user;
          this.user = new User(username, email, '', image, google, role, uid);
          localStorage.setItem('token', resp.data); // Ojo en el data esta el token
          return true;
        }),
        catchError((error) => of(false)) // Cualquiere error devuelve un false como observable
      );
  }

  logOut() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  googleInit() {
    return new Promise<void>((resolve) => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id:
            '285568127265-g870knshlhgtajg6v3ot19kdvnf6pg1f.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }
}
