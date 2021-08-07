import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Hospital } from '../models/hospital.model';
import { Doctor } from '../models/doctor.model';

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

  private setHospitalInstance(data: any[]): Hospital[] {
    return data.map(
      (hospital) => new Hospital(hospital.name, hospital._id, hospital.image)
    );
  }

  private setDoctorInstance(data: any[]): Doctor[] {
    return data.map(
      (doctor) => new Doctor(doctor.name, doctor._id, doctor.image)
    );
  }

  finder(type: 'users' | 'doctors' | 'hospitals', term: string = '') {
    const url = `${url_base}/all/collection/${type}/${term}`;
    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp: any) => {
        switch (type) {
          case 'users':
            return this.setUserInstance(resp.data);

          case 'hospitals':
            return this.setHospitalInstance(resp.data);

          case 'doctors':
            return this.setDoctorInstance(resp.data);

          default:
            return [];
        }
      })
    );
  }

  globalSearch(term: string) {
    const url = `${url_base}/all/${term}`;
    return this.http.get<any[]>(url, this.headers);
  }
}
