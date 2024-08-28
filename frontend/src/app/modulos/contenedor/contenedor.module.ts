import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CuerpoLandComponent } from './land/cuerpo-land/cuerpo-land.component';
import { CabeceraLandComponent } from './land/cabecera-land/cabecera-land.component';

import { HeaderComponent } from './dash/header/header.component';
import { TopMenuComponent } from './dash/top-menu/top-menu.component';
import { SidebarComponent } from './dash/sidebar/sidebar.component';
import { SidebarRightComponent } from './dash/sidebar-right/sidebar-right.component';
import { FloatSubMenuComponent } from './dash/float-sub-menu/float-sub-menu.component';
import { CuerpoDashComponent } from './dash/cuerpo-dash/cuerpo-dash.component';

import { NgScrollbarModule } from 'ngx-scrollbar';
import { PlantillaModule } from 'src/app/utilidades/plantilla/plantilla.module';

@NgModule({
  declarations: [
    CabeceraLandComponent,
    CuerpoLandComponent,

    HeaderComponent,
    TopMenuComponent,
    SidebarComponent,
    SidebarRightComponent,
    FloatSubMenuComponent,
    CuerpoDashComponent,
  ],
  imports: [CommonModule, RouterModule, NgScrollbarModule, PlantillaModule],
  exports: [
    CabeceraLandComponent,
    CuerpoLandComponent,

    HeaderComponent,
    TopMenuComponent,
    SidebarComponent,
    SidebarRightComponent,
    FloatSubMenuComponent,
    CuerpoDashComponent,
  ],
})
export class ContenedorModule {}
