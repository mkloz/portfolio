import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './app';

const HomePage = lazy(() => import('./pages/home').then(({ HomePage }) => ({ default: HomePage })));
const ProjectDetailRoute = lazy(() =>
  import('./pages/project-detail/route').then(({ ProjectDetailRoute }) => ({ default: ProjectDetailRoute }))
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
  return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
};
