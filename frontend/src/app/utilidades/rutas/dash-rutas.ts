import { Routes } from '@angular/router';
import { ErrorInternoComponent } from './../../modulos/privado/control/error-interno/error-interno.component';

export const RUTAS_DASHBOARD: Routes = [
  {
    path: 'dash',
    loadChildren: () => import('../../modulos/privado/control/control.module').then((m) => m.ControlModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./../../modulos/privado/perfil/perfil.module').then((m) => m.PerfilModule),
  },
  {
    path: 'role',
    loadChildren: () => import('./../../modulos/privado/rol/rol.module').then((m) => m.RolModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./../../modulos/privado/usuario/usuario-administrar/usuario-administrar.module').then((m) => m.UsuarioAdministrarModule),
  },
  {
    path: 'categorias',
    loadChildren: () => import('../../modulos/privado/inventario/inventario.module').then((m) => m.InventarioModule),
  },
  {
    path: 'productos',
    loadChildren: () => import('../../modulos/privado/productos/productos.module').then((m) => m.ProductosModule),
  },

  { path: '', redirectTo: 'dash', pathMatch: 'full' },
  { path: '**', component: ErrorInternoComponent },
];
