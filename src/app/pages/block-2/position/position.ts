import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Playground } from '../../../components/playground/playground';
import { PlaygroundSlider } from '../../../components/playground/components/playground-slider/playground-slider';
import { PlaygroundToggle } from '../../../components/playground/components/playground-toggle/playground-toggle';
import { InfoBlock } from '../../../components/info-block/info-block';

@Component({
  selector: 'app-position',
  standalone: true,
  imports: [CommonModule, FormsModule, Playground, PlaygroundSlider, PlaygroundToggle, InfoBlock],
  templateUrl: './position.html',
  styleUrl: './position.scss',
})
export class Position {
  // Режим позиционирования целевого элемента
  protected readonly positionMode = signal<'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'>(
    'relative',
  );

  // Тип позиционирования родительского элемента (важно для демонстрации absolute)
  protected readonly parentPositioned = signal<boolean>(true);

  // Координаты смещения
  protected readonly topVal = signal<number>(20);
  protected readonly leftVal = signal<number>(20);

  // Индекс наложения
  protected readonly zIndexVal = signal<number>(2);

  // Показывать ли текст-заполнитель в родителе для симуляции прокрутки (нужно для sticky)
  protected readonly enableScroll = computed(() => this.positionMode() === 'sticky');

  // Доступные режимы позиционирования для переключателя
  protected readonly positionOptions = ['static', 'relative', 'absolute', 'fixed', 'sticky'];

  // Вычисляемый CSS-код для демонстрации в блоке кода
  protected readonly code = computed(() => {
    const mode = this.positionMode();
    const parentPos = this.parentPositioned() ? 'relative' : 'static';

    let positioningRules = '';
    if (mode !== 'static') {
      positioningRules = `\n  top: ${this.topVal()}px;\n  left: ${this.leftVal()}px;\n  z-index: ${this.zIndexVal()};`;
    }

    return `/* Окружение (Родительский блок) */
.parent-container {
  position: ${parentPos};
  overflow: auto; /* Позволяет скроллить */
}

/* Целевой элемент */
.target-box {
  position: ${mode};${positioningRules}
}`;
  });

  // Динамические инлайн-стили для интерактивного превью-контейнера (родителя)
  protected readonly parentStyles = computed(() => {
    return {
      position: this.parentPositioned() ? 'relative' : 'static',
      border: '2px dashed #adb5bd',
      'background-color': '#f8f9fa',
      'border-radius': '8px',
      width: '100%',
      height: '280px',
      'overflow-y': 'auto',
      padding: '15px',
      'box-sizing': 'border-box',
    };
  });

  // Динамические инлайн-стили для позиционируемого элемента
  protected readonly targetStyles = computed(() => {
    const mode = this.positionMode();
    const hasOffset = mode !== 'static';

    return {
      position: mode,
      top: hasOffset ? `${this.topVal()}px` : 'auto',
      left: hasOffset ? `${this.leftVal()}px` : 'auto',
      'z-index': hasOffset ? this.zIndexVal() : 'auto',
      'background-color': '#1c7ed6',
      color: '#ffffff',
      border: '2px solid #1565c0',
      'border-radius': '6px',
      width: '120px',
      height: '60px',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'font-weight': '700',
      'box-shadow': '0 4px 6px rgba(0,0,0,0.1)',
      transition:
        mode === 'fixed' || mode === 'sticky' ? 'none' : 'top 0.1s ease-out, left 0.1s ease-out',
    };
  });
}
