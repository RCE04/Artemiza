import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'escul',
    loadComponent: () => import('./escul/escul.page').then( m => m.EsculPage)
  },
  {
    path: 'detalle/:id',
    loadComponent: () => import('./detalle/detalle.page').then( m => m.DetallePage)
  },
  
];
