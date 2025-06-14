import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './app';
import { HomePage } from './pages/home';
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
      {
        path: '/projects/:slug',
        element: <ProjectDetailPage />
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
