import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-playground-toggle',
  standalone: true,
  imports: [],
  templateUrl: './playground-toggle.html',
  styleUrl: './playground-toggle.scss',
})
export class PlaygroundToggle {
  // Название свойства для отображения (например, "box-sizing")
  label = input.required<string>();

  // Доступные варианты значений (например, ['content-box', 'border-box'])
  options = input.required<string[]>();

  // Двусторонняя модель активного значения для синхронизации с родительской страницей
  value = model.required<string>();
}
