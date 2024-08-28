import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelComponent } from './panel/panel.component';
import { ThemePanelComponent } from './theme-panel/theme-panel.component';

import { NgScrollbarModule } from 'ngx-scrollbar';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [PanelComponent, ThemePanelComponent, SpinnerComponent],
  imports: [CommonModule, NgScrollbarModule],
  exports: [PanelComponent, ThemePanelComponent, SpinnerComponent],
})
export class PlantillaModule {}
