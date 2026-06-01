import { Component, signal, computed } from '@angular/core';
import { NgStyle, NgClass } from '@angular/common';
import { UnitSelector } from '../../../components/unit-selector/unit-selector';
import { CodeBlock } from '../../../components/code-block/code-block';
import { InfoBlock } from '../../../components/info-block/info-block';
import { CSS_PROPERTIES_CONFIG } from '../../../configs/css-properties';

@Component({
  selector: 'app-box-model',
  standalone: true,
  imports: [NgStyle, NgClass, UnitSelector, CodeBlock, InfoBlock],
  templateUrl: './box-model.html',
  styleUrl: './box-model.scss',
})
export class BoxModel {
  protected readonly boxSizing = signal<'content-box' | 'border-box'>('content-box');

  // Ширина (width)
  protected readonly widthValue = signal<number>(200);
  protected readonly widthUnit = signal<string>('px');

  // Высота (height)
  protected readonly heightValue = signal<number>(120);
  protected readonly heightUnit = signal<string>('px');

  // Внутренние отступы (padding)
  protected readonly paddingValue = signal<number>(20);
  protected readonly paddingUnit = signal<string>('px');

  // Толщина рамки (border-width)
  protected readonly borderWidthValue = signal<number>(6);
  protected readonly borderWidthUnit = signal<string>('px');

  // Внешние отступы (margin)
  protected readonly marginValue = signal<number>(15);
  protected readonly marginUnit = signal<string>('px');

  // Перевод всех величин в пиксели для математических расчетов формулы
  protected readonly widthPx = computed(() => this.toPx(this.widthValue(), this.widthUnit(), 300));
  protected readonly heightPx = computed(() =>
    this.toPx(this.heightValue(), this.heightUnit(), 200),
  );
  protected readonly paddingPx = computed(() => this.toPx(this.paddingValue(), this.paddingUnit()));
  protected readonly borderPx = computed(() =>
    this.toPx(this.borderWidthValue(), this.borderWidthUnit()),
  );
  protected readonly marginPx = computed(() => this.toPx(this.marginValue(), this.marginUnit()));

  // Фактическая внешняя ширина элемента (занимаемое место в потоке)
  protected readonly totalWidth = computed(() => {
    const baseWidth = this.widthPx();
    if (this.boxSizing() === 'border-box') {
      return Math.round(baseWidth);
    }
    return Math.round(baseWidth + this.paddingPx() * 2 + this.borderPx() * 2);
  });

  // Фактическая внешняя высота элемента
  protected readonly totalHeight = computed(() => {
    const baseHeight = this.heightPx();
    if (this.boxSizing() === 'border-box') {
      return Math.round(baseHeight);
    }
    return Math.round(baseHeight + this.paddingPx() * 2 + this.borderPx() * 2);
  });

  // Реальный размер внутренней контентной области
  protected readonly contentWidth = computed(() => {
    const baseWidth = this.widthPx();
    if (this.boxSizing() === 'content-box') {
      return Math.round(baseWidth);
    }
    const calculated = baseWidth - this.paddingPx() * 2 - this.borderPx() * 2;
    return Math.round(calculated > 0 ? calculated : 0);
  });

  protected readonly contentHeight = computed(() => {
    const baseHeight = this.heightPx();
    if (this.boxSizing() === 'content-box') {
      return Math.round(baseHeight);
    }
    const calculated = baseHeight - this.paddingPx() * 2 - this.borderPx() * 2;
    return Math.round(calculated > 0 ? calculated : 0);
  });

  // Вычисление динамических лимитов и шага для каждого слайдера
  protected readonly widthMax = computed(() => {
    const config = CSS_PROPERTIES_CONFIG['width'];
    return config?.limits[this.widthUnit()]?.max ?? 400;
  });
  protected readonly widthStep = computed(() =>
    this.widthUnit() === 'px' || this.widthUnit() === '%' ? 1 : 0.1,
  );

  protected readonly heightMax = computed(() => {
    const config = CSS_PROPERTIES_CONFIG['height'];
    return config?.limits[this.heightUnit()]?.max ?? 300;
  });
  protected readonly heightStep = computed(() =>
    this.heightUnit() === 'px' || this.heightUnit() === '%' ? 1 : 0.1,
  );

  protected readonly paddingMax = computed(() => {
    const config = CSS_PROPERTIES_CONFIG['padding'];
    return config?.limits[this.paddingUnit()]?.max ?? 120;
  });
  protected readonly paddingStep = computed(() => (this.paddingUnit() === 'px' ? 1 : 0.1));

  protected readonly borderWidthMax = computed(() => {
    const config = CSS_PROPERTIES_CONFIG['border-width'];
    return config?.limits[this.borderWidthUnit()]?.max ?? 30;
  });
  protected readonly borderWidthStep = computed(() => (this.borderWidthUnit() === 'px' ? 1 : 0.1));

  protected readonly marginMax = computed(() => {
    const config = CSS_PROPERTIES_CONFIG['margin'];
    return config?.limits[this.marginUnit()]?.max ?? 100;
  });
  protected readonly marginStep = computed(() => (this.marginUnit() === 'px' ? 1 : 0.1));

  // Стили для демонстрационного элемента
  protected readonly boxStyles = computed(() => ({
    'box-sizing': this.boxSizing(),
    width: `${this.widthValue()}${this.widthUnit()}`,
    height: `${this.heightValue()}${this.heightUnit()}`,
    padding: `${this.paddingValue()}${this.paddingUnit()}`,
    border: `${this.borderWidthValue()}${this.borderWidthUnit()} solid #1c7ed6`,
    margin: `${this.marginValue()}${this.marginUnit()}`,
  }));

  // CSS-код для блока шпаргалки
  protected readonly generatedCss = computed(() => {
    return `.box {
  box-sizing: ${this.boxSizing()};
  width: ${this.widthValue()}${this.widthUnit()};
  height: ${this.heightValue()}${this.heightUnit()};
  padding: ${this.paddingValue()}${this.paddingUnit()};
  border: ${this.borderWidthValue()}${this.borderWidthUnit()} solid #1c7ed6;
  margin: ${this.marginValue()}${this.marginUnit()};
}`;
  });

  private toPx(value: number, unit: string, parentSize: number = 300): number {
    if (unit === 'rem' || unit === 'em') {
      return value * 16;
    }
    if (unit === '%') {
      return (value / 100) * parentSize;
    }
    return value;
  }
}
