import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, finalize, map } from 'rxjs';
import { Acceso } from 'src/app/modelos/acceso';
import { AccesoService } from 'src/app/servicios/api/acceso.service';

import sha512 from 'jssha';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { NgForm } from '@angular/forms';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toas.func';

@Component({
  selector: 'app-usuario-acceso',
  templateUrl: './usuario-acceso.component.html',
  styleUrls: ['./usuario-acceso.component.css'],
})
export class UsuarioAccesoComponent implements OnInit, OnDestroy {
  @Input()
  codUsuario: any;

  public acceso: Acceso;
  public cargaFinalizada: boolean;
  public cargaClave: boolean;

  public tmp: any;
  public suscripcionAcceso: Subscription;

  public patronCorreo: string;
  public objSha512: sha512;

  constructor(private toastr: ToastrService, private accesoService: AccesoService) {
    this.suscripcionAcceso = this.tmp;
    this.cargaFinalizada = false;
    this.cargaClave = false;
    this.objSha512 = this.tmp;
    this.acceso = this.inicializarAcceso();
    this.patronCorreo = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  }

  ngOnInit(): void {
    this.obtenerAcceso();
  }

  ngOnDestroy(): void {
    if (this.suscripcionAcceso) {
      this.suscripcionAcceso.unsubscribe();
    }
  }

  /* Obligatorio  */
  public inicializarAcceso(): Acceso {
    return new Acceso(0, '', '');
  }

  /* LDN */
  public obtenerAcceso(): void {
    this.suscripcionAcceso = this.accesoService
      .obtenerAccesoUsuario(this.codUsuario)
      .pipe(
        map((respuesta: any) => {
          this.acceso = respuesta;
          if (this.validarLLavesUnicas(this.acceso.correoAcceso) == '') {
            this.cargaClave = true;
            this.acceso = new Acceso(0, this.validarLLavesUnicas(this.acceso.correoAcceso), '');
          }
          return respuesta;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  public validarLLavesUnicas(llaveUnica: string): string {
    if (llaveUnica.includes('PX_')) {
      llaveUnica = '';
    }
    return llaveUnica;
  }

  public enviarFormulario(formulario: NgForm): void {
    this.objSha512 = new sha512('SHA-512', 'TEXT', { encoding: 'UTF8' });
    const nuevoAcceso = new Acceso(this.codUsuario, this.acceso.correoAcceso, '');
    if (this.cargaClave) {
      const cifrado = this.objSha512.update(this.acceso.claveAcceso).getHash('HEX');
      this.acceso.claveAcceso = cifrado;
      this.acceso.reClaveAcceso = cifrado;
      nuevoAcceso.claveAcceso = cifrado;
    }
    this.suscripcionAcceso = this.accesoService
      .editarAccesoPerfil(nuevoAcceso, this.cargaClave)
      .pipe(
        map((respuesta) => {
          mostrarMensaje('success', 'Credenciales actualizadas ', 'Exito', this.toastr);
          //this.accesoService.acceso.correoAcceso = this.acceso.correoAcceso;
          return respuesta;
        }),
        catchError((err) => {
          mostrarMensaje('error', 'Error al actualizar las credenciales', 'Error', this.toastr);
          throw err;
        })
      )
      .subscribe(observadorAny);
  }
}
