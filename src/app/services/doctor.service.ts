import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
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

  loadDoctors() {
    const url = `${url_base}/doctors`;
    return this.http
      .get<any>(url, this.headers)
      .pipe(map((resp: { ok: boolean; doctors: Doctor[] }) => resp.doctors));
  }

  deleteDoctor(doctorId: string) {
    const url = `${url_base}/doctors/${doctorId}/`;
    return this.http.delete(url, this.headers);
  }

  // Asi estaría bien pero yo hice el hospital como array > "hospitlas"
  // createDoctor(doctor: { name: string; hospital: string }) {
  //   const url = `${url_base}/doctors`;
  //   return this.http.post(url, doctor, this.headers);
  // }

  createDoctor(doctor: { name: string; hospitals: string[] }) {
    const url = `${url_base}/doctors`;
    return this.http.post(url, doctor, this.headers);
  }

  getDoctorById(id: string) {
    const url = `${url_base}/doctors/${id}`;
    return this.http
      .get<any>(url, this.headers)
      .pipe(map((resp: { ok: boolean; doctor: Doctor }) => resp.doctor));
  }

  updateDoctor(doctor: Doctor) {
    const url = `${url_base}/doctors/${doctor._id}`;
    return this.http.put(url, doctor, this.headers);
  }
}
