import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './app';
import projects from './data/projects';
import { HomePage } from './pages/home';
import Success from './pages/home/contact/success';
import { NotFound } from './pages/not-found';
import { ProjectDetailPage } from './pages/project-detail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      ...projects.map((project) => ({
        path: `/projects/${project.slug}`,
        element: <ProjectDetailPage project={project} />
      })),
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
  return <RouterProvider router={router} />;
};
