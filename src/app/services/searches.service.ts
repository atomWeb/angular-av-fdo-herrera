import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root',
})
export class SearchesService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  private setUserInstance(data: any[]): User[] {
    return data.map(
      (user) =>
        new User(
          user.username,
          user.email,
          '',
          user.image,
          user.google,
          user.role,
          user.uid
        )
    );
  }

  finder(type: 'users' | 'doctors' | 'hospitals', term: string = '') {
    const url = `${url_base}/all/collection/${type}/${term}`;
    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp: any) => {
        switch (type) {
          case 'users':
            return this.setUserInstance(resp.data);
          default:
            return [];
        }
      })
    );
  }
}
