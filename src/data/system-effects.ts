export type SystemEffectVariant = 'grid' | 'particles' | 'decrypt';

export const SYSTEM_EFFECT_META = {
  Frontend: {
    effect: 'grid',
    color: '#ffd400',
    canvasTint: [1, 0.83, 0] as [number, number, number]
  },
  Backend: {
    effect: 'particles',
    color: '#465bff',
    canvasTint: [0.275, 0.357, 1] as [number, number, number]
  },
  Database: {
    effect: 'decrypt',
    color: '#74f0b3',
    canvasTint: [0.455, 0.941, 0.702] as [number, number, number]
  },
  DevOps: {
    effect: 'particles',
    color: '#ff583d',
    canvasTint: [1, 0.345, 0.239] as [number, number, number]
  },
  Tools: {
    effect: 'decrypt',
    color: '#6c4eff',
    canvasTint: [0.424, 0.306, 1] as [number, number, number]
  },
  'Full-Stack': {
    effect: 'grid',
    color: '#6c4eff',
    canvasTint: [0.424, 0.306, 1] as [number, number, number]
  }
} as const satisfies Record<
  string,
  { effect: SystemEffectVariant; color: string; canvasTint: [number, number, number] }
>;
