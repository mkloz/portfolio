import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

export const PointerLabel = () => {
  const pointerRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    const pointer = pointerRef.current;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!pointer || !finePointer || reducedMotion) return;

    const moveX = gsap.quickTo(pointer, 'x', { duration: 0.35, ease: 'power3.out' });
    const moveY = gsap.quickTo(pointer, 'y', { duration: 0.35, ease: 'power3.out' });

    const onPointerMove = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-cursor]') : null;
      const nextLabel = target?.dataset.cursor ?? '';

      setLabel(nextLabel);
      gsap.to(pointer, {
        autoAlpha: nextLabel ? 1 : 0,
        scale: nextLabel ? 1 : 0.72,
        duration: 0.2,
        overwrite: true
      });
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerover', onPointerOver);

    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver);
    };
  }, []);

  return (
    <div
      ref={pointerRef}
      aria-hidden="true"
      className="pointer-label fixed left-0 top-0 z-[120] hidden size-[5.25rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#ffd400] px-3 text-center font-mono text-[0.65rem] font-semibold uppercase leading-tight tracking-[0.08em] text-[#080808] opacity-0 lg:flex">
      {label}
    </div>
  );
};
