import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { UsuarioEditarModule } from '../usuario-editar/usuario-editar.module';

import { UsuarioCrearComponent } from './usuario-crear/usuario-crear.component';
import { UsuarioListarComponent } from './usuario-listar/usuario-listar.component';
import { UsuarioDetalleComponent } from './usuario-detalle/usuario-detalle.component';
import { UsuarioAdministrarRoutingModule } from './usuario-administrar-routing.module';
import { PlantillaModule } from 'src/app/utilidades/plantilla/plantilla.module';

@NgModule({
  declarations: [UsuarioCrearComponent, UsuarioListarComponent, UsuarioDetalleComponent],
  imports: [
    CommonModule,
    UsuarioAdministrarRoutingModule,
    FormsModule,
    NgxPaginationModule,
    TypeaheadModule,
    UsuarioEditarModule,
    PlantillaModule,
  ],
})
export class UsuarioAdministrarModule {}
