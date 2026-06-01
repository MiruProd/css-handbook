import { Component, signal, computed, effect } from '@angular/core';
import { NgStyle, NgClass } from '@angular/common';
import { UnitSelector } from '../../../../../components/unit-selector/unit-selector';
import { CodeBlock } from '../../../../../components/code-block/code-block';

@Component({
  selector: 'app-viewport-sandbox',
  standalone: true,
  imports: [NgStyle, NgClass, UnitSelector, CodeBlock],
  templateUrl: './viewport-sandbox.html',
  styleUrl: './viewport-sandbox.scss',
})
export class ViewportSandbox {
  // Параметры симулируемого браузерного вьюпорта
  protected readonly viewportWidth = signal<number>(360); // Симулируемая ширина экрана (240px - 400px)
  protected readonly parentPercent = signal<number>(80); // Симулируемая ширина родительского контейнера в %

  // Свойства тестируемого элемента внутри вьюпорта
  protected readonly targetValue = signal<number>(60);
  protected readonly targetUnit = signal<string>('%'); // По умолчанию %

  // Расчет физической ширины родителя внутри симулятора
  protected readonly parentWidthPx = computed(() => {
    return Math.round((this.viewportWidth() * this.parentPercent()) / 100);
  });

  // Расчет фактической ширины элемента в пикселях для рендеринга на стенде
  protected readonly targetWidthPx = computed(() => {
    const val = this.targetValue();
    const unit = this.targetUnit();
    const parentPx = this.parentWidthPx();
    const viewPx = this.viewportWidth();

    switch (unit) {
      case 'px':
        return Math.round(val);
      case '%':
        // Считается строго от РАЗМЕРА РОДИТЕЛЯ!
        return Math.round((val / 100) * parentPx);
      case 'vw':
        // Считается строго от РАЗМЕРА ВЬЮПОРТА, полностью игнорируя ширину родителя!
        return Math.round((val / 100) * viewPx);
      case 'vh':
        // Имитируем высоту виртуального вьюпорта равной 200px
        return Math.round((val / 100) * 200);
      case 'ch':
        // Моноширинный символ '0' в среднем равен 8.5px
        return Math.round(val * 8.5);
      case 'rem':
      case 'em':
        // Базовые шрифты в этой песочнице считаем равными 16px
        return Math.round(val * 16);
      default:
        return Math.round(val);
    }
  });

  // Динамические безопасные лимиты для слайдера ширины
  protected readonly targetMax = computed(() => {
    const unit = this.targetUnit();
    const parentPx = this.parentWidthPx();
    const viewPx = this.viewportWidth();

    switch (unit) {
      case 'px':
        return 340;
      case '%':
        return 100;
      case 'vw':
        // Ограничиваем vw, чтобы элемент не уходил за пределы симулируемого вьюпорта
        return 100;
      case 'vh':
        return 100;
      case 'ch':
        // Считаем максимально комфортное количество символов
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

  protected readonly targetStep = computed(() => {
    const unit = this.targetUnit();
    return unit === 'px' || unit === '%' || unit === 'vw' || unit === 'vh' ? 1 : 0.1;
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
  }));

  // Стили для самого элемента
  protected readonly targetStyles = computed(() => ({
    width: `${this.targetWidthPx()}px`,
  }));

  // Генерация CSS-кода с отображением реального расчетного значения в комментариях
  protected readonly generatedCss = computed(() => {
    return `/* Симулируемое окружение */
.viewport-window {
  width: ${this.viewportWidth()}px;
}

.parent-container {
  width: ${this.parentPercent()}%; /* = ${this.parentWidthPx()}px */
}

/* Настройки элемента */
.target-element {
  width: ${this.targetValue()}${this.targetUnit()}; /* Вычисляется как: ${this.targetWidthPx()}px */
  
  background-color: #f3f0ff;
  border: 2px solid #7048e8;
}`;
  });
}
