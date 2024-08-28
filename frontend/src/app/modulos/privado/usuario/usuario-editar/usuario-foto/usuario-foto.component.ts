import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, finalize, map } from 'rxjs';
import { Imagen } from 'src/app/modelos/imagen';
import { CargarArchivoService } from 'src/app/servicios/api/cargar-archivo.service';
import { ImagenService } from 'src/app/servicios/api/imagen.service';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toas.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-usuario-foto',
  templateUrl: './usuario-foto.component.html',
  styleUrls: ['./usuario-foto.component.css'],
})
export class UsuarioFotoComponent implements OnInit, OnDestroy {
  @Input()
  codUsuario: any;

  public imagen: Imagen;
  public imagenSeleccionada: Imagen;
  public arregloImagenes: Imagen[];

  private tmp: any;
  public suscripcionImagen: Subscription;
  public cargaFinalizada: boolean;
  public fotoFavorita: any;

  public modalTitulo: string;
  public modalContenido: string;
  public modalCuerpo: string;
  public modalRef: BsModalRef;

  constructor(
    private toastr: ToastrService,
    private modalService: BsModalService,
    private imagenService: ImagenService,
    private cargarArchivoService: CargarArchivoService
  ) {
    this.imagen = this.inicializarImagen();

    this.imagenSeleccionada = this.inicializarImagen();
    this.arregloImagenes = [];

    this.modalRef = this.tmp;
    this.suscripcionImagen = this.tmp;
    this.cargaFinalizada = false;
    this.fotoFavorita = this.tmp;

    this.modalTitulo = '';
    this.modalContenido = '';
    this.modalCuerpo = '';
  }

  ngOnInit(): void {
    this.obtenerImagenes();
  }
  ngOnDestroy(): void {
    if (this.suscripcionImagen) {
      this.suscripcionImagen.unsubscribe();
    }
  }

  /* Obligatorio */
  public inicializarImagen(): Imagen {
    return new Imagen(0, 0, '', '', '', '', 0, '');
  }

  /* LDN */

  public obtenerImagenes(): void {
    this.suscripcionImagen = this.imagenService
      .obtenerImagenes(this.codUsuario)
      .pipe(
        map((respuesta: Imagen[]) => {
          this.arregloImagenes = respuesta;
          respuesta.forEach((imagen) => {
            if (imagen.favoritaImagen == 1) {
              this.fotoFavorita = imagen.base64Imagen;
            }
          });
          return respuesta;
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

  public convertirFavorita(favorita: Imagen): void {
    this.suscripcionImagen = this.imagenService
      .imagenFavorita(favorita)
      .pipe(
        map((respuesta) => {
          mostrarMensaje('success', 'Imagen favorita actualizada correctamente', 'Exito', this.toastr);
          this.obtenerImagenes();
          return respuesta;
        }),
        catchError((err) => {
          mostrarMensaje('error', 'Cambiar imagen favorita', 'Fallo', this.toastr);
          throw err;
        })
      )
      .subscribe(observadorAny);
  }

  public nuevaImagen(formulario: NgForm): void {
    this.suscripcionImagen = this.imagenService
      .agregarImagen(this.imagen)
      .pipe(
        map(() => {
          mostrarMensaje('success', 'Foto cargada correctamente', 'Exito', this.toastr);
          this.obtenerImagenes();
          this.imagen = this.inicializarImagen();
        }),
        catchError((err) => {
          mostrarMensaje('danger', 'Error el cargar la imagen', 'Error', this.toastr);
          formulario.reset();
          throw err;
        })
      )
      .subscribe(observadorAny);
  }

  public borrarImagen(imagen: Imagen): void {
    this.suscripcionImagen = this.imagenService
      .borrarImagen(imagen.codImagen)
      .pipe(
        map((respuesta) => {
          mostrarMensaje('success', 'Imagen Eliminada con Exito', 'Exito', this.toastr);
          return respuesta;
        }),
        catchError((err) => {
          mostrarMensaje('error', 'Fallo eliminar imagen', 'Error', this.toastr);
          throw err;
        }),
        finalize(() => {
          this.obtenerImagenes();
        })
      )
      .subscribe(observadorAny);
  }

  // ***************************************** Ventana Modal
  openModal(template: TemplateRef<any>, imagen: Imagen) {
    this.imagenSeleccionada = imagen;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.modalTitulo = 'Advertencia: ¿Desea eliminar la foto?';
  }

  public botonEliminarModal(): void {
    this.borrarImagen(this.imagenSeleccionada);
    this.modalRef.hide();
    this.imagenSeleccionada = new Imagen(0, 0, '', '', '', '', 0, '');
    this.modalService.hide();
  }

  // ***************************************** Ventana Modal

  public async seleccionarFoto(evento: Event): Promise<any> {
    const objArchivo = await this.cargarArchivoService.seleccionarFoto(evento, false);
    if (objArchivo.nombrepublico !== '') {
      this.imagen.base64Imagen = objArchivo.base64;
      this.imagen.tipoImagen = objArchivo.tipo;
      this.imagen.tamanioImagen = objArchivo.tamano;
      this.imagen.nombrePublicoImagen = objArchivo.nombrepublico;
      this.imagen.codUsuario = this.codUsuario;
    } else {
      mostrarMensaje('error', 'Error en seleccion de la imagen', 'Fallo', this.toastr);
    }
  }

  public verFoto(data: string): void {
    var imagenCompleta = new Image();
    imagenCompleta.src = 'data:image/jpg;base64,' + data;
    var nuevaVentana = window.open('');
    nuevaVentana?.document.write(imagenCompleta.outerHTML);
  }
}
