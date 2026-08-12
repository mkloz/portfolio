import { useParams } from 'react-router-dom';

import { ProjectService } from '@/services/project.service';

import { NotFound } from '../not-found';
import { ProjectDetailPage } from '.';

export const ProjectDetailRoute = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const project = projectSlug ? ProjectService.getProjectBySlug(projectSlug) : undefined;

  if (!project) {
    return <NotFound />;
  }

  return <ProjectDetailPage key={project.slug} project={project} />;
};
