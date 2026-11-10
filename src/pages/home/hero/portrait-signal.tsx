import { Instagram } from 'lucide-react';
import type { MouseEvent as ReactMouseEvent, PointerEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

const portraitSource = '/editorial/portrait-screenprint-480.webp';
const GLYPHS = ' .,:;+=x#%@';
const PAPER = '#ece7dc';
const INK = '#080808';
const SIGNAL_COLORS = ['#ff583d', '#ffd400', '#465bff', '#74f0b3'] as const;

type PortraitParticle = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  density: number;
  edge: number;
  glyph: string;
  kind: 'dot' | 'glyph';
  size: number;
  signal: number;
  phase: number;
};

type PortraitController = {
  move: (x: number, y: number) => void;
  leave: () => void;
  press: (x: number, y: number) => void;
  release: () => void;
  cancel: () => void;
  snap: (x: number, y: number) => void;
};

const particleHash = (column: number, row: number) => {
  const value = Math.sin(column * 12.9898 + row * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

export const PortraitSignal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<PortraitController | null>(null);
  const activePointerRef = useRef<number | null>(null);
  const activeKeyRef = useRef<string | null>(null);
  const statusRef = useRef('Move / click');
  const [status, setStatus] = useState('Move / click');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const particles: PortraitParticle[] = [];
    const pointer = { x: 0, y: 0, active: false };
    const magnet = { startedAt: -1, releasedAt: -1, held: false, amount: 0, velocity: 0, x: 0, y: 0 };
    const size = { width: 1, height: 1, dpr: 1 };
    const lastSize = { width: 0, height: 0 };
    let portrait: HTMLImageElement | null = null;
    let animationFrame: number | null = null;
    let assemblyStartedAt = -1;
    let lastFrameAt = 0;
    let disposed = false;

    const updateStatus = (nextStatus: string) => {
      if (statusRef.current === nextStatus) return;
      statusRef.current = nextStatus;
      setStatus(nextStatus);
    };

    const draw = (now: number) => {
      const elapsed = Math.min(0.032, Math.max(0, (now - (lastFrameAt || now - 16.667)) / 1000));
      lastFrameAt = now;
      context.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
      context.clearRect(0, 0, size.width, size.height);
      context.fillStyle = PAPER;
      context.fillRect(0, 0, size.width, size.height);

      context.strokeStyle = 'rgba(8, 8, 8, 0.13)';
      context.lineWidth = 1;
      for (let index = 1; index < 4; index += 1) {
        const x = (size.width / 4) * index;
        const y = (size.height / 4) * index;
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, size.height);
        context.stroke();
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(size.width, y);
        context.stroke();
      }

      // Short taps get a perceptible pull; a held press stays gathered until release.
      const releaseStartsAt = Math.max(magnet.releasedAt, magnet.startedAt + 100);
      if (!magnet.held && magnet.startedAt >= 0 && now - releaseStartsAt >= 550) {
        magnet.startedAt = -1;
        magnet.amount = 0;
        magnet.velocity = 0;
        assemblyStartedAt = now;
        updateStatus(pointer.active ? 'Displacing' : 'Signal stable');
      }

      const isSnapping = magnet.startedAt >= 0 && !reducedMotion.matches;
      if (isSnapping) {
        // A quick magnetic pull and elastic release, independent of refresh rate.
        const target = magnet.held || now < releaseStartsAt ? 1 : 0;
        const steps = Math.max(1, Math.ceil(elapsed / 0.004));
        const step = elapsed / steps;
        for (let index = 0; index < steps; index += 1) {
          magnet.velocity += ((target - magnet.amount) * 600 - magnet.velocity * 28) * step;
          magnet.amount += magnet.velocity * step;
        }
      }
      const magneticRadius = Math.min(160, Math.max(90, size.width * 0.36));
      let movement = 0;
      const shouldSnapToSignal =
        !pointer.active && magnet.startedAt < 0 && assemblyStartedAt >= 0 && now - assemblyStartedAt > 1450;

      particles.forEach((particle) => {
        if (shouldSnapToSignal || reducedMotion.matches) {
          particle.x = particle.baseX;
          particle.y = particle.baseY;
          particle.vx = 0;
          particle.vy = 0;
        } else {
          if (pointer.active && !isSnapping) {
            const dx = particle.x - pointer.x;
            const dy = particle.y - pointer.y;
            const distance = Math.max(1, Math.hypot(dx, dy));
            const radius = Math.min(112, Math.max(76, size.width * 0.21));
            if (distance < radius) {
              const force = (1 - distance / radius) * 1.45;
              const tangent = Math.sin(particle.phase + now * 0.003) * force * 0.45;
              particle.vx += (dx / distance) * force - (dy / distance) * tangent;
              particle.vy += (dy / distance) * force + (dx / distance) * tangent;
            }
          }

          particle.vx += (particle.baseX - particle.x) * 0.055;
          particle.vy += (particle.baseY - particle.y) * 0.055;
          particle.vx *= 0.82;
          particle.vy *= 0.82;
          particle.x += particle.vx;
          particle.y += particle.vy;
          movement += Math.abs(particle.vx) + Math.abs(particle.vy);
        }

        const pointerDistance = pointer.active ? Math.hypot(particle.x - pointer.x, particle.y - pointer.y) : 9999;
        const isPointerSignal = pointer.active && !isSnapping && pointerDistance < 94;
        const signalStrength = isPointerSignal ? Math.max(0, 1 - pointerDistance / 94) : 0;
        const color = signalStrength > 0 ? SIGNAL_COLORS[particle.signal] : INK;
        const isParticle = particle.kind === 'dot';
        const sliceOffset =
          pointer.active && !isSnapping && pointerDistance < 132
            ? Math.sin(particle.baseY * 0.17 + particle.phase) * signalStrength * 7
            : 0;
        const magneticDistance = Math.hypot(particle.baseX - magnet.x, particle.baseY - magnet.y);
        const proximity = Math.max(0, 1 - magneticDistance / magneticRadius);
        const influence = proximity * proximity * (3 - 2 * proximity);
        const pull = magnet.amount * influence * 0.85;
        const drawX = particle.x + sliceOffset + (magnet.x - particle.baseX) * pull;
        const drawY = particle.y + (magnet.y - particle.baseY) * pull;

        context.globalAlpha = 0.48 + Math.max(particle.density, particle.edge * 0.55) * 0.52;
        context.fillStyle = color;
        if (isParticle) {
          const radius = Math.max(
            0.68,
            particle.size * Math.min(0.45, 0.11 + particle.density * 0.31 + particle.edge * 0.08)
          );
          const drawDot = (x: number, fill: string) => {
            context.fillStyle = fill;
            context.beginPath();
            context.arc(x, drawY, radius, 0, Math.PI * 2);
            context.fill();
          };

          if (!isSnapping && signalStrength === 0 && particle.edge > 0.4 && particle.signal < 2) {
            context.globalAlpha = 0.16;
            drawDot(drawX - 0.9, SIGNAL_COLORS[0]);
            drawDot(drawX + 0.9, SIGNAL_COLORS[2]);
            context.globalAlpha = 0.48 + Math.max(particle.density, particle.edge * 0.55) * 0.52;
          }

          if (signalStrength > 0.18) {
            const channelShift = 1.5 + signalStrength * 3.5;
            context.globalAlpha = signalStrength * 0.38;
            drawDot(drawX - channelShift, SIGNAL_COLORS[(particle.signal + 1) % SIGNAL_COLORS.length]);
            drawDot(drawX + channelShift, SIGNAL_COLORS[(particle.signal + 2) % SIGNAL_COLORS.length]);
            context.globalAlpha = 0.5 + particle.density * 0.5;
          }
          drawDot(drawX, color);
        } else {
          context.font = `${particle.edge > 0.18 ? 700 : 500} ${particle.size}px "Courier New", monospace`;
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          if (signalStrength > 0.18) {
            const channelShift = 1.5 + signalStrength * 3.5;
            context.globalAlpha = signalStrength * 0.42;
            context.fillStyle = SIGNAL_COLORS[(particle.signal + 1) % SIGNAL_COLORS.length];
            context.fillText(particle.glyph, drawX - channelShift, drawY);
            context.fillStyle = SIGNAL_COLORS[(particle.signal + 2) % SIGNAL_COLORS.length];
            context.fillText(particle.glyph, drawX + channelShift, drawY);
            context.globalAlpha = 0.46 + Math.max(particle.density, particle.edge) * 0.54;
            context.fillStyle = color;
          }
          context.fillText(particle.glyph, drawX, drawY);
        }
      });

      context.globalAlpha = 1;
      if (shouldSnapToSignal) {
        assemblyStartedAt = -1;
        updateStatus('Signal stable');
      }

      if (pointer.active && !isSnapping && !reducedMotion.matches) {
        const radius = Math.min(112, Math.max(76, size.width * 0.21));
        context.strokeStyle = 'rgba(8, 8, 8, 0.36)';
        context.setLineDash([2, 7]);
        context.beginPath();
        context.arc(pointer.x, pointer.y, radius, 0, Math.PI * 2);
        context.stroke();
        context.setLineDash([]);
      }

      const shouldContinue =
        !reducedMotion.matches && (pointer.active || magnet.startedAt >= 0 || movement > particles.length * 0.008);
      if (shouldContinue) {
        animationFrame = window.requestAnimationFrame(draw);
      } else {
        animationFrame = null;
        lastFrameAt = 0;
        if (statusRef.current === 'Assembling' || statusRef.current === 'Reassembling') {
          updateStatus('Signal stable');
        }
      }
    };

    const requestDraw = () => {
      if (animationFrame === null) animationFrame = window.requestAnimationFrame(draw);
    };

    const rebuild = () => {
      if (!portrait || disposed) return;
      const bounds = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));
      if (Math.abs(lastSize.width - width) < 2 && Math.abs(lastSize.height - height) < 2 && particles.length) {
        return;
      }

      lastSize.width = width;
      lastSize.height = height;
      size.width = width;
      size.height = height;
      size.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * size.dpr);
      canvas.height = Math.round(height * size.dpr);

      const cell = width < 420 ? 4.1 : 4.75;
      const columns = Math.max(1, Math.ceil(width / cell));
      const rows = Math.max(1, Math.ceil(height / cell));
      const sampler = document.createElement('canvas');
      sampler.width = columns;
      sampler.height = rows;
      const sampleContext = sampler.getContext('2d', { willReadFrequently: true });
      if (!sampleContext) return;

      sampleContext.fillStyle = PAPER;
      sampleContext.fillRect(0, 0, columns, rows);
      const renderedWidth = columns * 0.86;
      const scale = renderedWidth / portrait.naturalWidth;
      const renderedHeight = portrait.naturalHeight * scale;
      const imageX = (columns - renderedWidth) / 2;
      const imageY = rows * 0.005;
      sampleContext.drawImage(portrait, imageX, imageY, renderedWidth, renderedHeight);
      const pixels = sampleContext.getImageData(0, 0, columns, rows).data;
      const luminanceMap = new Float32Array(columns * rows);
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const pixel = (row * columns + column) * 4;
          luminanceMap[row * columns + column] =
            pixels[pixel] * 0.2126 + pixels[pixel + 1] * 0.7152 + pixels[pixel + 2] * 0.0722;
        }
      }

      particles.length = 0;
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const luminance = luminanceMap[row * columns + column];
          let density = Math.pow(Math.max(0, Math.min(1, (239 - luminance) / 204)), 0.9);
          const left = luminanceMap[row * columns + Math.max(0, column - 1)];
          const right = luminanceMap[row * columns + Math.min(columns - 1, column + 1)];
          const above = luminanceMap[Math.max(0, row - 1) * columns + column];
          const below = luminanceMap[Math.min(rows - 1, row + 1) * columns + column];
          const edge = Math.min(1, (Math.abs(right - left) + Math.abs(below - above)) / 185);
          const hash = particleHash(column, row);
          const normalizedX = column / columns;
          const normalizedY = row / rows;

          if (normalizedY > 0.56 && normalizedX > 0.56) {
            const shoulderProgress = Math.min(1, (normalizedY - 0.56) / 0.44);
            const roundedShoulderEdge = 0.61 + Math.sin(shoulderProgress * Math.PI * 0.5) * 0.34;
            const edgeCoverage = Math.min(1, Math.max(0, (roundedShoulderEdge - normalizedX) / 0.045));
            const sweaterTexture = (0.27 + hash * 0.2) * edgeCoverage;
            density = Math.max(density, sweaterTexture);
          }

          const inkCoverage = Math.min(1, density * 1.08 + edge * 0.34);
          if (density < 0.085 && edge < 0.28) continue;
          if (inkCoverage < 0.065) continue;
          if (density < 0.075 && edge < 0.16 && hash > inkCoverage * 4.5) continue;

          const angle = hash * Math.PI * 2;
          const scatter = reducedMotion.matches ? 0 : 14 + hash * 44;
          const baseX = (column + 0.5) * cell;
          const baseY = (row + 0.5) * cell;
          const glyphWeight = Math.max(density, edge * 0.78);
          const glyphIndex = Math.min(GLYPHS.length - 1, Math.max(1, Math.floor(glyphWeight * (GLYPHS.length - 1))));
          particles.push({
            baseX,
            baseY,
            x: baseX + Math.cos(angle) * scatter,
            y: baseY + Math.sin(angle) * scatter,
            vx: 0,
            vy: 0,
            density,
            edge,
            glyph: GLYPHS[glyphIndex],
            kind: density > 0.76 && edge < 0.26 && hash < 0.18 ? 'glyph' : 'dot',
            size: cell * (0.86 + glyphWeight * 0.42),
            signal: Math.floor(hash * SIGNAL_COLORS.length) % SIGNAL_COLORS.length,
            phase: hash * Math.PI * 2
          });
        }
      }

      assemblyStartedAt = reducedMotion.matches ? -1 : performance.now();
      updateStatus(reducedMotion.matches ? 'Static signal' : 'Assembling');
      requestDraw();
    };

    const press = (x: number, y: number) => {
      if (reducedMotion.matches) {
        updateStatus('Static signal');
        return;
      }
      // Every press uses its own location, including clicks during the previous release.
      magnet.x = x;
      magnet.y = y;
      magnet.startedAt = performance.now();
      magnet.releasedAt = -1;
      magnet.held = true;
      pointer.x = x;
      pointer.y = y;
      updateStatus('Holding particles');
      requestDraw();
    };
    const release = () => {
      if (!magnet.held) return;
      magnet.held = false;
      magnet.releasedAt = performance.now();
      updateStatus('Magnetic snap');
      requestDraw();
    };
    const cancel = () => {
      activePointerRef.current = null;
      activeKeyRef.current = null;
      pointer.active = false;
      release();
      requestDraw();
    };
    controllerRef.current = {
      move: (x, y) => {
        if (reducedMotion.matches) return;
        pointer.x = x;
        pointer.y = y;
        pointer.active = true;
        if (magnet.held) {
          magnet.x = x;
          magnet.y = y;
        }
        if (magnet.startedAt < 0) updateStatus('Displacing');
        requestDraw();
      },
      leave: () => {
        pointer.active = false;
        assemblyStartedAt = performance.now();
        if (magnet.startedAt < 0) updateStatus('Reassembling');
        requestDraw();
      },
      press,
      release,
      cancel,
      snap: (x, y) => {
        press(x, y);
        release();
      }
    };

    const resizeObserver = new ResizeObserver(rebuild);
    resizeObserver.observe(canvas);
    const onMotionChange = () => {
      if (reducedMotion.matches) {
        cancel();
        magnet.held = false;
        magnet.startedAt = -1;
        magnet.amount = 0;
        magnet.velocity = 0;
        pointer.active = false;
        updateStatus('Static signal');
      }
      requestDraw();
    };
    reducedMotion.addEventListener('change', onMotionChange);
    window.addEventListener('blur', cancel);
    const onVisibilityChange = () => {
      if (document.hidden) cancel();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const image = new Image();
    image.decoding = 'async';
    image.src = portraitSource;
    void image
      .decode()
      .then(() => {
        if (disposed) return;
        portrait = image;
        rebuild();
      })
      .catch(() => updateStatus('Signal unavailable'));

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      reducedMotion.removeEventListener('change', onMotionChange);
      window.removeEventListener('blur', cancel);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      controllerRef.current = null;
    };
  }, []);

  const localPoint = (event: PointerEvent<HTMLButtonElement> | ReactMouseEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.detail === 0 && event.clientX === 0 && event.clientY === 0) {
      return { x: bounds.width / 2, y: bounds.height / 2 };
    }
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  };

  const movePortrait = (event: PointerEvent<HTMLButtonElement>) => {
    if (activePointerRef.current !== null && activePointerRef.current !== event.pointerId) return;
    if (event.pointerType === 'touch' && activePointerRef.current === null) return;
    const point = localPoint(event);
    controllerRef.current?.move(point.x, point.y);
  };

  const snapPortrait = (event: ReactMouseEvent<HTMLButtonElement>) => {
    if (event.detail !== 0) return;
    const point = localPoint(event);
    controllerRef.current?.snap(point.x, point.y);
  };

  return (
    <figure className="mobile-portrait-signal isolate mx-auto w-full max-w-[42rem] lg:mx-0">
      <div className="grid grid-cols-[minmax(0,1fr)_3.5rem] border-y-2 border-current">
        <button
          type="button"
          aria-label="Portrait of Mykhailo Kloz. Press and hold to gather particles; release to snap back."
          onPointerMove={movePortrait}
          onPointerLeave={() => controllerRef.current?.leave()}
          onPointerDown={(event) => {
            event.stopPropagation();
            if (
              !event.isPrimary ||
              event.button !== 0 ||
              activePointerRef.current !== null ||
              activeKeyRef.current !== null
            )
              return;
            activePointerRef.current = event.pointerId;
            event.currentTarget.setPointerCapture(event.pointerId);
            const point = localPoint(event);
            controllerRef.current?.press(point.x, point.y);
          }}
          onPointerUp={(event) => {
            if (activePointerRef.current !== event.pointerId) return;
            activePointerRef.current = null;
            controllerRef.current?.release();
            const bounds = event.currentTarget.getBoundingClientRect();
            if (
              event.pointerType === 'touch' ||
              event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom
            )
              controllerRef.current?.leave();
          }}
          onPointerCancel={() => controllerRef.current?.cancel()}
          onLostPointerCapture={() => {
            if (activePointerRef.current !== null) controllerRef.current?.cancel();
          }}
          onBlur={() => controllerRef.current?.cancel()}
          onContextMenu={(event) => event.preventDefault()}
          onKeyDown={(event) => {
            if (event.key !== ' ' && event.key !== 'Enter') return;
            event.preventDefault();
            if (event.repeat || activeKeyRef.current !== null || activePointerRef.current !== null) return;
            activeKeyRef.current = event.key;
            const bounds = event.currentTarget.getBoundingClientRect();
            controllerRef.current?.press(bounds.width / 2, bounds.height / 2);
          }}
          onKeyUp={(event) => {
            if (event.key !== ' ' && event.key !== 'Enter') return;
            event.preventDefault();
            if (activeKeyRef.current !== event.key) return;
            activeKeyRef.current = null;
            controllerRef.current?.release();
            controllerRef.current?.leave();
          }}
          onClick={snapPortrait}
          data-cursor="Snap"
          data-signal
          data-signal-color="#ffd400"
          className="relative block aspect-[5/4] w-full touch-pan-y select-none overflow-hidden bg-[#ece7dc] text-left">
          <span
            className="absolute inset-0 flex items-center justify-center font-mono text-[clamp(3rem,12vw,6rem)] font-black tracking-[-0.08em] text-[#080808]/10"
            aria-hidden="true">
            MK/
          </span>
          <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden="true" />
        </button>

        <a
          href="https://www.instagram.com/mykhailo.kloz/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Mykhailo Kloz on Instagram (opens in a new tab)"
          title="Instagram"
          data-cursor="Instagram"
          className="flex min-w-11 flex-col items-center justify-between bg-foreground py-3 text-background transition-colors duration-200 hover:text-[#465bff] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#465bff] motion-reduce:transition-none sm:py-4">
          <span className="font-mono text-xs font-semibold tracking-[0.12em] [writing-mode:vertical-rl]">
            @mykhailo.kloz
          </span>
          <Instagram className="size-5" aria-hidden="true" />
        </a>
      </div>

      <figcaption className="grid grid-cols-[1fr_auto] border-b border-current/25 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.08em]">
        <span className="px-3 py-3">Code-rendered portrait</span>
        <output className="border-l border-current/25 px-3 py-3 text-right text-muted-foreground" aria-live="polite">
          {status}
        </output>
      </figcaption>
    </figure>
  );
};
