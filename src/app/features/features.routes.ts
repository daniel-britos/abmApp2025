import { Routes } from '@angular/router';

export const FEATURES_ROUTES: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home-component').then((m) => m.HomeComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./create/create-component').then((m) => m.CreateComponent),
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./list/list-component').then((m) => m.ListComponent),
  },
];
