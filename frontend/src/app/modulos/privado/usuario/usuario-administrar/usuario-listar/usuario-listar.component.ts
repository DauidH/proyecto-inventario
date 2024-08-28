import { Router } from '@angular/router';
import { Subscription, catchError, finalize, map } from 'rxjs';
import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/modelos/usuario';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { UsuarioService } from 'src/app/servicios/api/usuario.service';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toas.func';
import { OPC_BUSQ_USUARIO } from 'src/app/utilidades/dominios/opc-busq-usuario';
import { ARREGLO_TIPO_DOCUMENTO } from 'src/app/utilidades/dominios/tipo-documento';

@Component({
  selector: 'app-usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.css'],
})
export class UsuarioListarComponent implements OnInit, OnDestroy {
  public arregloUsuario: Usuario[];
  public arregloTipos: any[];

  public usuarioSeleccionado: Usuario;

  public paginaActual: number;
  public cantidadMostrar: number;
  public cantidadPaginas: number;
  public cantidadTotalRegistros: number;

  public modalTitulo: string;
  public modalContenido: string;
  public modalCuerpo: string;
  public modalRef: BsModalRef;

  public suscripcionUsuario: Subscription;
  private tmp: any;
  public cargaFinalizada: boolean;

  public fuenteDatos: Array<string>;

  public _columnaBuscar: number;
  public _cadenaBuscar: string;
  public opcionesBusqueda: any[];
  public seleccionado: boolean;
  public opcionBuscar: string;

  constructor(
    private usuarioService: UsuarioService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.usuarioSeleccionado = this.inicializarUsuario();
    this.arregloUsuario = [];
    this.arregloTipos = ARREGLO_TIPO_DOCUMENTO;

    this.paginaActual = 0;
    this.cantidadMostrar = 0;
    this.cantidadTotalRegistros = 0;
    this.cantidadPaginas = 0;

    this.modalRef = this.tmp;
    this.modalTitulo = '';
    this.modalContenido = '';
    this.modalCuerpo = '';

    this.cargaFinalizada = false;
    this.seleccionado = false;
    this.suscripcionUsuario = this.tmp;

    this.fuenteDatos = [];
    this.fuenteDatos.push('');

    this._cadenaBuscar = '';
    this._columnaBuscar = 1;
    this.opcionBuscar = '';

    this.opcionesBusqueda = OPC_BUSQ_USUARIO;
  }
  ngOnInit(): void {
    localStorage.setItem('ELONMUSK', this.router.url);
    this._cadenaBuscar = '';
    this.cantidadMostrar = 50;
    this.paginaActual = 1;
    this.medioBusqueda(this.tmp);
    this.obtenerUsuarios();
  }

  ngOnDestroy(): void {
    if (this.suscripcionUsuario) {
      this.suscripcionUsuario.unsubscribe();
    }
  }

  /* Obligatorio */
  public inicializarUsuario(): Usuario {
    return new Usuario(0, '', ' ', '', '', '', 0, 0);
  }

  public actualizarPaginador(): void {
    this.paginaActual = this.paginaActual;
    this.cantidadTotalRegistros;
    this.cantidadPaginas = Math.ceil(this.cantidadTotalRegistros / this.cantidadMostrar);
  }

  /* LDN */

  public obtenerUsuarios(): void {
    const parametrosPaginador = {
      cadenaBuscar: this._cadenaBuscar,
      paginaActual: this.paginaActual,
      cantidadMostrar: this.cantidadMostrar,
      columnaBuscar: this._columnaBuscar,
    };
    this.suscripcionUsuario = this.usuarioService
      .obtenerUsuarios(parametrosPaginador)
      .pipe(
        map((resultado: any) => {
          this.cantidadTotalRegistros = resultado[0].cantidad;
          this.arregloUsuario = resultado[1];
          return resultado;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
          this.actualizarPaginador();
          this.seleccionado = false;
        })
      )
      .subscribe(observadorAny);
  }

  public ordenarTextoMostrar(usuario: any): string {
    let cadena = '';
    if (usuario.documentoUsuario.includes('PX_')) {
      usuario.documentoUsuario = 'Pendiente';
    }
    switch (this._columnaBuscar) {
      case 1:
        cadena = usuario.documentoUsuario + ' - ' + usuario.nombresUsuario + ' ' + usuario.apellidosUsuario + ' - ' + usuario.correoAcceso;
        break;
      case 2:
        cadena = usuario.correoAcceso + ' - ' + usuario.nombresUsuario + ' ' + usuario.apellidosUsuario + ' - ' + usuario.documentoUsuario;
        break;
      case 3:
        cadena = usuario.apellidosUsuario + ' ' + usuario.nombresUsuario + ' - ' + usuario.documentoUsuario + ' - ' + usuario.correoAcceso;
        break;
      case 4:
        cadena = usuario.nombresUsuario + ' ' + usuario.apellidosUsuario + ' - ' + usuario.documentoUsuario + ' - ' + usuario.correoAcceso;
        break;
    }
    return cadena;
  }

  public obtenerUsuariosBuscar(): void {
    const parametrosBuscar = {
      cadenaBuscar: this._cadenaBuscar,
      paginaActual: this.paginaActual,
      cantidadMostrar: this.cantidadMostrar,
      columnaBuscar: this._columnaBuscar,
    };

    this.suscripcionUsuario = this.usuarioService
      .usuarioBuscar(parametrosBuscar)
      .pipe(
        map((resultado: any) => {
          this.cantidadTotalRegistros = resultado[0].cantidad;
          this.arregloUsuario = resultado[1];
          this.fuenteDatos = [];
          this.arregloUsuario.forEach((campos) => {
            this.fuenteDatos.push(this.ordenarTextoMostrar(campos));
          });
          return resultado;
        }),
        finalize(() => {
          this.actualizarPaginador();
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  public cambiarPaginador(deviceValue: any) {
    this.actualizarPaginador();
    this.obtenerUsuarios();
  }

  public sizeProperty(cadena: string): void {
    if (cadena.length >= 3) {
      this.obtenerUsuariosBuscar();
    } else if (cadena.length === 0) {
      this.obtenerUsuarios();
    }
  }

  public enterCombo(data: any): void {
    if (!this.seleccionado) {
      this.obtenerUsuarios();
    }
  }

  public selecionadoCombo(): void {
    this.seleccionado = true;
    this.obtenerUsuarios();
  }

  public handlePageChange(event: number): void {
    this.paginaActual = event;
    this.obtenerUsuarios();
  }

  public medioBusqueda(codigo: any): void {
    this.opcionesBusqueda.map((columna) => {
      if (columna.codigo == this._columnaBuscar) {
        this.opcionBuscar = columna.opcion;
      }
    });
  }

  public eliminarUsuario(objUsuario: Usuario): void {
    this.suscripcionUsuario = this.usuarioService
      .borrarUsuario(objUsuario)
      .pipe(
        map((respuesta) => {
          mostrarMensaje('success', 'Estado de usuario Inactivo ', 'Exíto', this.toastr);
          this.obtenerUsuarios();
          return respuesta;
        }),
        catchError((err) => {
          mostrarMensaje('error', 'Error en el estado del usuario ', 'Error!', this.toastr);
          throw err;
        }),
        finalize(() => {
          this.obtenerUsuarios();
        })
      )
      .subscribe(observadorAny);
  }

  public cambiarEstadoUsuario(objUsuario: Usuario): void {
    this.suscripcionUsuario = this.usuarioService
      .estadoUsuario(objUsuario)
      .pipe(
        map((respuesta) => {
          mostrarMensaje('success', 'Estado de usuario Activo ', 'Exíto', this.toastr);
          this.obtenerUsuarios();
          return respuesta;
        }),
        catchError((err) => {
          mostrarMensaje('error', 'Error en el estado del usuario ', 'Error!', this.toastr);
          throw err;
        })
      )
      .subscribe(observadorAny);
  }

  /* Modales */

  public abrirModalSugerencia(template: TemplateRef<any>, objUsuario: Usuario): void {
    this.usuarioSeleccionado = objUsuario;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.modalTitulo = 'Alerta';
    this.modalCuerpo = 'Usuario Inactivo';
    this.modalContenido = this.usuarioSeleccionado.nombresUsuario + ' ' + this.usuarioSeleccionado.apellidosUsuario;
  }

  public abrirModalEliminar(template: TemplateRef<any>, objUsuario: Usuario): void {
    this.usuarioSeleccionado = objUsuario;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.modalTitulo = 'Advertencia';
    this.modalCuerpo = 'Deseas deshabilitar al usuario?';
    this.modalContenido = this.usuarioSeleccionado.nombresUsuario + ' ' + this.usuarioSeleccionado.apellidosUsuario;
  }

  public eliminarBoton(): void {
    this.eliminarUsuario(this.usuarioSeleccionado);
    this.modalRef.hide();
    this.usuarioSeleccionado = this.inicializarUsuario();
  }

  public estadoBoton(): void {
    this.cambiarEstadoUsuario(this.usuarioSeleccionado);
    this.modalRef.hide();
    this.usuarioSeleccionado = this.inicializarUsuario();
    this.modalService.hide();
  }

  public cerrarModal(): void {
    this.modalRef.hide();
  }
}
