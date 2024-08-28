import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, catchError, finalize, map } from 'rxjs';
import { Acceso } from 'src/app/modelos/acceso';
import { Imagen } from 'src/app/modelos/imagen';
import { Usuario } from 'src/app/modelos/usuario';
import { AccesoService } from 'src/app/servicios/api/acceso.service';
import { ImagenService } from 'src/app/servicios/api/imagen.service';
import { UsuarioService } from 'src/app/servicios/api/usuario.service';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css'],
})
export class UsuarioDetalleComponent implements OnInit, OnDestroy {
  public usuario: Usuario;
  public acceso: Acceso;
  public codUsuario: number;
  public fotoFavorita: any;
  public cargaFinalizada: boolean;
  public arregloImagenes: Imagen[];

  public suscripcionUsuario: Subscription;
  public suscripcionAcceso: Subscription;
  public tmp: any;

  constructor(
    private usuarioService: UsuarioService,
    private accesoService: AccesoService,
    private route: ActivatedRoute,
    private imagenService: ImagenService,
    private router: Router
  ) {
    this.usuario = this.inicializarUsuario();
    this.acceso = this.inicializarAcceso();

    this.cargaFinalizada = false;
    this.suscripcionUsuario = this.tmp;
    this.suscripcionAcceso = this.tmp;
    this.fotoFavorita = '';
    this.arregloImagenes = [];
    this.codUsuario = 0;
  }

  ngOnInit(): void {
    localStorage.setItem('ELONMUSK', this.router.url);
    this.route.paramMap.subscribe((parametro: ParamMap) => {
      const dato = String(parametro.get('codigo'));
      this.codUsuario = parseFloat(dato) as number;
      this.obtenerUsuario();
      this.obtenerAcceso();
    });
  }

  ngOnDestroy(): void {
    if (this.suscripcionUsuario) {
      this.suscripcionUsuario.unsubscribe();
    }
    if (this.suscripcionAcceso) {
      this.suscripcionUsuario.unsubscribe();
    }
  }

  /* Obligatorio */
  public inicializarUsuario(): Usuario {
    return new Usuario(0, '', '', '', '', '', 0, 0);
  }

  public inicializarAcceso(): Acceso {
    return new Acceso(0, '', '');
  }

  /* LDN */

  public obtenerUsuario(): void {
    this.suscripcionUsuario = this.usuarioService
      .infoUsuario(this.codUsuario)
      .pipe(
        map((respuesta: any) => {
          this.usuario = respuesta;
          return respuesta;
        }),
        finalize(() => {
          this.obtenerAcceso();
          this.obtenerImagenes();
        })
      )
      .subscribe(observadorAny);
  }

  public obtenerAcceso(): void {
    this.suscripcionAcceso = this.accesoService
      .obtenerAccesoUsuario(this.codUsuario)
      .pipe(
        map((respuesta: any) => {
          this.acceso = respuesta;
          return respuesta;
        })
      )
      .subscribe(observadorAny);
  }

  public obtenerImagenes(): void {
    this.suscripcionUsuario = this.imagenService
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
}
