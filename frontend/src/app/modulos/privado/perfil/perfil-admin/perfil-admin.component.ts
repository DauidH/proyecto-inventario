import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, catchError, finalize, map } from 'rxjs';
import { Acceso } from 'src/app/modelos/acceso';
import { Usuario } from 'src/app/modelos/usuario';
import { AccesoService } from 'src/app/servicios/api/acceso.service';
import { UsuarioService } from 'src/app/servicios/api/usuario.service';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PerfilAdminComponent implements OnInit, OnDestroy {
  public usuario: Usuario;
  public acceso: Acceso;
  public codUsuario: number;
  public fotoFavorita: any;
  public cargaFinalizada: boolean;
  public suscripcionUsuario: Subscription;
  public suscripcionAcceso: Subscription;
  public tmp: any;

  constructor(private usuarioService: UsuarioService, public accesoService: AccesoService, private router: Router) {
    this.usuario = this.inicializarUsuario();
    this.acceso = accesoService.acceso;

    this.cargaFinalizada = false;
    this.suscripcionUsuario = this.tmp;
    this.suscripcionAcceso = this.tmp;
    this.fotoFavorita = '';
    this.codUsuario = 0;
  }

  ngOnInit(): void {
    localStorage.setItem('ELONMUSK', this.router.url);
    this.codUsuario = this.accesoService.acceso.codUsuario;
    this.fotoFavorita = this.accesoService.fotoMiniatura;
    this.obtenerUsuario();
  }

  ngOnDestroy(): void {}

  /* Obligatorio */
  public inicializarUsuario(): Usuario {
    return new Usuario(0, '', '', '', '', '', 0, 0);
  }

  public obtenerUsuario(): void {
    this.suscripcionUsuario = this.usuarioService
      .infoUsuario(this.codUsuario)
      .pipe(
        map((respuesta: any) => {
          this.usuario = respuesta;
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
}
