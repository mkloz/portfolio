import { useEffect, useRef } from 'react';

type SignalColor = string;

type Pulse = {
  x: number;
  y: number;
  color: SignalColor;
  life: number;
  radius: number;
};

const COLORS: SignalColor[] = ['#ff583d', '#ffd400', '#465bff', '#74f0b3', '#6c4eff'];
const PROXIMITY_RADIUS = 150;

const colorForElement = (element: HTMLElement | null, fallbackIndex: number): SignalColor => {
  const requestedColor = element?.dataset.signalColor;
  if (requestedColor && /^#[0-9a-f]{6}$/i.test(requestedColor)) return requestedColor;
  return COLORS[fallbackIndex % COLORS.length];
};

export const SignalCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!canvas || reduceMotionQuery.matches || !finePointerQuery.matches || window.innerWidth < 1024) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;
    const pulses: Pulse[] = [];
    const pointer = { x: -1000, y: -1000, active: false };
    let frame = 0;
    let pixelRatio = 1;
    let colorIndex = 0;
    let activeTarget: HTMLElement | null = null;
    let scrollEnergy = 0;
    let previousScrollY = window.scrollY;
    let pointerIdleTimer = 0;
    let canvasEnabled = true;

    const resize = () => {
      canvasEnabled =
        !reduceMotionQuery.matches && finePointerQuery.matches && window.innerWidth >= 1024 && !document.hidden;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(window.innerWidth * pixelRatio);
      canvas.height = Math.round(window.innerHeight * pixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const wake = () => {
      if (canvasEnabled && !frame && !document.hidden) frame = window.requestAnimationFrame(draw);
    };

    const addPulse = (x: number, y: number, element?: HTMLElement | null) => {
      pulses.push({ x, y, color: colorForElement(element ?? activeTarget, colorIndex++), life: 1, radius: 10 });
      wake();
    };

    const draw = () => {
      frame = 0;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      pulses.forEach((pulse) => {
        context.beginPath();
        context.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        context.strokeStyle = pulse.color;
        context.globalAlpha = pulse.life * 0.68;
        context.lineWidth = Math.max(1, pulse.life * 2.4);
        context.stroke();
        context.beginPath();
        context.moveTo(pulse.x - pulse.radius * 1.25, pulse.y);
        context.lineTo(pulse.x + pulse.radius * 1.25, pulse.y);
        context.moveTo(pulse.x, pulse.y - pulse.radius * 1.25);
        context.lineTo(pulse.x, pulse.y + pulse.radius * 1.25);
        context.stroke();
        pulse.radius += 3.2;
        pulse.life -= 0.048;
      });

      context.globalAlpha = 1;
      while (pulses[0]?.life <= 0) pulses.shift();

      if (activeTarget && pointer.active) {
        const bounds = activeTarget.getBoundingClientRect();
        const nearestX = Math.min(Math.max(pointer.x, bounds.left), bounds.right);
        const nearestY = Math.min(Math.max(pointer.y, bounds.top), bounds.bottom);
        const distance = Math.hypot(pointer.x - nearestX, pointer.y - nearestY);
        if (distance < PROXIMITY_RADIUS) {
          const alpha = Math.max(0, 1 - distance / PROXIMITY_RADIUS) * 0.62;
          const inset = 5;
          const left = bounds.left - inset;
          const right = bounds.right + inset;
          const top = bounds.top - inset;
          const bottom = bounds.bottom + inset;
          const corner = Math.min(18, Math.max(8, Math.min(bounds.width, bounds.height) * 0.16));
          context.beginPath();
          context.moveTo(left, top + corner);
          context.lineTo(left, top);
          context.lineTo(left + corner, top);
          context.moveTo(right - corner, top);
          context.lineTo(right, top);
          context.lineTo(right, top + corner);
          context.moveTo(right, bottom - corner);
          context.lineTo(right, bottom);
          context.lineTo(right - corner, bottom);
          context.moveTo(left + corner, bottom);
          context.lineTo(left, bottom);
          context.lineTo(left, bottom - corner);
          context.strokeStyle = colorForElement(activeTarget, colorIndex);
          context.globalAlpha = alpha;
          context.lineWidth = 1.5;
          context.stroke();
          context.globalAlpha = 1;
        }
      }

      scrollEnergy *= 0.84;
      if (scrollEnergy > 0.4) {
        const length = Math.min(window.innerWidth * 0.18, 34 + scrollEnergy * 1.4);
        context.beginPath();
        context.moveTo(window.innerWidth - 20 - length, window.innerHeight - 22);
        context.lineTo(window.innerWidth - 20, window.innerHeight - 22);
        context.strokeStyle = COLORS[Math.floor(window.scrollY / Math.max(1, window.innerHeight)) % COLORS.length];
        context.globalAlpha = Math.min(0.62, scrollEnergy / 85);
        context.lineWidth = 3;
        context.stroke();
        context.globalAlpha = 1;
      }

      if (pulses.length || scrollEnergy > 0.4 || (activeTarget && pointer.active)) wake();
    };

    const updateNearestTarget = () => {
      const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-signal]')).filter(
        (element) => element.offsetParent !== null
      );
      let nearest: HTMLElement | null = null;
      let nearestDistance = PROXIMITY_RADIUS;

      for (const element of targets) {
        const bounds = element.getBoundingClientRect();
        const x = Math.max(bounds.left, Math.min(pointer.x, bounds.right));
        const y = Math.max(bounds.top, Math.min(pointer.y, bounds.bottom));
        const distance = Math.hypot(pointer.x - x, pointer.y - y);
        if (distance < nearestDistance) {
          nearest = element;
          nearestDistance = distance;
        }
      }

      if (activeTarget !== nearest) {
        activeTarget?.removeAttribute('data-signal-near');
        activeTarget = nearest;
        if (activeTarget) {
          activeTarget.setAttribute('data-signal-near', 'true');
          activeTarget.style.setProperty('--signal-proximity-color', colorForElement(activeTarget, colorIndex));
        }
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!canvasEnabled) return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      window.clearTimeout(pointerIdleTimer);
      pointerIdleTimer = window.setTimeout(() => {
        pointer.active = false;
        wake();
      }, 850);
      updateNearestTarget();
      wake();
    };

    const onPointerLeave = (event: MouseEvent) => {
      if (event.relatedTarget) return;
      pointer.active = false;
      activeTarget?.removeAttribute('data-signal-near');
      activeTarget = null;
    };

    const onPointerDown = (event: PointerEvent) => {
      const element = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-signal]') : null;
      if (!element) return;
      if (!canvasEnabled) {
        element.classList.remove('signal-tap');
        window.requestAnimationFrame(() => element.classList.add('signal-tap'));
        window.setTimeout(() => element.classList.remove('signal-tap'), 420);
        return;
      }
      addPulse(event.clientX, event.clientY, element);
    };

    const onSignalPulse = (event: Event) => {
      const detail = (event as CustomEvent<{ x?: number; y?: number; color?: SignalColor }>).detail;
      pulses.push({
        x: detail?.x ?? window.innerWidth / 2,
        y: detail?.y ?? window.innerHeight / 2,
        color: detail?.color ?? colorForElement(activeTarget, colorIndex++),
        life: 1,
        radius: 8
      });
      wake();
    };

    const onScroll = () => {
      const nextScrollY = window.scrollY;
      scrollEnergy = Math.min(100, scrollEnergy + Math.abs(nextScrollY - previousScrollY) * 0.4);
      previousScrollY = nextScrollY;
      wake();
    };

    const onVisibilityChange = () => {
      if (document.hidden && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      } else if (!document.hidden && pulses.length) {
        wake();
      }
    };

    const onCapabilityChange = () => {
      canvasEnabled =
        !reduceMotionQuery.matches && finePointerQuery.matches && window.innerWidth >= 1024 && !document.hidden;
      if (!canvasEnabled) {
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        pulses.length = 0;
        pointer.active = false;
        activeTarget?.removeAttribute('data-signal-near');
        activeTarget = null;
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('mouseout', onPointerLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('portfolio:signal', onSignalPulse);
    document.addEventListener('visibilitychange', onVisibilityChange);
    reduceMotionQuery.addEventListener('change', onCapabilityChange);
    finePointerQuery.addEventListener('change', onCapabilityChange);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.clearTimeout(pointerIdleTimer);
      activeTarget?.removeAttribute('data-signal-near');
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('mouseout', onPointerLeave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('portfolio:signal', onSignalPulse);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reduceMotionQuery.removeEventListener('change', onCapabilityChange);
      finePointerQuery.removeEventListener('change', onCapabilityChange);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[105] hidden lg:block" aria-hidden="true" />
  );
};
