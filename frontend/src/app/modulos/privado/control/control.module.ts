import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantillaModule } from './../../../utilidades/plantilla/plantilla.module';
import { ControlRoutingModule } from './control-routing.module';
import { ErrorInternoComponent } from './error-interno/error-interno.component';
import { InicioInternoComponent } from './inicio-interno/inicio-interno.component';
import { ContenedorModule } from '../../contenedor/contenedor.module';

@NgModule({
  declarations: [ErrorInternoComponent, InicioInternoComponent],
  imports: [CommonModule, ControlRoutingModule, ContenedorModule, PlantillaModule],
})
export class ControlModule {}
