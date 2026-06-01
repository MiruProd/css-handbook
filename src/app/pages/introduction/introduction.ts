import { Component, signal } from '@angular/core';
import { NgStyle, NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [NgStyle, NgIf, NgClass],
  templateUrl: './introduction.html',
  styleUrl: './introduction.scss',
})
export class Introduction {
  // Текущий выбранный способ подключения стилей
  protected readonly linkingMethod = signal<'inline' | 'internal' | 'external'>('external');

  // Параметры для интерактивного стенда синтаксиса
  protected readonly selectedColor = signal<string>('#1c7ed6');
  protected readonly selectedRadius = signal<string>('8px');
  protected readonly selectedPadding = signal<string>('1.5rem');

  // Метод копирования сгенерированного кода в буфер обмена
  protected copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
  }
}
