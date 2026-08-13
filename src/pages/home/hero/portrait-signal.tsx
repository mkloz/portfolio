import { gsap } from 'gsap';
import type { PointerEvent } from 'react';
import { useRef } from 'react';

const portraitSrc = '/editorial/portrait-screenprint.webp';

const CHANNELS = [
  { color: '#ff583d', clipPath: 'inset(0 66.666% 0 0)' },
  { color: '#465bff', clipPath: 'inset(0 33.333% 0 33.333%)' },
  { color: '#ffd400', clipPath: 'inset(0 0 0 66.666%)' }
] as const;

export const PortraitSignal = () => {
  const channelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const crosshairRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLOutputElement>(null);
  const isRegisteringRef = useRef(false);

  const moveSignal = (event: PointerEvent<HTMLElement>) => {
    if (
      event.pointerType === 'touch' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(pointer: fine)').matches
    ) {
      return;
    }
    if (isRegisteringRef.current) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    const x = localX / bounds.width - 0.5;
    const y = localY / bounds.height - 0.5;
    const channels = channelRefs.current.filter(Boolean);
    const shifts = [
      { x: x * 22, y: y * 8 },
      { x: x * -15, y: y * -10 },
      { x: x * 10, y: y * 14 }
    ];

    channels.forEach((channel, index) => {
      gsap.to(channel, {
        ...shifts[index],
        duration: 0.24,
        ease: 'power3.out',
        overwrite: true
      });
    });

    if (crosshairRef.current) {
      gsap.set(crosshairRef.current, {
        x: localX,
        y: localY,
        autoAlpha: 1
      });
    }

    if (readoutRef.current) {
      readoutRef.current.value = `${Math.round((localX / bounds.width) * 100)} : ${Math.round(
        (localY / bounds.height) * 100
      )}`;
    }
  };

  const resetSignal = () => {
    if (isRegisteringRef.current) return;
    gsap.to(channelRefs.current.filter(Boolean), {
      x: 0,
      y: 0,
      duration: 0.45,
      ease: 'power3.out',
      overwrite: true
    });

    if (crosshairRef.current) gsap.to(crosshairRef.current, { autoAlpha: 0, duration: 0.12 });
    if (readoutRef.current) readoutRef.current.value = 'Move / click';
  };

  const registerSignal = () => {
    const channels = channelRefs.current.filter(Boolean);
    if (!channels.length || isRegisteringRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (readoutRef.current) readoutRef.current.value = 'Registered';
      return;
    }

    isRegisteringRef.current = true;
    const offsets = [
      { x: -20, y: -8 },
      { x: 18, y: -12 },
      { x: 9, y: 17 }
    ];

    if (readoutRef.current) readoutRef.current.value = 'Re-registering';
    gsap.killTweensOf(channels);

    const timeline = gsap.timeline({
      onComplete: () => {
        isRegisteringRef.current = false;
        if (readoutRef.current) readoutRef.current.value = 'Registered';
      }
    });

    timeline
      .set(flashRef.current, { autoAlpha: 1, clipPath: 'inset(0 100% 0 0)' })
      .to(
        channels,
        {
          x: (index) => offsets[index].x,
          y: (index) => offsets[index].y,
          duration: 0.14,
          stagger: 0.015,
          ease: 'power2.out'
        },
        0
      )
      .to(flashRef.current, { clipPath: 'inset(0 0% 0 0)', duration: 0.16, ease: 'power2.out' }, 0)
      .to(channels, { x: 0, y: 0, duration: 0.52, ease: 'expo.out' }, 0.14)
      .to(flashRef.current, { clipPath: 'inset(0 0 0 100%)', duration: 0.28, ease: 'power3.inOut' }, 0.18)
      .set(flashRef.current, { autoAlpha: 0 });
  };

  return (
    <figure className="mobile-portrait-signal isolate mx-auto w-full max-w-[42rem] lg:mx-0">
      <div className="grid grid-cols-[minmax(0,1fr)_3.5rem] border-y-2 border-current">
        <button
          type="button"
          aria-label="Re-register portrait print"
          onPointerMove={moveSignal}
          onPointerLeave={resetSignal}
          onClick={registerSignal}
          data-cursor="Deconstruct"
          className="relative block aspect-[5/4] w-full touch-pan-y overflow-hidden bg-[#ece7dc] text-left">
          <img
            src={portraitSrc}
            alt="Screen-print portrait of Mykhailo Kloz"
            className="absolute inset-0 size-full object-cover object-top grayscale contrast-[1.2]"
          />

          {CHANNELS.map((channel, index) => (
            <div
              key={channel.color}
              ref={(element) => {
                channelRefs.current[index] = element;
              }}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45 mix-blend-multiply dark:mix-blend-screen"
              style={{ backgroundColor: channel.color, clipPath: channel.clipPath }}>
              <img
                src={portraitSrc}
                alt=""
                className="size-full object-cover object-top grayscale contrast-[1.45] mix-blend-luminosity"
              />
            </div>
          ))}

          <div
            ref={flashRef}
            className="pointer-events-none absolute inset-0 z-10 bg-[#ffd400]/25 opacity-0 mix-blend-multiply dark:mix-blend-screen"
            aria-hidden="true"
          />

          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {[25, 50, 75].map((position) => (
              <span
                key={`x-${position}`}
                className="absolute inset-y-0 w-px bg-[#080808]/20 dark:bg-white/20"
                style={{ left: `${position}%` }}
              />
            ))}
            {[25, 50, 75].map((position) => (
              <span
                key={`y-${position}`}
                className="absolute inset-x-0 h-px bg-[#080808]/20 dark:bg-white/20"
                style={{ top: `${position}%` }}
              />
            ))}
          </div>

          <div
            ref={crosshairRef}
            className="pointer-events-none absolute left-0 top-0 z-20 opacity-0"
            aria-hidden="true">
            <span className="absolute -left-6 top-0 h-px w-12 bg-current" />
            <span className="absolute -top-6 left-0 h-12 w-px bg-current" />
            <span className="absolute -left-1.5 -top-1.5 size-3 rounded-full border border-current" />
          </div>

          <span className="absolute bottom-4 left-4 z-20 h-2 w-16 bg-[#ffd400]" aria-hidden="true" />
        </button>

        <div className="flex flex-col items-center justify-between bg-foreground py-4 text-background">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] [writing-mode:vertical-rl]">
            Interactive print
          </span>
          <span className="grid gap-2" aria-hidden="true">
            {CHANNELS.map((channel) => (
              <span key={channel.color} className="size-2" style={{ backgroundColor: channel.color }} />
            ))}
          </span>
        </div>
      </div>

      <figcaption className="grid grid-cols-[1fr_auto] border-b border-current/25 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.08em]">
        <span className="px-3 py-3">Three-channel portrait</span>
        <output ref={readoutRef} className="border-l border-current/25 px-3 py-3 text-right text-muted-foreground">
          Move / click
        </output>
      </figcaption>
    </figure>
  );
};
