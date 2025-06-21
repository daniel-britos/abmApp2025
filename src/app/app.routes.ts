import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout-component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/features.routes').then((m) => m.FEATURES_ROUTES),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
