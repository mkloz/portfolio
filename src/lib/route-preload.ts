export const loadHomeRoute = () => import('@/pages/home');

export const loadProjectRoute = () => import('@/pages/project-detail/route');

export const preloadPortfolioRoute = (to: string) => {
  if (to.startsWith('/projects/')) return loadProjectRoute();
  if (to === '/' || to.startsWith('/#')) return loadHomeRoute();
  return Promise.resolve();
};
