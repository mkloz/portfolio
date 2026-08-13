import { lazy, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './app';
import { loadHomeRoute, loadProjectRoute } from './lib/route-preload';

const HomePage = lazy(() => loadHomeRoute().then(({ HomePage }) => ({ default: HomePage })));
const ProjectDetailRoute = lazy(() =>
  loadProjectRoute().then(({ ProjectDetailRoute }) => ({ default: ProjectDetailRoute }))
);

const Success = lazy(() => import('./pages/home/contact/success'));
const NotFound = lazy(() => import('./pages/not-found').then(({ NotFound }) => ({ default: NotFound })));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/projects/:projectSlug',
        element: <ProjectDetailRoute />
      },
      {
        path: '/contact/success',
        element: <Success />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export const Router = () => {
  useEffect(() => {
    const preload = () => void Promise.all([loadHomeRoute(), loadProjectRoute()]);
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (idleWindow.requestIdleCallback) {
      const handle = idleWindow.requestIdleCallback(preload, { timeout: 1500 });
      return () => idleWindow.cancelIdleCallback?.(handle);
    }

    const handle = window.setTimeout(preload, 250);
    return () => window.clearTimeout(handle);
  }, []);

  return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
};
