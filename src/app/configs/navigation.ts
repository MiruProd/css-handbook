export interface NavigationItem {
  id: string;
  title: string;
  route: string;
  keywords: string[];
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export const NAVIGATION_CONFIG: NavigationSection[] = [
  {
    title: 'Блок 1: Фундамент (Основы)',
    items: [
      {
        id: '1.1',
        title: 'Введение в CSS',
        route: 'introduction',
        keywords: [
          'анатомия',
          'правило',
          'подключение',
          'inline',
          'internal',
          'external',
          'инлайновые',
          'внешние',
          'внутренние',
          'база',
          'синтаксис',
        ],
      },
      {
        id: '1.2',
        title: 'Базовые селекторы',
        route: 'selectors',
        keywords: ['селектор', 'тег', 'класс', 'id', 'атрибут', 'группировка', 'универсальный'],
      },
      {
        id: '1.3',
        title: 'Блочная модель',
        route: 'box-model',
        keywords: [
          'padding',
          'border',
          'margin',
          'box-sizing',
          'content-box',
          'border-box',
          'размеры',
        ],
      },
      {
        id: '1.4',
        title: 'Display и Поток документа',
        route: 'display',
        keywords: [
          'block',
          'inline',
          'inline-block',
          'none',
          'visibility',
          'hidden',
          'базовый',
          'поток',
          'normal flow',
          'строчные',
          'блочные',
        ],
      },
      {
        id: '1.5',
        title: 'Единицы измерения',
        route: 'units',
        keywords: ['px', 'em', 'rem', 'percent', 'vw', 'vh', 'относительные', 'абсолютные'],
      },
      {
        id: '1.6',
        title: 'Цвета в CSS',
        route: 'colors',
        keywords: ['hex', 'rgb', 'rgba', 'hsl', 'hsla', 'currentcolor', 'прозрачность', 'цвет'],
      },
    ],
  },
  {
    title: 'Блок 2: Позиционирование и сетки',
    items: [
      {
        id: '2.1',
        title: 'Свойство Position',
        route: 'position',
        keywords: ['static', 'relative', 'absolute', 'fixed', 'sticky', 'z-index', 'слои'],
      },
      {
        id: '2.2',
        title: 'Flexbox',
        route: 'flexbox',
        keywords: [
          'flex',
          'align-items',
          'justify-content',
          'flex-direction',
          'flex-wrap',
          'align-self',
          'order',
          'контейнер',
          'элементы',
        ],
      },
      {
        id: '2.3',
        title: 'CSS Grid & Subgrid',
        route: 'grid',
        keywords: [
          'grid',
          'template',
          'repeat',
          'minmax',
          'gap',
          'subgrid',
          'сетка',
          'колонки',
          'строки',
          'сабгрид',
        ],
      },
      {
        id: '2.4',
        title: 'Legacy-разметка',
        route: 'legacy-layout',
        keywords: ['float', 'clear', 'clearfix', 'таблицы', 'флоаты'],
      },
    ],
  },
  {
    title: 'Блок 3: Оформление текста',
    items: [
      {
        id: '3.1',
        title: 'Шрифты',
        route: 'fonts',
        keywords: ['font-family', 'font-size', 'font-face', 'подключение', 'гарнитура', 'шрифт'],
      },
      {
        id: '3.2',
        title: 'Стилизация текста',
        route: 'text-styling',
        keywords: [
          'line-height',
          'letter-spacing',
          'text-align',
          'text-transform',
          'высота строки',
          'выравнивание',
        ],
      },
      {
        id: '3.3',
        title: 'Работа с переполнением',
        route: 'overflow',
        keywords: ['white-space', 'text-overflow', 'word-break', 'ellipsis', 'скрытие', 'перенос'],
      },
    ],
  },
  {
    title: 'Блок 4: Каскад и наследование',
    items: [
      {
        id: '4.1',
        title: 'Наследование свойств',
        route: 'inheritance',
        keywords: ['inherit', 'initial', 'unset', 'revert', 'свойства', 'наследование'],
      },
      {
        id: '4.2',
        title: 'Каскад и специфичность',
        route: 'cascade-specificity',
        keywords: ['каскад', 'специфичность', 'вес', 'приоритет', 'селекторы'],
      },
      {
        id: '4.3',
        title: 'Директива !important',
        route: 'important',
        keywords: ['important', 'приоритет', 'важно', 'переопределение'],
      },
    ],
  },
  {
    title: 'Блок 5: Декорирование',
    items: [
      {
        id: '5.1',
        title: 'Фон',
        route: 'background',
        keywords: [
          'background-color',
          'background-image',
          'gradient',
          'linear',
          'radial',
          'градиент',
          'задний фон',
        ],
      },
      {
        id: '5.2',
        title: 'Скругления и тени',
        route: 'borders-shadows',
        keywords: ['border-radius', 'box-shadow', 'text-shadow', 'тени', 'скругление'],
      },
      {
        id: '5.3',
        title: 'Границы и контуры',
        route: 'border-outline',
        keywords: ['border', 'outline', 'рамка', 'контур', 'отличия'],
      },
      {
        id: '5.4',
        title: 'Эффекты',
        route: 'css-effects',
        keywords: ['filter', 'mix-blend-mode', 'blur', 'contrast', 'смешивание', 'размытие'],
      },
    ],
  },
  {
    title: 'Блок 6: Адаптивность и современные функции',
    items: [
      {
        id: '6.1',
        title: 'Адаптивный дизайн',
        route: 'responsive-design',
        keywords: ['media', 'viewport', 'breakpoint', 'адаптивность', 'медиа-запросы'],
      },
      {
        id: '6.2',
        title: 'CSS-переменные',
        route: 'css-variables',
        keywords: ['var', 'custom-properties', 'root', 'темы', 'переменные'],
      },
      {
        id: '6.3',
        title: 'Математические функции',
        route: 'math-functions',
        keywords: ['calc', 'min', 'max', 'clamp', 'математика', 'расчеты'],
      },
      {
        id: '6.4',
        title: 'Контейнерные запросы',
        route: 'container-queries',
        keywords: ['container', 'адаптив', 'контейнерные запросы', 'современный'],
      },
      {
        id: '6.5',
        title: 'Нативная вложенность (CSS Nesting)',
        route: 'css-nesting',
        keywords: ['nesting', 'вложенность', 'амперсанд', '&', 'нативный', 'css nesting'],
      },
      {
        id: '6.6',
        title: 'Логические свойства',
        route: 'logical-properties',
        keywords: [
          'logical',
          'logical properties',
          'margin-inline',
          'padding-block',
          'inset',
          'start',
          'end',
          'логические свойства',
        ],
      },
      {
        id: '6.7',
        title: 'Пропорции и размеры (aspect-ratio)',
        route: 'aspect-ratio',
        keywords: ['aspect-ratio', 'ratio', 'aspect', 'пропорции', 'размеры', 'соотношение сторон'],
      },
    ],
  },
  {
    title: 'Блок 7: Динамика',
    items: [
      {
        id: '7.1',
        title: 'Трансформации',
        route: 'transform',
        keywords: [
          'transform',
          'translate',
          'rotate',
          'scale',
          'skew',
          'сдвиг',
          'поворот',
          'масштаб',
        ],
      },
      {
        id: '7.2',
        title: 'Плавные переходы',
        route: 'transition',
        keywords: [
          'transition',
          'transition-delay',
          'ease',
          'cubic-bezier',
          'плавность',
          'анимация',
        ],
      },
      {
        id: '7.3',
        title: 'Кадровые анимации',
        route: 'animations',
        keywords: ['keyframes', 'animation', 'infinite', 'steps', 'кадры', 'анимация'],
      },
    ],
  },
  {
    title: 'Блок 8: Продвинутые селекторы',
    items: [
      {
        id: '8.1',
        title: 'Сложные селекторы',
        route: 'complex-selectors',
        keywords: ['селекторы', 'комбинаторы', 'дочерние', 'соседние', 'родственные'],
      },
      {
        id: '8.2',
        title: 'Псевдоклассы состояния',
        route: 'pseudo-classes-state',
        keywords: ['hover', 'focus', 'active', 'disabled', 'состояние'],
      },
      {
        id: '8.3',
        title: 'Структурные псевдоклассы',
        route: 'pseudo-classes-structural',
        keywords: ['nth-child', 'first-child', 'last-child', 'not', 'структура'],
      },
      {
        id: '8.4',
        title: 'Логические псевдоклассы',
        route: 'pseudo-classes-logical',
        keywords: ['is', 'where', 'has', 'логика', 'родительский'],
      },
      {
        id: '8.5',
        title: 'Псевдоэлементы',
        route: 'pseudo-elements',
        keywords: ['before', 'after', 'placeholder', 'псевдоэлементы', 'верстка'],
      },
    ],
  },
  {
    title: 'Блок 9: Архитектура кода',
    items: [
      {
        id: '9.1',
        title: 'Методология БЭМ',
        route: 'bem',
        keywords: ['бэм', 'блок', 'элемент', 'модификатор', 'классы', 'именование'],
      },
      {
        id: '9.2',
        title: 'Препроцессоры',
        route: 'preprocessors',
        keywords: ['scss', 'sass', 'nesting', 'variables', 'mixins', 'препроцессоры'],
      },
    ],
  },
];
