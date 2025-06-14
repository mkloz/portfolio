'use client';
import '@/styles/circut-animations.css';

import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

interface CircuitBackgroundProps {
  className?: string;
}

export const CircuitBackground = ({ className }: CircuitBackgroundProps) => {
  const circuitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!circuitRef.current) return;

    const createPulse = (pathId: string): void => {
      const path = document.getElementById(pathId);
      if (!path || !(path instanceof SVGPathElement)) return;

      const pathLength = path.getTotalLength();
      const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

      pulse.setAttribute('r', '3');
      pulse.setAttribute('fill', 'white');
      pulse.classList.add('circuit-pulse');

      path.parentNode?.appendChild(pulse);

      let distance = 0;
      let speed = 0.3 + Math.random() * 0.5;

      const animatePulse = (): void => {
        distance += speed;
        if (distance > pathLength) {
          distance = 0;
          speed = 0.3 + Math.random() * 0.5;
          setTimeout(animatePulse, Math.random() * 8000 + 3000);
          return;
        }

        const point = path.getPointAtLength(distance);
        pulse.setAttribute('cx', point.x.toString());
        pulse.setAttribute('cy', point.y.toString());
        requestAnimationFrame(animatePulse);
      };

      setTimeout(animatePulse, Math.random() * 5000);
    };

    const timer = setTimeout(() => {
      const pathIds = ['circuit-path-1', 'circuit-path-3', 'circuit-path-5', 'circuit-path-7'];
      pathIds.forEach(createPulse);

      setTimeout(() => createPulse('circuit-path-2'), 8000);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn('absolute inset-0', className)}>
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br  from-yellow-600/70 via-yellow-700/70 to-yellow-900/70 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6),inset_0_20px_60px_rgba(255,255,255,0.1),inset_0_-10px_30px_rgba(0,0,0,0.3)]" />

      {/* Circuit board background */}
      <div ref={circuitRef} className="absolute inset-0 overflow-hidden opacity-40 dark:opacity-50">
        <svg className="absolute w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="circuit-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="circuit-deep-glow">
              {/* <feGaussianBlur stdDeviation="4" result="blur1" />
              {/* <feGaussianBlur stdDeviation="8" result="blur2" /> */}
              <feMerge>
                {/* <feMergeNode in="blur2" /> */}
                {/* <feMergeNode in="blur1" /> */}
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="circuit-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.5" />
            </linearGradient>

            <linearGradient id="circuit-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6b21a8" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.5" />
            </linearGradient>

            <linearGradient id="circuit-gradient-3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#2563eb" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
            </linearGradient>

            <radialGradient id="radial-depth" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="70%" stopColor="rgba(0,0,0,0.1)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
            </radialGradient>
          </defs>

          {/* Background depth circle */}
          <circle cx="600" cy="400" r="500" fill="url(#radial-depth)" opacity="0.6" />

          {/* Circuit paths */}
          <path
            id="circuit-path-1"
            d="M-20,100 H400 Q420,100 420,120 V200 Q420,220 440,220 H800 Q820,220 820,240 V300"
            stroke="url(#circuit-gradient-1)"
            strokeWidth="3"
            fill="none"
            filter="url(#circuit-deep-glow)"
            className="circuit-path"
          />
          <path
            id="circuit-path-2"
            d="M-20,300 H200 Q220,300 220,320 V500 Q220,520 240,520 H600"
            stroke="url(#circuit-gradient-2)"
            strokeWidth="3"
            fill="none"
            filter="url(#circuit-deep-glow)"
            className="circuit-path"
          />
          <path
            id="circuit-path-3"
            d="M1220,200 H900 Q880,200 880,220 V400 Q880,420 860,420 H500 Q480,420 480,440 V600"
            stroke="url(#circuit-gradient-3)"
            strokeWidth="3"
            fill="none"
            filter="url(#circuit-deep-glow)"
            className="circuit-path"
          />
          <path
            id="circuit-path-4"
            d="M1220,500 H1000 Q980,500 980,480 V350 Q980,330 960,330 H700 Q680,330 680,310 V100"
            stroke="url(#circuit-gradient-1)"
            strokeWidth="3"
            fill="none"
            filter="url(#circuit-deep-glow)"
            className="circuit-path"
          />
          <path
            id="circuit-path-5"
            d="M300,-20 V150 Q300,170 320,170 H500 Q520,170 520,190 V400"
            stroke="url(#circuit-gradient-2)"
            strokeWidth="3"
            fill="none"
            filter="url(#circuit-deep-glow)"
            className="circuit-path"
          />
          <path
            id="circuit-path-6"
            d="M600,-20 V80 Q600,100 620,100 H750 Q770,100 770,120 V250 Q770,270 750,270 H600 Q580,270 580,290 V500"
            stroke="url(#circuit-gradient-3)"
            strokeWidth="3"
            fill="none"
            filter="url(#circuit-deep-glow)"
            className="circuit-path"
          />
          <path
            id="circuit-path-7"
            d="M900,820 V650 Q900,630 880,630 H700 Q680,630 680,610 V500"
            stroke="url(#circuit-gradient-1)"
            strokeWidth="3"
            fill="none"
            filter="url(#circuit-deep-glow)"
            className="circuit-path"
          />
          <path
            id="circuit-path-8"
            d="M400,820 V700 Q400,680 420,680 H550 Q570,680 570,660 V550"
            stroke="url(#circuit-gradient-2)"
            strokeWidth="3"
            fill="none"
            filter="url(#circuit-deep-glow)"
            className="circuit-path"
          />

          {/* Circuit nodes */}
          <circle cx="400" cy="100" r="5" fill="#3b82f6" filter="url(#circuit-deep-glow)" className="circuit-node" />
          <circle cx="440" cy="220" r="5" fill="#8b5cf6" filter="url(#circuit-deep-glow)" className="circuit-node" />
          <circle cx="200" cy="300" r="5" fill="#3b82f6" filter="url(#circuit-deep-glow)" className="circuit-node" />
          <circle cx="240" cy="520" r="5" fill="#8b5cf6" filter="url(#circuit-deep-glow)" className="circuit-node" />
          <circle cx="900" cy="200" r="5" fill="#2563eb" filter="url(#circuit-deep-glow)" className="circuit-node" />
          <circle cx="860" cy="420" r="5" fill="#3b82f6" filter="url(#circuit-deep-glow)" className="circuit-node" />
          <circle cx="1000" cy="500" r="5" fill="#8b5cf6" filter="url(#circuit-deep-glow)" className="circuit-node" />
          <circle cx="960" cy="330" r="5" fill="#2563eb" filter="url(#circuit-deep-glow)" className="circuit-node" />
          <circle cx="300" cy="150" r="5" fill="#3b82f6" filter="url(#circuit-deep-glow)" className="circuit-node" />
          <circle cx="520" cy="190" r="5" fill="#8b5cf6" filter="url(#circuit-deep-glow)" className="circuit-node" />
          <circle cx="600" cy="80" r="5" fill="#2563eb" filter="url(#circuit-deep-glow)" className="circuit-node" />
          <circle cx="750" cy="270" r="5" fill="#3b82f6" filter="url(#circuit-deep-glow)" className="circuit-node" />
          <circle cx="880" cy="630" r="5" fill="#8b5cf6" filter="url(#circuit-deep-glow)" className="circuit-node" />
          <circle cx="420" cy="680" r="5" fill="#2563eb" filter="url(#circuit-deep-glow)" className="circuit-node" />
        </svg>
      </div>
    </div>
  );
};
