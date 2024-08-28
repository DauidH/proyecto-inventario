import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as urls from '../../utilidades/dominios/uris';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/modelos/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  public urlCategoria: string;

  constructor(private http: HttpClient) {
    this.urlCategoria = urls.API_CATEGORIA;
  }

  public obtenerCategoriaPaginador(parametros: any): Observable<Categoria[]> {
    if (typeof parametros.cadenaBuscar != 'undefined' && parametros.cadenaBuscar) {
      return this.http.post<Categoria[]>(this.urlCategoria + '/search', parametros);
    } else {
      return this.http.post<Categoria[]>(this.urlCategoria + '/paginate', parametros);
    }
  }

  public obtenerCategoriaBuscar(cadenaBuscar: string): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlCategoria + '/search/' + cadenaBuscar);
  }

  public crearCategoria(objCategoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.urlCategoria + '/add', objCategoria);
  }

  public eliminarCategoria(codCategoria: number): Observable<Categoria> {
    return this.http.delete<Categoria>(this.urlCategoria + '/delete/' + codCategoria);
  }

  public obtenerCategoria(codCategoria: number): Observable<Categoria> {
    return this.http.get<Categoria>(this.urlCategoria + '/one/' + codCategoria);
  }

  public actualizarCategoria(objCategoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(this.urlCategoria + '/update', objCategoria);
  }
}
