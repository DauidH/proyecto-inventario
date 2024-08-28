import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { AppSettingsService } from './../../../servicios/plantilla/app-settings.service';
import { AppVariablesService } from './../../../servicios/plantilla/app-variables.service';

declare var bootstrap: any;

@Component({
  selector: 'app-theme-panel',
  templateUrl: './theme-panel.component.html',
  styleUrls: ['./theme-panel.component.css'],
})
export class ThemePanelComponent implements OnInit {
  @Output() appDarkModeChanged = new EventEmitter<boolean>();
  @Output() appThemeChanged = new EventEmitter<boolean>();
  appVariables = this.appVariablesService.getAppVariables();

  constructor(
    public appSettings: AppSettingsService,
    private appVariablesService: AppVariablesService
  ) {}

  active: boolean = false;
  appThemeDarkModeCheckbox: boolean = false;
  appHeaderFixedCheckbox: boolean = true;
  appHeaderInverseCheckbox: boolean = false;
  appSidebarFixedCheckbox: boolean = true;
  appSidebarGridCheckbox: boolean = false;
  appGradientEnabledCheckbox: boolean = false;
  //appSettings = appSettings;
  selectedTheme = 'teal';
  themes = [
    'red',
    'pink',
    'orange',
    'yellow',
    'lime',
    'green',
    'teal',
    'cyan',
    'blue',
    'purple',
    'indigo',
    'gray-500',
  ];

  toggleThemePanel() {
    if (localStorage) {
      localStorage['appThemePanelActive'] = !this.active;
    }
    this.active = !this.active;
  }

  ngOnInit() {
    var elm = document.querySelectorAll('[data-bs-toggle="tooltip"]');

    for (var i = 0; i < elm.length; i++) {
      new bootstrap.Tooltip(elm[i]);
    }
    if (localStorage) {
      if (localStorage['appThemePanelActive']) {
        this.active =
          localStorage['appThemePanelActive'] == 'true' ? true : false;
      }
      if (localStorage['appTheme']) {
        this.toggleTheme(localStorage['appTheme']);
      }
      if (
        localStorage['appDarkMode'] &&
        localStorage['appDarkMode'] === 'true'
      ) {
        this.appThemeDarkModeCheckbox = true;
        this.appDarkModeChanged.emit(true);
      }
      if (
        localStorage['appHeaderFixed'] &&
        localStorage['appHeaderFixed'] !== 'true'
      ) {
        this.appHeaderFixedCheckbox = false;
      }
      if (
        localStorage['appHeaderInverse'] &&
        localStorage['appHeaderInverse'] === 'true'
      ) {
        this.appHeaderInverseCheckbox = true;
      }
      if (
        localStorage['appSidebarFixed'] &&
        localStorage['appSidebarFixed'] !== 'true'
      ) {
        this.appSidebarFixedCheckbox = false;
      }
      if (
        localStorage['appSidebarGrid'] &&
        localStorage['appSidebarGrid'] === 'true'
      ) {
        this.appSidebarGridCheckbox = true;
      }
      if (
        localStorage['appGradientEnabled'] &&
        localStorage['appGradientEnabled'] === 'true'
      ) {
        this.appGradientEnabledCheckbox = true;
      }
    }
  }

  toggleTheme(theme: any) {
    this.appSettings.appTheme = theme;
    this.selectedTheme = theme;
    this.appThemeChanged.emit(true);
    if (localStorage) {
      localStorage['appTheme'] = theme;
    }
  }

  toggleDarkMode(e: any) {
    this.appSettings.appDarkMode = e.srcElement.checked;
    this.appDarkModeChanged.emit(true);
    if (localStorage) {
      localStorage['appDarkMode'] = e.srcElement.checked;
    }
  }

  toggleHeaderFixed(e: any) {
    this.appSettings.appHeaderFixed = e.srcElement.checked;

    if (localStorage) {
      localStorage['appHeaderFixed'] = e.srcElement.checked;
    }
    if (!e.srcElement.checked && this.appSettings.appSidebarFixed === true) {
      alert(
        'Default Header with Fixed Sidebar option is not supported. Proceed with Default Header with Default Sidebar.'
      );
      this.appSettings.appSidebarFixed = false;
      this.appSidebarFixedCheckbox = false;
      if (localStorage) {
        localStorage['appSidebarFixed'] = false;
      }
    }
  }

  toggleHeaderInverse(e: any) {
    this.appSettings.appHeaderInverse = e.srcElement.checked;
    if (localStorage) {
      localStorage['appHeaderInverse'] = e.srcElement.checked;
    }
  }

  toggleSidebarFixed(e: any) {
    this.appSettings.appSidebarFixed = e.srcElement.checked;

    if (localStorage) {
      localStorage['appSidebarFixed'] = e.srcElement.checked;
    }
    if (e.srcElement.checked && this.appSettings.appHeaderFixed !== true) {
      alert(
        'Default Header with Fixed Sidebar option is not supported. Proceed with Fixed Header with Fixed Sidebar.'
      );
      this.appSettings.appHeaderFixed = true;
      this.appHeaderFixedCheckbox = true;
      if (localStorage) {
        localStorage['appHeaderFixed'] = true;
      }
    }
  }

  toggleSidebarGrid(e: any) {
    this.appSettings.appSidebarGrid = e.srcElement.checked;
    if (localStorage) {
      localStorage['appSidebarGrid'] = e.srcElement.checked;
    }
  }

  toggleGradientEnabled(e: any) {
    this.appSettings.appGradientEnabled = e.srcElement.checked;
    if (localStorage) {
      localStorage['appGradientEnabled'] = e.srcElement.checked;
    }
  }
}
