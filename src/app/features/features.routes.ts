import { Routes } from '@angular/router';

export const FEATURES_ROUTES: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home-component').then((m) => m.HomeComponent),
    data: {
      label: 'Home Page',
      icon: 'home',
    },
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./create/create-component').then((m) => m.CreateComponent),
    data: {
      label: 'CRUD - Create',
      icon: 'add',
    },
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./list/list-component').then((m) => m.ListComponent),
    data: {
      label: 'CRUD - List',
      icon: 'list',
    },
  },
];
