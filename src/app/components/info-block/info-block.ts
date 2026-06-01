import { Component, input, computed } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-info-block',
  standalone: true,
  imports: [NgClass],
  templateUrl: './info-block.html',
  styleUrl: './info-block.scss',
})
export class InfoBlock {
  // Тип блока информации, определяющий его цветовую гамму и иконку по умолчанию
  type = input<'note' | 'tip' | 'warning' | 'error'>('note');

  // Кастомный заголовок. Если пуст — подставится стандартный на основе типа
  title = input<string>('');

  // Вычисляем заголовок по умолчанию, если кастомный не передан
  protected readonly blockTitle = computed(() => {
    const customTitle = this.title();
    if (customTitle) return customTitle;

    switch (this.type()) {
      case 'tip':
        return 'Полезный совет';
      case 'warning':
        return 'Важное замечание';
      case 'error':
        return 'Частая ошибка';
      default:
        return 'Примечание';
    }
  });
}
