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
  padding: {
    units: ['px', 'rem', 'em'],
    defaultUnit: 'px',
    limits: {
      px: { min: 0, max: 120 },
      rem: { min: 0, max: 8 },
      em: { min: 0, max: 8 },
    },
  },
};
