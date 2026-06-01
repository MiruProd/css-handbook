import { Component, signal, computed } from '@angular/core';
import { NgStyle, NgClass } from '@angular/common';
import { Playground } from '../../../components/playground/playground';
import { PlaygroundSlider } from '../../../components/playground/components/playground-slider/playground-slider';
import { PlaygroundToggle } from '../../../components/playground/components/playground-toggle/playground-toggle';
import { InfoBlock } from '../../../components/info-block/info-block';

@Component({
  selector: 'app-box-model',
  standalone: true,
  imports: [NgStyle, NgClass, Playground, PlaygroundSlider, PlaygroundToggle, InfoBlock],
  templateUrl: './box-model.html',
  styleUrl: './box-model.scss',
})
export class BoxModel {
  // Реактивное состояние модели параметров
  protected readonly boxSizing = signal<'content-box' | 'border-box'>('content-box');

  protected readonly widthValue = signal<number>(200);
  protected readonly widthUnit = signal<string>('px');

  protected readonly heightValue = signal<number>(120);
  protected readonly heightUnit = signal<string>('px');

  protected readonly paddingValue = signal<number>(20);
  protected readonly paddingUnit = signal<string>('px');

  protected readonly borderWidthValue = signal<number>(6);
  protected readonly borderWidthUnit = signal<string>('px');

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

  // Реальный размер внутренней контентной области (после вычета отступов)
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

  // Стили для демонстрационного элемента
  protected readonly boxStyles = computed(() => ({
    'box-sizing': this.boxSizing(),
    width: `${this.widthValue()}${this.widthUnit()}`,
    height: `${this.heightValue()}${this.heightUnit()}`,
    padding: `${this.paddingValue()}${this.paddingUnit()}`,
    border: `${this.borderWidthValue()}${this.borderWidthUnit()} solid #1c7ed6`,
    margin: `${this.marginValue()}${this.marginUnit()}`,
  }));

  // Сгенерированный CSS-код шпаргалки
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
