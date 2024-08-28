import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PerfilAdminComponent } from './perfil-admin/perfil-admin.component';

const routes: Routes = [
  { path: 'update', component: PerfilAdminComponent, title: 'Perfil' },

  { path: '', redirectTo: 'update', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilRoutingModule {}
