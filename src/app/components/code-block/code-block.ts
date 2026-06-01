import { Component, input, signal, computed, inject, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [],
  templateUrl: './code-block.html',
  styleUrl: './code-block.scss',
  encapsulation: ViewEncapsulation.None, // Отключаем изоляцию для применения стилей к innerHTML
})
export class CodeBlock {
  // Текст кода для отображения и копирования
  code = input.required<string>();

  // Язык программирования или разметки (например, 'html', 'css')
  language = input<string>('css');

  // Необязательный заголовок для панели над кодом
  title = input<string>('');

  protected readonly copied = signal<boolean>(false);

  private readonly sanitizer = inject(DomSanitizer);

  // Вычисляемый сигнал для безопасного рендеринга подсвеченного HTML-кода
  protected readonly highlightedCode = computed<SafeHtml>(() => {
    const rawCode = this.code();
    const lang = this.language();

    // Экранируем спецсимволы HTML
    let html = this.escapeHtml(rawCode);

    // Применяем правила подсветки в зависимости от языка
    if (lang === 'css') {
      html = this.highlightCss(html);
    } else if (lang === 'html') {
      html = this.highlightHtml(html);
    }

    return this.sanitizer.bypassSecurityTrustHtml(html);
  });

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Парсер CSS-кода
  private highlightCss(text: string): string {
    let result = text;

    // 1. Селекторы: нацеливаемся на слова перед открывающейся фигурной скобкой
    result = result.replace(
      /([\.#a-zA-Z0-9\-\*\:\[\]\=\,\s\n]+)\s*\{/g,
      '<span class="token-selector">$1</span>{',
    );

    // 2. Свойства: слова перед двоеточием внутри блока деклараций
    result = result.replace(/([a-zA-Z\-]+)\s*:/g, '<span class="token-property">$1</span>:');

    // 3. Значения: то, что лежит между двоеточием и точкой с запятой
    result = result.replace(/:\s*([^;]+);/g, ': <span class="token-value">$1</span>;');

    // 4. Находим HEX-коды цветов и красим их текст в этот же цвет
    result = result.replace(
      /(#[0-9a-fA-F]{3,6})/g,
      '<span class="token-color" style="color: $1; text-shadow: 0 0 1px rgba(255,255,255,0.8);">$1</span>',
    );

    // 5. Переменные CSS var(--name)
    result = result.replace(/(var\([^)]+\))/g, '<span class="token-variable">$1</span>');

    return result;
  }

  // Парсер HTML-кода
  private highlightHtml(text: string): string {
    let result = text;

    // 1. Теги: &lt;tag или &lt;/tag
    result = result.replace(/(&lt;\/?[a-zA-Z0-9\-]+)/g, '<span class="token-tag">$1</span>');

    // 2. Атрибуты: имя_атрибута=
    result = result.replace(/([a-zA-Z0-9\-]+)=/g, '<span class="token-attr">$1</span>=');

    // 3. Значения атрибутов (строки в кавычках)
    result = result.replace(/(&quot;[^&]+&quot;)/g, '<span class="token-string">$1</span>');

    // 4. HEX-коды внутри инлайновых стилей HTML
    result = result.replace(
      /(#[0-9a-fA-F]{3,6})/g,
      '<span class="token-color" style="color: $1; text-shadow: 0 0 1px rgba(255,255,255,0.8);">$1</span>',
    );

    return result;
  }

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
