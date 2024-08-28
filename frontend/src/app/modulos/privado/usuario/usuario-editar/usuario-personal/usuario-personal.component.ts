import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, finalize, map } from 'rxjs';
import { Rol } from 'src/app/modelos/rol';
import { Usuario } from 'src/app/modelos/usuario';
import { RolService } from 'src/app/servicios/api/rol.service';
import { UsuarioService } from 'src/app/servicios/api/usuario.service';
import { ARREGLO_TIPO_DOCUMENTO } from 'src/app/utilidades/dominios/tipo-documento';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toas.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-usuario-personal',
  templateUrl: './usuario-personal.component.html',
  styleUrls: ['./usuario-personal.component.css'],
})
export class UsuarioPersonalComponent implements OnInit, OnDestroy {
  @Input()
  codUsuario: any;

  public usuario: Usuario;
  public cargaFinalizada: boolean;

  public suscripcionUsuario: Subscription;
  public suscripcionRol: Subscription;
  public tmp: any;
  public arregloRol: Rol[];
  public arregloTipos: any[];

  constructor(private usuarioService: UsuarioService, private rolService: RolService, private toastr: ToastrService) {
    this.usuario = this.inicializarUsuario();

    this.cargaFinalizada = false;
    this.suscripcionRol = this.tmp;
    this.suscripcionUsuario = this.tmp;

    this.arregloRol = [];
    this.arregloTipos = ARREGLO_TIPO_DOCUMENTO;
  }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  ngOnDestroy(): void {
    if (this.suscripcionUsuario) {
      this.suscripcionUsuario.unsubscribe();
    }
    if (this.suscripcionRol) {
      this.suscripcionRol.unsubscribe();
    }
  }

  /* Obligatorios */

  public inicializarUsuario(): Usuario {
    return new Usuario(0, '', '', '', '', '', 0, 0);
  }

  public inicializarCombo(): void {
    this.usuario.tipoDocumentoUsuario = this.arregloTipos[0].acronimo;
  }
  /* LDN */

  public obtenerUsuario(): void {
    this.suscripcionUsuario = this.usuarioService
      .infoUsuario(this.codUsuario)
      .pipe(
        map((respuesta: any) => {
          this.usuario = respuesta;
          this.usuario.documentoUsuario = this.validarLLavesUnicas(this.usuario.documentoUsuario);
          return respuesta;
        }),
        catchError((err) => {
          throw err;
        }),
        finalize(() => {
          this.obtenerRoles();
        })
      )
      .subscribe(observadorAny);
  }

  public obtenerRoles(): void {
    this.suscripcionRol = this.rolService
      .obtenerRolCombo()
      .pipe(
        map((roles: Rol[]) => {
          this.arregloRol = roles;
          return roles;
        }),
        catchError((err) => {
          throw err;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  public validarLLavesUnicas(llaveUnica: string): string {
    if (llaveUnica.includes('DOC_')) {
      llaveUnica = '';
    }
    return llaveUnica;
  }

  public enviarFormulario(formulario: NgForm): void {
    this.suscripcionUsuario = this.usuarioService
      .editarUsuario(this.usuario)
      .pipe(
        map((respuesta) => {
          mostrarMensaje('success', 'Información personal actualizada', 'Exito', this.toastr);
          return respuesta;
        }),
        catchError((err) => {
          mostrarMensaje('error', 'Fallo en la actualizacion de la información ', 'Error', this.toastr);
          throw err;
        })
      )
      .subscribe(observadorAny);
  }
}
