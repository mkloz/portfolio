import { Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { InteractionLayer } from './components/common/interaction-layer';
import { LoadingOverlay } from './components/common/loading-overlay';
import { RouteMetadata } from './components/common/route-metadata';
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

  return (
    <div className="min-h-screen transition-colors duration-300">
      <RouteMetadata />
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
