import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PublicoRoutingModule } from './publico-routing.module';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { RegisterComponent } from './register/register.component';

import { ContenedorModule } from '../contenedor/contenedor.module';
import { PlantillaModule } from './../../utilidades/plantilla/plantilla.module';

@NgModule({
  declarations: [
    LoginComponent,
    ErrorComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    PublicoRoutingModule,

    ContenedorModule,
    PlantillaModule,
    FormsModule
  ]
})
export class PublicoModule { }
