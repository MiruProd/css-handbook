import { Component, signal, computed } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Playground } from '../../../components/playground/playground';
import { PlaygroundSlider } from '../../../components/playground/components/playground-slider/playground-slider';
import { PlaygroundToggle } from '../../../components/playground/components/playground-toggle/playground-toggle';
import { InfoBlock } from '../../../components/info-block/info-block';

@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [NgStyle, Playground, PlaygroundSlider, PlaygroundToggle, InfoBlock],
  templateUrl: './colors.html',
  styleUrl: './colors.scss',
})
export class Colors {
  // Параметры цвета по модели HSL (Hue, Saturation, Lightness) + Alpha
  protected readonly hue = signal<number>(212);
  protected readonly saturation = signal<number>(85);
  protected readonly lightness = signal<number>(45);
  protected readonly alpha = signal<number>(1);

  // Выбор формата вывода цвета в сгенерированном CSS
  protected readonly colorFormat = signal<'hex' | 'rgb' | 'hsl'>('hsl');

  // Формируем HSL строку для применения в инлайновых стилях превью
  protected readonly hslaString = computed(() => {
    return `hsla(${this.hue()}, ${this.saturation()}%, ${this.lightness()}%, ${this.alpha()})`;
  });

  // Конвертер HSL в RGB для отображения и генерации кода
  private readonly rgbValues = computed(() => {
    let h = this.hue() / 360;
    let s = this.saturation() / 100;
    let l = this.lightness() / 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l; // Ахроматический (серый)
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  });

  // Конвертер RGB в HEX
  private readonly hexString = computed(() => {
    const { r, g, b } = this.rgbValues();
    const a = this.alpha();

    const toHex = (c: number) => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    let hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

    // Добавляем альфа-канал в HEX, если он не равен 1
    if (a < 1) {
      hexColor += toHex(Math.round(a * 255));
    }

    return hexColor;
  });

  // Вычисляем итоговый цвет в выбранном пользователем формате
  protected readonly finalColor = computed(() => {
    const format = this.colorFormat();
    const a = this.alpha();

    if (format === 'hex') {
      return this.hexString();
    }

    if (format === 'rgb') {
      const { r, g, b } = this.rgbValues();
      return a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
    }

    // hsl (по умолчанию)
    return a < 1
      ? `hsla(${this.hue()}, ${this.saturation()}%, ${this.lightness()}%, ${this.alpha()})`
      : `hsl(${this.hue()}, ${this.saturation()}%, ${this.lightness()}%)`;
  });

  // Стили для целевого элемента в песочнице
  protected readonly targetStyles = computed(() => ({
    'background-color': this.hslaString(),
  }));

  // Генерация итогового CSS-кода для шпаргалки
  protected readonly generatedCss = computed(() => {
    return `.color-box {
  background-color: ${this.finalColor()};
}`;
  });
}
