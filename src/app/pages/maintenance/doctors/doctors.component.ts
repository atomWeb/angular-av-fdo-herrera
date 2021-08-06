import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [],
})
export class DoctorsComponent implements OnInit, OnDestroy {
  public doctors: Doctor[] = [];
  public doctorsTemp: Doctor[] = [];
  public loading: boolean = true;
  private imgSubs!: Subscription;

  constructor(
    private doctorsService: DoctorService,
    private modalImageService: ModalImageService,
    private searchService: SearchesService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadDoctors();
    this.imgSubs = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe((img) => this.loadDoctors());
  }

  loadDoctors(): void {
    this.loading = true;
    this.doctorsService.loadDoctors().subscribe((doctors) => {
      this.doctors = doctors;
      this.doctorsTemp = doctors;
      this.loading = false;
    });
  }

  showModal(doctor: Doctor): void {
    this.modalImageService.openModal('doctors', doctor._id, doctor.image);
  }

  findDoctor(term: string) {
    if (term.length === 0) {
      this.doctors = this.doctorsTemp;
      return;
    }
    this.searchService
      .finder('doctors', term)
      .subscribe((resp: any) => (this.doctors = resp));
  }

  deleteDoctor(doctor: Doctor): void {
    Swal.fire({
      title: 'Delete user?',
      text: `You are going to delete the doctor ${doctor.name}, are you sure?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorsService.deleteDoctor(doctor._id!).subscribe((resp) => {
          Swal.fire('Deleted!', 'Doctor has been deleted.', 'success');
          this.loadDoctors();
        });
      }
    });
  }
}
