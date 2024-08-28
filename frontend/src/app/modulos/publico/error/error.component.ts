import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppSettingsService } from './../../../servicios/plantilla/app-settings.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnDestroy, OnInit {
  constructor(
    public appSettings: AppSettingsService,
    private destino: Location
  ) {}

  ngOnInit() {
    this.appSettings.appEmpty = true;
  }

  ngOnDestroy() {
    this.appSettings.appEmpty = false;
  }

  public regresar(): void {
    this.destino.back();
  }
}
