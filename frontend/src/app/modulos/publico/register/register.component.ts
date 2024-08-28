import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription, catchError, map } from 'rxjs';
import { Component, OnDestroy, Renderer2 } from '@angular/core';

import sha512 from 'jssha';
import { Registro } from './../../../modelos/registro';
import { FOTO_SISTEMA, TOKEN_SISTEMA } from 'src/app/utilidades/dominios/sesion';
import { ARREGLO_IMAGENES_LOGIN } from './../../../utilidades/dominios/imagenes-login';

import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { RegistroService } from './../../../servicios/api/registro.service';
import { AppSettingsService } from './../../../servicios/plantilla/app-settings.service';

import { ToastrService } from 'ngx-toastr';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toas.func';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnDestroy {
  public tmp: any;
  public terminos:any;
  public registro:Registro;
  public objSha512: sha512;
  public imagenLogin: string;
  public patronCorreo: string;
  public suscripcionRegistro: Subscription;

  constructor(
    private router: Router,
    private registroService: RegistroService,
    private toastr: ToastrService,
    private renderer: Renderer2,
    public appSettings: AppSettingsService
  ) {
    this.imagenLogin = '';
    this.patronCorreo = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
    this.registro = this.inicializarRegistro();
    this.objSha512 = new sha512('SHA-512', 'TEXT');
    this.suscripcionRegistro = this.tmp;
  }

  public inicializarRegistro(): Registro {
    return new Registro('', '', '', '');
  }

  ngOnInit() {
    this.appSettings.appEmpty = true;
    this.renderer.addClass(document.body, 'bg-white');
    this.imagenLogin = ARREGLO_IMAGENES_LOGIN[this.generarAleatorio(1, 4)];
  }

  ngOnDestroy() {
    this.appSettings.appEmpty = false;
    this.renderer.removeClass(document.body, 'bg-white');
  }

  formSubmit(f: NgForm) {
    this.router.navigate(['dashboard/v3']);
  }

  public generarAleatorio(inicio: number, fin: number): number {
    const numero = Math.floor(Math.random() * (fin - inicio + 1)) + inicio;
    return numero;
  }
}
