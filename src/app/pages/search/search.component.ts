import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchesService } from 'src/app/services/searches.service';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  public users: User[] = [];
  public doctors: Doctor[] = [];
  public hospitals: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ term }) => {
      this.globalSearch(term);
    });
  }

  globalSearch(term: string) {
    this.searchService.globalSearch(term).subscribe((resp: any) => {
      // console.log(resp);
      this.users = resp.users;
      this.doctors = resp.doctors;
      this.hospitals = resp.hospitals;
    });
  }

  openDoctor(doctor: Doctor) {
    this.router.navigateByUrl(`/dashboard/doctors/${doctor._id}`);
  }
}
