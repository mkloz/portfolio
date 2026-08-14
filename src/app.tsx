import { Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { InteractionLayer } from './components/common/interaction-layer';
import { LoadingOverlay } from './components/common/loading-overlay';
import { RouteSignal } from './components/common/route-signal';
import { SignalCanvas } from './components/common/signal-canvas';
import { useThemeSync } from './hooks/theme.store';

export const App = () => {
  useThemeSync();
  const [showInitialLoading, setShowInitialLoading] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => setShowInitialLoading(false), reduceMotion ? 80 : 720);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!import.meta.env.PROD || !window.location.hostname.endsWith('mkloz.com')) return;

    const loadAnalytics = () => void import('@vercel/analytics').then(({ inject }) => inject());
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (idleWindow.requestIdleCallback) {
      const handle = idleWindow.requestIdleCallback(loadAnalytics, { timeout: 4000 });
      return () => idleWindow.cancelIdleCallback?.(handle);
    }

    const handle = window.setTimeout(loadAnalytics, 2500);
    return () => window.clearTimeout(handle);
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Suspense fallback={showInitialLoading ? null : <LoadingOverlay />}>
        <Outlet />
      </Suspense>
      {showInitialLoading && <LoadingOverlay initial />}
      <RouteSignal />
      <SignalCanvas />
      <InteractionLayer />
    </div>
  );
};
