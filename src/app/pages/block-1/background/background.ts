import { Component, signal, computed } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Playground } from '../../../components/playground/playground';
import { PlaygroundSlider } from '../../../components/playground/components/playground-slider/playground-slider';
import { PlaygroundToggle } from '../../../components/playground/components/playground-toggle/playground-toggle';
import { ColorSelector } from '../../../components/color-selector/color-selector';
import { InfoBlock } from '../../../components/info-block/info-block';
import { CodeBlock } from '../../../components/code-block/code-block';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [
    NgStyle,
    Playground,
    PlaygroundSlider,
    PlaygroundToggle,
    ColorSelector,
    InfoBlock,
    CodeBlock,
  ],
  templateUrl: './background.html',
  styleUrl: './background.scss',
})
export class Background {
  // Выбор режима фона: сплошной цвет, градиент или фоновое изображение
  protected readonly bgMode = signal<'color' | 'gradient' | 'image'>('color');

  // Параметры для сплошного цвета
  protected readonly solidColor = signal<string>('#1c7ed6');

  // Параметры для градиентов
  protected readonly gradientType = signal<'linear' | 'radial'>('linear');
  protected readonly gradientAngle = signal<number>(135);
  protected readonly gradientColor1 = signal<string>('#22b8cf');
  protected readonly gradientColor2 = signal<string>('#7048e8');

  // Параметры для фонового изображения
  protected readonly bgRepeat = signal<'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y'>(
    'no-repeat',
  );
  protected readonly bgSize = signal<'cover' | 'contain' | 'auto'>('cover');
  protected readonly bgPosition = signal<'center' | 'top left' | 'bottom right'>('center');
  protected readonly bgAttachment = signal<'scroll' | 'fixed' | 'local'>('scroll');

  // Умный выбор URL в зависимости от выбранного размера для сохранения четкости
  protected readonly bgImageUrl = computed(() => {
    const size = this.bgSize();
    // Для растягивания используем высокое разрешение (1000px)
    if (size === 'cover' || size === 'contain') {
      return 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80")';
    }
    // Для отображения сетки повторения используем маленькую плитку (150px)
    return 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80")';
  });

  // Обработчик изменения размера: при растяжении отключаем повторение
  protected onSizeChange(size: string): void {
    const typedSize = size as 'cover' | 'contain' | 'auto';
    this.bgSize.set(typedSize);
    if (typedSize === 'cover' || typedSize === 'contain') {
      this.bgRepeat.set('no-repeat');
    }
  }

  // Обработчик изменения повторения: при включении плитки сбрасываем размер в auto
  protected onRepeatChange(repeat: string): void {
    const typedRepeat = repeat as 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
    this.bgRepeat.set(typedRepeat);
    if (typedRepeat !== 'no-repeat') {
      this.bgSize.set('auto');
    }
  }

  // Вычисляемые стили для демонстрационного элемента в превью
  protected readonly targetStyles = computed(() => {
    const mode = this.bgMode();

    if (mode === 'color') {
      return {
        'background-color': this.solidColor(),
        'background-image': 'none',
      };
    }

    if (mode === 'gradient') {
      const type = this.gradientType();
      const col1 = this.gradientColor1();
      const col2 = this.gradientColor2();
      const angle = this.gradientAngle();

      const image =
        type === 'linear'
          ? `linear-gradient(${angle}deg, ${col1}, ${col2})`
          : `radial-gradient(circle, ${col1}, ${col2})`;

      return {
        'background-image': image,
        'background-color': 'transparent',
      };
    }

    // Режим изображения (bgMode === 'image')
    return {
      'background-image': this.bgImageUrl(),
      'background-repeat': this.bgRepeat(),
      'background-size': this.bgSize(),
      'background-position': this.bgPosition(),
      'background-attachment': this.bgAttachment(),
      'background-color': '#f8f9fa',
    };
  });

  // Генерация динамического CSS-кода для шпаргалки
  protected readonly generatedCss = computed(() => {
    const mode = this.bgMode();

    if (mode === 'color') {
      return `.preview-box {
  background-color: ${this.solidColor()};
}`;
    }

    if (mode === 'gradient') {
      const type = this.gradientType();
      const col1 = this.gradientColor1();
      const col2 = this.gradientColor2();
      const angle = this.gradientAngle();

      if (type === 'linear') {
        return `.preview-box {
  background-image: linear-gradient(${angle}deg, ${col1}, ${col2});
}`;
      } else {
        return `.preview-box {
  background-image: radial-gradient(circle, ${col1}, ${col2});
}`;
      }
    }

    // Режим изображения
    return `.preview-box {
  background-image: url('beach.jpg');
  background-repeat: ${this.bgRepeat()};
  background-size: ${this.bgSize()};
  background-position: ${this.bgPosition()};
  background-attachment: ${this.bgAttachment()};
}`;
  });
}
