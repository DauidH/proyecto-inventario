import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as urls from '../../utilidades/dominios/uris';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/modelos/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  public urlProducto: string;

  constructor(private http: HttpClient) {
    this.urlProducto = urls.API_PRODUCTO;
  }

  public obtenerProductosPaginador(parametros: any): Observable<Producto[]> {
    if (typeof parametros.cadenaBuscar != 'undefined' && parametros.cadenaBuscar) {
      return this.http.post<Producto[]>(this.urlProducto + '/search', parametros);
    } else {
      return this.http.post<Producto[]>(this.urlProducto + '/paginate', parametros);
    }
  }
}
