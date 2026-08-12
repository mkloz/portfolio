export interface ProjectAccent {
  background: string;
  foreground: '#080808' | '#ffffff';
}

const PROJECT_ACCENTS: Record<string, ProjectAccent> = {
  uevent: { background: '#6c4eff', foreground: '#ffffff' },
  webster: { background: '#ff583d', foreground: '#080808' },
  chronos: { background: '#ffd400', foreground: '#080808' },
  usof: { background: '#3d5afe', foreground: '#ffffff' },
  portfolio: { background: '#74f0b3', foreground: '#080808' },
  citywheels: { background: '#ff8a30', foreground: '#080808' }
};

export const getProjectAccent = (slug: string): ProjectAccent =>
  PROJECT_ACCENTS[slug] ?? { background: '#ffd400', foreground: '#080808' };
