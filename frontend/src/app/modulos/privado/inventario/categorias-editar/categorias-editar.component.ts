import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, finalize, map } from 'rxjs';
import { Categoria } from 'src/app/modelos/categoria';
import { CategoriasService } from 'src/app/servicios/api/categorias.service';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toas.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { ARREGLO_ESTADO_CATEGORIA } from 'src/app/utilidades/dominios/estado-categorias';

@Component({
  selector: 'app-categorias-editar',
  templateUrl: './categorias-editar.component.html',
  styleUrls: ['./categorias-editar.component.css'],
})
export class CategoriasEditarComponent implements OnInit, OnDestroy {
  public categoria: Categoria;
  public cargaFinalizada: boolean;
  public arregloEstados: any[];

  private tmp: any;
  public suscripcionCategoria: Subscription;

  constructor(
    private modalService: BsModalService,
    public modalRef: BsModalRef,
    private toastr: ToastrService,
    private categoriaService: CategoriasService
  ) {
    this.suscripcionCategoria = this.tmp;
    this.cargaFinalizada = false;
    this.categoria = this.inicializarCategoria();
    this.arregloEstados = ARREGLO_ESTADO_CATEGORIA;
  }

  ngOnInit(): void {
    this.obtenerCategoria();
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

  /* LDN */
  public obtenerCategoria(): void {
    let objTmp: any = this.modalService.config.initialState;
    const numero = objTmp.list[0].value;
    this.suscripcionCategoria = this.categoriaService
      .obtenerCategoria(numero)
      .pipe(
        map((respuesta: Categoria) => {
          this.categoria = respuesta;
          return respuesta;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  public enviarFormulario(formulario: NgForm): void {
    this.suscripcionCategoria = this.categoriaService
      .actualizarCategoria(this.categoria)
      .pipe(
        map((respuesta) => {
          mostrarMensaje('success', 'Se actualizo la categoria ', 'Exíto', this.toastr);
          this.modalRef.hide();
          return respuesta;
        }),
        catchError((err) => {
          mostrarMensaje('error', 'Error en la actualización de la categoria ', 'Fallo', this.toastr);
          this.modalRef.hide();
          throw err;
        })
      )
      .subscribe(observadorAny);
  }
}
