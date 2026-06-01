import { Routes } from '@angular/router';
import { MainLayout } from './components/main-layout/main-layout';
import { Introduction } from './components/introduction/introduction';

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
    ],
  },
];
