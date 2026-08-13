export const PROJECT_JOURNEY_STORAGE_KEY = 'mkloz:case-studies:viewed:v1';

export interface ProjectJourney {
  visited: string[];
  celebrated: boolean;
}

const EMPTY_JOURNEY: ProjectJourney = { visited: [], celebrated: false };

export const normalizeProjectJourney = (value: unknown, projectSlugs: string[]): ProjectJourney => {
  if (!value || typeof value !== 'object') return EMPTY_JOURNEY;

  const stored = value as Partial<ProjectJourney>;
  const validSlugs = new Set(projectSlugs);
  const visited = Array.isArray(stored.visited)
    ? [...new Set(stored.visited.filter((slug): slug is string => typeof slug === 'string' && validSlugs.has(slug)))]
    : [];

  return {
    visited,
    celebrated: visited.length === projectSlugs.length && stored.celebrated === true
  };
};

export const readProjectJourney = (projectSlugs: string[]): ProjectJourney => {
  if (typeof window === 'undefined') return EMPTY_JOURNEY;

  try {
    const storedJourney = window.localStorage.getItem(PROJECT_JOURNEY_STORAGE_KEY);
    return storedJourney ? normalizeProjectJourney(JSON.parse(storedJourney), projectSlugs) : EMPTY_JOURNEY;
  } catch {
    return EMPTY_JOURNEY;
  }
};

export const writeProjectJourney = (journey: ProjectJourney) => {
  try {
    window.localStorage.setItem(PROJECT_JOURNEY_STORAGE_KEY, JSON.stringify(journey));
  } catch {
    // Progress remains available for the current page when storage is unavailable.
  }
};

export const visitProject = (journey: ProjectJourney, projectSlug: string, projectSlugs: string[]): ProjectJourney => {
  const normalizedJourney = normalizeProjectJourney(journey, projectSlugs);
  if (!projectSlugs.includes(projectSlug) || normalizedJourney.visited.includes(projectSlug)) return normalizedJourney;

  return {
    ...normalizedJourney,
    visited: [...normalizedJourney.visited, projectSlug]
  };
};

export const celebrateProjectJourney = (journey: ProjectJourney, projectSlugs: string[]): ProjectJourney => {
  const normalizedJourney = normalizeProjectJourney(journey, projectSlugs);
  return normalizedJourney.visited.length === projectSlugs.length
    ? { ...normalizedJourney, celebrated: true }
    : normalizedJourney;
};
