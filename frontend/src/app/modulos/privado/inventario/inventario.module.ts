import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InventarioRoutingModule } from './inventario-routing.module';
import { CategoriasAdminComponent } from './categorias-admin/categorias-admin.component';
import { CategoriasCrearComponent } from './categorias-crear/categorias-crear.component';
import { CategoriasEditarComponent } from './categorias-editar/categorias-editar.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { PlantillaModule } from 'src/app/utilidades/plantilla/plantilla.module';

@NgModule({
  declarations: [
    CategoriasAdminComponent,
    CategoriasCrearComponent,
    CategoriasEditarComponent
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    FormsModule,
    PlantillaModule,
    NgxPaginationModule,
    TypeaheadModule
  ]
})
export class InventarioModule { }
