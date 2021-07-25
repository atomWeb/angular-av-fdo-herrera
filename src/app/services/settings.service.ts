import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');
  constructor() {
    const urlTheme =
      localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme!.setAttribute('href', urlTheme);
  }

  changeTheme(theme: string): void {
    const urlTheme = `./assets/css/colors/${theme}.css`;
    this.linkTheme!.setAttribute('href', urlTheme);
    localStorage.setItem('theme', urlTheme);
    //
    const themeList = document.querySelectorAll('.selector');
    this.checkCurrentTheme(themeList);
  }

  checkCurrentTheme(themeList: NodeListOf<Element>): void {
    const currentUrl = this.linkTheme!.getAttribute('href');
    themeList.forEach((element) => {
      element.classList.remove('working');
      const currUrlTheme = element.getAttribute('data-theme');
      const currUrl = `./assets/css/colors/${currUrlTheme}.css`;
      if (currentUrl === currUrl) {
        element.classList.add('working');
      }
    });
  }

}
