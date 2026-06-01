import { Component, input } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-browser-mockup',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './browser-mockup.html',
  styleUrl: './browser-mockup.scss',
})
export class BrowserMockup {
  // Текст в адресной строке симулятора
  address = input<string>('localhost:4200');

  // Ширина и высота для внешнего контроля габаритов окна
  width = input<string>('100%');
  height = input<string>('auto');

  // Тема оформления для интеграции с цветовыми схемами разделов
  theme = input<'primary' | 'accent' | 'success' | 'warning' | 'teal' | 'neutral'>('neutral');
}
