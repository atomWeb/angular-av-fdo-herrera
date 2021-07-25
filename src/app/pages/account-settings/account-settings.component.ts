import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
    `
      #themecolors .selector {
        cursor: pointer;
      }
    `,
  ],
})
export class AccountSettingsComponent implements OnInit {

  private themeList!: NodeListOf<Element>;
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.themeList = document.querySelectorAll('.selector');
    this.settingsService.checkCurrentTheme(this.themeList);
  }

  changeTheme(theme: string): void {
    this.settingsService.changeTheme(theme);
  }
}
