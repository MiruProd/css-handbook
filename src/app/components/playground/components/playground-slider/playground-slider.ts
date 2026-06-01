import { Component, computed, input, model } from '@angular/core';
import { UnitSelector } from '../../../unit-selector/unit-selector';
import { CSS_PROPERTIES_CONFIG, UnitLimit } from '../../../../configs/css-properties';

@Component({
  selector: 'app-playground-slider',
  standalone: true,
  imports: [UnitSelector],
  templateUrl: './playground-slider.html',
  styleUrl: './playground-slider.scss',
})
export class PlaygroundSlider {
  // Название параметра для отображения пользователю
  label = input.required<string>();

  // Имя CSS-свойства для сопоставления со словарем (например, "width")
  property = input<string>('');

  // Кастомный список единиц измерения для передачи в UnitSelector
  customUnits = input<string[]>([]);

  // Двусторонние модели значения и единицы измерения для полной синхронизации с родительской страницей
  value = model.required<number>();
  unit = model<string>('px');

  // Кастомные границы, если нужно переопределить настройки из конфига
  min = input<number | null>(null);
  max = input<number | null>(null);

  // Получаем конфигурацию для переданного свойства
  private readonly config = computed(() => {
    const propName = this.property();
    return CSS_PROPERTIES_CONFIG[propName] || null;
  });

  // Вычисляем минимальный лимит на основе текущей единицы измерения
  readonly currentMin = computed(() => {
    const customMin = this.min();
    if (customMin !== null) return customMin;

    const cfg = this.config();
    if (!cfg) return 0;

    const activeUnit = this.unit();
    if (activeUnit && activeUnit in cfg.limits) {
      return (cfg.limits as Record<string, UnitLimit>)[activeUnit].min;
    }
    return 0;
  });

  // Вычисляем максимальный лимит на основе текущей единицы измерения
  readonly currentMax = computed(() => {
    const customMax = this.max();
    if (customMax !== null) return customMax;

    const cfg = this.config();
    if (!cfg) return 100;

    const activeUnit = this.unit();
    if (activeUnit && activeUnit in cfg.limits) {
      return (cfg.limits as Record<string, UnitLimit>)[activeUnit].max;
    }
    return 100;
  });

  // Вычисляем шаг ползунка: для пикселей и процентов — целые числа, для rem/em — десятые
  readonly currentStep = computed(() => {
    const activeUnit = this.unit();
    return activeUnit === 'px' || activeUnit === '%' || activeUnit === 'vw' || activeUnit === 'vh'
      ? 1
      : 0.1;
  });
}
