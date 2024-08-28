import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, catchError, finalize, map } from 'rxjs';

import { Rol } from 'src/app/modelos/rol';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/modelos/usuario';
import { RolService } from 'src/app/servicios/api/rol.service';
import { UsuarioService } from 'src/app/servicios/api/usuario.service';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toas.func';
import { ARREGLO_TIPO_DOCUMENTO } from 'src/app/utilidades/dominios/tipo-documento';

@Component({
  selector: 'app-usuario-crear',
  templateUrl: './usuario-crear.component.html',
  styleUrls: ['./usuario-crear.component.css'],
})
export class UsuarioCrearComponent implements OnInit, OnDestroy {
  public usuario: Usuario;
  public arregloTipos: any[];
  public suscripcionUsuario: Subscription;
  public suscripcionRoles: Subscription;
  private tmp: any;

  public cargaFinalizada: boolean;
  public arregloRol: Rol[];

  public hizoClic: boolean;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private rolService: RolService,
    private usuarioService: UsuarioService
  ) {
    this.hizoClic = false;
    this.arregloRol = [];
    this.arregloTipos = ARREGLO_TIPO_DOCUMENTO;
    this.usuario = this.inicializarUsuario();
    this.cargaFinalizada = false;

    this.suscripcionRoles = this.tmp;
    this.suscripcionUsuario = this.tmp;
  }

  ngOnInit(): void {
    localStorage.setItem('ELONMUSK', this.router.url);
    this.inicializarCombo();
    this.usuario.codRol = 4;
    this.obtenerRoles();
  }

  ngOnDestroy(): void {
    if (this.suscripcionRoles) {
      this.suscripcionRoles.unsubscribe();
    }

    if (this.suscripcionUsuario) {
      this.suscripcionUsuario.unsubscribe();
    }
  }

  /* Obligatorio */
  public inicializarUsuario(): Usuario {
    return new Usuario(0, '', '', '', '', '', 0, 0);
  }

  public inicializarCombo(): void {
    this.usuario.tipoDocumentoUsuario = this.arregloTipos[0].acronimo;
  }
  /*  LDN */
  public obtenerRoles(): void {
    this.suscripcionRoles = this.rolService
      .obtenerRolCombo()
      .pipe(
        map((roles: Rol[]) => {
          this.arregloRol = roles;
          this.usuario.codRol = roles[0].codRol;
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

  public enviarFormulario(formulario: NgForm) {
    this.hizoClic = true;

    console.log(this.usuario);

    this.usuarioService
      .crearUsuario(this.usuario)
      .pipe(
        map((resultado) => {
          mostrarMensaje('success', 'Usuario creado con exitó', 'Satisfactorio', this.toastr);
          this.router.navigate(['/private/user/update', resultado.codUsuario]);
        }),
        catchError((err) => {
          formulario.reset();
          mostrarMensaje('error', 'Usuario no creado revise la informacion Personal', 'Fallo', this.toastr);
          throw err;
        })
      )
      .subscribe(observadorAny);
  }
}
