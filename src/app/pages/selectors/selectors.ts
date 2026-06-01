import { Component, signal, computed } from '@angular/core';
import { NgClass } from '@angular/common';
import { CodeBlock } from '../../components/code-block/code-block';
import { InfoBlock } from '../../components/info-block/info-block';

interface SelectorTheory {
  title: string;
  specificity: string;
  description: string;
  bestPractice: string;
}

@Component({
  selector: 'app-selectors',
  standalone: true,
  imports: [NgClass, CodeBlock, InfoBlock],
  templateUrl: './selectors.html',
  styleUrl: './selectors.scss',
})
export class Selectors {
  // Активный тип селектора
  protected readonly activeType = signal<
    'universal' | 'type' | 'class' | 'id' | 'attribute' | 'grouping'
  >('class');

  // Учебный CSS-код с понятными HEX-цветами для демонстрации студентам в блоке кода
  protected readonly selectorCssCode = computed(() => {
    switch (this.activeType()) {
      case 'universal':
        return `* {
  border: 2px dashed #1c7ed6;
  background-color: #e7f5ff;
}`;
      case 'type':
        return `p {
  background-color: #ffd8a8;
  color: #d9480f;
}`;
      case 'class':
        return `.text-highlight {
  background-color: #ebfbee;
  color: #2b8a3e;
  font-weight: 600;
}`;
      case 'id':
        return `#special-paragraph {
  border-left: 4px solid #e67e22;
  padding-left: 0.75rem;
  font-style: italic;
}`;
      case 'attribute':
        return `[data-type="accent"] {
  background-color: #e7f5ff;
  color: #1c7ed6;
  border-color: #1c7ed6;
}`;
      case 'grouping':
        return `h3, button {
  text-transform: uppercase;
  letter-spacing: 0.5px;
}`;
    }
  });

  // Реактивная теория, динамически меняющаяся при переключении селектора
  protected readonly activeTheory = computed<SelectorTheory>(() => {
    switch (this.activeType()) {
      case 'universal':
        return {
          title: 'Универсальный селектор (*)',
          specificity: '0, 0, 0 (Самый низкий приоритет)',
          description:
            'Выбирает абсолютно все элементы в документе. Так как браузеру приходится обрабатывать каждый узел дерева DOM, избыточное использование универсального селектора может замедлить рендеринг страницы.',
          bestPractice:
            'Используется преимущественно на самом верхнем уровне стилей для глобального сброса отступов (reset.css) или установки правила box-sizing: border-box для всех элементов.',
        };
      case 'type':
        return {
          title: 'Селектор типа / тега (p)',
          specificity: '0, 0, 1',
          description:
            'Напрямую нацеливается на HTML-элементы по их имени. Правила CSS будут применены ко всем тегам этого типа на всей странице без исключения.',
          bestPractice:
            'Отлично подходит для настройки глобальной типографики сайта (базовые шрифты, высота строк у p, h1-h6, списков ul/ol), формируя базовый слой оформления.',
        };
      case 'class':
        return {
          title: 'Селектор класса (.text-highlight)',
          specificity: '0, 1, 0 (Умеренный вес)',
          description:
            'Выбирает элементы на основе класса. Один класс можно присвоить неограниченному количеству тегов, а одному тегу — задать множество разных классов через пробел.',
          bestPractice:
            'Фундамент современной верстки. Обладает идеальным весом специфичности — его легко переопределить другими классами и при этом он не засоряет глобальные стили тегов.',
        };
      case 'id':
        return {
          title: 'Селектор идентификатора (#id)',
          specificity: '1, 0, 0 (Критически высокий вес!)',
          description:
            'Нацеливается на единственный элемент с уникальным ID на странице. Обладает слишком высоким приоритетом, который практически невозможно перекрыть обычными классами.',
          bestPractice:
            'Избегайте использования ID для написания стилей. Это считается антипаттерном. ID лучше оставить исключительно в качестве якорей для ссылок или для работы скриптов в JS.',
        };
      case 'attribute':
        return {
          title: 'Селектор атрибута ([data-type="accent"])',
          specificity: '0, 1, 0 (Равна специфичности класса)',
          description:
            'Находит элементы по наличию конкретного HTML-атрибута или по совпадению его точного значения. Позволяет тонко настраивать стили без создания лишних классов.',
          bestPractice:
            'Широко применяется для кастомизации элементов форм (например, inputs по типу: [type="text"]), состояний кнопок ([disabled]) или при интеграции стилей с JS через data-атрибуты.',
        };
      case 'grouping':
        return {
          title: 'Группировка селекторов (A, B)',
          specificity: 'Каждый селектор рассчитывается отдельно',
          description:
            'Позволяет перечислить селекторы через запятую, чтобы применить к ним один и тот же блок CSS-деклараций, избавляя код от дублирования.',
          bestPractice:
            'Позволяет писать лаконичный DRY-код. Обратите внимание: если один из селекторов в группе окажется невалидным, браузер может проигнорировать все объединенное правило целиком.',
        };
    }
  });
}
