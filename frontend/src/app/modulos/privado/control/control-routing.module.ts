import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InicioInternoComponent } from './inicio-interno/inicio-interno.component';
import { ErrorInternoComponent } from './error-interno/error-interno.component';

const routes: Routes = [
  {
    path: 'board',
    component: InicioInternoComponent,
    title: 'Bienvenido',
  },
  {
    path: '',
    redirectTo: 'board',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: ErrorInternoComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlRoutingModule {}
