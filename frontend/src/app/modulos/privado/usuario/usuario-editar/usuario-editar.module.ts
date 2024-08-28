import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UsuarioPersonalComponent } from './usuario-personal/usuario-personal.component';
import { UsuarioAccesoComponent } from './usuario-acceso/usuario-acceso.component';
import { UsuarioFotoComponent } from './usuario-foto/usuario-foto.component';
import { UsuarioPermisoComponent } from './usuario-permiso/usuario-permiso.component';
import { PlantillaModule } from 'src/app/utilidades/plantilla/plantilla.module';

@NgModule({
  declarations: [UsuarioPersonalComponent, UsuarioAccesoComponent, UsuarioFotoComponent, UsuarioPermisoComponent],
  imports: [CommonModule, RouterModule, FormsModule, PlantillaModule],
  exports: [UsuarioPersonalComponent, UsuarioAccesoComponent, UsuarioFotoComponent, UsuarioPermisoComponent],
})
export class UsuarioEditarModule {}
