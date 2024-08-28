import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosAdminComponent } from './productos-admin/productos-admin.component';
import { ProductosCrearComponent } from './productos-crear/productos-crear.component';
import { ProductosEditarComponent } from './productos-editar/productos-editar.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { PlantillaModule } from 'src/app/utilidades/plantilla/plantilla.module';

@NgModule({
  declarations: [
    ProductosAdminComponent,
    ProductosCrearComponent,
    ProductosEditarComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule,
    PlantillaModule,
    NgxPaginationModule,
    TypeaheadModule
  ]
})
export class ProductosModule { }
