import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Playground } from '../../../components/playground/playground';
import { PlaygroundSlider } from '../../../components/playground/components/playground-slider/playground-slider';
import { PlaygroundToggle } from '../../../components/playground/components/playground-toggle/playground-toggle';
import { InfoBlock } from '../../../components/info-block/info-block';

@Component({
  selector: 'app-flexbox',
  standalone: true,
  imports: [CommonModule, FormsModule, Playground, PlaygroundSlider, PlaygroundToggle, InfoBlock],
  templateUrl: './flexbox.html',
  styleUrl: './flexbox.scss',
})
export class Flexbox {
  // Направления главной оси
  protected readonly flexDirection = signal<'row' | 'row-reverse' | 'column' | 'column-reverse'>(
    'row',
  );

  // Выравнивание вдоль главной оси
  protected readonly justifyContent = signal<
    'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  >('flex-start');

  // Выравнивание вдоль поперечной оси
  protected readonly alignItems = signal<
    'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  >('stretch');

  // Перенос элементов на новую строку
  protected readonly flexWrap = signal<'nowrap' | 'wrap' | 'wrap-reverse'>('nowrap');

  // Расстояние между элементами (в пикселях)
  protected readonly gapVal = signal<number>(10);

  // Количество дочерних элементов в симуляторе
  protected readonly itemCount = signal<number>(3);

  // Опции для переключателей пульта управления
  protected readonly directionOptions = ['row', 'row-reverse', 'column', 'column-reverse'];
  protected readonly justifyOptions = [
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly',
  ];
  protected readonly alignOptions = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];
  protected readonly wrapOptions = ['nowrap', 'wrap', 'wrap-reverse'];

  // Вычисляемый реактивный массив элементов для отрисовки в шаблоне
  protected readonly flexItems = computed(() => {
    return Array.from({ length: this.itemCount() }, (_, i) => i + 1);
  });

  // Вычисляемый CSS-код для демонстрации в песочнице
  protected readonly code = computed(() => {
    return `.flex-container {
  display: flex;
  flex-direction: ${this.flexDirection()};
  justify-content: ${this.justifyContent()};
  align-items: ${this.alignItems()};
  flex-wrap: ${this.flexWrap()};
  gap: ${this.gapVal()}px;
}`;
  });

  // Вычисляемые стили для родительского flex-контейнера в превью
  protected readonly containerStyles = computed(() => {
    return {
      display: 'flex',
      'flex-direction': this.flexDirection(),
      'justify-content': this.justifyContent(),
      'align-items': this.alignItems(),
      'flex-wrap': this.flexWrap(),
      gap: `${this.gapVal()}px`,
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
