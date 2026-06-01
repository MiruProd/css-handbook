import { Component, signal, computed } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ColorSelector } from '../../../components/color-selector/color-selector';
import { CodeBlock } from '../../../components/code-block/code-block';
import { InfoBlock } from '../../../components/info-block/info-block';
import { Playground } from '../../../components/playground/playground';
import { PlaygroundSlider } from '../../../components/playground/components/playground-slider/playground-slider';
import { CSS_PROPERTIES_CONFIG } from '../../../configs/css-properties';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [NgStyle, ColorSelector, CodeBlock, InfoBlock, Playground, PlaygroundSlider],
  templateUrl: './introduction.html',
  styleUrl: './introduction.scss',
})
export class Introduction {
  protected readonly linkingMethod = signal<'inline' | 'internal' | 'external'>('external');

  protected readonly selectedColor = signal<string>('#1c7ed6');

  protected readonly radiusValue = signal<number>(8);
  protected readonly radiusUnit = signal<string>('px');
  protected readonly borderRadius = computed(() => `${this.radiusValue()}${this.radiusUnit()}`);

  protected readonly paddingValue = signal<number>(1.5);
  protected readonly paddingUnit = signal<string>('rem');
  protected readonly padding = computed(() => `${this.paddingValue()}${this.paddingUnit()}`);

  // Перевод величины паддинга в пиксели для точных геометрических расчетов
  private readonly paddingPx = computed(() => {
    return this.toPx(this.paddingValue(), this.paddingUnit());
  });

  // Расчет физической высоты бокса: высота текста (~24px) + 2 * padding
  private readonly calculatedHeightPx = computed(() => {
    return 24 + this.paddingPx() * 2;
  });

  // Расчет физической ширины бокса: ширина текста "CSS" (~42px) + 2 * padding
  private readonly calculatedWidthPx = computed(() => {
    return 42 + this.paddingPx() * 2;
  });

  // Физический лимит скругления в пикселях (половина от меньшей стороны элемента)
  private readonly maxRadiusPx = computed(() => {
    return Math.min(this.calculatedWidthPx(), this.calculatedHeightPx()) / 2;
  });

  // Динамический расчет максимального значения слайдера на основе физических размеров бокса
  protected readonly radiusMax = computed(() => {
    const unit = this.radiusUnit();
    if (unit === 'px') {
      return Math.round(this.maxRadiusPx());
    }
    if (unit === '%') {
      return 50; // 50% — физический предел скругления для любого прямоугольника
    }
    // Для rem/em переводим пиксельный лимит в относительные единицы (базовый шрифт 16px)
    return +(this.maxRadiusPx() / 16).toFixed(1);
  });

  protected readonly radiusStep = computed(() => {
    const unit = this.radiusUnit();
    return unit === 'px' || unit === '%' ? 1 : 0.1;
  });

  protected readonly paddingMax = computed(() => {
    const config = CSS_PROPERTIES_CONFIG['padding'];
    return config?.limits[this.paddingUnit()]?.max ?? 100;
  });

  protected readonly paddingStep = computed(() => {
    const unit = this.paddingUnit();
    return unit === 'px' ? 1 : 0.1;
  });

  protected readonly inlineSnippet = signal(
    `<div style="background-color: #1c7ed6; border-radius: 8px; padding: 24px;">CSS</div>`,
  );

  protected readonly internalSnippet = signal(
    `<style>
  .box {
    background-color: #1c7ed6;
    border-radius: 8px;
    padding: 24px;
  }
</style>`,
  );

  protected readonly externalHtmlSnippet = signal(
    `<!-- В HTML-файле внутри <head> -->
<link rel="stylesheet" href="styles.css">`,
  );

  protected readonly externalCssSnippet = signal(
    `/* В файле styles.css */
.box {
  background-color: #1c7ed6;
  border-radius: 8px;
  padding: 24px;
}`,
  );

  protected readonly generatedCss = computed(() => {
    return `.box {
  background-color: ${this.selectedColor()};
  border-radius: ${this.borderRadius()};
  padding: ${this.padding()};
}`;
  });

  private toPx(value: number, unit: string): number {
    if (unit === 'rem' || unit === 'em') {
      return value * 16;
    }
    if (unit === '%') {
      return (value / 100) * 100;
    }
    return value;
  }

  protected copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
  }
}
