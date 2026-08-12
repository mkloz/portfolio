import { gsap } from 'gsap';
import type { PointerEvent } from 'react';
import { useRef } from 'react';

const portraitSrc = '/editorial/portrait-screenprint.webp';

export const PortraitSignal = () => {
  const sliceRefs = useRef<Array<HTMLImageElement | null>>([]);

  const moveSlices = (event: PointerEvent<HTMLElement>) => {
    if (
      event.pointerType === 'touch' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(pointer: fine)').matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    const slices = sliceRefs.current.filter(Boolean);
    const shifts = [
      { x: x * 16, y: y * 6 },
      { x: x * -11, y: y * -5 },
      { x: x * 9, y: y * 8 }
    ];

    slices.forEach((slice, index) => {
      gsap.to(slice, {
        ...shifts[index],
        duration: 0.35,
        ease: 'power3.out',
        overwrite: true,
        onStart: () => gsap.set(slice, { willChange: 'transform' }),
        onComplete: () => gsap.set(slice, { willChange: 'auto' })
      });
    });
  };

  const resetSlices = () => {
    const slices = sliceRefs.current.filter(Boolean);
    gsap.to(slices, {
      x: 0,
      y: 0,
      duration: 0.55,
      ease: 'power3.out',
      overwrite: true,
      onComplete: () => gsap.set(slices, { willChange: 'auto' })
    });
  };

  return (
    <figure
      onPointerMove={moveSlices}
      onPointerLeave={resetSlices}
      data-cursor="Shift the print"
      className="relative isolate mx-auto aspect-[4/5] w-full max-w-[34rem] overflow-hidden border border-current bg-[#ece7dc] shadow-[0_24px_80px_rgb(0_0_0/0.16)] lg:mx-0">
      <img
        src={portraitSrc}
        alt="Editorial screen-print portrait of Mykhailo Kloz"
        className="absolute inset-0 size-full object-cover object-top"
      />
      {[
        { top: 0, bottom: '66%' },
        { top: '33%', bottom: '33%' },
        { top: '66%', bottom: 0 }
      ].map((clip, index) => (
        <img
          key={index}
          ref={(element) => {
            sliceRefs.current[index] = element;
          }}
          src={portraitSrc}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full object-cover object-top"
          style={{ clipPath: `inset(${clip.top} 0 ${clip.bottom} 0)` }}
        />
      ))}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-1/3 h-px bg-[#465bff] mix-blend-multiply dark:mix-blend-screen"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-2/3 h-px bg-[#ff583d] mix-blend-multiply dark:mix-blend-screen"
      />
      <figcaption className="absolute bottom-3 left-3 bg-[#080808] px-2 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white">
        Identity / signal / 2026
      </figcaption>
    </figure>
  );
};
