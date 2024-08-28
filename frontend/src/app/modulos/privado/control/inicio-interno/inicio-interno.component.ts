import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, catchError, finalize, map } from 'rxjs';
import { Funcionalidad } from 'src/app/modelos/funcionalidad';
import { FuncionalidadService } from 'src/app/servicios/api/funcionalidad.service';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { ToastrService } from 'ngx-toastr';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-inicio-interno',
  templateUrl: './inicio-interno.component.html',
  styleUrls: ['./inicio-interno.component.css'],
})
export class InicioInternoComponent implements OnInit, OnDestroy {
  public funcionalidad: Funcionalidad;
  public suscripcionFuncionalidad: Subscription;
  public arregloFuncionalidades: Funcionalidad[];
  private tmp: any;

  constructor(private router: Router, private toastr: ToastrService, private funcionalidadService: FuncionalidadService) {
    this.arregloFuncionalidades = [];
    this.suscripcionFuncionalidad = this.tmp;
    this.funcionalidad = this.inicializarFuncionalidad();
  }

  ngOnInit(): void {
    this.obtenerFuncionalidades();
  }

  ngOnDestroy(): void {
    if (this.suscripcionFuncionalidad) {
      this.suscripcionFuncionalidad.unsubscribe();
    }
  }

  /*  Obligatorio */
  public inicializarFuncionalidad(): Funcionalidad {
    return new Funcionalidad(0, 0, 0, '', '', '', '', '');
  }

  /*  LDN */
  public obtenerFuncionalidades(): void {
    const token: any = localStorage.getItem('tokenApp');
    let objetoToken: any = jwtDecode(token);
    const codUsuario: number = objetoToken.id;
    this.suscripcionFuncionalidad = this.funcionalidadService
      .obtenerFuncionalidades(codUsuario)
      .pipe(
        map((funcionalidades: Funcionalidad[]) => {
          this.arregloFuncionalidades = funcionalidades;
          return funcionalidades;
        }),
        catchError((err) => {
          throw err;
        }),
        finalize(() => {
          //this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }
}
