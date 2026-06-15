import { Component, signal, computed } from '@angular/core';
import { NgStyle, NgClass } from '@angular/common';
import { Playground } from '../../../components/playground/playground';
import { PlaygroundToggle } from '../../../components/playground/components/playground-toggle/playground-toggle';
import { InfoBlock } from '../../../components/info-block/info-block';
import { CodeBlock } from '../../../components/code-block/code-block';

@Component({
  selector: 'app-css-resets',
  standalone: true,
  imports: [NgStyle, NgClass, Playground, PlaygroundToggle, InfoBlock, CodeBlock],
  templateUrl: './css-resets.html',
  styleUrl: './css-resets.scss',
})
export class CssResets {
  // Настройки сброса по умолчанию (активные современные правила)
  protected readonly boxSizing = signal<'border-box' | 'content-box'>('border-box');
  protected readonly bodyMargin = signal<'0' | 'default'>('0');
  protected readonly listStyle = signal<'none' | 'default'>('none');
  protected readonly buttonStyle = signal<'reset' | 'default'>('reset');
  protected readonly imgBehavior = signal<'block' | 'inline'>('block');

  // Вычисляемые стили для элементов демонстрационного DOM-дерева в превью
  protected readonly previewContainerStyles = computed(() => ({
    'box-sizing': this.boxSizing(),
    margin: this.bodyMargin() === '0' ? '0' : '8px',
  }));

  protected readonly headingStyles = computed(() => ({
    'box-sizing': this.boxSizing(),
    margin: this.bodyMargin() === '0' ? '0' : '1em 0 0.5em 0',
  }));

  protected readonly paragraphStyles = computed(() => ({
    'box-sizing': this.boxSizing(),
    margin: this.bodyMargin() === '0' ? '0' : '1em 0',
  }));

  protected readonly listStyles = computed(() => ({
    'box-sizing': this.boxSizing(),
    margin: this.bodyMargin() === '0' ? '0' : '1em 0',
    'padding-left': this.listStyle() === 'none' ? '0' : '40px',
    'list-style-type': this.listStyle() === 'none' ? 'none' : 'disc',
  }));

  protected readonly buttonStyles = computed(() => {
    if (this.buttonStyle() === 'reset') {
      return {
        'box-sizing': this.boxSizing(),
        background: 'none',
        border: 'none',
        padding: '0',
        font: 'inherit',
        cursor: 'pointer',
        outline: 'none',
      };
    }
    return {}; // Пустой объект возвращает дефолтный серый браузерный стиль
  });

  protected readonly imgStyles = computed(() => ({
    'box-sizing': this.boxSizing(),
    display: this.imgBehavior() === 'block' ? 'block' : 'inline',
    'max-width': this.imgBehavior() === 'block' ? '100%' : 'none',
  }));

  // Генерация динамического CSS-кода шпаргалки на основе включенных сбросов
  protected readonly generatedCss = computed(() => {
    const rules: string[] = [];

    if (this.boxSizing() === 'border-box') {
      rules.push(`/* 1. Глобальный сброс расчета размеров */
*,
*::before,
*::after {
  box-sizing: border-box;
}`);
    }

    if (this.bodyMargin() === '0') {
      rules.push(`/* 2. Обнуление внешних отступов и полей */
body,
h1, h2, h3,
p,
ul, ol {
  margin: 0;
  padding: 0;
}`);
    }

    if (this.listStyle() === 'none') {
      rules.push(`/* 3. Очистка стилей списков */
ul, ol {
  list-style: none;
}`);
    }

    if (this.buttonStyle() === 'reset') {
      rules.push(`/* 4. Полный сброс стилей нативных кнопок */
button {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: none;
}`);
    }

    if (this.imgBehavior() === 'block') {
      rules.push(`/* 5. Устранение межстрочного зазора у картинок */
img, svg {
  display: block;
  max-width: 100%;
  height: auto;
}`);
    }

    return rules.length > 0 ? rules.join('\n\n') : '/* Сбросы не выбраны */';
  });

  // ЭТАЛОННЫЙ СОВРЕМЕННЫЙ СБРОС СТИЛЕЙ (PRODUCTION-READY RESET 2026)
  // Объединяет лучшие подходы с сохранением доступности и баг-фиксами
  protected readonly productionReset = signal<string>(
    `/* ==========================================================================
   ЭТАЛОННЫЙ СОВРЕМЕННЫЙ СБРОС СТИЛЕЙ (MODERN CSS RESET)
   Объединяет решения Andy Bell и Josh W. Comeau
   ========================================================================== */

/* 1. Интуитивная блочная модель для всех элементов */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* 2. Предотвращение нежелательного масштабирования шрифтов на мобильных */
html {
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}

/* 3. Очистка дефолтных внешних отступов у ключевых элементов */
body, h1, h2, h3, h4, p, figure, blockquote, dl, dd {
  margin: 0;
}

/* 4. Очистка стилей списков только у элементов со структурной ролью list */
ul[role="list"],
ol[role="list"] {
  list-style: none;
}

/* 5. Базовые настройки отображения и плавности рендеринга body */
body {
  min-height: 100vh;
  min-height: 100dvh; /* Динамическая высота для мобильных вьюпортов */
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 6. Улучшенный перенос длинных строк и баланс для заголовков */
h1, h2, h3, h4 {
  text-wrap: balance;
  line-height: 1.1;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word; /* Защита от вылета длинных слов за границы */
}

/* 7. Работа с изображениями и медиа-файлами без лишних зазоров */
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
  height: auto;
}

/* 8. Наследование шрифтов для интерактивных элементов форм */
input,
button,
textarea,
select {
  font-family: inherit;
  font-size: inherit;
}

/* 9. Отключение анимаций для пользователей, чувствительных к движению */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }
  
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`,
  );
}
