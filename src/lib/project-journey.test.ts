import { describe, expect, it } from 'vitest';

import { celebrateProjectJourney, normalizeProjectJourney, visitProject } from './project-journey';

const projectSlugs = ['uevent', 'webster', 'chronos'];

describe('project journey', () => {
  it('keeps unique valid project visits in their viewing order', () => {
    const stored = normalizeProjectJourney(
      { visited: ['webster', 'missing', 'webster', 'uevent'], celebrated: false },
      projectSlugs
    );

    expect(stored).toEqual({ visited: ['webster', 'uevent'], celebrated: false });
    expect(visitProject(stored, 'chronos', projectSlugs).visited).toEqual(['webster', 'uevent', 'chronos']);
  });

  it('does not mark an incomplete journey as celebrated', () => {
    expect(celebrateProjectJourney({ visited: ['uevent'], celebrated: false }, projectSlugs).celebrated).toBe(false);
  });

  it('marks a completed journey as celebrated once every project is visited', () => {
    expect(
      celebrateProjectJourney({ visited: ['uevent', 'webster', 'chronos'], celebrated: false }, projectSlugs)
    ).toEqual({ visited: ['uevent', 'webster', 'chronos'], celebrated: true });
  });
});
