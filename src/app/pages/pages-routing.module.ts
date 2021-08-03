import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { UsersComponent } from './maintenance/users/users.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromisesComponent } from './promises/promises.component';

const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', component: DashboardComponent, data:{ title: 'DashBoard' } },
      { path: 'progress', component: ProgressComponent, data:{ title: 'ProgressBar' }  },
      { path: 'grafica1', component: Grafica1Component, data:{ title: 'Graph #1' }  },
      { path: 'account-settings', component: AccountSettingsComponent, data:{ title: 'Settings' }  },
      { path: 'promises', component: PromisesComponent, data:{ title: 'Promises' }  },
      { path: 'rxjs', component: RxjsComponent, data:{ title: 'RxJs' }  },
      { path: 'profile', component: ProfileComponent, data:{ title: 'Profile' }  },
      { path: 'users', component: UsersComponent, data:{ title: 'Users App maintenance' }  },
      // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
