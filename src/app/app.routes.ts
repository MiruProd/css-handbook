import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Introduction } from './pages/introduction/introduction';
import { Selectors } from './pages/selectors/selectors';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: 'introduction',
        pathMatch: 'full',
      },
      {
        path: 'introduction',
        component: Introduction,
      },
      {
        path: 'selectors',
        component: Selectors,
      },
    ],
  },
];
