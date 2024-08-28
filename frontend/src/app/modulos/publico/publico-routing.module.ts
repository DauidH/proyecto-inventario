import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Credenciales' },
  { path: 'register', component: RegisterComponent, title: 'Nuevo usuario' },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicoRoutingModule { }
