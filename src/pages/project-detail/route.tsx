import { lazy } from 'react';
import { useParams } from 'react-router-dom';

import { NotFound } from '../not-found';
import { ProjectDetailPage } from '.';

const PROJECT_ROUTES = {
  uevent: lazy(() =>
    import('@/data/projects/uevent').then(({ ueventProject }) => ({
      default: () => <ProjectDetailPage project={ueventProject} />
    }))
  ),
  webster: lazy(() =>
    import('@/data/projects/webster').then(({ websterProject }) => ({
      default: () => <ProjectDetailPage project={websterProject} />
    }))
  ),
  chronos: lazy(() =>
    import('@/data/projects/chronos').then(({ chronosProject }) => ({
      default: () => <ProjectDetailPage project={chronosProject} />
    }))
  ),
  usof: lazy(() =>
    import('@/data/projects/usof').then(({ usofProject }) => ({
      default: () => <ProjectDetailPage project={usofProject} />
    }))
  ),
  portfolio: lazy(() =>
    import('@/data/projects/portfolio').then(({ portfolioProject }) => ({
      default: () => <ProjectDetailPage project={portfolioProject} />
    }))
  ),
  citywheels: lazy(() =>
    import('@/data/projects/citywheels').then(({ citywheelsProject }) => ({
      default: () => <ProjectDetailPage project={citywheelsProject} />
    }))
  )
} as const;

export const ProjectDetailRoute = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const ProjectRoute = projectSlug ? PROJECT_ROUTES[projectSlug as keyof typeof PROJECT_ROUTES] : undefined;

  if (!ProjectRoute) {
    return <NotFound />;
  }

  return <ProjectRoute key={projectSlug} />;
};
