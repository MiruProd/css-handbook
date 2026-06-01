import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [],
  templateUrl: './code-block.html',
  styleUrl: './code-block.scss',
})
export class CodeBlock {
  // Текст кода для отображения и копирования
  code = input.required<string>();

  // Язык программирования или разметки (например, 'html', 'css', 'scss')
  language = input<string>('css');

  // Необязательный заголовок для панели над кодом
  title = input<string>('');

  // Состояние отображения статуса успешного копирования
  protected readonly copied = signal<boolean>(false);

  copyToClipboard(): void {
    if (this.copied()) return;

    navigator.clipboard.writeText(this.code()).then(() => {
      this.copied.set(true);
      setTimeout(() => {
        this.copied.set(false);
      }, 2000);
    });
  }
}
