import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '../guards/admin.guard';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromisesComponent } from './promises/promises.component';
import { SearchComponent } from './search/search.component';
//
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';

const childRoutes: Routes = [

  { path: '', component: DashboardComponent, data:{ title: 'DashBoard' } },
  { path: 'progress', component: ProgressComponent, data:{ title: 'ProgressBar' }  },
  { path: 'search/:term', component: SearchComponent, data:{ title: 'Searches' }  },
  { path: 'grafica1', component: Grafica1Component, data:{ title: 'Graph #1' }  },
  { path: 'account-settings', component: AccountSettingsComponent, data:{ title: 'Settings' }  },
  { path: 'promises', component: PromisesComponent, data:{ title: 'Promises' }  },
  { path: 'rxjs', component: RxjsComponent, data:{ title: 'RxJs' }  },
  { path: 'profile', component: ProfileComponent, data:{ title: 'Profile' }  },
  { path: 'hospitals', component: HospitalsComponent, data:{ title: 'Hospitals App maintenance' }  },
  { path: 'doctors', component: DoctorsComponent, data:{ title: 'Doctors App maintenance' }  },
  { path: 'doctors/:id', component: DoctorComponent, data:{ title: 'Doctor App maintenance' }  },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Rutas que necesitan role administrador
  { path: 'users', canActivate: [AdminGuard], component: UsersComponent, data:{ title: 'Users App maintenance' }  },

];


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
