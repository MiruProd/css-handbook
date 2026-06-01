import { Component, signal, computed, effect } from '@angular/core';
import { NgStyle, NgClass } from '@angular/common';
import { Playground } from '../../../../../components/playground/playground';
import { PlaygroundSlider } from '../../../../../components/playground/components/playground-slider/playground-slider';

@Component({
  selector: 'app-viewport-sandbox',
  standalone: true,
  imports: [NgStyle, NgClass, Playground, PlaygroundSlider],
  templateUrl: './viewport-sandbox.html',
  styleUrl: './viewport-sandbox.scss',
})
export class ViewportSandbox {
  // Связанные реактивные параметры вьюпорта и родителя (синхронизируются с Playground)
  protected readonly viewportWidth = signal<number>(450);
  protected readonly viewportHeight = signal<number>(260);
  protected readonly parentPercent = signal<number>(80);
  protected readonly parentHeight = signal<number>(160);

  // Свойства тестируемого элемента
  protected readonly targetValue = signal<number>(60);
  protected readonly targetUnit = signal<string>('%');

  // Расчет физической ширины родителя внутри симулятора для вывода метки
  protected readonly parentWidthPx = computed(() => {
    return Math.round((this.viewportWidth() * this.parentPercent()) / 100);
  });

  // Расчет фактической ширины элемента в пикселях для вывода метки
  protected readonly targetWidthPx = computed(() => {
    const val = this.targetValue();
    const unit = this.targetUnit();
    const parentPx = this.parentWidthPx();
    const viewPx = this.viewportWidth();
    const viewPy = this.viewportHeight();

    switch (unit) {
      case 'px':
        return Math.round(val);
      case '%':
        return Math.round((val / 100) * parentPx);
      case 'vw':
        return Math.round((val / 100) * viewPx);
      case 'vh':
        return Math.round((val / 100) * viewPy);
      case 'ch':
        return Math.round(val * 8.5);
      case 'rem':
      case 'em':
        return Math.round(val * 16);
      default:
        return Math.round(val);
    }
  });

  // Динамические безопасные лимиты для слайдера ширины
  protected readonly targetMax = computed(() => {
    const unit = this.targetUnit();
    switch (unit) {
      case 'px':
        return 340;
      case '%':
        return 100;
      case 'vw':
        return 100;
      case 'vh':
        return 100;
      case 'ch':
        return Math.floor(340 / 8.5);
      case 'rem':
      case 'em':
        return Math.floor(340 / 16);
      default:
        return 100;
    }
  });

  protected readonly targetMin = computed(() => {
    const unit = this.targetUnit();
    return unit === 'px' ? 30 : 5;
  });

  constructor() {
    // Автоматическая корректировка при смене единиц измерения
    effect(() => {
      const maxVal = this.targetMax();
      if (this.targetValue() > maxVal) {
        this.targetValue.set(maxVal);
      }
      const minVal = this.targetMin();
      if (this.targetValue() < minVal) {
        this.targetValue.set(minVal);
      }
    });
  }

  // Стили для родительского бокса-имитатора
  protected readonly parentStyles = computed(() => ({
    width: `${this.parentWidthPx()}px`,
    height: `${this.parentHeight()}px`,
  }));

  // Стили для самого элемента
  protected readonly targetStyles = computed(() => ({
    width: `${this.targetWidthPx()}px`,
  }));

  // Генерация CSS-кода шпаргалки
  protected readonly generatedCss = computed(() => {
    return `/* Симулируемое окружение */
.viewport-window {
  width: ${this.viewportWidth()}px;
  height: ${this.viewportHeight()}px;
}

.parent-container {
  width: ${this.parentPercent()}%; /* = ${this.parentWidthPx()}px */
  height: ${this.parentHeight()}px;
}

/* Настройки элемента */
.target-element {
  width: ${this.targetValue()}${this.targetUnit()}; /* Вычисляется как: ${this.targetWidthPx()}px */
  
  background-color: #f3f0ff;
  border: 2px solid #7048e8;
}`;
  });
}
