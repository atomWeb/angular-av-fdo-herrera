import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public menu: any = []; // Deberia tener un tipo menu con una interface

  loadMenu() {
    const strmenu = localStorage.getItem('menu') || '[]';
    this.menu = JSON.parse(strmenu);
  }

  // menu: any[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       { title: 'Main', url: '/' },
  //       { title: 'ProgressBar', url: 'progress' },
  //       { title: 'Graphic', url: 'grafica1' },
  //       { title: 'Promises', url: 'promises' },
  //       { title: 'Rxjs', url: 'rxjs' },
  //     ],
  //   },
  //   {
  //     title: 'App maintenance',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { title: 'Users', url: 'users' },
  //       { title: 'Hospitals', url: 'hospitals' },
  //       { title: 'Doctors', url: 'doctors' },
  //     ],
  //   },
  // ];
  constructor() {}
}
