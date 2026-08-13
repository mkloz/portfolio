import { describe, expect, it } from 'vitest';

import { projects } from '@/data/projects';

import { ProjectService } from './project.service';

describe('ProjectService', () => {
  it('resolves project routes by slug', () => {
    const project = projects[0];

    expect(ProjectService.getProjectBySlug(project.slug)).toBe(project);
    expect(ProjectService.getProjectBySlug('missing-project')).toBeUndefined();
  });

  it('returns stable related projects without the current project', () => {
    const currentProject = projects[1];
    const expectedProjects = projects.slice(2, 5);

    expect(ProjectService.getRelatedProjects(currentProject.slug)).toEqual(expectedProjects);
    expect(ProjectService.getRelatedProjects(currentProject.slug)).toEqual(expectedProjects);
  });

  it('wraps related projects at the end of the portfolio', () => {
    const currentProject = projects.at(-1);

    expect(currentProject).toBeDefined();
    expect(ProjectService.getRelatedProjects(currentProject!.slug)).toEqual(projects.slice(0, 3));
  });

  it('exposes the deliberate recruiter-facing priority ranking', () => {
    expect(projects.map((project) => project.slug)).toEqual([
      'uevent',
      'webster',
      'chronos',
      'usof',
      'portfolio',
      'citywheels'
    ]);
    expect(ProjectService.getPriorityRank('uevent')).toBe(1);
    expect(ProjectService.getPriorityRank('citywheels')).toBe(6);
    expect(ProjectService.getPriorityRank('missing-project')).toBeUndefined();
  });

  it('advances through project footers by priority and wraps to the strongest project', () => {
    expect(ProjectService.getNextPriorityProject('uevent')?.slug).toBe('webster');
    expect(ProjectService.getNextPriorityProject('webster')?.slug).toBe('chronos');
    expect(ProjectService.getNextPriorityProject('citywheels')?.slug).toBe('uevent');
    expect(ProjectService.getNextPriorityProject('missing-project')?.slug).toBe('uevent');
  });
});
