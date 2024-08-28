import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, finalize, map } from 'rxjs';
import { Producto } from 'src/app/modelos/producto';
import { ProductosService } from 'src/app/servicios/api/productos.service';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toas.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { ProductosCrearComponent } from '../productos-crear/productos-crear.component';
import { ProductosEditarComponent } from '../productos-editar/productos-editar.component';

@Component({
  selector: 'app-productos-admin',
  templateUrl: './productos-admin.component.html',
  styleUrls: ['./productos-admin.component.css'],
})
export class ProductosAdminComponent implements OnInit, OnDestroy {
  public productoSeleccionado: Producto;
  public arregloProductos: Producto[];

  public paginaActual: number;
  public cantidadMostrar: number;
  public cantidadPaginas: number;
  public cantidadTotalRegistros: number;

  public modalTitulo: string;
  public modalContenido: string;
  public modalCuerpo: string;
  public modalRef: BsModalRef;

  public suscripcionProducto: Subscription;
  private tmp: any;
  public cargaFinalizada: boolean;

  public fuenteDatos: Array<string>;

  public _cadenaBuscar: string;
  public seleccioando: boolean;

  constructor(
    private productosService: ProductosService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.productoSeleccionado = this.inicializarProducto();
    this.arregloProductos = [];

    this.modalRef = this.tmp;
    this.modalTitulo = '';
    this.modalContenido = '';
    this.modalCuerpo = '';

    this.cargaFinalizada = false;
    this.suscripcionProducto = this.tmp;

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
    this.obtenerProductos();
  }

  ngOnDestroy(): void {
    if (this.suscripcionProducto) {
      this.suscripcionProducto.unsubscribe();
    }
  }

  /* Obligatorio */
  public inicializarProducto(): Producto {
    return new Producto(0, '', '', '', 0, 1);
  }

  public actualizarPaginador(): void {
    this.paginaActual = this.paginaActual;
    this.cantidadTotalRegistros;
    this.cantidadPaginas = Math.ceil(this.cantidadTotalRegistros / this.cantidadMostrar);
  }

  public sizeProperty(cadena: string): void {
    if (cadena.length >= 3) {
      //this.obtenerCategoriaBuscar();
    } else if (cadena.length === 0) {
      this.obtenerProductos();
    }
  }

  public selecionadoCombo(): void {
    this.seleccioando = true;
    this.obtenerProductos();
  }

  public enterCombo(data: any): void {
    if (!this.seleccioando) {
      this.obtenerProductos();
    }
  }

  public handlePageChange(event: number): void {
    this.paginaActual = event;
    this.obtenerProductos();
  }

  public cambiarPaginador(deviceValue: any) {
    this.actualizarPaginador();
    this.obtenerProductos();
  }

  /* LDN */
  public obtenerProductos(): void {
    const parametrosPaginador = {
      cadenaBuscar: this._cadenaBuscar,
      paginaActual: this.paginaActual,
      cantidadMostrar: this.cantidadMostrar,
    };

    this.suscripcionProducto = this.productosService
      .obtenerProductosPaginador(parametrosPaginador)
      .pipe(
        map((respuesta: any) => {
          this.cantidadTotalRegistros = respuesta[0].cantidad;
          this.arregloProductos = respuesta[1];
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

  public openModalCrear(): void {}
}
