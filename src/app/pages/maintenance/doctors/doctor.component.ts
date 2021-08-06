import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [],
})
export class DoctorComponent implements OnInit {
  public doctorForm!: FormGroup;
  public hospitals: Hospital[] = [];
  public selectedHospital?: Hospital;
  public selectedDoctor?: Doctor;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe((params) => {
    //   console.log(params); // Muestra todos los params recibidos por la url
    // });
    // Este nombre "id" esta dewfinido en el pages router
    this.activatedRoute.params.subscribe(({ id }) => {
      this.loadDoctor(id);
    });

    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospitals: ['', Validators.required],
    });
    this.loadHospitals();
    this.doctorForm.get('hospitals')?.valueChanges.subscribe((hospitalId) => {
      this.selectedHospital = this.hospitals.find((h) => h._id === hospitalId);
    });
  }

  loadDoctor(id: string) {
    if (id !== 'newdoctor') {
      this.doctorService
        .getDoctorById(id)
        .pipe(delay(100))
        .subscribe((doctor) => {
          if (doctor) {
            // console.log(doctor); // Todo esto por tener el hospital como un array
            // const { name, hospitals:{ _id } } = doctor;
            const { name, hospitals } = doctor;
            const hid = hospitals?.map((h) => {
              return h._id;
            });
            this.selectedDoctor = doctor;
            this.doctorForm.setValue({ name, hospitals: hid?.join() });// Funciona por ser solo 1
          } else {
            this.router.navigateByUrl(`/dashboard/doctors`);
          }
        });
    }
  }

  loadHospitals() {
    this.hospitalService.loadHospitals().subscribe((hospitals: Hospital[]) => {
      this.hospitals = hospitals;
    });
  }

  saveDoctor(): void {
    // console.log(this.doctorForm.value);

    if (this.selectedDoctor) {
      // Update doctor
      const data = {
        ...this.doctorForm.value,
        _id: this.selectedDoctor._id,
      };

      this.doctorService.updateDoctor(data).subscribe((resp) => {
        // console.log(resp);
        Swal.fire(
          'Updated!',
          `Doctor ${data.name} has been updated successfully.`,
          'success'
        );
      });
    } else {
      // Create doctor
      // Todo esto por colocar hospitals como array (aunque solo guardo uno)
      const { name, hospitals } = this.doctorForm.value;
      const hospArr = hospitals.split();
      const doctor = {
        name: name,
        hospitals: hospArr,
      };

      this.doctorService.createDoctor(doctor).subscribe((resp: any) => {
        // console.log(resp);
        Swal.fire(
          'Created!',
          `Doctor ${name} has been created successfully.`,
          'success'
        );
        this.router.navigateByUrl(
          `/dashboard/doctors/${resp.doctorCreated._id}`
        );
      });
    }
  }
}
