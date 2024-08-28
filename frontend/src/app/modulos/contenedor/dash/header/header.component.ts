import { Component, Input, Output, EventEmitter, OnDestroy, } from '@angular/core';

import { AppSettingsService } from './../../../../servicios/plantilla/app-settings.service';
import { Acceso } from 'src/app/modelos/acceso';
import { AccesoService } from 'src/app/servicios/api/acceso.service';

declare var slideToggle: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
  @Input() appSidebarTwo: any;
  @Output() appSidebarEndToggled = new EventEmitter<boolean>();
  @Output() appSidebarMobileToggled = new EventEmitter<boolean>();
  @Output() appSidebarEndMobileToggled = new EventEmitter<boolean>();

  public acceso: Acceso;

  toggleAppSidebarMobile() {
    this.appSidebarMobileToggled.emit(true);
  }

  toggleAppSidebarEnd() {
    this.appSidebarEndToggled.emit(true);
  }

  toggleAppSidebarEndMobile() {
    this.appSidebarEndMobileToggled.emit(true);
  }

  toggleAppTopMenuMobile() {
    var target = document.querySelector('.app-top-menu');
    if (target) {
      slideToggle(target);
    }
  }

  toggleAppHeaderMegaMenuMobile() {
    this.appSettings.appHeaderMegaMenuMobileToggled =
      !this.appSettings.appHeaderMegaMenuMobileToggled;
  }


  constructor(public appSettings: AppSettingsService, public accesoService: AccesoService) {
    this.acceso = accesoService.obtenerAcceso();
  }


  ngOnDestroy() {
    this.appSettings.appHeaderMegaMenuMobileToggled = false;
  }

}
