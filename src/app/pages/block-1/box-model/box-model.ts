import { Component, signal, computed } from '@angular/core';
import { NgStyle, NgClass } from '@angular/common';
import { UnitSelector } from '../../../components/unit-selector/unit-selector';
import { CodeBlock } from '../../../components/code-block/code-block';
import { InfoBlock } from '../../../components/info-block/info-block';

@Component({
  selector: 'app-box-model',
  standalone: true,
  imports: [NgStyle, NgClass, UnitSelector, CodeBlock, InfoBlock],
  templateUrl: './box-model.html',
  styleUrl: './box-model.scss',
})
export class BoxModel {
  protected readonly boxSizing = signal<'content-box' | 'border-box'>('content-box');

  // Размеры контента
  protected readonly widthValue = signal<number>(200);
  protected readonly heightValue = signal<number>(120);

  // Внутренние отступы (Padding)
  protected readonly paddingValue = signal<number>(20);
  protected readonly paddingUnit = signal<string>('px');

  // Толщина рамки (Border)
  protected readonly borderWidthValue = signal<number>(6);
  protected readonly borderWidthUnit = signal<string>('px');

  // Внешние отступы (Margin)
  protected readonly marginValue = signal<number>(15);
  protected readonly marginUnit = signal<string>('px');

  // Перевод величин в пиксели для математических расчетов формулы
  protected readonly paddingPx = computed(() => this.toPx(this.paddingValue(), this.paddingUnit()));
  protected readonly borderPx = computed(() =>
    this.toPx(this.borderWidthValue(), this.borderWidthUnit()),
  );
  protected readonly marginPx = computed(() => this.toPx(this.marginValue(), this.marginUnit()));

  // Фактическая внешняя ширина элемента (занимаемое место в потоке)
  protected readonly totalWidth = computed(() => {
    const baseWidth = this.widthValue();
    if (this.boxSizing() === 'border-box') {
      return baseWidth;
    }
    return baseWidth + this.paddingPx() * 2 + this.borderPx() * 2;
  });

  // Фактическая внешняя высота элемента
  protected readonly totalHeight = computed(() => {
    const baseHeight = this.heightValue();
    if (this.boxSizing() === 'border-box') {
      return baseHeight;
    }
    return baseHeight + this.paddingPx() * 2 + this.borderPx() * 2;
  });

  // Реальный размер внутренней контентной области
  protected readonly contentWidth = computed(() => {
    const baseWidth = this.widthValue();
    if (this.boxSizing() === 'content-box') {
      return baseWidth;
    }
    const calculated = baseWidth - this.paddingPx() * 2 - this.borderPx() * 2;
    return calculated > 0 ? calculated : 0;
  });

  protected readonly contentHeight = computed(() => {
    const baseHeight = this.heightValue();
    if (this.boxSizing() === 'content-box') {
      return baseHeight;
    }
    const calculated = baseHeight - this.paddingPx() * 2 - this.borderPx() * 2;
    return calculated > 0 ? calculated : 0;
  });

  // Inline-стили для рендеринга демонстрационного блока
  protected readonly boxStyles = computed(() => ({
    'box-sizing': this.boxSizing(),
    width: `${this.widthValue()}px`,
    height: `${this.heightValue()}px`,
    padding: `${this.paddingValue()}${this.paddingUnit()}`,
    border: `${this.borderWidthValue()}${this.borderWidthUnit()} solid #1c7ed6`,
    margin: `${this.marginValue()}${this.marginUnit()}`,
  }));

  // CSS-код для блока шпаргалки
  protected readonly generatedCss = computed(() => {
    return `.box {
  box-sizing: ${this.boxSizing()};
  width: ${this.widthValue()}px;
  height: ${this.heightValue()}px;
  padding: ${this.paddingValue()}${this.paddingUnit()};
  border: ${this.borderWidthValue()}${this.borderWidthUnit()} solid #1c7ed6;
  margin: ${this.marginValue()}${this.marginUnit()};
}`;
  });

  private toPx(value: number, unit: string): number {
    if (unit === 'rem' || unit === 'em') {
      return value * 16;
    }
    return value;
  }
}
