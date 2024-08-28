import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, finalize, map } from 'rxjs';
import { Rol } from 'src/app/modelos/rol';
import { RolService } from 'src/app/servicios/api/rol.service';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toas.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-rol-editar',
  templateUrl: './rol-editar.component.html',
  styleUrls: ['./rol-editar.component.css'],
})
export class RolEditarComponent implements OnInit, OnDestroy {
  public rol: Rol;
  public cargaFinalizada: boolean;

  private tmp: any;
  public suscripcionRol: Subscription;

  constructor(
    private modalService: BsModalService,
    public modalRef: BsModalRef,
    private toastr: ToastrService,
    private rolService: RolService
  ) {
    this.suscripcionRol = this.tmp;
    this.cargaFinalizada = false;
    this.rol = this.inicializarRol();
  }

  ngOnInit(): void {
    this.obtenerRol();
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

  /* LDN */

  public obtenerRol(): void {
    let objTmp: any = this.modalService.config.initialState;
    const numero = objTmp.list[0].value;
    this.suscripcionRol = this.rolService
      .obtenerRol(numero)
      .pipe(
        map((respuesta: Rol) => {
          this.rol = respuesta;
          return respuesta;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }

  public enviarFormulario(formulario: NgForm): void {
    this.suscripcionRol = this.rolService
      .actualizarRol(this.rol)
      .pipe(
        map((respuesta) => {
          mostrarMensaje('success', 'Se actualizo el rol ', 'Exíto', this.toastr);
          this.modalRef.hide();
          return respuesta;
        }),
        catchError((err) => {
          mostrarMensaje('error', 'Error en la actualizacion del rol ', 'Fallo', this.toastr);
          this.modalRef.hide();
          throw err;
        })
      )
      .subscribe(observadorAny);
  }
}
