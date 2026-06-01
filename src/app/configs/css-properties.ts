export interface UnitLimit {
  min: number;
  max: number;
}

export interface PropertyConfig {
  units: string[];
  defaultUnit: string;
  limits: { [unit: string]: UnitLimit };
}

export const CSS_PROPERTIES_CONFIG: Record<string, PropertyConfig> = {
  'border-radius': {
    units: ['px', 'rem', 'em', '%'],
    defaultUnit: 'px',
    limits: {
      px: { min: 0, max: 150 },
      rem: { min: 0, max: 10 },
      em: { min: 0, max: 10 },
      '%': { min: 0, max: 50 },
    },
  },
  width: {
    units: ['px', 'rem', 'em', '%', 'vw', 'vh', 'ch'],
    defaultUnit: 'px',
    limits: {
      px: { min: 50, max: 400 },
      rem: { min: 3, max: 25 },
      em: { min: 3, max: 25 },
      '%': { min: 10, max: 100 },
      vw: { min: 10, max: 100 },
      vh: { min: 10, max: 100 },
      ch: { min: 5, max: 40 },
    },
  },
  height: {
    units: ['px', 'rem', 'em', '%'],
    defaultUnit: 'px',
    limits: {
      px: { min: 50, max: 300 },
      rem: { min: 3, max: 18 },
      em: { min: 3, max: 18 },
      '%': { min: 10, max: 100 },
    },
  },
  padding: {
    units: ['px', 'rem', 'em'],
    defaultUnit: 'px',
    limits: {
      px: { min: 0, max: 120 },
      rem: { min: 0, max: 8 },
      em: { min: 0, max: 8 },
    },
  },
  'border-width': {
    units: ['px', 'rem', 'em'],
    defaultUnit: 'px',
    limits: {
      px: { min: 0, max: 30 },
      rem: { min: 0, max: 2 },
      em: { min: 0, max: 2 },
    },
  },
  margin: {
    units: ['px', 'rem', 'em'],
    defaultUnit: 'px',
    limits: {
      px: { min: 0, max: 100 },
      rem: { min: 0, max: 6 },
      em: { min: 0, max: 6 },
    },
  },
  'font-size': {
    units: ['px', 'rem', 'em'],
    defaultUnit: 'rem',
    limits: {
      px: { min: 12, max: 36 },
      rem: { min: 0.5, max: 3 },
      em: { min: 0.5, max: 3 },
    },
  },

  // ПАРАМЕТРЫ СИМУЛЯЦИИ ОКРУЖЕНИЯ (VIEWPORT & CONTAINER CONTEXTS)
  'root-font-size': {
    units: ['px'],
    defaultUnit: 'px',
    limits: {
      px: { min: 10, max: 24 },
    },
  },
  'parent-font-size': {
    units: ['px'],
    defaultUnit: 'px',
    limits: {
      px: { min: 10, max: 36 },
    },
  },
  'viewport-width': {
    units: ['px'],
    defaultUnit: 'px',
    limits: {
      px: { min: 280, max: 650 },
    },
  },
  'viewport-height': {
    units: ['px'],
    defaultUnit: 'px',
    limits: {
      px: { min: 150, max: 400 },
    },
  },
  'parent-width': {
    units: ['%'],
    defaultUnit: '%',
    limits: {
      '%': { min: 40, max: 100 },
    },
  },
  'parent-height': {
    units: ['px'],
    defaultUnit: 'px',
    limits: {
      px: { min: 100, max: 300 },
    },
  },
};
