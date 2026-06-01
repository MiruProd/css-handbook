import { Component } from '@angular/core';
import { EmRemSandbox } from './components/em-rem-sandbox/em-rem-sandbox';
import { ViewportSandbox } from './components/viewport-sandbox/viewport-sandbox';
import { InfoBlock } from '../../../components/info-block/info-block';

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [EmRemSandbox, ViewportSandbox, InfoBlock],
  templateUrl: './units.html',
  styleUrl: './units.scss',
})
export class Units {}
