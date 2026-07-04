import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Playground } from '../../../components/playground/playground';
import { PlaygroundSlider } from '../../../components/playground/components/playground-slider/playground-slider';
import { PlaygroundToggle } from '../../../components/playground/components/playground-toggle/playground-toggle';
import { InfoBlock } from '../../../components/info-block/info-block';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, FormsModule, Playground, PlaygroundSlider, PlaygroundToggle, InfoBlock],
  templateUrl: './grid.html',
  styleUrl: './grid.scss',
})
export class Grid {
  // Выбор шаблона колонок
  protected readonly columnsPreset = signal<string>('repeat(3, 1fr)');

  // Выбор шаблона строк
  protected readonly rowsPreset = signal<string>('auto');

  // Вертикальное выравнивание элементов в ячейках
  protected readonly alignItems = signal<'stretch' | 'start' | 'end' | 'center'>('stretch');

  // Горизонтальное выравнивание элементов в ячейках
  protected readonly justifyItems = signal<'stretch' | 'start' | 'end' | 'center'>('stretch');

  // Расстояние между ячейками сеток (в пикселях)
  protected readonly gapVal = signal<number>(15);

  // Количество ячеек в превью
  protected readonly itemCount = signal<number>(6);

  // Опции настроек для пульта управления
  protected readonly columnsPresetsList = [
    'repeat(3, 1fr)',
    'repeat(auto-fit, minmax(100px, 1fr))',
    '1fr 2fr 1fr',
    '120px 1fr',
  ];

  protected readonly rowsPresetsList = ['auto', 'repeat(2, 90px)', '80px auto'];
  protected readonly alignOptions = ['stretch', 'start', 'end', 'center'];
  protected readonly justifyOptions = ['stretch', 'start', 'end', 'center'];

  // Вычисляемый список ячеек для шаблона
  protected readonly gridCells = computed(() => {
    return Array.from({ length: this.itemCount() }, (_, i) => i + 1);
  });

  // Генерируемый CSS-код для песочницы
  protected readonly code = computed(() => {
    return `.grid-container {
  display: grid;
  grid-template-columns: ${this.columnsPreset()};
  grid-template-rows: ${this.rowsPreset()};
  gap: ${this.gapVal()}px;
  align-items: ${this.alignItems()};
  justify-items: ${this.justifyItems()};
}`;
  });

  // Вычисляемые инлайн-стили родительского grid-контейнера в превью
  protected readonly containerStyles = computed(() => {
    return {
      display: 'grid',
      'grid-template-columns': this.columnsPreset(),
      'grid-template-rows': this.rowsPreset(),
      gap: `${this.gapVal()}px`,
      'align-items': this.alignItems(),
      'justify-items': this.justifyItems(),
      'background-color': '#f8f9fa',
      border: '2px dashed #adb5bd',
      'border-radius': '8px',
      padding: '15px',
      width: '100%',
      'min-height': '280px',
      'box-sizing': 'border-box',
      transition: 'all 0.15s ease-out',
    };
  });
}
