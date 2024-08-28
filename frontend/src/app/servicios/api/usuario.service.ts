import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../../modelos/usuario';
import * as urls from '../../utilidades/dominios/uris';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public urlUsuario: string = urls.API_USUARIO;

  constructor(private http: HttpClient) {}

  public obtenerUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(this.urlUsuario + '/information');
  }

  public infoUsuario(codUsuario: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.urlUsuario + '/infouser/' + codUsuario);
  }

  public obtenerUsuarios(parametros: any): Observable<Usuario[]> {
    if (
      typeof parametros.cadenaBuscar != 'undefined' &&
      parametros.cadenaBuscar
    ) {
      return this.http.post<Usuario[]>(this.urlUsuario + '/search', parametros);
    } else {
      return this.http.post<Usuario[]>(
        this.urlUsuario + '/paginate',
        parametros
      );
    }
  }

  public usuarioBuscar(parametros: any): Observable<Usuario[]> {
    return this.http.post<Usuario[]>(this.urlUsuario + '/search', parametros);
  }

  public crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlUsuario + '/add', usuario);
  }

  public editarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      this.urlUsuario + '/update/' + usuario.codUsuario,
      usuario
    );
  }

  public editarUsuarioPerfil(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      this.urlUsuario + '/updateprofile/' + usuario.codUsuario,
      usuario
    );
  }

  public borrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.delete<Usuario>(
      this.urlUsuario + '/inactive/' + usuario.codUsuario
    );
  }

  public estadoUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.delete<Usuario>(
      this.urlUsuario + '/active/' + usuario.codUsuario
    );
  }
}
