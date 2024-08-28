import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as urls from '../../utilidades/dominios/uris';
import { Imagen } from 'src/app/modelos/imagen';

@Injectable({
  providedIn: 'root',
})
export class ImagenService {
  public urlImagen = urls.API_IMAGEN;

  constructor(private http: HttpClient) {}

  public obtenerImagenes(codUsuario: number): Observable<Imagen[]> {
    return this.http.get<Imagen[]>(this.urlImagen + '/all/' + codUsuario);
  }

  public imagenFavorita(objImagen: Imagen): Observable<Imagen> {
    return this.http.get<Imagen>(
      this.urlImagen +
        '/favorite/' +
        objImagen.codImagen +
        '/' +
        objImagen.codUsuario
    );
  }

  public agregarImagen(objImagen: Imagen): Observable<Imagen> {
    return this.http.post<Imagen>(this.urlImagen + '/add', objImagen);
  }

  public borrarImagen(codImagen: number): Observable<Imagen> {
    return this.http.delete<Imagen>(this.urlImagen + '/delete/' + codImagen);
  }
}
