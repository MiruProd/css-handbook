import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Introduction } from './pages/block-1/introduction/introduction';
import { Selectors } from './pages/block-1/selectors/selectors';
import { BoxModel } from './pages/block-1/box-model/box-model';

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
      {
        path: 'box-model',
        component: BoxModel,
      },
    ],
  },
];
