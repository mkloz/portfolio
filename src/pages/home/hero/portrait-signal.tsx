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
  pulse: (x: number, y: number) => void;
};

const particleHash = (column: number, row: number) => {
  const value = Math.sin(column * 12.9898 + row * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

export const PortraitSignal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<PortraitController | null>(null);
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
    const pulse = { x: 0, y: 0, startedAt: -1 };
    const size = { width: 1, height: 1, dpr: 1 };
    const lastSize = { width: 0, height: 0 };
    let portrait: HTMLImageElement | null = null;
    let animationFrame: number | null = null;
    let assemblyStartedAt = -1;
    let disposed = false;

    const updateStatus = (nextStatus: string) => {
      if (statusRef.current === nextStatus) return;
      statusRef.current = nextStatus;
      setStatus(nextStatus);
    };

    const draw = (now: number) => {
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

      const pulseAge = pulse.startedAt < 0 ? Number.POSITIVE_INFINITY : now - pulse.startedAt;
      const pulseRadius = pulseAge * 0.42;
      let movement = 0;
      const shouldSnapToSignal =
        !pointer.active && pulse.startedAt < 0 && assemblyStartedAt >= 0 && now - assemblyStartedAt > 1450;

      particles.forEach((particle) => {
        if (shouldSnapToSignal || reducedMotion.matches) {
          particle.x = particle.baseX;
          particle.y = particle.baseY;
          particle.vx = 0;
          particle.vy = 0;
        } else {
          if (pointer.active) {
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

          if (pulseAge < 920) {
            const dx = particle.baseX - pulse.x;
            const dy = particle.baseY - pulse.y;
            const distance = Math.max(1, Math.hypot(dx, dy));
            const waveDistance = Math.abs(distance - pulseRadius);
            if (waveDistance < 34) {
              const force = (1 - waveDistance / 34) * 2.75;
              particle.vx += (dx / distance) * force;
              particle.vy += (dy / distance) * force;
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
        const pulseDistance = Math.abs(Math.hypot(particle.baseX - pulse.x, particle.baseY - pulse.y) - pulseRadius);
        const isPointerSignal = pointer.active && pointerDistance < 94;
        const isPulseSignal = pulseAge < 920 && pulseDistance < 42;
        const signalStrength = isPointerSignal
          ? Math.max(0, 1 - pointerDistance / 94)
          : isPulseSignal
            ? Math.max(0, 1 - pulseDistance / 42)
            : 0;
        const color = signalStrength > 0 ? SIGNAL_COLORS[particle.signal] : INK;
        const isParticle = particle.kind === 'dot' || (isPulseSignal && particle.signal % 2 === 0);
        const sliceOffset =
          pointer.active && pointerDistance < 132
            ? Math.sin(particle.baseY * 0.17 + particle.phase) * signalStrength * 7
            : 0;
        const drawX = particle.x + sliceOffset;

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
            context.arc(x, particle.y, radius, 0, Math.PI * 2);
            context.fill();
          };

          if (signalStrength === 0 && particle.edge > 0.4 && particle.signal < 2) {
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
            context.fillText(particle.glyph, drawX - channelShift, particle.y);
            context.fillStyle = SIGNAL_COLORS[(particle.signal + 2) % SIGNAL_COLORS.length];
            context.fillText(particle.glyph, drawX + channelShift, particle.y);
            context.globalAlpha = 0.46 + Math.max(particle.density, particle.edge) * 0.54;
            context.fillStyle = color;
          }
          context.fillText(particle.glyph, drawX, particle.y);
        }
      });

      context.globalAlpha = 1;
      if (shouldSnapToSignal) {
        assemblyStartedAt = -1;
        updateStatus('Signal stable');
      }

      if (pointer.active && !reducedMotion.matches) {
        const radius = Math.min(112, Math.max(76, size.width * 0.21));
        context.strokeStyle = 'rgba(8, 8, 8, 0.36)';
        context.setLineDash([2, 7]);
        context.beginPath();
        context.arc(pointer.x, pointer.y, radius, 0, Math.PI * 2);
        context.stroke();
        context.setLineDash([]);
      }

      if (pulseAge >= 920 && pulse.startedAt >= 0) {
        pulse.startedAt = -1;
        assemblyStartedAt = now;
        updateStatus('Reassembling');
      }

      const shouldContinue =
        !reducedMotion.matches && (pointer.active || pulse.startedAt >= 0 || movement > particles.length * 0.008);
      if (shouldContinue) {
        animationFrame = window.requestAnimationFrame(draw);
      } else {
        animationFrame = null;
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

    controllerRef.current = {
      move: (x, y) => {
        if (reducedMotion.matches) return;
        pointer.x = x;
        pointer.y = y;
        pointer.active = true;
        updateStatus('Displacing');
        requestDraw();
      },
      leave: () => {
        pointer.active = false;
        assemblyStartedAt = performance.now();
        updateStatus('Reassembling');
        requestDraw();
      },
      pulse: (x, y) => {
        if (reducedMotion.matches) {
          updateStatus('Static signal');
          return;
        }
        pulse.x = x;
        pulse.y = y;
        pulse.startedAt = performance.now();
        updateStatus('Signal burst');
        requestDraw();
      }
    };

    const resizeObserver = new ResizeObserver(rebuild);
    resizeObserver.observe(canvas);
    const onMotionChange = () => rebuild();
    reducedMotion.addEventListener('change', onMotionChange);

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
    if (event.pointerType === 'touch') return;
    const point = localPoint(event);
    controllerRef.current?.move(point.x, point.y);
  };

  const pulsePortrait = (event: ReactMouseEvent<HTMLButtonElement>) => {
    const point = localPoint(event);
    controllerRef.current?.pulse(point.x, point.y);
    const bounds = event.currentTarget.getBoundingClientRect();
    window.dispatchEvent(
      new CustomEvent('portfolio:signal', {
        detail: { x: bounds.left + point.x, y: bounds.top + point.y, color: '#ffd400' }
      })
    );
  };

  return (
    <figure className="mobile-portrait-signal isolate mx-auto w-full max-w-[42rem] lg:mx-0">
      <div className="grid grid-cols-[minmax(0,1fr)_3.5rem] border-y-2 border-current">
        <button
          type="button"
          aria-label="MK portrait — displace and reassemble a code-rendered portrait of Mykhailo Kloz"
          onPointerMove={movePortrait}
          onPointerLeave={() => controllerRef.current?.leave()}
          onPointerDown={(event) => {
            if (event.pointerType !== 'touch') return;
            const point = localPoint(event);
            controllerRef.current?.move(point.x, point.y);
          }}
          onPointerUp={(event) => {
            if (event.pointerType === 'touch') controllerRef.current?.leave();
          }}
          onClick={pulsePortrait}
          data-cursor="Displace"
          data-signal
          data-signal-color="#ffd400"
          className="relative block aspect-[5/4] w-full touch-pan-y overflow-hidden bg-[#ece7dc] text-left">
          <span
            className="absolute inset-0 flex items-center justify-center font-mono text-[clamp(3rem,12vw,6rem)] font-black tracking-[-0.08em] text-[#080808]/10"
            aria-hidden="true">
            MK/
          </span>
          <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden="true" />
        </button>

        <div className="flex flex-col items-center justify-between bg-foreground py-4 text-background">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] [writing-mode:vertical-rl]">
            Particle signal
          </span>
          <span className="grid gap-2" aria-hidden="true">
            {SIGNAL_COLORS.map((color) => (
              <span key={color} className="size-2" style={{ backgroundColor: color }} />
            ))}
          </span>
        </div>
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
