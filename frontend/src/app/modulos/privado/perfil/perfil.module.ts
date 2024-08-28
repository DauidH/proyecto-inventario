import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilAdminComponent } from './perfil-admin/perfil-admin.component';
import { PlantillaModule } from './../../../utilidades/plantilla/plantilla.module';
import { PerfilPersonalComponent } from './perfil-personal/perfil-personal.component';
import { PerfilAccesoComponent } from './perfil-acceso/perfil-acceso.component';
import { PerfilFotoComponent } from './perfil-foto/perfil-foto.component';

@NgModule({
  declarations: [PerfilAdminComponent, PerfilPersonalComponent, PerfilAccesoComponent, PerfilFotoComponent],
  imports: [FormsModule, CommonModule, PerfilRoutingModule, PlantillaModule],
})
export class PerfilModule {}
