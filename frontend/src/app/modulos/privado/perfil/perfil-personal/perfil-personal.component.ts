import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, finalize, map } from 'rxjs';
import { Usuario } from 'src/app/modelos/usuario';
import { AccesoService } from 'src/app/servicios/api/acceso.service';
import { RolService } from 'src/app/servicios/api/rol.service';
import { UsuarioService } from 'src/app/servicios/api/usuario.service';
import { ARREGLO_TIPO_DOCUMENTO } from 'src/app/utilidades/dominios/tipo-documento';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toas.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-perfil-personal',
  templateUrl: './perfil-personal.component.html',
  styleUrls: ['./perfil-personal.component.css'],
})
export class PerfilPersonalComponent implements OnInit, OnDestroy {
  @Input()
  codUsuario: any;

  public usuario: Usuario;
  public cargaFinalizada: boolean;
  public suscripcionUsuario: Subscription;
  public suscripcionRoles: Subscription;
  public tmp: any;

  /* public arregloRoles: Rol[]; */
  public arregloTipos: any[];

  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private toastr: ToastrService,
    private accesoService: AccesoService
  ) {
    this.usuario = this.inicializarUsuario();
    this.cargaFinalizada = false;
    this.suscripcionUsuario = this.tmp;
    this.suscripcionRoles = this.tmp;

    this.arregloTipos = ARREGLO_TIPO_DOCUMENTO;
    /* this.arregloRoles = []; */
  }

  ngOnInit(): void {
    this.codUsuario = this.accesoService.acceso.codUsuario;
    this.obtenerUsuario();
  }

  ngOnDestroy(): void {
    if (this.suscripcionUsuario) {
      this.suscripcionUsuario.unsubscribe();
    }
    if (this.suscripcionRoles) {
      this.suscripcionRoles.unsubscribe();
    }
  }

  // *********************************** Obligatorios
  public inicializarUsuario(): Usuario {
    return new Usuario(0, '', '', '', '', '', 0, 0);
  }

  public inicializarCombo(): void {
    this.usuario.tipoDocumentoUsuario = this.arregloTipos[0].acronimo;
  }

  // *********************************** LDN
  public validarLLavesUnicas(llaveUnica: string): string {
    if (llaveUnica.includes('ID_')) {
      llaveUnica = '';
    }
    return llaveUnica;
  }

  public obtenerUsuario(): void {
    this.suscripcionUsuario = this.usuarioService
      .infoUsuario(this.codUsuario)
      .pipe(
        map((respuesta: any) => {
          this.usuario = respuesta;
          this.usuario.documentoUsuario = this.validarLLavesUnicas(this.usuario.documentoUsuario);
          if (this.usuario.tipoDocumentoUsuario == 'PD') {
            this.inicializarCombo();
          }
          return respuesta;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  public enviarFormulario(formulario: NgForm): void {
    this.suscripcionUsuario = this.usuarioService
      .editarUsuario(this.usuario)
      .pipe(
        map((respuesta) => {
          mostrarMensaje('success', 'Información personal modificada con éxito', 'Exito', this.toastr);
          return respuesta;
        }),
        catchError((err) => {
          mostrarMensaje('error', 'Fallo la edicion de la información personal', 'Error', this.toastr);
          throw err;
        })
      )
      .subscribe(observadorAny);
  }
}
