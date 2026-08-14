import { Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { InteractionLayer } from './components/common/interaction-layer';
import { LoadingOverlay } from './components/common/loading-overlay';
import { RouteSignal } from './components/common/route-signal';
import { Seo } from './components/common/seo';
import { SignalCanvas } from './components/common/signal-canvas';
import { useThemeSync } from './hooks/theme.store';

type InitialLoadingPhase = 'entering' | 'visible' | 'exiting' | 'hidden';

export const App = () => {
  useThemeSync();
  const [initialLoadingPhase, setInitialLoadingPhase] = useState<InitialLoadingPhase>('entering');

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      const timer = window.setTimeout(() => setInitialLoadingPhase('hidden'), 80);
      return () => window.clearTimeout(timer);
    }

    const visibleTimer = window.setTimeout(() => setInitialLoadingPhase('visible'), 760);
    const exitTimer = window.setTimeout(() => setInitialLoadingPhase('exiting'), 1740);
    const unmountTimer = window.setTimeout(() => setInitialLoadingPhase('hidden'), 2820);

    return () => {
      window.clearTimeout(visibleTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(unmountTimer);
    };
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

  useEffect(() => {
    if (initialLoadingPhase === 'hidden') return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [initialLoadingPhase]);

  const showInitialLoading = initialLoadingPhase !== 'hidden';

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Seo />
      <Suspense fallback={showInitialLoading ? null : <LoadingOverlay />}>
        <Outlet />
      </Suspense>
      {showInitialLoading && <LoadingOverlay initial phase={initialLoadingPhase} />}
      <RouteSignal />
      <SignalCanvas />
      <InteractionLayer />
    </div>
  );
};
