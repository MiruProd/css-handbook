import { Component, signal, computed } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ColorSelector } from '../../../components/color-selector/color-selector';
import { UnitSelector } from '../../../components/unit-selector/unit-selector';
import { CodeBlock } from '../../../components/code-block/code-block';
import { InfoBlock } from '../../../components/info-block/info-block';
import { CSS_PROPERTIES_CONFIG } from '../../../configs/css-properties';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [NgStyle, ColorSelector, UnitSelector, CodeBlock, InfoBlock],
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

  protected readonly radiusMax = computed(() => {
    const config = CSS_PROPERTIES_CONFIG['border-radius'];
    return config?.limits[this.radiusUnit()]?.max ?? 100;
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

  protected copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
  }
}
