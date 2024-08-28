import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, catchError, map } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import sha512 from 'jssha';
import { ToastrService } from 'ngx-toastr';
import { Acceso } from './../../../modelos/acceso';
import { AccesoService } from './../../../servicios/api/acceso.service';
import { observadorAny } from './../../../utilidades/observadores/tipo-any';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toas.func';
import { FOTO_SISTEMA, TOKEN_SISTEMA } from 'src/app/utilidades/dominios/sesion';
import { ARREGLO_IMAGENES_LOGIN } from 'src/app/utilidades/dominios/imagenes-login';
import { AppSettingsService } from './../../../servicios/plantilla/app-settings.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public tmp: any;
  public acceso: Acceso;
  public objSha512: sha512;
  public patronCorreo: string;
  public imagenInicio: string;
  public suscripcionAcceso: Subscription;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private accesoService: AccesoService,
    public appSettings: AppSettingsService
  ) {
    this.imagenInicio = '';
    this.objSha512 = this.tmp;
    this.suscripcionAcceso = this.tmp;
    this.acceso = this.inicializarAcceso();
    this.patronCorreo = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  }

  public inicializarAcceso(): Acceso {
    return new Acceso(0, '', '');
  }

  ngOnInit() {
    this.appSettings.appEmpty = true;
    this.imagenInicio = ARREGLO_IMAGENES_LOGIN[this.generarAleatorio(1, 3)];
  }

  ngOnDestroy() {
    this.appSettings.appEmpty = false;
    if (this.suscripcionAcceso) {
      this.suscripcionAcceso.unsubscribe();
    }
  }

  public generarAleatorio(inicio: number, fin: number): number {
    const aletorio = Math.floor(Math.random() * (fin - inicio + 1)) + inicio;
    return aletorio;
  }

  public enviarFormuario(formulario: NgForm): void {
    this.objSha512 = new sha512('SHA-512', 'TEXT', { encoding: 'UTF8' });
    const cifrado = this.objSha512.update(this.acceso.claveAcceso).getHash('HEX');
    const correo = this.acceso.correoAcceso;

    const objEnviar = new Acceso(0, correo, cifrado);

    this.suscripcionAcceso = this.accesoService
      .iniciarSesion(objEnviar)
      .pipe(
        map((respuesta: any) => {
          localStorage.setItem(TOKEN_SISTEMA, respuesta.tokenApp);
          localStorage.setItem(FOTO_SISTEMA, respuesta.fotoApp);

          this.router.navigate(['/private/dash/board']);
          // formulario.reset();
        }),
        catchError((err) => {
          switch (err.status) {
            case 400:
              mostrarMensaje('error', 'Credenciales no validas', 'Error', this.toastr);
              break;
            case 402:
              mostrarMensaje('error', 'Usuario Inactivo', 'Error', this.toastr);
              break;
          }

          formulario.reset();
          throw err;
        })
      )
      .subscribe(observadorAny);
  }
}
