import { Analytics } from '@vercel/analytics/react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingOverlay } from './components/common/loading-overlay';
import { PointerLabel } from './components/common/pointer-label';
import { Toaster } from './components/ui/sonner';
import { useThemeSync } from './hooks/theme.store';

export const App = () => {
  useThemeSync();

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Suspense fallback={<LoadingOverlay />}>
        <Outlet />
      </Suspense>
      <PointerLabel />
      <Toaster expand />
      <Analytics />
    </div>
  );
};
