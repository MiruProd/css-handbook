import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Playground } from '../../../components/playground/playground';
import { PlaygroundSlider } from '../../../components/playground/components/playground-slider/playground-slider';
import { PlaygroundToggle } from '../../../components/playground/components/playground-toggle/playground-toggle';
import { ColorSelector } from '../../../components/color-selector/color-selector';
import { InfoBlock } from '../../../components/info-block/info-block';

@Component({
  selector: 'app-pseudo-elements',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Playground,
    PlaygroundSlider,
    PlaygroundToggle,
    ColorSelector,
    InfoBlock,
  ],
  templateUrl: './pseudo-elements.html',
  styleUrl: './pseudo-elements.scss',
})
export class PseudoElements {
  private readonly sanitizer = inject(DomSanitizer);

  // Выбор между ::before и ::after
  protected readonly pseudoType = signal<'before' | 'after'>('before');

  // Параметры генерируемого контента
  protected readonly contentType = signal<'quotes' | 'emoji' | 'custom'>('quotes');
  protected readonly customSymbol = signal<string>('★');
  protected readonly quoteColor = signal<string>('#7048e8');
  protected readonly quoteSize = signal<number>(5);
  protected readonly quoteOpacity = signal<number>(0.25);
  protected readonly quoteOpacityUnit = signal<string>('');
  protected readonly topOffset = signal<number>(-10);
  protected readonly leftOffset = signal<number>(10);

  // Текст цитаты и её автор для превью
  protected readonly quoteText = signal<string>(
    'Дизайн — это не то, как предмет выглядит, а то, как он работает.',
  );
  protected readonly quoteAuthor = signal<string>('Стив Джобс');

  // Параметры ::first-letter (Буквица)
  protected readonly enableFirstLetter = signal<boolean>(false);
  protected readonly firstLetterColor = signal<string>('#e67e22');
  protected readonly firstLetterSize = signal<number>(2.5);

  // Параметры ::selection (Выделение текста)
  protected readonly enableSelection = signal<boolean>(false);
  protected readonly selectionBg = signal<string>('#d0ebff');
  protected readonly selectionColor = signal<string>('#1c7ed6');

  // Параметры ::placeholder (Плейсхолдер инпута)
  protected readonly enablePlaceholder = signal<boolean>(false);
  protected readonly placeholderColor = signal<string>('#adb5bd');

  // Вычисляемый контент для свойства content
  protected readonly contentString = computed(() => {
    switch (this.contentType()) {
      case 'quotes':
        return '"“"';
      case 'emoji':
        return '"✨"';
      default:
        return `"${this.customSymbol()}"`;
    }
  });

  // Генерация динамического CSS-кода для отображения в песочнице
  protected readonly code = computed(() => {
    const color = this.quoteColor();
    const size = this.quoteSize();
    const opacity = this.quoteOpacity();
    const top = this.topOffset();
    const left = this.leftOffset();
    const content = this.contentString();
    const type = this.pseudoType();

    let css = `/* 1. Генерируемый контент (::${type}) */
.blockquote-card {
  position: relative;
  padding: 1.5rem 2rem 1.5rem 3.5rem;
  background-color: #f8f9fa;
  border-left: 5px solid ${color};
  border-radius: 4px;
}

.blockquote-card::${type} {
  content: ${content};
  position: absolute;
  ${type === 'before' ? `top: ${top}px;\n  left: ${left}px;` : `bottom: ${top}px;\n  right: ${left}px;`}
  font-size: ${size}rem;
  color: ${color};
  opacity: ${opacity};
  font-family: serif;
  line-height: 1;
}`;

    if (this.enableFirstLetter()) {
      css += `\n\n/* 2. Первая буква (::first-letter) */
.quote-text::first-letter {
  font-size: ${this.firstLetterSize()}rem;
  color: ${this.firstLetterColor()};
  font-weight: bold;
  float: left;
  margin-right: 8px;
  line-height: 0.95;
}`;
    }

    if (this.enableSelection()) {
      css += `\n\n/* 3. Выделение текста (::selection) */
.blockquote-card::selection,
.blockquote-card *::selection {
  background-color: ${this.selectionBg()};
  color: ${this.selectionColor()};
}`;
    }

    if (this.enablePlaceholder()) {
      css += `\n\n/* 4. Плейсхолдер ввода (::placeholder) */
.preview-input::placeholder {
  color: ${this.placeholderColor()};
  font-style: italic;
}`;
    }

    return css;
  });

  // Динамическая инжекция CSS-стилей в DOM для демонстрации ::selection, ::first-letter и ::placeholder
  protected readonly safeStyles = computed<SafeHtml>(() => {
    let css = '';

    if (this.enableFirstLetter()) {
      css += `
        .quote-text::first-letter {
          font-size: ${this.firstLetterSize()}rem;
          color: ${this.firstLetterColor()};
          font-weight: bold;
          float: left;
          margin-right: 8px;
          line-height: 0.95;
        }
      `;
    }

    if (this.enableSelection()) {
      css += `
        .preview-card::selection, .preview-card *::selection {
          background-color: ${this.selectionBg()} !important;
          color: ${this.selectionColor()} !important;
        }
      `;
    }

    if (this.enablePlaceholder()) {
      css += `
        .preview-input::placeholder {
          color: ${this.placeholderColor()} !important;
          font-style: italic;
        }
      `;
    }

    return this.sanitizer.bypassSecurityTrustHtml(`<style>${css}</style>`);
  });

  // Стили для элемента, имитирующего ::before или ::after
  protected readonly pseudoStyles = computed(() => {
    const isBefore = this.pseudoType() === 'before';
    return {
      position: 'absolute',
      top: isBefore ? `${this.topOffset()}px` : 'auto',
      bottom: !isBefore ? `${this.topOffset()}px` : 'auto',
      left: isBefore ? `${this.leftOffset()}px` : 'auto',
      right: !isBefore ? `${this.leftOffset()}px` : 'auto',
      'font-size': `${this.quoteSize()}rem`,
      color: this.quoteColor(),
      opacity: this.quoteOpacity(),
      'line-height': '1',
      'font-family': this.contentType() === 'quotes' ? 'serif' : 'inherit',
      'pointer-events': 'none',
      transition: 'all 0.15s ease-out',
    };
  });

  // Базовые стили самой карточки цитаты
  protected readonly cardStyles = computed(() => {
    return {
      position: 'relative',
      padding:
        this.pseudoType() === 'before' ? '1.5rem 2rem 1.5rem 3.5rem' : '1.5rem 3.5rem 1.5rem 2rem',
      'background-color': '#f8f9fa',
      'border-left': `5px solid ${this.quoteColor()}`,
      'border-radius': '4px',
      width: '100%',
      'box-sizing': 'border-box',
    };
  });
}
