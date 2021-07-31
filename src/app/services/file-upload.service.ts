import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  async updatePicture(
    file: File,
    type: 'users' | 'doctors' | 'hospitals',
    id: string
  ) {
    try {
      const url = `${url_base}/uploads/${type}/${id}`;
      const formData = new FormData();
      formData.append('image', file);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });

      const respjson = await resp.json();
      let ret = '';
      if (respjson.ok) {
        ret = respjson.data;
      }
      return ret;
    } catch (error) {
      console.error(error);
      return '';
    }
  }
}
