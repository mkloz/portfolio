import { describe, expect, it } from 'vitest';

import { projectSummaries } from './project-summaries';
import { projects } from './projects';

describe('project summaries', () => {
  it('show the same description and lines-of-code count on cards and case studies', () => {
    for (const summary of projectSummaries) {
      const project = projects.find(({ slug }) => slug === summary.slug);

      expect(project?.description, summary.slug).toBe(summary.description);
      expect(project?.stats.linesOfCode, summary.slug).toBe(summary.linesOfCode);
    }
  });
});
