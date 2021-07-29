import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

const url_base = environment.url_base;
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public auth2: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${url_base}/users`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.data); // Ojo resp.token
      })
    );
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
    const token = localStorage.getItem('token') || '';
    return this.http
      .get(`${url_base}/login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.data); // Ojo en el data esta el token
        }),
        map((resp) => true),
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
