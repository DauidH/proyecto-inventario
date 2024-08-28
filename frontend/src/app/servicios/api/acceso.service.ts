import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import jwtDecode from 'jwt-decode';
import { Acceso } from 'src/app/modelos/acceso';
import * as urls from '../../utilidades/dominios/uris';
import { TOKEN_SISTEMA, FOTO_SISTEMA } from './../../utilidades/dominios/sesion';

@Injectable({
  providedIn: 'root',
})
export class AccesoService {
  public acceso: Acceso;
  public urlAcceso: string;
  public urlUsuarioAcceso: string;
  public fotoMiniatura: string;

  constructor(private http: HttpClient, private router: Router) {
    this.acceso = this.inicializarAcceso();
    this.urlAcceso = urls.API_SESION;
    this.urlUsuarioAcceso = urls.API_USUARIO_ACCESO;
    this.fotoMiniatura = '';
  }

  // **************************** Obligatorio
  public inicializarAcceso(): Acceso {
    return new Acceso(0, '', '');
  }

  public obtenerAcceso(): Acceso {
    return this.acceso;
  }

  public salir(): void {
    localStorage.removeItem(TOKEN_SISTEMA);
    localStorage.removeItem(FOTO_SISTEMA);
    localStorage.removeItem('ELONMUSK');
    this.router.navigate(['/land/login']);
  }

  public obtenerToken(): string {
    return localStorage.getItem(TOKEN_SISTEMA) as string;
  }

  public verificarUsuario(): boolean {
    if (localStorage.getItem(TOKEN_SISTEMA)) {
      try {
        let objTmp: any = jwtDecode(this.obtenerToken());
        this.acceso.codUsuario = objTmp.id;
        this.acceso.correoAcceso = objTmp.correoAcceso;
        this.acceso.nombreRol = objTmp.nombreRol;
        this.acceso.nombresUsuario = objTmp.nombresUsuario;
        this.acceso.apellidosUsuario = objTmp.apellidosUsuario;

        this.fotoMiniatura = localStorage.getItem(FOTO_SISTEMA) as string;
        return true;
      } catch {}
    }
    return false;
  }

  public iniciarSesion(objAcceso: Acceso): Observable<any> {
    return this.http.post<any>(this.urlAcceso, objAcceso);
  }

  public obtenerAccesoPerfil(codUsuario: number): Observable<Acceso> {
    return this.http.get<Acceso>(this.urlUsuarioAcceso + '/info');
  }
  public obtenerAccesoUsuario(codUsuario: number): Observable<Acceso> {
    return this.http.get<Acceso>(this.urlUsuarioAcceso + '/info/' + codUsuario);
  }

  public editarAccesoPerfil(acceso: Acceso, cargarClave: boolean): Observable<Acceso> {
    return this.http.put<Acceso>(this.urlUsuarioAcceso + '/update/' + cargarClave, acceso);
  }
}
