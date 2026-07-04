import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Playground } from '../../../components/playground/playground';
import { PlaygroundSlider } from '../../../components/playground/components/playground-slider/playground-slider';
import { PlaygroundToggle } from '../../../components/playground/components/playground-toggle/playground-toggle';
import { InfoBlock } from '../../../components/info-block/info-block';

@Component({
  selector: 'app-pseudo-classes',
  standalone: true,
  imports: [CommonModule, FormsModule, Playground, PlaygroundSlider, PlaygroundToggle, InfoBlock],
  templateUrl: './pseudo-classes.html',
  styleUrl: './pseudo-classes.scss',
})
export class PseudoClasses {
  // Выбор режима демонстрации: состояния интерактивности или математический выбор по индексу
  protected readonly demoMode = signal<'interaction' | 'nth-child'>('interaction');

  // Формула для симулятора :nth-child
  protected readonly nthFormula = signal<string>('3n');

  // Предустановленные формулы для быстрого переключения
  protected readonly presetFormulas = ['even', 'odd', '3n', '2n+1', '4', '-n+3'];

  // Вычисляемый реактивный список из 8 блоков для демонстрации :nth-child
  protected readonly gridItems = computed(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const index = i + 1;
      return {
        id: index,
        matched: this.isNthMatched(index, this.nthFormula()),
      };
    });
  });

  // Вычисляемый CSS-код для вывода в песочнице
  protected readonly code = computed(() => {
    if (this.demoMode() === 'interaction') {
      return `/* 1. Непосещенная ссылка (:link) */
.link:link {
  color: #1c7ed6;
  text-decoration: underline;
}

/* 2. Посещенная ссылка (:visited) */
.link:visited {
  color: #7048e8;
}

/* 3. Состояние наведения мыши (Hover) */
.btn:hover, .link:hover {
  color: #1565c0;
}

/* 4. Состояние удержания клика (Active) */
.btn:active {
  transform: translateY(0);
  background-color: #0b2e4f;
}

/* 5. Фокус клавиатуры Tab (Focus-visible) */
.input-field:focus-visible {
  border-color: #7048e8;
  box-shadow: 0 0 0 3px rgba(112, 72, 232, 0.15);
}`;
    } else {
      return `.grid-item:nth-child(${this.nthFormula().trim() || '3n'}) {
  background-color: #7048e8;
  color: #ffffff;
  border-color: #7048e8;
  transform: scale(1.05);
}`;
    }
  });

  /**
   * Математический парсер стандартных формул :nth-child(an+b)
   * Позволяет динамически подсвечивать нужные ячейки сетки в реальном времени!
   */
  private isNthMatched(index: number, formula: string): boolean {
    const f = formula.trim().toLowerCase().replace(/\s+/g, '');

    if (!f) return false;
    if (f === 'even') return index % 2 === 0;
    if (f === 'odd') return index % 2 !== 0;

    // Если введено просто число (например: 4)
    if (/^\d+$/.test(f)) {
      return index === parseInt(f, 10);
    }

    // Регулярное выражение для разбора выражения вида: an+b, -an+b, n+b, an, etc.
    const regex = /^([+-]?\d*)?n([+-]\d+)?$/;
    const match = f.match(regex);

    if (match) {
      let a = 1;
      if (match[1] !== undefined) {
        if (match[1] === '+') a = 1;
        else if (match[1] === '-') a = -1;
        else if (match[1] === '') a = 1;
        else a = parseInt(match[1], 10);
      }

      let b = 0;
      if (match[2] !== undefined) {
        b = parseInt(match[2], 10);
      }

      if (a === 0) return index === b;

      // index = a * k + b  =>  k = (index - b) / a
      // k должно быть целым неотрицательным числом (0, 1, 2, ...)
      const diff = index - b;
      if (diff % a === 0) {
        const k = diff / a;
        return k >= 0;
      }
    }

    return false;
  }
}
