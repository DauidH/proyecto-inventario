import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RolRoutingModule } from './rol-routing.module';
import { RolCrearComponent } from './rol-crear/rol-crear.component';
import { RolAdminComponent } from './rol-admin/rol-admin.component';
import { RolEditarComponent } from './rol-editar/rol-editar.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { PlantillaModule } from './../../../utilidades/plantilla/plantilla.module';

@NgModule({
  declarations: [RolCrearComponent, RolAdminComponent, RolEditarComponent],
  imports: [
    CommonModule,
    RolRoutingModule,
    FormsModule,
    PlantillaModule,
    NgxPaginationModule,
    TypeaheadModule,
  ],
})
export class RolModule {}
