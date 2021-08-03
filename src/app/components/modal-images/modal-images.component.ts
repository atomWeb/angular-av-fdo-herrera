import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';

@Component({
  selector: 'app-modal-images',
  templateUrl: './modal-images.component.html',
  styles: [
    `
      .modal-image-background {
        background-color: rgba(0, 0, 0, 0.4);
        position: fixed;
        left: 0px;
        height: 100%;
        top: 0px;
        width: 100%;
        z-index: 99;
      }
      .hide {
        display: none;
      }
    `,
  ],
})
export class ModalImagesComponent implements OnInit {
  public imageToUpload!: File;
  public tmpImage: any = null;

  constructor(
    public modalImageService: ModalImageService,
    public fileUpService: FileUploadService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.tmpImage = null;
    this.modalImageService.closeModal();
  }

  imageChanger(e: any) {
    const file: File = e.target.files[0];
    if (!file) {
      this.tmpImage = null;
      return;
    }
    this.imageToUpload = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.tmpImage = reader.result;
    };
  }

  fileUploader() {
    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileUpService
      .updatePicture(this.imageToUpload, type, id)
      .then((img) => {
        Swal.fire('Guardado', 'Imagen modificada correctamente.', 'success');
        this.modalImageService.newImage.emit(img);
        this.closeModal();
      })
      .catch((err) => {
        Swal.fire('Error', err.error.error, 'error');
      });
  }
}
