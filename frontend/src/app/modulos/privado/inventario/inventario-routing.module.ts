import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasAdminComponent } from './categorias-admin/categorias-admin.component';
import { ErrorInternoComponent } from '../control/error-interno/error-interno.component';

const routes: Routes = [
  { path: 'admin', component: CategoriasAdminComponent, title: 'Listado Categorias' },

  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: '**', component: ErrorInternoComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule {}
