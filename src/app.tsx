import { Analytics } from '@vercel/analytics/react';
import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingOverlay } from './components/common/loading-overlay';
import { Toaster } from './components/ui/sonner';
import { useThemeSync } from './hooks/theme.store';

const DevTools = import.meta.env.DEV
  ? lazy(() => import('./components/dev/dev-tools').then(({ DevTools }) => ({ default: DevTools })))
  : null;

export const App = () => {
  useThemeSync();

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Suspense fallback={<LoadingOverlay />}>
        <Outlet />
      </Suspense>
      <Toaster expand />
      <Analytics />
      {DevTools && (
        <Suspense>
          <DevTools />
        </Suspense>
      )}
    </div>
  );
};
