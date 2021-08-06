import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const url_base = environment.url_base;

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(image?: string, type?: 'users' | 'doctors' | 'hospitals'): string {
    if (!image) {
      return `${url_base}/uploads/${type}/no-img.jpg`;
    } else if (image.includes('https')) {
      return image;
    } else if (image) {
      return `${url_base}/uploads/${type}/${image}`;
    } else {
      return `${url_base}/uploads/${type}/no-img.jpg`;
    }
  }
}
