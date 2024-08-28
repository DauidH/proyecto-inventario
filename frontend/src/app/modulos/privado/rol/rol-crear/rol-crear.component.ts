import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Rol } from 'src/app/modelos/rol';
import { RolService } from 'src/app/servicios/api/rol.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, map } from 'rxjs';
import { NgForm } from '@angular/forms';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/mensajes-toas.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-rol-crear',
  templateUrl: './rol-crear.component.html',
  styleUrls: ['./rol-crear.component.css'],
})
export class RolCrearComponent implements OnInit, OnDestroy {
  public rol: Rol;
  public suscripcionRol: Subscription;
  private tmp: any;

  constructor(
    public modalRef: BsModalRef,
    private toastr: ToastrService,
    private rolService: RolService
  ) {
    this.suscripcionRol = this.tmp;
    this.rol = this.inicializarRol();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.suscripcionRol) {
      this.suscripcionRol.unsubscribe();
    }
  }

  /*  Obligatorio */
  public inicializarRol(): Rol {
    return new Rol(0, '', 1);
  }

  /* LDN */
  public enviarFormulario(formulario: NgForm): void {
    this.suscripcionRol = this.rolService
      .crearRol(this.rol)
      .pipe(
        map((respuesta) => {
          this.modalRef.hide();
          mostrarMensaje('success', 'Rol creado ', 'Exito', this.toastr);
          return respuesta;
        }),
        catchError((err) => {
          formulario.reset();
          mostrarMensaje(
            'error',
            'Fallo al crear el rol',
            'ERROR',
            this.toastr
          );
          throw err;
        })
      )
      .subscribe(observadorAny);
  }
}
