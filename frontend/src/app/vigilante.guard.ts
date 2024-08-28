import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccesoService } from './servicios/api/acceso.service';

@Injectable({
  providedIn: 'root',
})
export class VigilanteGuard {
  constructor(private accesoService: AccesoService, private router: Router) {}

  canActivate(): boolean {
    if (this.accesoService.verificarUsuario()) {
      return true;
    }
    this.router.navigate(['/land/login']);
    return false;
  }
}
