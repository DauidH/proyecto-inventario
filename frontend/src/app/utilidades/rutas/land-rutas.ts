import { Routes } from '@angular/router';

export const RUTAS_LANDSCAPE: Routes = [
  {
    path: 'land',
    loadChildren: () =>
      import('../../modulos/publico/publico.module').then(
        (m) => m.PublicoModule
      ),
  },

  { path: '', redirectTo: 'land', pathMatch: 'full' },
];
