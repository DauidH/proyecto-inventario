import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ErrorComponent } from './modulos/publico/error/error.component';
import { CuerpoLandComponent } from './modulos/contenedor/land/cuerpo-land/cuerpo-land.component';
import { CuerpoDashComponent } from './modulos/contenedor/dash/cuerpo-dash/cuerpo-dash.component';

import { RUTAS_DASHBOARD } from './utilidades/rutas/dash-rutas';
import { RUTAS_LANDSCAPE } from './utilidades/rutas/land-rutas';

import { VigilanteGuard } from './vigilante.guard';

const routes: Routes = [
  { path: '', component: CuerpoLandComponent, children: RUTAS_LANDSCAPE },
  { path: 'private', component: CuerpoDashComponent, children: RUTAS_DASHBOARD, canActivate: [VigilanteGuard] },

  { path: '**', component: ErrorComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
