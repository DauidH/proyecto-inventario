import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Registro } from '../../modelos/registro';
import * as urls from '../../utilidades/dominios/uris';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  public urlResgistro: string;

  constructor(private http: HttpClient) {
    this.urlResgistro = urls.API_REGISTRO;
  }

  public registrarUsuario(objRegistro: Registro): Observable<Registro> {
    return this.http.post<Registro>(this.urlResgistro, objRegistro);
  }
}
