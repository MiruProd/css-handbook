import { Component, model, input, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CSS_PROPERTIES_CONFIG, UnitLimit } from '../../configs/css-properties';

@Component({
  selector: 'app-unit-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unit-selector.html',
  styleUrl: './unit-selector.scss',
})
export class UnitSelector {
  // Двусторонние сигналы для передачи значений родителю
  value = model<number>(8);
  unit = model<string>('px');

  // Название CSS-свойства для сопоставления со словарем (например, "padding")
  property = input<string>('');

  // Альтернативный список единиц, если свойство отсутствует в глобальном конфиге
  customUnits = input<string[]>([]);

  // Дефолтные ограничения (используются как резервные, если свойства нет в конфиге)
  min = input<number>(0);
  max = input<number>(100);

  // Получаем конфигурацию для переданного свойства
  private readonly config = computed(() => {
    const propName = this.property();
    return CSS_PROPERTIES_CONFIG[propName] || null;
  });

  // Вычисляем разрешенные единицы измерения
  readonly allowedUnits = computed(() => {
    const cfg = this.config();
    if (cfg) return cfg.units;
    return this.customUnits();
  });

  // Вычисляем минимальный лимит на основе текущей единицы измерения
  readonly currentMin = computed(() => {
    const cfg = this.config();
    if (!cfg) return this.min();

    const activeUnit = this.unit();
    if (activeUnit && activeUnit in cfg.limits) {
      return (cfg.limits as Record<string, UnitLimit>)[activeUnit].min;
    }
    return this.min();
  });

  // Вычисляем максимальный лимит на основе текущей единицы измерения
  readonly currentMax = computed(() => {
    const cfg = this.config();
    if (!cfg) return this.max();

    const activeUnit = this.unit();
    if (activeUnit && activeUnit in cfg.limits) {
      return (cfg.limits as Record<string, UnitLimit>)[activeUnit].max;
    }
    return this.max();
  });

  constructor() {
    // Сбрасываем единицу измерения на дефолтную при несоответствии списка разрешенных
    effect(() => {
      const cfg = this.config();
      const allowed = this.allowedUnits();
      const currentUnit = this.unit();

      if (cfg && !allowed.includes(currentUnit)) {
        this.unit.set(cfg.defaultUnit);
      } else if (!cfg && allowed.length > 0 && !allowed.includes(currentUnit)) {
        this.unit.set(allowed[0]);
      }
    });

    // Автоматически корректируем числовое значение при изменении лимитов диапазона
    effect(() => {
      const val = this.value();
      const minLimit = this.currentMin();
      const maxLimit = this.currentMax();

      if (val < minLimit) {
        this.value.set(minLimit);
      } else if (val > maxLimit) {
        this.value.set(maxLimit);
      }
    });
  }

  onValueChange(newValue: number): void {
    const parsedValue = Number(newValue);

    if (isNaN(parsedValue)) {
      this.value.set(this.currentMin());
      return;
    }

    const minLimit = this.currentMin();
    const maxLimit = this.currentMax();

    if (parsedValue < minLimit) {
      this.value.set(minLimit);
    } else if (parsedValue > maxLimit) {
      this.value.set(maxLimit);
    } else {
      this.value.set(parsedValue);
    }
  }
}
