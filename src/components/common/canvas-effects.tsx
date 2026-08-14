import {
  type CSSProperties,
  lazy,
  type PointerEvent,
  type ReactNode,
  Suspense,
  useRef,
  useSyncExternalStore
} from 'react';

import { cn } from '@/lib/utils';

const Magnify = lazy(() => import('@/components/canvasui/Magnify').then((module) => ({ default: module.Magnify })));
const Grid = lazy(() => import('@/components/canvasui/Grid').then((module) => ({ default: module.Grid })));
const ParticleReveal = lazy(() =>
  import('@/components/canvasui/ParticleReveal').then((module) => ({ default: module.ParticleReveal }))
);
const DecryptReveal = lazy(() =>
  import('@/components/canvasui/DecryptReveal').then((module) => ({ default: module.DecryptReveal }))
);

const EFFECT_QUERY = '(min-width: 64rem) and (hover: hover) and (pointer: fine)';
const MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const getEffectsEnabled = () =>
  typeof window !== 'undefined' && window.matchMedia(EFFECT_QUERY).matches && !window.matchMedia(MOTION_QUERY).matches;

const getNativeCanvasCapture = () => {
  if (typeof document === 'undefined') return false;
  const probe = document.createElement('canvas') as HTMLCanvasElement & { requestPaint?: () => void };
  const context = probe.getContext('2d') as (CanvasRenderingContext2D & { drawElementImage?: () => void }) | null;
  return typeof probe.requestPaint === 'function' && typeof context?.drawElementImage === 'function';
};

const emptySubscribe = () => () => undefined;

const subscribeToEffects = (onChange: () => void) => {
  const capability = window.matchMedia(EFFECT_QUERY);
  const motion = window.matchMedia(MOTION_QUERY);
  capability.addEventListener('change', onChange);
  motion.addEventListener('change', onChange);

  return () => {
    capability.removeEventListener('change', onChange);
    motion.removeEventListener('change', onChange);
  };
};

const useCanvasEffects = () => useSyncExternalStore(subscribeToEffects, getEffectsEnabled, () => false);

type EffectProps = {
  children: ReactNode;
  className?: string;
};

export const EvidenceMagnifier = ({ children, className }: EffectProps) => {
  const enabled = useCanvasEffects();

  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <Suspense fallback={<div className={className}>{children}</div>}>
      <Magnify
        className={cn('canvas-inspection', className)}
        size={112}
        zoom={1.42}
        follow={0.38}
        hud={0.58}
        color={[0.275, 0.357, 1]}
        ticks={false}
        brackets
        grid
        readout={false}
        aberration={0.35}
        haze={0}
        ripples
        rippleGlow={0.35}
        rippleLife={0.65}
        rippleBend={3}>
        {children}
      </Magnify>
    </Suspense>
  );
};

type SystemCanvasEffectProps = EffectProps & {
  variant: 'grid' | 'particles' | 'decrypt';
  tint?: [number, number, number];
  color?: string;
};

const SystemEffectFallback = ({ children, className, variant, color }: SystemCanvasEffectProps) => {
  const host = useRef<HTMLDivElement>(null);
  const updatePointer = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--effect-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--effect-y', `${event.clientY - bounds.top}px`);
  };

  return (
    <div
      ref={host}
      className={cn('canvas-system-fallback', className)}
      data-canvas-fallback={variant}
      style={{ '--effect-color': color } as CSSProperties}
      onPointerEnter={updatePointer}
      onPointerMove={updatePointer}>
      {children}
      <span className="canvas-system-fallback-field" aria-hidden="true" />
    </div>
  );
};

export const SystemCanvasEffect = ({
  children,
  className,
  variant,
  tint = [1, 0.83, 0],
  color = '#ffd400'
}: SystemCanvasEffectProps) => {
  const enabled = useCanvasEffects();
  const nativeCapture = useSyncExternalStore(emptySubscribe, getNativeCanvasCapture, () => false);

  if (!enabled) return null;
  if (!nativeCapture) {
    return (
      <SystemEffectFallback className={className} variant={variant} tint={tint} color={color}>
        {children}
      </SystemEffectFallback>
    );
  }

  if (variant === 'particles') {
    return (
      <Suspense fallback={null}>
        <ParticleReveal
          className={cn('canvas-system-effect', className)}
          radius={320}
          softness={0.52}
          size={1.25}
          scatter={46}
          drift={0.12}
          aberration={4}
          bend={14}
          fade={0.78}
          threshold={0.06}
          background="#080808"
          smoothing={0.16}>
          {children}
        </ParticleReveal>
      </Suspense>
    );
  }

  if (variant === 'decrypt') {
    return (
      <Suspense fallback={null}>
        <DecryptReveal
          className={cn('canvas-system-effect', className)}
          radius={330}
          softness={0.5}
          cell={9}
          aspect={0.68}
          charset="01<>/{}[]MK"
          colored={0.18}
          color={color}
          brightness={0.9}
          legibility={0.78}
          contrast={1.15}
          exposure={0.95}
          scramble={0.045}
          scrambleSpeed={5}
          edgeWidth={0.16}
          edgeFlicker={0.3}
          edgeGlow={0.75}
          edgeTint={0.5}
          aberration={2}
          passthrough={0.28}
          threshold={0.035}
          background="#080808"
          smoothing={0.16}>
          {children}
        </DecryptReveal>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={null}>
      <Grid
        className={cn('canvas-system-effect', className)}
        tileSize={108}
        gap={2}
        cornerRadius={0}
        amplitude={2.15}
        waveSpeed={0.72}
        frequency={13}
        waveWidth={0.075}
        fadeTime={0.42}
        maxLift={0.72}
        jitter={0.08}
        liftHeight={38}
        perspective={1050}
        tilt={0.48}
        shading={0.2}
        tint={tint}
        tintStrength={0.34}
        idleRipples={0}>
        {children}
      </Grid>
    </Suspense>
  );
};
