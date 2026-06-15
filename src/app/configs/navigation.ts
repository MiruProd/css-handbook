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
    title: 'Раздел 1: Базовая разметка и оформление',
    items: [
      {
        id: '1',
        title: 'Введение и базовые концепции',
        route: 'introduction',
        keywords: [
          'анатомия',
          'подключение',
          'inline',
          'internal',
          'external',
          'каскад',
          'наследование',
        ],
      },
      {
        id: '2',
        title: 'Селекторы, приоритет и CSS Nesting',
        route: 'selectors',
        keywords: [
          'селектор',
          'тег',
          'класс',
          'id',
          'атрибут',
          'группировка',
          'специфичность',
          'приоритет',
          'вложенность',
        ],
      },
      {
        id: '3',
        title: 'Блочная модель и поток (display, width, height)',
        route: 'display',
        keywords: ['block', 'inline', 'inline-block', 'none', 'visibility', 'поток', 'размеры'],
      },
      {
        id: '4',
        title: 'Отступы (margin, padding, схлопывание)',
        route: 'box-model',
        keywords: ['padding', 'margin', 'box-sizing', 'content-box', 'border-box', 'схлопывание'],
      },
      {
        id: '5',
        title: 'Обнуляющие стили (Reset и Normalize)',
        route: 'css-resets',
        keywords: ['reset', 'normalize', 'сброс стилей', 'универсальный селектор'],
      },
      {
        id: '6',
        title: 'Шрифты (font-family, @font-face)',
        route: 'fonts',
        keywords: ['шрифты', 'font-family', 'font-face', 'font-weight', 'подключение шрифтов'],
      },
      {
        id: '7',
        title: 'Цвета в CSS (HEX, RGB, HSL)',
        route: 'colors',
        keywords: ['hex', 'rgb', 'rgba', 'hsl', 'hsla', 'currentcolor', 'прозрачность', 'цвет'],
      },
      {
        id: '8',
        title: 'Фоновые изображения и градиенты',
        route: 'background',
        keywords: ['background', 'background-image', 'linear-gradient', 'radial-gradient', 'фоны'],
      },
      {
        id: '9',
        title: 'Рамки, контуры и тени',
        route: 'borders-shadows',
        keywords: [
          'border',
          'outline',
          'box-shadow',
          'text-shadow',
          'border-radius',
          'тени',
          'рамка',
        ],
      },
    ],
  },
  {
    title: 'Раздел 2: Позиционирование и сетки',
    items: [
      {
        id: '10',
        title: 'Позиционирование (position, z-index)',
        route: 'position',
        keywords: [
          'static',
          'relative',
          'absolute',
          'fixed',
          'sticky',
          'z-index',
          'контекст наложения',
        ],
      },
      {
        id: '11',
        title: 'Единицы измерения (px, %, em, rem, vh, vw)',
        route: 'units',
        keywords: ['px', 'em', 'rem', 'percent', 'vw', 'vh', 'относительные', 'абсолютные'],
      },
      {
        id: '12',
        title: 'Flexbox Layout',
        route: 'flexbox',
        keywords: [
          'flex',
          'align-items',
          'justify-content',
          'flex-direction',
          'flex-wrap',
          'order',
        ],
      },
      {
        id: '13',
        title: 'Псевдоэлементы (before, after)',
        route: 'pseudo-elements',
        keywords: ['before', 'after', 'placeholder', 'selection', 'marker', 'псевдоэлементы'],
      },
      {
        id: '14',
        title: 'Псевдоклассы (:hover, :focus, :nth-child)',
        route: 'pseudo-classes',
        keywords: ['hover', 'active', 'focus', 'nth-child', 'not', 'псевдоклассы'],
      },
      {
        id: '15',
        title: 'Grid Layout',
        route: 'grid',
        keywords: ['grid', 'template', 'repeat', 'minmax', 'gap', 'сетка', 'колонки'],
      },
    ],
  },
  {
    title: 'Раздел 3: Тонкая настройка и динамика',
    items: [
      {
        id: '16',
        title: 'Переполнение и видимость (overflow, opacity)',
        route: 'overflow',
        keywords: ['overflow', 'opacity', 'visibility', 'clip-path', 'переполнение', 'скрытие'],
      },
      {
        id: '17',
        title: 'Взаимодействие (cursor, pointer-events)',
        route: 'interactivity',
        keywords: ['cursor', 'pointer-events', 'user-select', 'взаимодействие'],
      },
      {
        id: '18',
        title: 'Переходы и трансформации',
        route: 'transitions-transforms',
        keywords: ['transition', 'transform', 'scale', 'rotate', 'translate', 'плавность'],
      },
      {
        id: '19',
        title: 'Анимации (@keyframes, animation)',
        route: 'animations',
        keywords: ['keyframes', 'animation', 'infinite', 'кадры', 'анимация'],
      },
      {
        id: '20',
        title: 'Адаптивная верстка (@media)',
        route: 'responsive',
        keywords: ['media', 'viewport', 'breakpoint', 'адаптивность', 'медиа-запросы'],
      },
      {
        id: '21',
        title: 'Устаревшие и новые свойства',
        route: 'logical-legacy',
        keywords: ['float', 'clear', 'logical-properties', 'aspect-ratio'],
      },
      {
        id: '22',
        title: 'CSS-переменные (var)',
        route: 'css-variables',
        keywords: ['var', 'custom-properties', 'root', 'переменные'],
      },
      {
        id: '23',
        title: 'Математические функции',
        route: 'math-functions',
        keywords: ['calc', 'min', 'max', 'clamp', 'математика', 'расчеты'],
      },
    ],
  },
];
