import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as urls from '../../utilidades/dominios/uris';
import { Funcionalidad } from 'src/app/modelos/funcionalidad';

@Injectable({
  providedIn: 'root',
})
export class FuncionalidadService {
  public urlFuncionalidad: string = urls.API_FUNCIONALIDAD;

  constructor(private http: HttpClient) {}

  public obtenerFuncionalidades(codUsuario: number): Observable<Funcionalidad[]> {
    return this.http.get<Funcionalidad[]>(this.urlFuncionalidad + '/all/' + codUsuario);
  }
  public obtenerTodasFuncionalidades(): Observable<Funcionalidad[]> {
    return this.http.get<Funcionalidad[]>(this.urlFuncionalidad + '/all');
  }

  public obtenerFuncionalidadMenu(): Observable<Funcionalidad[]> {
    return this.http.get<Funcionalidad[]>(this.urlFuncionalidad + '/menu');
  }

  public obtenerCantidad(): Observable<string> {
    return this.http.get<string>(this.urlFuncionalidad + '/count');
  }

  public actualizarFuncionalidadUsuario(funcionalidades: Array<any>): Observable<Funcionalidad[]> {
    return this.http.post<Funcionalidad[]>(this.urlFuncionalidad + '/update', funcionalidades);
  }
}
