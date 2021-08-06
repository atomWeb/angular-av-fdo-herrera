import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [],
})
export class HospitalsComponent implements OnInit, OnDestroy {
  public hospitals: Hospital[] = [];
  public hospitalsTemp: Hospital[] = [];
  public loading: boolean = true;
  private imgSubs!: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImageService,
    private searchService: SearchesService
  ) {}

  ngOnInit(): void {
    this.loadHospitals();
    this.imgSubs = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe((img) => this.loadHospitals());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  loadHospitals(): void {
    this.loading = true;
    this.hospitalService.loadHospitals().subscribe((hospitals) => {
      this.hospitals = hospitals;
      this.hospitalsTemp = hospitals;
      this.loading = false;
    });
  }

  saveHospital(hospital: Hospital): void {
    this.hospitalService
      .updateHospital(hospital._id, hospital.name)
      .subscribe((resp) => {
        Swal.fire('Saved!', 'Hospital has been updated.', 'success');
      });
  }

  deleteHospital(hospital: Hospital): void {
    this.hospitalService.deleteHospital(hospital._id).subscribe((resp) => {
      this.loadHospitals();
      Swal.fire('Deleted!', 'Hospital has been deleted.', 'success');
    });
  }

  async addHospital() {
    const { value = '' } = await Swal.fire<string>({
      input: 'text',
      showCancelButton: true,
      title: 'Add hospital',
      inputLabel: 'Type the new hospital name',
      inputPlaceholder: 'Hospital name',
    });

    if (value!.trim().length > 0) {
      this.hospitalService.createHospital(value!).subscribe((resp: any) => {
        this.hospitals.push(resp.hospital);
      });
    }
  }

  showModal(hospital: Hospital): void {
    this.modalImageService.openModal('hospitals', hospital._id, hospital.image);
  }

  findHospital(term: string) {
    if (term.length === 0) {
      this.hospitals = this.hospitalsTemp;
      return;
    }
    this.searchService
      .finder('hospitals', term)
      .subscribe((resp:any) => (this.hospitals = resp));
  }
}
