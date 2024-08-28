import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as urls from '../../utilidades/dominios/uris';
import { Observable } from 'rxjs';
import { Rol } from 'src/app/modelos/rol';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  public urlRol: string;

  constructor(private http: HttpClient) {
    this.urlRol = urls.API_ROL;
  }

  public obtenerRolPaginador(parametros: any): Observable<Rol[]> {
    if (typeof parametros.cadenaBuscar != 'undefined' && parametros.cadenaBuscar) {
      return this.http.post<Rol[]>(this.urlRol + '/search', parametros);
    } else {
      return this.http.post<Rol[]>(this.urlRol + '/paginate', parametros);
    }
  }

  public obtenerRolBuscar(cadenaBuscar: string): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.urlRol + '/search/' + cadenaBuscar);
  }

  public obtenerRolCombo(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.urlRol + '/all');
  }

  public obtenerRol(codRol: number): Observable<Rol> {
    return this.http.get<Rol>(this.urlRol + '/one/' + codRol);
  }

  public crearRol(objRol: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.urlRol + '/add', objRol);
  }

  public actualizarRol(objRol: Rol): Observable<Rol> {
    return this.http.put<Rol>(this.urlRol + '/update', objRol);
  }

  public estadoRol(objRol: Rol): Observable<Rol> {
    if (objRol.estadoRol == 1) {
      return this.http.delete<Rol>(this.urlRol + '/inactive/' + objRol.codRol);
    } else {
      return this.http.delete<Rol>(this.urlRol + '/active/' + objRol.codRol);
    }
  }

  public eliminarRol(codRol: number): Observable<Rol> {
    return this.http.delete<Rol>(this.urlRol + '/delete/' + codRol);
  }
}
