import { Component, signal, computed } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Playground } from '../../../components/playground/playground';
import { PlaygroundToggle } from '../../../components/playground/components/playground-toggle/playground-toggle';
import { InfoBlock } from '../../../components/info-block/info-block';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [NgStyle, Playground, PlaygroundToggle, InfoBlock],
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
