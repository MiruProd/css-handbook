import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Introduction } from './pages/block-1/introduction/introduction';
import { Selectors } from './pages/block-1/selectors/selectors';
import { BoxModel } from './pages/block-1/box-model/box-model';
import { Display } from './pages/block-1/display/display';
import { Units } from './pages/block-2/units/units';
import { Colors } from './pages/block-1/colors/colors';
import { CssResets } from './pages/block-1/css-resets/css-resets';
import { Fonts } from './pages/block-1/fonts/fonts';
import { Background } from './pages/block-1/background/background';
import { BordersShadows } from './pages/block-1/borders-shadows/borders-shadows';
import { Position } from './pages/block-2/position/position';
import { Flexbox } from './pages/block-2/flexbox/flexbox';
import { PseudoElements } from './pages/block-2/pseudo-elements/pseudo-elements';
import { PseudoClasses } from './pages/block-2/pseudo-classes/pseudo-classes';
import { Grid } from './pages/block-2/grid/grid';

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
      {
        path: 'display',
        component: Display,
      },
      {
        path: 'css-resets',
        component: CssResets,
      },
      {
        path: 'fonts',
        component: Fonts,
      },
      {
        path: 'colors',
        component: Colors,
      },
      {
        path: 'background',
        component: Background,
      },
      {
        path: 'borders-shadows',
        component: BordersShadows,
      },
      {
        path: 'position',
        component: Position,
      },
      {
        path: 'units',
        component: Units,
      },
      {
        path: 'flexbox',
        component: Flexbox,
      },
      {
        path: 'pseudo-elements',
        component: PseudoElements,
      },
      {
        path: 'pseudo-classes',
        component: PseudoClasses,
      },
      {
        path: 'grid',
        component: Grid,
      },
    ],
  },
];
