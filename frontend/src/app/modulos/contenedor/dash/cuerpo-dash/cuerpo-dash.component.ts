import { Title } from '@angular/platform-browser';
import { Router, NavigationStart } from '@angular/router';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

import { AppSettingsService } from './../../../../servicios/plantilla/app-settings.service';
import { AppVariablesService } from './../../../../servicios/plantilla/app-variables.service';
import { FuncionalidadService } from 'src/app/servicios/api/funcionalidad.service';

import { Funcionalidad } from 'src/app/modelos/funcionalidad';
import { Subscription, catchError, finalize, map } from 'rxjs';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';


@Component({
  selector: 'app-cuerpo-dash',
  templateUrl: './cuerpo-dash.component.html',
  styleUrls: ['./cuerpo-dash.component.css'],
})
export class CuerpoDashComponent implements OnInit, OnDestroy {
  appHasScroll: any;
  appVariables = this.appVariablesService.getAppVariables();

  public menus: any[] = [];
  private tmp: any;

  public cargaFinalizada: boolean;
  public suscripcionFuncionalidad: Subscription;

  constructor(
    private router: Router,
    public appSettings: AppSettingsService,
    private appVariablesService: AppVariablesService,
    private funcionalidadService: FuncionalidadService
  ) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        if (window.innerWidth < 768) {
          this.appSettings.appSidebarMobileToggled = false;
          this.appSettings.appSidebarEndMobileToggled = false;
        }
      }
    });
    this.cargaFinalizada = false;
    this.suscripcionFuncionalidad = this.tmp;
  }

  ngOnDestroy(): void {
    if (this.suscripcionFuncionalidad) {
      this.suscripcionFuncionalidad.unsubscribe();
    }
  }

  onAppDarkModeChanged(val: boolean): void {
    if (this.appSettings.appDarkMode) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-bs-theme');
    }
    this.appVariables = this.appVariablesService.getAppVariables();
    this.appVariablesService.variablesReload.emit();
    document.dispatchEvent(new CustomEvent('theme-change'));
  }

  onAppThemeChanged(val: boolean): void {
    const newTheme = 'theme-' + this.appSettings.appTheme;
    for (let x = 0; x < document.body.classList.length; x++) {
      if (
        document.body.classList[x].indexOf('theme-') > -1 &&
        document.body.classList[x] !== newTheme
      ) {
        document.body.classList.remove(document.body.classList[x]);
      }
    }
    document.body.classList.add(newTheme);
    this.appVariables = this.appVariablesService.getAppVariables();
    this.appVariablesService.variablesReload.emit();
  }

  // set page minified
  onAppSidebarMinifiedToggled(val: boolean): void {
    this.appSettings.appSidebarMinified = !this.appSettings.appSidebarMinified;
    if (localStorage) {
      localStorage['appSidebarMinified'] = this.appSettings.appSidebarMinified;
    }
  }

  // set app sidebar end toggled
  onAppSidebarEndToggled(val: boolean): void {
    this.appSettings.appSidebarEndToggled =
      !this.appSettings.appSidebarEndToggled;
  }

  // hide mobile sidebar
  onAppSidebarMobileToggled(val: boolean): void {
    this.appSettings.appSidebarMobileToggled =
      !this.appSettings.appSidebarMobileToggled;
  }

  // toggle right mobile sidebar
  onAppSidebarEndMobileToggled(val: boolean): void {
    this.appSettings.appSidebarEndMobileToggled =
      !this.appSettings.appSidebarEndMobileToggled;
  }
  OnDestroy() {
    if (this.suscripcionFuncionalidad) {
      this.suscripcionFuncionalidad.unsubscribe();
    }
  }

  ngOnInit() {
    // page settings
    localStorage.setItem('ELONMUSK', this.router.url);
    if (this.appSettings.appDarkMode) {
      this.onAppDarkModeChanged(true);
    }
    this.obtenerMenuApp();

    if (localStorage) {
      if (localStorage['appDarkMode']) {
        this.appSettings.appDarkMode =
          localStorage['appDarkMode'] === 'true' ? true : false;
        if (this.appSettings.appDarkMode) {
          this.onAppDarkModeChanged(true);
        }
      }
      if (localStorage['appHeaderFixed']) {
        this.appSettings.appHeaderFixed =
          localStorage['appHeaderFixed'] === 'true' ? true : false;
      }
      if (localStorage['appHeaderInverse']) {
        this.appSettings.appHeaderInverse =
          localStorage['appHeaderInverse'] === 'true' ? true : false;
      }
      if (localStorage['appSidebarFixed']) {
        this.appSettings.appSidebarFixed =
          localStorage['appSidebarFixed'] === 'true' ? true : false;
      }
      if (localStorage['appSidebarMinified']) {
        this.appSettings.appSidebarMinified =
          localStorage['appSidebarMinified'] === 'true' ? true : false;
      }
      if (localStorage['appSidebarGrid']) {
        this.appSettings.appSidebarGrid =
          localStorage['appSidebarGrid'] === 'true' ? true : false;
      }
      if (localStorage['appGradientEnabled']) {
        this.appSettings.appGradientEnabled =
          localStorage['appGradientEnabled'] === 'true' ? true : false;
      }
    }
  }



  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event: any) {
    const doc = document.documentElement;
    const top = (window.scrollY || doc.scrollTop) - (doc.clientTop || 0);
    if (top > 0 && this.appSettings.appHeaderFixed) {
      this.appHasScroll = true;
    } else {
      this.appHasScroll = false;
    }
  }


  public obtenerMenuApp(): void {
    this.menus = [];
    this.suscripcionFuncionalidad = this.funcionalidadService.obtenerFuncionalidadMenu().pipe(
      map((arregloJSONFuncionalidades: Funcionalidad[]) => {

        arregloJSONFuncionalidades.forEach((miFuncionalidad: any) => {

          if (miFuncionalidad.visibleFuncionalidad) {
            if (typeof miFuncionalidad.arregloHijos != null) {
              miFuncionalidad.arregloHijos = [];
            }

            switch (miFuncionalidad.codPadre) {
              case 1:
                this.menus.push(miFuncionalidad);
                break;
              case null:
                break;
              default:
                this.menus.forEach((nodoPadre) => {
                  if (nodoPadre.actividadFuncionalidad) {
                    nodoPadre.label = 'Nuevo';
                  }
                  nodoPadre.caret = 'true';
                  if (nodoPadre.codFuncionalidad == miFuncionalidad.codPadre) {
                    nodoPadre.arregloHijos.push(miFuncionalidad);
                  }
                });
                break;
            }
          }
        });


        return arregloJSONFuncionalidades;

      }), finalize(() => {
        this.cargaFinalizada = true;
      }),
      catchError((err) => { throw err; })
    ).subscribe(observadorAny);
  }

}
