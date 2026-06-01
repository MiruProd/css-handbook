import { Component, signal, computed } from '@angular/core';
import { NgStyle, NgIf, NgClass } from '@angular/common';
import { ColorSelector } from '../../components/color-selector/color-selector';
import { UnitSelector } from '../../components/unit-selector/unit-selector';
import { CodeBlock } from '../../components/code-block/code-block';
import { InfoBlock } from '../../components/info-block/info-block';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [NgStyle, NgIf, NgClass, ColorSelector, UnitSelector, CodeBlock, InfoBlock],
  templateUrl: './introduction.html',
  styleUrl: './introduction.scss',
})
export class Introduction {
  protected readonly linkingMethod = signal<'inline' | 'internal' | 'external'>('external');

  // Управление цветом
  protected readonly selectedColor = signal<string>('#1c7ed6');

  // Управление скруглением углов
  protected readonly radiusValue = signal<number>(8);
  protected readonly radiusUnit = signal<string>('px');
  protected readonly borderRadius = computed(() => `${this.radiusValue()}${this.radiusUnit()}`);

  // Управление внутренними отступами
  protected readonly paddingValue = signal<number>(1.5);
  protected readonly paddingUnit = signal<string>('rem');
  protected readonly padding = computed(() => `${this.paddingValue()}${this.paddingUnit()}`);

  // Динамические сниппеты кода для способов подключения
  protected readonly inlineSnippet = computed(
    () =>
      `<div style="background-color: ${this.selectedColor()}; border-radius: ${this.borderRadius()}; padding: ${this.padding()};">CSS</div>`,
  );

  protected readonly internalSnippet = computed(
    () =>
      `<style>
  .box {
    background-color: ${this.selectedColor()};
    border-radius: ${this.borderRadius()};
    padding: ${this.padding()};
  }
</style>`,
  );

  protected readonly externalHtmlSnippet = computed(
    () =>
      `<!-- В HTML-файле внутри <head> -->
<link rel="stylesheet" href="styles.css">`,
  );

  protected readonly externalCssSnippet = computed(
    () =>
      `/* В файле styles.css */
.box {
  background-color: ${this.selectedColor()};
  border-radius: ${this.borderRadius()};
  padding: ${this.padding()};
}`,
  );

  protected copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
  }
}
