import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RolAdminComponent } from './rol-admin/rol-admin.component';
import { ErrorInternoComponent } from '../control/error-interno/error-interno.component';

const routes: Routes = [
  { path: 'manage', component: RolAdminComponent, title: 'Lista de roles' },

  { path: '', redirectTo: 'manage', pathMatch: 'full' },
  { path: '**', component: ErrorInternoComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolRoutingModule {}
