import { Component, input, model } from '@angular/core';
import { BrowserMockup } from './components/browser-mockup/browser-mockup';
import { CodeBlock } from '../code-block/code-block';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [BrowserMockup, CodeBlock],
  templateUrl: './playground.html',
  styleUrl: './playground.scss',
})
export class Playground {
  // Список отображаемых стандартных элементов окружения (например, ['viewport-width'])
  visibleControls = input<string[]>([]);

  // Тема оформления для рамок симулятора
  theme = input<'primary' | 'accent' | 'success' | 'warning' | 'teal' | 'neutral'>('primary');

  // Адрес в симуляторе
  browserAddress = input<string>('localhost:4200');

  // Размеры вьюпорта симулятора. Если null — растягивается автоматически
  viewportWidth = model<number | null>(null);
  viewportHeight = model<number | null>(null);

  // Параметры симулируемого окружения (двусторонние сигналы для синхронизации с родительскими страницами)
  parentPercent = model<number>(80);
  parentHeight = model<number>(160);
  rootFontSize = model<number>(16);
  parentFontSize = model<number>(20);

  // Результирующий CSS-код, передаваемый на рендеринг в шпаргалку
  code = input.required<string>();
}
