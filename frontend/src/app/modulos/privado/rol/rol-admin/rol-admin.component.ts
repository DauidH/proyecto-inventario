import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, finalize, map } from 'rxjs';
import { Rol } from 'src/app/modelos/rol';
import { RolService } from 'src/app/servicios/api/rol.service';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toas.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { RolCrearComponent } from '../rol-crear/rol-crear.component';
import { RolEditarComponent } from '../rol-editar/rol-editar.component';

@Component({
  selector: 'app-rol-admin',
  templateUrl: './rol-admin.component.html',
  styleUrls: ['./rol-admin.component.css'],
})
export class RolAdminComponent implements OnInit, OnDestroy {
  public rolSeleccionado: Rol;
  public arregloRol: Rol[];

  public paginaActual: number;
  public cantidadMostrar: number;
  public cantidadPaginas: number;
  public cantidadTotalRegistros: number;

  public modalTitulo: string;
  public modalContenido: string;
  public modalCuerpo: string;
  public modalRef: BsModalRef;

  public suscripcionRol: Subscription;
  private tmp: any;
  public cargaFinalizada: boolean;

  public fuenteDatos: Array<string>;

  public _cadenaBuscar: string;
  public seleccioando: boolean;

  constructor(private rolService: RolService, private modalService: BsModalService, private toastr: ToastrService, private router: Router) {
    this.rolSeleccionado = this.inicializarRol();
    this.arregloRol = [];

    this.modalRef = this.tmp;
    this.modalTitulo = '';
    this.modalContenido = '';
    this.modalCuerpo = '';

    this.cargaFinalizada = false;
    this.suscripcionRol = this.tmp;

    this.paginaActual = 0;
    this.cantidadMostrar = 0;
    this.cantidadTotalRegistros = 0;
    this.cantidadPaginas = 0;

    this.fuenteDatos = [];
    this.fuenteDatos.push('');

    this._cadenaBuscar = '';
    this.seleccioando = false;
  }

  ngOnInit(): void {
    localStorage.setItem('ELONMUSK', this.router.url);
    this.cantidadMostrar = 10;
    this.paginaActual = 1;
    this.obtenerRoles();
  }

  ngOnDestroy(): void {
    if (this.suscripcionRol) {
      this.suscripcionRol.unsubscribe();
    }
  }

  /* Obligatorio */
  public inicializarRol(): Rol {
    return new Rol(0, '', 0);
  }

  public actualizarPaginador(): void {
    this.paginaActual = this.paginaActual;
    this.cantidadTotalRegistros;
    this.cantidadPaginas = Math.ceil(this.cantidadTotalRegistros / this.cantidadMostrar);
  }

  public cambiarPaginador(deviceValue: any) {
    this.actualizarPaginador();
    this.obtenerRoles();
  }

  public sizeProperty(cadena: string): void {
    if (cadena.length >= 3) {
      this.obtenerRolBuscar();
    } else if (cadena.length === 0) {
      this.obtenerRoles();
    }
  }

  public selecionadoCombo(): void {
    this.seleccioando = true;
    this.obtenerRoles();
  }

  public handlePageChange(event: number): void {
    this.paginaActual = event;
    this.obtenerRoles();
  }

  public enterCombo(data: any): void {
    if (!this.seleccioando) {
      this.obtenerRoles();
    }
  }

  /* LDN */
  public obtenerRoles(): void {
    const parametrosPaginador = {
      cadenaBuscar: this._cadenaBuscar,
      paginaActual: this.paginaActual,
      cantidadMostrar: this.cantidadMostrar,
    };
    this.suscripcionRol = this.rolService
      .obtenerRolPaginador(parametrosPaginador)
      .pipe(
        map((respuesta: any) => {
          this.cantidadTotalRegistros = respuesta[0].cantidad;
          this.arregloRol = respuesta[1];
        }),
        catchError((err) => {
          throw err;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
          this.actualizarPaginador();
          this.seleccioando = false;
        })
      )
      .subscribe(observadorAny);
  }

  public obtenerRolBuscar(): void {
    this.suscripcionRol = this.rolService
      .obtenerRolBuscar(this._cadenaBuscar)
      .pipe(
        map((respuesta: any) => {
          this.fuenteDatos = [];
          this.arregloRol = respuesta[1];
          this.cantidadTotalRegistros = respuesta[0].cantidad;
          respuesta[1].forEach((campos: any) => {
            this.fuenteDatos.push(campos);
          });
          return respuesta;
        }),
        finalize(() => {
          this.actualizarPaginador();
        })
      )
      .subscribe(observadorAny);
  }

  public eliminarRol(objRol: Rol): void {
    this.suscripcionRol = this.rolService
      .eliminarRol(objRol.codRol)
      .pipe(
        map((respuesta) => {
          this.obtenerRoles();
          mostrarMensaje('success', 'Rol eliminado ', 'Satisfactoriamente', this.toastr);
          return respuesta;
        }),
        catchError((err) => {
          mostrarMensaje('error', 'Fallo al borrar el rol ', 'Error', this.toastr);
          throw err;
        })
      )
      .subscribe(observadorAny);
  }

  public estadoRol(objRol: Rol): void {
    this.suscripcionRol = this.rolService
      .estadoRol(objRol)
      .pipe(
        map((respuesta) => {
          this.obtenerRoles();
          mostrarMensaje('success', 'Cambio de estado Satisfactorio ', 'Satisfactoriamente', this.toastr);
          return respuesta;
        }),
        catchError((err) => {
          mostrarMensaje('error', 'Error en el cambio de estado ', 'Error', this.toastr);
          throw err;
        })
      )
      .subscribe(observadorAny);
  }

  /* Modales */
  public abrirModalSugerencia(template: TemplateRef<any>, objRol: Rol): void {
    this.rolSeleccionado = objRol;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.modalTitulo = 'Advertencia';
    this.modalCuerpo = 'No se puede eliminar el registro!';
    this.modalContenido = this.rolSeleccionado.nombreRol;
  }

  public abrirModalEstado(template: TemplateRef<any>, objRol: Rol): void {
    this.rolSeleccionado = objRol;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.modalTitulo = 'Cambiar de estado';
    this.modalCuerpo = '¿Esta seguro de cambiar el estado el rol ?';
    this.modalContenido = this.rolSeleccionado.nombreRol;
  }

  public abrirModalEliminar(template: TemplateRef<any>, objRol: Rol): void {
    this.rolSeleccionado = objRol;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.modalTitulo = 'Advertencia';
    this.modalCuerpo = '¿Esta seguro qué desea eliminar el registro la accion es irreversible?';
    this.modalContenido = this.rolSeleccionado.nombreRol;
  }

  public botonEliminar(): void {
    this.eliminarRol(this.rolSeleccionado);
    this.rolSeleccionado = this.inicializarRol();
    this.modalRef.hide();
  }

  public botonEstado(): void {
    this.estadoRol(this.rolSeleccionado);
    this.rolSeleccionado = this.inicializarRol();
    this.modalRef.hide();
  }

  public openModalCrear(): void {
    this.modalRef = this.modalService.show(RolCrearComponent, {
      class: 'modal-lg',
    });
    this.modalRef.onHidden?.subscribe((res) => {
      this.obtenerRoles();
    });
  }

  public openModalEditar(codRol: number): void {
    const initialState = {
      list: [{ tag: 'codRol', value: codRol }],
    };
    this.modalRef = this.modalService.show(RolEditarComponent, Object.assign({ class: 'modal-lg', initialState }));
    this.modalRef.onHidden?.subscribe((res) => {
      this.obtenerRoles();
    });
  }

  public cerrarModal(): void {
    this.modalRef.hide();
  }
}
