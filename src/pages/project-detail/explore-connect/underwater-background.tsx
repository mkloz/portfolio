'use client';

import '@/styles/underwater-animations.css';

import React, { memo, useMemo } from 'react';

import { cn } from '@/lib/utils';

interface UnderwaterBackgroundProps {
  className?: string;
}

// Helper for random array generation
function createRandomArray<T>(length: number, generator: (i: number) => T): T[] {
  return Array.from({ length }, (_, i) => generator(i));
}

// Fish component
interface FishProps {
  size: number;
  color: string;
  direction: 1 | -1;
  type: 1 | 2 | 3;
  blur: number;
  style: React.CSSProperties;
}
const Fish: React.FC<FishProps> = ({ size, color, direction, type, blur, style }) => (
  <div className="absolute" style={{ ...style, filter: `blur(${blur}px)` }}>
    <div
      className="relative"
      style={{
        width: `${size}px`,
        height: `${size * 0.5}px`,
        transform: direction === -1 ? 'scaleX(-1)' : 'scaleX(1)'
      }}>
      {type === 1 && (
        <>
          <div
            className="absolute rounded-full"
            style={{ width: '70%', height: '100%', left: '0', backgroundColor: color }}
          />
          <div
            className="absolute"
            style={{
              width: '30%',
              height: '80%',
              right: '0',
              top: '10%',
              backgroundColor: color,
              clipPath: 'polygon(0 0, 0 100%, 100% 50%)'
            }}
          />
          <div
            className="absolute"
            style={{
              width: '20%',
              height: '40%',
              left: '40%',
              top: '-20%',
              backgroundColor: color,
              clipPath: 'polygon(0 100%, 100% 100%, 50% 0)'
            }}
          />
        </>
      )}
      {type === 2 && (
        <>
          <div
            className="absolute rounded-full"
            style={{ width: '80%', height: '100%', left: '0', backgroundColor: color }}
          />
          <div
            className="absolute"
            style={{
              width: '25%',
              height: '70%',
              right: '0',
              top: '15%',
              backgroundColor: color,
              clipPath: 'polygon(0 0, 0 100%, 100% 50%)'
            }}
          />
          <div
            className="absolute"
            style={{
              width: '15%',
              height: '30%',
              left: '50%',
              bottom: '-15%',
              backgroundColor: color,
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
            }}
          />
        </>
      )}
      {type === 3 && (
        <>
          <div
            className="absolute"
            style={{
              width: '85%',
              height: '60%',
              left: '0',
              top: '20%',
              backgroundColor: color,
              borderRadius: `${size * 0.3}px ${size * 0.15}px ${size * 0.15}px ${size * 0.3}px`
            }}
          />
          <div
            className="absolute"
            style={{
              width: '20%',
              height: '90%',
              right: '0',
              top: '5%',
              backgroundColor: color,
              clipPath: 'polygon(0 0, 0 100%, 100% 50%)'
            }}
          />
          <div
            className="absolute"
            style={{
              width: '40%',
              height: '20%',
              left: '30%',
              top: '0',
              backgroundColor: color,
              clipPath: 'polygon(0 100%, 100% 100%, 50% 0)'
            }}
          />
        </>
      )}
    </div>
  </div>
);

// Plant component
interface PlantProps {
  style: React.CSSProperties;
  className: string;
}
const Plant: React.FC<PlantProps> = ({ style, className }) => <div className={className} style={style} />;

// Bubble component
interface BubbleProps {
  style: React.CSSProperties;
  className: string;
}
const Bubble: React.FC<BubbleProps> = ({ style, className }) => <div className={className} style={style} />;

export const UnderwaterBackground = memo(({ className }: UnderwaterBackgroundProps) => {
  // Memoize random decorations so they don't change on every render
  const decorations = useMemo(() => {
    // Only keep visible decorations: green plants, fish, and bubbles
    const deepPlants = createRandomArray(18, (i) => (
      <Plant
        key={`deep-plant-${i}`}
        className="absolute bottom-0 bg-gradient-to-t from-green-900/70 to-transparent opacity-50"
        style={{
          width: `${8 + Math.random() * 12}px`,
          height: `${200 + Math.random() * 300}px`,
          left: `${Math.random() * 100}%`,
          borderRadius: '4px',
          animationName: 'deepSway',
          animationDuration: `${8 + Math.random() * 6}s`,
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
          animationDelay: `${Math.random() * 4}s`,
          transformOrigin: 'bottom'
        }}
      />
    ));
    const midPlants = createRandomArray(25, (i) => (
      <Plant
        key={`mid-plant-${i}`}
        className="absolute bottom-0 bg-gradient-to-t from-green-800/60 to-transparent opacity-60"
        style={{
          width: `${6 + Math.random() * 8}px`,
          height: `${150 + Math.random() * 250}px`,
          left: `${Math.random() * 100}%`,
          borderRadius: '3px',
          animationName: 'plantSway',
          animationDuration: `${6 + Math.random() * 4}s`,
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
          animationDelay: `${Math.random() * 3}s`,
          transformOrigin: 'bottom'
        }}
      />
    ));
    const kelps = createRandomArray(30, (i) => (
      <Plant
        key={`kelp-${i}`}
        className="absolute bottom-0 bg-gradient-to-t from-green-700/70 to-transparent opacity-70"
        style={{
          width: `${3 + Math.random() * 4}px`,
          height: `${120 + Math.random() * 180}px`,
          left: `${Math.random() * 100}%`,
          borderRadius: '2px',
          animationName: 'kelpSway',
          animationDuration: `${5 + Math.random() * 4}s`,
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
          animationDelay: `${Math.random() * 3}s`,
          transformOrigin: 'bottom'
        }}
      />
    ));
    const seagrass = createRandomArray(35, (i) => (
      <Plant
        key={`seagrass-${i}`}
        className="absolute bottom-0 bg-gradient-to-t from-green-600/50 to-transparent opacity-50"
        style={{
          width: '2px',
          height: `${80 + Math.random() * 120}px`,
          left: `${Math.random() * 100}%`,
          borderRadius: '1px',
          animationName: 'grassSway',
          animationDuration: `${4 + Math.random() * 3}s`,
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
          animationDelay: `${Math.random() * 2}s`,
          transformOrigin: 'bottom'
        }}
      />
    ));
    const frontPlants = createRandomArray(18, (i) => (
      <Plant
        key={`front-plant-${i}`}
        className="absolute bottom-0 bg-gradient-to-t from-green-600/80 to-transparent opacity-80"
        style={{
          width: `${4 + Math.random() * 6}px`,
          height: `${100 + Math.random() * 150}px`,
          left: `${Math.random() * 100}%`,
          borderRadius: '2px',
          animationName: 'frontPlantSway',
          animationDuration: `${4 + Math.random() * 3}s`,
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
          animationDelay: `${Math.random() * 2}s`,
          transformOrigin: 'bottom'
        }}
      />
    ));
    const spikyPlants = createRandomArray(12, (i) => (
      <Plant
        key={`spiky-plant-${i}`}
        className="absolute bottom-0 bg-gradient-to-t from-emerald-700/70 to-transparent opacity-65"
        style={{
          width: `${6 + Math.random() * 8}px`,
          height: `${80 + Math.random() * 120}px`,
          left: `${Math.random() * 100}%`,
          borderRadius: '0 0 50% 50%',
          animationName: 'spikySway',
          animationDuration: `${3 + Math.random() * 2}s`,
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
          animationDelay: `${Math.random() * 1.5}s`,
          transformOrigin: 'bottom'
        }}
      />
    ));
    // Fish and bubbles remain unchanged
    const bgFish = createRandomArray(8, (i) => {
      const size = 40 + Math.random() * 20;
      const color = Math.random() > 0.5 ? 'rgba(30, 64, 175, 0.6)' : 'rgba(71, 85, 105, 0.6)';
      const direction = Math.random() > 0.5 ? 1 : (-1 as 1 | -1);
      const type = (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3;
      return (
        <Fish
          key={`bg-fish-${i}`}
          size={size}
          color={color}
          direction={direction}
          type={type}
          blur={4}
          style={{
            left: direction === 1 ? '-60px' : 'calc(100% + 60px)',
            top: `${40 + Math.random() * 30}%`,
            animationName: `fishSwimHorizontal${direction === 1 ? 'Right' : 'Left'}`,
            animationDuration: `${30 + Math.random() * 20}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: `${Math.random() * 15}s`,
            opacity: 0.2
          }}
        />
      );
    });
    const midFish = createRandomArray(10, (i) => {
      const size = 28 + Math.random() * 12;
      const colors = ['rgba(29, 78, 216, 0.7)', 'rgba(67, 56, 202, 0.7)', 'rgba(8, 145, 178, 0.7)'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const direction = Math.random() > 0.5 ? 1 : (-1 as 1 | -1);
      const type = (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3;
      return (
        <Fish
          key={`mid-fish-${i}`}
          size={size}
          color={color}
          direction={direction}
          type={type}
          blur={3}
          style={{
            left: direction === 1 ? '-40px' : 'calc(100% + 40px)',
            top: `${30 + Math.random() * 40}%`,
            animationName: `fishSwimHorizontal${direction === 1 ? 'Right' : 'Left'}`,
            animationDuration: `${20 + Math.random() * 15}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: `${Math.random() * 10}s`,
            opacity: 0.4
          }}
        />
      );
    });
    const nearFish = createRandomArray(12, (i) => {
      const size = 20 + Math.random() * 8;
      const colors = [
        'rgba(37, 99, 235, 0.8)',
        'rgba(8, 145, 178, 0.8)',
        'rgba(13, 148, 136, 0.8)',
        'rgba(67, 56, 202, 0.8)'
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const direction = Math.random() > 0.5 ? 1 : (-1 as 1 | -1);
      const type = (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3;
      return (
        <Fish
          key={`near-fish-${i}`}
          size={size}
          color={color}
          direction={direction}
          type={type}
          blur={2}
          style={{
            left: direction === 1 ? '-30px' : 'calc(100% + 30px)',
            top: `${20 + Math.random() * 60}%`,
            animationName: `fishSwimHorizontal${direction === 1 ? 'Right' : 'Left'}`,
            animationDuration: `${15 + Math.random() * 10}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: `${Math.random() * 8}s`,
            opacity: 0.6
          }}
        />
      );
    });
    const frontFish = createRandomArray(15, (i) => {
      const size = 14 + Math.random() * 6;
      const colors = [
        'rgba(6, 182, 212, 0.9)',
        'rgba(59, 130, 246, 0.9)',
        'rgba(20, 184, 166, 0.9)',
        'rgba(14, 165, 233, 0.9)'
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const direction = Math.random() > 0.5 ? 1 : (-1 as 1 | -1);
      const type = (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3;
      return (
        <Fish
          key={`front-fish-${i}`}
          size={size}
          color={color}
          direction={direction}
          type={type}
          blur={1}
          style={{
            left: direction === 1 ? '-20px' : 'calc(100% + 20px)',
            top: `${10 + Math.random() * 80}%`,
            animationName: `fishSwimHorizontal${direction === 1 ? 'Right' : 'Left'}`,
            animationDuration: `${12 + Math.random() * 8}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: `${Math.random() * 6}s`,
            opacity: 0.8
          }}
        />
      );
    });
    const bubbles = createRandomArray(60, (i) => (
      <Bubble
        key={`bubble-${i}`}
        className="absolute bg-cyan-200/50 rounded-full opacity-0"
        style={{
          width: `${1 + Math.random() * 8}px`,
          height: `${1 + Math.random() * 8}px`,
          left: `${Math.random() * 100}%`,
          top: `${100 + Math.random() * 20}%`,
          animationName: 'bubbleRise',
          animationDuration: `${8 + Math.random() * 12}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDelay: `${Math.random() * 6}s`,
          animationFillMode: 'forwards'
        }}
      />
    ));
    const largeBubbles = createRandomArray(30, (i) => (
      <Bubble
        key={`large-bubble-${i}`}
        className="absolute bg-cyan-300/40 rounded-full opacity-0"
        style={{
          width: `${8 + Math.random() * 12}px`,
          height: `${8 + Math.random() * 12}px`,
          left: `${Math.random() * 100}%`,
          top: `${95 + Math.random() * 10}%`,
          animationName: 'largeBubbleRiseHigher',
          animationDuration: `${16 + Math.random() * 18}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDelay: `${Math.random() * 8}s`,
          animationFillMode: 'forwards'
        }}
      />
    ));
    const plantBubbles = createRandomArray(35, (i) => (
      <Bubble
        key={`plant-bubble-${i}`}
        className="absolute bg-cyan-300/40 rounded-full opacity-0"
        style={{
          width: `${0.5 + Math.random() * 4}px`,
          height: `${0.5 + Math.random() * 4}px`,
          left: `${Math.random() * 100}%`,
          top: `${100 + Math.random() * 20}%`,
          animationName: 'slowBubbleRise',
          animationDuration: `${30 + Math.random() * 12}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDelay: `${Math.random() * 8}s`,
          animationFillMode: 'forwards'
        }}
      />
    ));
    const particles = createRandomArray(25, (i) => (
      <div
        key={`particle-${i}`}
        className="absolute w-0.5 h-0.5 bg-cyan-200/50 rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${3 + Math.random() * 3}s`
        }}
      />
    ));
    return {
      bgFish,
      midFish,
      nearFish,
      frontFish,
      deepPlants,
      midPlants,
      kelps,
      seagrass,
      frontPlants,
      spikyPlants,
      bubbles,
      largeBubbles,
      plantBubbles,
      particles
    };
  }, []);

  return (
    <div className={cn('absolute inset-0', className)} style={{ perspective: '1000px' }}>
      <div className="absolute inset-0 opacity-[0.30]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.6)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      {/* Aquarium Glass Container */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-500/60 via-blue-500/60 to-blue-800/60">
        {/* Far Background - Deep Ocean Floor */}
        <div className="absolute inset-0 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6),inset_0_20px_60px_rgba(255,255,255,0.10),inset_0_-10px_30px_rgba(0,0,0,0.5)] z-30"></div>
        <div
          className="absolute inset-0 opacity-60"
          style={{
            transform: 'translateZ(-500px) scale(1.5)',
            background:
              'linear-gradient(to bottom, transparent 60%, rgba(30, 58, 138, 0.8) 80%, rgba(30, 64, 175, 0.9) 100%)'
          }}>
          {/* Ocean floor with depth grid pattern */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-800/90 to-blue-900/80 opacity-70">
            {/* Floor grid pattern */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(10)].map((_, i) => (
                <div
                  key={`floor-grid-${i}`}
                  className="absolute w-full border-t border-slate-600/40"
                  style={{
                    bottom: `${i * 10}%`,
                    transform: `perspective(800px) rotateX(75deg) translateZ(${-i * 5}px)`
                  }}
                />
              ))}
              {[...Array(12)].map((_, i) => (
                <div
                  key={`floor-v-grid-${i}`}
                  className="absolute h-full border-l border-slate-600/30"
                  style={{
                    left: `${i * 8.33}%`,
                    transform: `perspective(800px) rotateY(-5deg) translateZ(${-i * 3}px)`
                  }}
                />
              ))}
            </div>
          </div>
          {/* Background fish - large and heavily blurred */}
          {decorations.bgFish}
          {/* Deep sea plants */}
          {decorations.deepPlants}
        </div>
        {/* Mid Background - Swimming Area */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            transform: 'translateZ(-300px) scale(1.3)',
            background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.4) 0%, rgba(37, 99, 235, 0.6) 100%)'
          }}>
          {/* Mid-depth grid overlay */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(12)].map((_, i) => (
              <div
                key={`mid-h-grid-${i}`}
                className="absolute w-full border-t border-blue-300/50"
                style={{
                  top: `${i * 8}%`,
                  transform: `perspective(600px) rotateX(45deg) translateZ(${-i * 10}px)`
                }}
              />
            ))}
            {[...Array(10)].map((_, i) => (
              <div
                key={`mid-v-grid-${i}`}
                className="absolute h-full border-l border-blue-300/40"
                style={{
                  left: `${i * 10}%`,
                  transform: `perspective(600px) rotateY(-8deg) translateZ(${-i * 8}px)`
                }}
              />
            ))}
          </div>
          {/* Mid-layer fish - medium size and blur */}
          {decorations.midFish}
          {/* Mid-level underwater plants */}
          {decorations.midPlants}
        </div>
        {/* Near Background - Active Swimming Zone */}
        <div
          className="absolute inset-0 opacity-80"
          style={{
            transform: 'translateZ(-150px) scale(1.15)',
            background: 'linear-gradient(to bottom, rgba(96, 165, 250, 0.3) 0%, rgba(59, 130, 246, 0.5) 100%)'
          }}>
          {/* Near-depth subtle grid */}
          <div className="absolute inset-0 opacity-3">
            {[...Array(8)].map((_, i) => (
              <div
                key={`near-h-grid-${i}`}
                className="absolute w-full border-t border-cyan-200/60"
                style={{
                  top: `${i * 12}%`,
                  transform: `perspective(400px) rotateX(30deg) translateZ(${-i * 5}px)`
                }}
              />
            ))}
            {[...Array(6)].map((_, i) => (
              <div
                key={`near-v-grid-${i}`}
                className="absolute h-full border-l border-cyan-200/50"
                style={{
                  left: `${i * 16}%`,
                  transform: `perspective(400px) rotateY(-5deg) translateZ(${-i * 4}px)`
                }}
              />
            ))}
          </div>
          {/* Near-layer fish - smaller and less blurred */}
          {decorations.nearFish}
          {/* Dense kelp forest */}
          {decorations.kelps}
          {/* Sea grass */}
          {decorations.seagrass}
        </div>
        {/* Foreground - Close to Glass */}
        <div
          className="absolute inset-0 opacity-90"
          style={{
            transform: 'translateZ(-50px) scale(1.05)',
            background: 'linear-gradient(to bottom, rgba(147, 197, 253, 0.2) 0%, rgba(96, 165, 250, 0.4) 100%)'
          }}>
          {/* Foreground fish - small and lightly blurred */}
          {decorations.frontFish}
          {/* More abundant bubbles with varied sizes */}
          {decorations.bubbles}
          {/* Large bubbles */}
          {decorations.largeBubbles}
          {/* Plant bubble streams */}
          {decorations.plantBubbles}
          {/* Foreground plants */}
          {decorations.frontPlants}
          {/* Spiky plants */}
          {decorations.spikyPlants}
        </div>
        {/* Reduced Water Surface Effects */}
        <div className="absolute inset-0">
          {/* Single dim sunlight ray */}
          <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-cyan-200/40 to-transparent opacity-40 transform -rotate-5 blur-sm"></div>
          {/* Subtle water caustics */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-300/20 to-transparent animate-pulse transform scale-150 rotate-45"></div>
          </div>
          {/* Reduced floating particles */}
          {decorations.particles}
        </div>
      </div>
    </div>
  );
});

UnderwaterBackground.displayName = 'UnderwaterBackground';
