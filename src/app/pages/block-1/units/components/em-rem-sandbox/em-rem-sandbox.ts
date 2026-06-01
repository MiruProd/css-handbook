import { Component, signal, computed, effect } from '@angular/core';
import { NgStyle, NgClass } from '@angular/common';
import { Playground } from '../../../../../components/playground/playground';
import { PlaygroundSlider } from '../../../../../components/playground/components/playground-slider/playground-slider';

@Component({
  selector: 'app-em-rem-sandbox',
  standalone: true,
  imports: [NgStyle, NgClass, Playground, PlaygroundSlider],
  templateUrl: './em-rem-sandbox.html',
  styleUrl: './em-rem-sandbox.scss',
})
export class EmRemSandbox {
  // Базовые шрифты для демонстрации em/rem (синхронизируются с Playground)
  protected readonly rootFontSize = signal<number>(16);
  protected readonly parentFontSize = signal<number>(20);

  // Свойства тестируемого (дочернего) элемента
  protected readonly widthValue = signal<number>(10);
  protected readonly widthUnit = signal<string>('rem');

  protected readonly paddingValue = signal<number>(1.0);
  protected readonly paddingUnit = signal<string>('em');

  protected readonly fontSizeValue = signal<number>(1.2);
  protected readonly fontSizeUnit = signal<string>('em');

  // Расчет фактических пикселей для визуальной отладки и формул на стенде
  protected readonly calculatedFontSizePx = computed(() => {
    const val = this.fontSizeValue();
    const unit = this.fontSizeUnit();

    if (unit === 'rem') {
      return Math.round(val * this.rootFontSize());
    }
    if (unit === 'em') {
      return Math.round(val * this.parentFontSize());
    }
    return Math.round(val);
  });

  protected readonly calculatedWidthPx = computed(() => {
    const val = this.widthValue();
    const unit = this.widthUnit();

    if (unit === 'rem') {
      return Math.round(val * this.rootFontSize());
    }
    if (unit === 'em') {
      return Math.round(val * this.calculatedFontSizePx());
    }
    if (unit === '%') {
      return Math.round((val / 100) * 350);
    }
    // Защитные фоллбеки для единиц вьюпорта, если пользователь выберет их в списке
    if (unit === 'vw' || unit === 'vh') {
      return Math.round(val * 2.5);
    }
    if (unit === 'ch') {
      return Math.round(val * 8); // средняя ширина нуля ~ 8px
    }
    return Math.round(val);
  });

  protected readonly calculatedPaddingPx = computed(() => {
    const val = this.paddingValue();
    const unit = this.paddingUnit();

    if (unit === 'rem') {
      return Math.round(val * this.rootFontSize());
    }
    if (unit === 'em') {
      return Math.round(val * this.calculatedFontSizePx());
    }
    return Math.round(val);
  });

  // ДИНАМИЧЕСКИЕ ЛИМИТЫ ДЛЯ FONT-SIZE (целевой диапазон на экране: 12px - 36px)
  protected readonly fontSizeMin = computed(() => {
    const unit = this.fontSizeUnit();
    if (unit === 'px') return 12;
    if (unit === 'rem') return +(12 / this.rootFontSize()).toFixed(1);
    return +(12 / this.parentFontSize()).toFixed(1);
  });

  protected readonly fontSizeMax = computed(() => {
    const unit = this.fontSizeUnit();
    if (unit === 'px') return 36;
    if (unit === 'rem') return +(36 / this.rootFontSize()).toFixed(1);
    return +(36 / this.parentFontSize()).toFixed(1);
  });

  // ДИНАМИЧЕСКИЕ ЛИМИТЫ ДЛЯ WIDTH (целевой диапазон на экране: 100px - 340px)
  protected readonly widthMin = computed(() => {
    const unit = this.widthUnit();
    if (unit === 'px') return 100;
    if (unit === '%') return 25;
    if (unit === 'rem') return +(100 / this.rootFontSize()).toFixed(1);
    return +(100 / this.calculatedFontSizePx()).toFixed(1);
  });

  protected readonly widthMax = computed(() => {
    const unit = this.widthUnit();
    if (unit === 'px') return 340;
    if (unit === '%') return 100;
    if (unit === 'rem') return +(340 / this.rootFontSize()).toFixed(1);
    return +(340 / this.calculatedFontSizePx()).toFixed(1);
  });

  // ДИНАМИЧЕСКИЕ ЛИМИТЫ ДЛЯ PADDING (целевой диапазон на экране: 0px - 40px)
  protected readonly paddingMin = computed(() => 0);

  protected readonly paddingMax = computed(() => {
    const unit = this.paddingUnit();
    if (unit === 'px') return 40;
    if (unit === 'rem') return +(40 / this.rootFontSize()).toFixed(1);
    return +(40 / this.calculatedFontSizePx()).toFixed(1);
  });

  constructor() {
    // Корректировка значений при изменении внешнего контекста (шрифтов окружения)
    effect(() => {
      const minFS = this.fontSizeMin();
      const maxFS = this.fontSizeMax();
      const currentFS = this.fontSizeValue();
      if (currentFS < minFS) {
        this.fontSizeValue.set(minFS);
      } else if (currentFS > maxFS) {
        this.fontSizeValue.set(maxFS);
      }
    });

    effect(() => {
      const minW = this.widthMin();
      const maxW = this.widthMax();
      const currentW = this.widthValue();
      if (currentW < minW) {
        this.widthValue.set(minW);
      } else if (currentW > maxW) {
        this.widthValue.set(maxW);
      }
    });

    effect(() => {
      const maxP = this.paddingMax();
      const currentP = this.paddingValue();
      if (currentP > maxP) {
        this.paddingValue.set(maxP);
      }
    });
  }

  // Стили для родительского контейнера-имитатора на стенде
  protected readonly parentStyles = computed(() => ({
    'font-size': `${this.parentFontSize()}px`,
  }));

  // Стили для самого элемента
  protected readonly targetStyles = computed(() => ({
    width: `${this.calculatedWidthPx()}px`,
    padding: `${this.calculatedPaddingPx()}px`,
    'font-size': `${this.calculatedFontSizePx()}px`,
  }));

  // Генерация итогового CSS-кода для шпаргалки
  protected readonly generatedCss = computed(() => {
    return `/* Базовые параметры окружения */
:root {
  font-size: ${this.rootFontSize()}px;
}

.parent-container {
  font-size: ${this.parentFontSize()}px;
}

/* Настройки нашего элемента */
.target-element {
  font-size: ${this.fontSizeValue()}${this.fontSizeUnit()}; /* = ${this.calculatedFontSizePx()}px */
  width: ${this.widthValue()}${this.widthUnit()}; /* = ${this.calculatedWidthPx()}px */
  padding: ${this.paddingValue()}${this.paddingUnit()}; /* = ${this.calculatedPaddingPx()}px */
  
  background-color: #e7f5ff;
  border: 2px solid #1c7ed6;
}`;
  });
}
