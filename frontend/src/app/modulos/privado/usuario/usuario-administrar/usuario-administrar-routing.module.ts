import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioDetalleComponent } from './usuario-detalle/usuario-detalle.component';
import { UsuarioCrearComponent } from './usuario-crear/usuario-crear.component';
import { UsuarioListarComponent } from './usuario-listar/usuario-listar.component';
import { ErrorInternoComponent } from '../../control/error-interno/error-interno.component';

const routes: Routes = [
  { path: 'manage', component: UsuarioListarComponent, title: 'Listado de usuarios' },
  { path: 'add', component: UsuarioCrearComponent },
  { path: 'update/:codigo', component: UsuarioDetalleComponent },

  { path: '', redirectTo: 'manage', pathMatch: 'full' },
  { path: '**', component: ErrorInternoComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioAdministrarRoutingModule {}
