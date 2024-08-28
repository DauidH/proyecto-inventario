import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Categoria } from 'src/app/modelos/categoria';
import { CategoriasService } from 'src/app/servicios/api/categorias.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, map } from 'rxjs';
import { NgForm } from '@angular/forms';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toas.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-categorias-crear',
  templateUrl: './categorias-crear.component.html',
  styleUrls: ['./categorias-crear.component.css'],
})
export class CategoriasCrearComponent implements OnInit, OnDestroy {
  public categoria: Categoria;
  public suscripcionCategoria: Subscription;
  private tmp: any;

  constructor(public modalRef: BsModalRef, private toastr: ToastrService, private categoriaService: CategoriasService) {
    this.suscripcionCategoria = this.tmp;
    this.categoria = this.inicializarCategoria();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.suscripcionCategoria) {
      this.suscripcionCategoria.unsubscribe();
    }
  }

  /*  Obligatorio */
  public inicializarCategoria(): Categoria {
    return new Categoria(0, '', '', 1);
  }

  /* LDN */
  public enviarFormulario(formulario: NgForm): void {
    this.suscripcionCategoria = this.categoriaService
      .crearCategoria(this.categoria)
      .pipe(
        map((respuesta) => {
          this.modalRef.hide();
          mostrarMensaje('success', 'Categoria creada ', 'ÉXITO', this.toastr);
          return respuesta;
        }),
        catchError((err) => {
          formulario.reset();
          mostrarMensaje('error', 'Fallo al crear la categoria', 'ERROR', this.toastr);
          throw err;
        })
      )
      .subscribe(observadorAny);
  }
}
