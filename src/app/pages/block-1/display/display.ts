import { Component, signal, computed } from '@angular/core';
import { NgStyle, NgClass } from '@angular/common';
import { CodeBlock } from '../../../components/code-block/code-block';
import { InfoBlock } from '../../../components/info-block/info-block';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [NgStyle, NgClass, CodeBlock, InfoBlock],
  templateUrl: './display.html',
  styleUrl: './display.scss',
})
export class Display {
  protected readonly displayMode = signal<'block' | 'inline' | 'inline-block' | 'none'>('block');
  protected readonly visibilityMode = signal<'visible' | 'hidden'>('visible');

  protected readonly targetStyles = computed(() => ({
    display: this.displayMode(),
    visibility: this.visibilityMode(),
  }));

  protected readonly generatedCss = computed(() => {
    const lines: string[] = [];
    lines.push(`.target-box {`);

    if (this.displayMode() === 'none') {
      lines.push(`  display: none;`);
    } else {
      lines.push(`  display: ${this.displayMode()};`);
      if (this.visibilityMode() === 'hidden') {
        lines.push(`  visibility: hidden;`);
      }
    }

    lines.push(`}`);
    return lines.join('\n');
  });
}
