import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './app';
import { HomePage } from './pages/home';
import { NotFound } from './pages/not-found';

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
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
