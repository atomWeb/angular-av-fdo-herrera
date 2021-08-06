import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root',
})
export class ModalImageService {
  private _hideModal: boolean = true;
  public type!: 'users' | 'doctors' | 'hospitals';
  public id!: string;
  public image?: string;
  public newImage: EventEmitter<string> = new EventEmitter<string>();

  get hideModal() {
    return this._hideModal;
  }

  openModal(
    type: 'users' | 'doctors' | 'hospitals',
    id?: string,
    image: string = 'no-image'
  ) {
    this.type = type;
    this.id = id || '';

    if (image.includes('https')) {
      this.image = image;
    } else {
      this.image = `${url_base}/uploads/${type}/${image}`;
    }

    this._hideModal = false;
  }

  closeModal() {
    this._hideModal = true;
  }

  constructor() {}
}
