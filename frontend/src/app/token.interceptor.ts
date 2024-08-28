import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { FOTO_SISTEMA, TOKEN_SISTEMA } from './utilidades/dominios/sesion';
import { ToastrService } from 'ngx-toastr';
import { mostrarMensaje } from './utilidades/mensajes/mensajes-toas.func';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem(TOKEN_SISTEMA);
    const codigo = localStorage.getItem('ELONMUSK');

    let modificarPeticion = request.clone({
      setHeaders: {
        authorization: 'Bearer ' + token,
        permission: String(codigo),
      },
    });

    return next.handle(modificarPeticion).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/land/login']);
          localStorage.removeItem(TOKEN_SISTEMA);
          localStorage.removeItem(FOTO_SISTEMA);
          localStorage.removeItem('ELONMUSK');
          mostrarMensaje(
            'error',
            'Intento de vulneracion de seguridad',
            'Error',
            this.toastr
          );
        }
        return throwError(() => error);
      })
    );
  }
}
