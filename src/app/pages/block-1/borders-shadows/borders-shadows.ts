import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Playground } from '../../../components/playground/playground';
import { PlaygroundSlider } from '../../../components/playground/components/playground-slider/playground-slider';
import { PlaygroundToggle } from '../../../components/playground/components/playground-toggle/playground-toggle';
import { ColorSelector } from '../../../components/color-selector/color-selector';
import { InfoBlock } from '../../../components/info-block/info-block';
import { CodeBlock } from '../../../components/code-block/code-block';

@Component({
  selector: 'app-borders-shadows',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Playground,
    PlaygroundSlider,
    PlaygroundToggle,
    ColorSelector,
    InfoBlock,
    CodeBlock,
  ],
  templateUrl: './borders-shadows.html',
  styleUrl: './borders-shadows.scss',
})
export class BordersShadows {
  // Параметры рамки (Border)
  protected readonly borderWidthVal = signal<number>(4);
  protected readonly borderWidthUnit = signal<string>('px');
  protected readonly borderStyle = signal<string>('solid');
  protected readonly borderColor = signal<string>('#1c7ed6');
  protected readonly borderRadiusVal = signal<number>(12);
  protected readonly borderRadiusUnit = signal<string>('px');

  // Параметры тени (Box Shadow)
  protected readonly shadowX = signal<number>(0);
  protected readonly shadowY = signal<number>(10);
  protected readonly shadowBlur = signal<number>(20);
  protected readonly shadowSpread = signal<number>(0);
  protected readonly shadowColor = signal<string>('#adb5bd');
  protected readonly shadowInset = signal<boolean>(false);

  // Параметры контура (Outline)
  protected readonly outlineWidth = signal<number>(0);
  protected readonly outlineStyle = signal<string>('solid');
  protected readonly outlineColor = signal<string>('#f783ac');
  protected readonly outlineOffset = signal<number>(4);

  // Список стилей для рамок и контуров
  protected readonly borderStyles = ['solid', 'dashed', 'dotted', 'double', 'groove', 'none'];

  // Вычисляемый CSS-код для демонстрации в песочнице
  protected readonly code = computed(() => {
    const border = `${this.borderWidthVal()}${this.borderWidthUnit()} ${this.borderStyle()} ${this.borderColor()}`;
    const radius = `${this.borderRadiusVal()}${this.borderRadiusUnit()}`;
    const insetStr = this.shadowInset() ? ' inset' : '';
    const shadow = `${this.shadowX()}px ${this.shadowY()}px ${this.shadowBlur()}px ${this.shadowSpread()}px ${this.shadowColor()}${insetStr}`;
    const outline =
      this.outlineWidth() > 0
        ? `\n  outline: ${this.outlineWidth()}px ${this.outlineStyle()} ${this.outlineColor()};\n  outline-offset: ${this.outlineOffset()}px;`
        : '';

    return `.preview-box {
  background-color: #ffffff;
  border: ${border};
  border-radius: ${radius};
  box-shadow: ${shadow};${outline}
}`;
  });

  // Вычисляемые инлайн-стили для применения к интерактивному превью-элементу
  protected readonly previewStyles = computed(() => {
    const insetStr = this.shadowInset() ? ' inset' : '';
    return {
      border: `${this.borderWidthVal()}${this.borderWidthUnit()} ${this.borderStyle()} ${this.borderColor()}`,
      'border-radius': `${this.borderRadiusVal()}${this.borderRadiusUnit()}`,
      'box-shadow': `${this.shadowX()}px ${this.shadowY()}px ${this.shadowBlur()}px ${this.shadowSpread()}px ${this.shadowColor()}${insetStr}`,
      outline:
        this.outlineWidth() > 0
          ? `${this.outlineWidth()}px ${this.outlineStyle()} ${this.outlineColor()}`
          : 'none',
      'outline-offset': `${this.outlineOffset()}px`,
      'background-color': '#ffffff',
      width: '180px',
      height: '180px',
      transition: 'all 0.15s ease-out',
    };
  });
}
