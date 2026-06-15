import { Component, signal, computed } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Playground } from '../../../components/playground/playground';
import { PlaygroundSlider } from '../../../components/playground/components/playground-slider/playground-slider';
import { PlaygroundToggle } from '../../../components/playground/components/playground-toggle/playground-toggle';
import { InfoBlock } from '../../../components/info-block/info-block';
import { CodeBlock } from '../../../components/code-block/code-block';

@Component({
  selector: 'app-fonts',
  standalone: true,
  imports: [NgStyle, Playground, PlaygroundSlider, PlaygroundToggle, InfoBlock, CodeBlock],
  templateUrl: './fonts.html',
  styleUrl: './fonts.scss',
})
export class Fonts {
  protected readonly fontFamily = signal<'sans-serif' | 'serif' | 'monospace' | 'cursive'>(
    'sans-serif',
  );
  protected readonly fontSizeValue = signal<number>(1.2);
  protected readonly fontSizeUnit = signal<string>('rem');

  protected readonly fontWeight = signal<string>('400');
  protected readonly lineHeight = signal<number>(1.5);
  protected readonly letterSpacing = signal<number>(0);
  protected readonly fontStyle = signal<'normal' | 'italic'>('normal');
  protected readonly textTransform = signal<'none' | 'uppercase' | 'lowercase' | 'capitalize'>(
    'none',
  );

  protected readonly fontFaceCode = signal<string>(
    `/* Подключение локального шрифта */
@font-face {
  font-family: 'MyCustomFont';
  src: url('/fonts/mycustomfont.woff2') format('woff2'),
       url('/fonts/mycustomfont.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}`,
  );

  // Обновленный маппинг на шрифты с полной поддержкой веса 900
  protected readonly targetStyles = computed(() => {
    const family = this.fontFamily();
    let fontStack = 'sans-serif';

    if (family === 'sans-serif') {
      fontStack = '"Roboto", sans-serif';
    } else if (family === 'serif') {
      fontStack = '"Merriweather", Georgia, serif';
    } else if (family === 'monospace') {
      fontStack = '"Source Code Pro", monospace';
    } else if (family === 'cursive') {
      fontStack = '"Montserrat Alternates", cursive';
    }

    return {
      'font-family': fontStack,
      'font-size': `${this.fontSizeValue()}${this.fontSizeUnit()}`,
      'font-weight': this.fontWeight(),
      'line-height': this.lineHeight(),
      'letter-spacing': `${this.letterSpacing()}px`,
      'font-style': this.fontStyle(),
      'text-transform': this.textTransform(),
    };
  });

  protected readonly generatedCss = computed(() => {
    return `.text-preview {
  font-family: ${this.fontFamily()}, system-ui, sans-serif;
  font-size: ${this.fontSizeValue()}${this.fontSizeUnit()};
  font-weight: ${this.fontWeight()};
  line-height: ${this.lineHeight()};
  letter-spacing: ${this.letterSpacing()}px;
  font-style: ${this.fontStyle()};
  text-transform: ${this.textTransform()};
}`;
  });
}
