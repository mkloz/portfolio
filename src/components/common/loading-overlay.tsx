import { type CSSProperties, useEffect, useMemo, useState } from 'react';

const GRID_COLUMNS = 12;
const GRID_ROWS = 8;
const TOTAL_TILES = GRID_COLUMNS * GRID_ROWS;

type LoadingPhase = 'entering' | 'visible' | 'exiting' | 'hidden';

type TileMotion = CSSProperties & {
  '--tile-column': number;
  '--tile-row': number;
  '--tile-enter-delay': string;
  '--tile-exit-delay': string;
  '--tile-x': string;
  '--tile-y': string;
  '--tile-rotation': string;
};

const getTileMotion = (index: number): TileMotion => {
  const column = index % GRID_COLUMNS;
  const row = Math.floor(index / GRID_COLUMNS);
  const horizontalDirection = column < GRID_COLUMNS / 2 ? -1 : 1;
  const verticalDirection = row < GRID_ROWS / 2 ? -1 : 1;
  const distanceFromCenter = Math.hypot(column - (GRID_COLUMNS - 1) / 2, row - (GRID_ROWS - 1) / 2);
  const edgeDistance = Math.min(column, GRID_COLUMNS - 1 - column, row, GRID_ROWS - 1 - row);
  const horizontalExit = (index + row) % 3 !== 1;

  return {
    '--tile-column': column + 1,
    '--tile-row': row + 1,
    '--tile-enter-delay': `${Math.round(edgeDistance * 38 + ((column * 17 + row * 29) % 72))}ms`,
    '--tile-exit-delay': `${Math.round(distanceFromCenter * 34 + ((column * 11 + row * 7) % 54))}ms`,
    '--tile-x': horizontalExit
      ? `${horizontalDirection * (72 + (column % 4) * 12)}vw`
      : `${horizontalDirection * 16}vw`,
    '--tile-y': horizontalExit ? `${verticalDirection * 18}vh` : `${verticalDirection * (82 + (row % 3) * 12)}vh`,
    '--tile-rotation': `${horizontalDirection * verticalDirection * (2 + ((column + row) % 4))}deg`
  };
};

const getLoadingStage = (progress: number) => {
  if (progress < 34) return 'Getting things ready';
  if (progress < 72) return 'Loading project images';
  if (progress < 100) return 'Adding the finishing touches';
  return 'Ready';
};

export const LoadingOverlay = ({ initial = false, phase = 'visible' }: { initial?: boolean; phase?: LoadingPhase }) => {
  const [progress, setProgress] = useState(initial ? 0 : 36);
  const tiles = useMemo(() => Array.from({ length: TOTAL_TILES }, (_, index) => getTileMotion(index)), []);

  useEffect(() => {
    if (!initial) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setProgress(100);
      return;
    }

    const startedAt = performance.now();
    const duration = 1640;
    let frame = 0;

    const updateProgress = (now: number) => {
      const elapsed = Math.min((now - startedAt) / duration, 1);
      setProgress(Math.min(100, Math.round(elapsed * 100)));

      if (elapsed < 1) frame = window.requestAnimationFrame(updateProgress);
    };

    frame = window.requestAnimationFrame(updateProgress);
    return () => window.cancelAnimationFrame(frame);
  }, [initial]);

  const initialPhaseClass = initial ? `initial-loading-overlay loading-overlay-${phase}` : 'loading-stage-loop';
  const stage = initial ? getLoadingStage(progress) : 'Opening page';

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading portfolio: ${stage}`}
      className={`${initialPhaseClass} loading-stage fixed inset-0 z-[190] h-svh w-full overflow-hidden text-[#f4f2ed]`}
      data-loading-phase={initial ? phase : undefined}>
      <div className="loading-tile-matrix absolute inset-0" aria-hidden="true">
        {tiles.map((style, index) => (
          <span key={index} className="loading-tile" style={style} />
        ))}
      </div>

      <div className="loading-stage-shell content-shell relative z-10 flex h-full flex-col px-5 md:px-8 lg:px-12">
        <header className="loading-meta flex min-h-16 items-center justify-between gap-5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/55 md:min-h-20 md:text-xs">
          <span>MK / Portfolio</span>
          <span aria-hidden="true">2026</span>
        </header>

        <div className="loading-stage-body grid flex-1 content-center gap-7 py-8 md:grid-cols-12 md:content-end md:items-end md:gap-10 md:pb-12">
          <div className="loading-status-copy md:col-span-8">
            <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/55 md:text-xs">
              Opening portfolio
            </p>
            <p
              className="loading-stage-title mt-3 font-black uppercase leading-[0.78] tracking-[-0.065em]"
              aria-hidden="true">
              Almost there<span className="text-[#ff583d]">.</span>
            </p>
          </div>

          <div className="loading-progress-readout md:col-span-4 md:pb-1">
            <span className="loading-progress-number block font-mono text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-none tracking-[-0.08em] tabular-nums">
              {String(progress).padStart(3, '0')}
            </span>
            <div className="mt-5 flex items-center justify-between gap-4 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/55 md:text-xs">
              <span>{stage}</span>
              <span>{progress}%</span>
            </div>
          </div>
        </div>

        <div className="loading-progress-track relative h-3 overflow-hidden border border-white/30" aria-hidden="true">
          <span
            className="loading-progress-fill absolute inset-y-0 left-0"
            style={initial ? { transform: `scaleX(${progress / 100})` } : undefined}
          />
          <span className="absolute inset-0 grid grid-cols-4">
            <span />
            <span className="border-l border-white/35" />
            <span className="border-l border-white/35" />
            <span className="border-l border-white/35" />
          </span>
        </div>

        <footer className="loading-stage-footer grid min-h-16 grid-cols-3 items-center gap-3 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.11em] text-white/45 md:min-h-20 md:text-xs">
          <span className={progress >= 1 ? 'is-complete' : ''}>Pages</span>
          <span className={`text-center ${progress >= 34 ? 'is-complete' : ''}`}>Images</span>
          <span className={`text-right ${progress >= 72 ? 'is-complete' : ''}`}>Details</span>
        </footer>
      </div>
    </div>
  );
};
