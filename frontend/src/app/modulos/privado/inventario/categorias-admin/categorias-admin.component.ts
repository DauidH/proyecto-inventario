import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, finalize, map } from 'rxjs';
import { Categoria } from 'src/app/modelos/categoria';
import { CategoriasService } from 'src/app/servicios/api/categorias.service';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toas.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { CategoriasCrearComponent } from '../categorias-crear/categorias-crear.component';
import { CategoriasEditarComponent } from '../categorias-editar/categorias-editar.component';

@Component({
  selector: 'app-categorias-admin',
  templateUrl: './categorias-admin.component.html',
  styleUrls: ['./categorias-admin.component.css'],
})
export class CategoriasAdminComponent implements OnInit, OnDestroy {
  public categoriaSeleccionada: Categoria;
  public arregloCategorias: Categoria[];

  public paginaActual: number;
  public cantidadMostrar: number;
  public cantidadPaginas: number;
  public cantidadTotalRegistros: number;

  public modalTitulo: string;
  public modalContenido: string;
  public modalCuerpo: string;
  public modalRef: BsModalRef;

  public suscripcionCategoria: Subscription;
  private tmp: any;
  public cargaFinalizada: boolean;

  public fuenteDatos: Array<string>;

  public _cadenaBuscar: string;
  public seleccioando: boolean;

  constructor(
    private categoriaService: CategoriasService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.categoriaSeleccionada = this.inicializarCategoria();
    this.arregloCategorias = [];

    this.modalRef = this.tmp;
    this.modalTitulo = '';
    this.modalContenido = '';
    this.modalCuerpo = '';

    this.cargaFinalizada = false;
    this.suscripcionCategoria = this.tmp;

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
    this.cantidadMostrar = 50;
    this.paginaActual = 1;
    this.obtenerCategorias();
  }

  ngOnDestroy(): void {
    if (this.suscripcionCategoria) {
      this.suscripcionCategoria.unsubscribe();
    }
  }

  /* Obligatorio */
  public inicializarCategoria(): Categoria {
    return new Categoria(0, '', '', 1);
  }

  public actualizarPaginador(): void {
    this.paginaActual = this.paginaActual;
    this.cantidadTotalRegistros;
    this.cantidadPaginas = Math.ceil(this.cantidadTotalRegistros / this.cantidadMostrar);
  }

  public sizeProperty(cadena: string): void {
    if (cadena.length >= 3) {
      this.obtenerCategoriaBuscar();
    } else if (cadena.length === 0) {
      this.obtenerCategorias();
    }
  }

  public selecionadoCombo(): void {
    this.seleccioando = true;
    this.obtenerCategorias();
  }

  public enterCombo(data: any): void {
    if (!this.seleccioando) {
      this.obtenerCategorias();
    }
  }

  public handlePageChange(event: number): void {
    this.paginaActual = event;
    this.obtenerCategorias();
  }

  public cambiarPaginador(deviceValue: any) {
    this.actualizarPaginador();
    this.obtenerCategorias();
  }

  /* LDN */
  public obtenerCategorias(): void {
    const parametrosPaginador = {
      cadenaBuscar: this._cadenaBuscar,
      paginaActual: this.paginaActual,
      cantidadMostrar: this.cantidadMostrar,
    };

    this.suscripcionCategoria = this.categoriaService
      .obtenerCategoriaPaginador(parametrosPaginador)
      .pipe(
        map((respuesta: any) => {
          this.cantidadTotalRegistros = respuesta[0].cantidad;
          this.arregloCategorias = respuesta[1];
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

  public obtenerCategoriaBuscar(): void {
    this.suscripcionCategoria = this.categoriaService
      .obtenerCategoriaBuscar(this._cadenaBuscar)
      .pipe(
        map((respuesta: any) => {
          this.fuenteDatos = [];
          this.arregloCategorias = respuesta[1];
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

  public eliminarCategoria(objCategoria: Categoria): void {
    this.suscripcionCategoria = this.categoriaService
      .eliminarCategoria(objCategoria.codCategoria)
      .pipe(
        map((respuesta) => {
          this.obtenerCategorias();
          mostrarMensaje('success', 'Categoria eliminada ', 'Satisfactoriamente', this.toastr);
          return respuesta;
        }),
        catchError((err) => {
          mostrarMensaje('error', 'Fallo al borrar la categoria ', 'Error', this.toastr);
          throw err;
        })
      )
      .subscribe(observadorAny);
  }

  /* Modales */
  public openModalCrear(): void {
    this.modalRef = this.modalService.show(CategoriasCrearComponent, {
      class: 'modal-lg',
    });
    this.modalRef.onHidden?.subscribe((res) => {
      this.obtenerCategorias();
    });
  }

  public abrirModalSugerencia(template: TemplateRef<any>, objCategoria: Categoria): void {
    this.categoriaSeleccionada = objCategoria;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.modalTitulo = 'Advertencia';
    this.modalCuerpo = 'No se puede eliminar el registro!';
    this.modalContenido = this.categoriaSeleccionada.nombreCategoria;
  }

  public abrirModalEliminar(template: TemplateRef<any>, objCategoria: Categoria): void {
    this.categoriaSeleccionada = objCategoria;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.modalTitulo = 'Advertencia';
    this.modalCuerpo = '¿Esta seguro qué desea eliminar el registro la accion es irreversible?';
    this.modalContenido = this.categoriaSeleccionada.nombreCategoria;
  }

  public openModalEditar(codCategoria: number): void {
    const initialState = {
      list: [{ tag: 'codCategoria', value: codCategoria }],
    };
    this.modalRef = this.modalService.show(CategoriasEditarComponent, Object.assign({ class: 'modal-lg', initialState }));
    this.modalRef.onHidden?.subscribe((res) => {
      this.obtenerCategorias();
    });
  }

  public botonEliminar(): void {
    this.eliminarCategoria(this.categoriaSeleccionada);
    this.categoriaSeleccionada = this.inicializarCategoria();
    this.modalRef.hide();
  }

  public cerrarModal(): void {
    this.modalRef.hide();
  }
}
