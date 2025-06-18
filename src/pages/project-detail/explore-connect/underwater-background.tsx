'use client';

import '@/styles/underwater-animations.css';

import { cn } from '@/lib/utils';

interface UnderwaterBackgroundProps {
  className?: string;
}

export const UnderwaterBackground = ({ className }: UnderwaterBackgroundProps) => {
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
          {[...Array(8)].map((_, i) => {
            const fishSize = 40 + Math.random() * 20;
            const fishColor = Math.random() > 0.5 ? 'rgba(30, 64, 175, 0.6)' : 'rgba(71, 85, 105, 0.6)';
            const direction = Math.random() > 0.5 ? 1 : -1;
            const fishType = Math.floor(Math.random() * 3) + 1;
            return (
              <div
                key={`bg-fish-${i}`}
                className="absolute opacity-20"
                style={{
                  left: direction === 1 ? '-60px' : 'calc(100% + 60px)',
                  top: `${40 + Math.random() * 30}%`,
                  filter: 'blur(4px)',
                  animationName: `fishSwimHorizontal${direction === 1 ? 'Right' : 'Left'}`,
                  animationDuration: `${30 + Math.random() * 20}s`,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                  animationDelay: `${Math.random() * 15}s`
                }}>
                <div
                  className="relative"
                  style={{
                    width: `${fishSize}px`,
                    height: `${fishSize * 0.5}px`,
                    transform: direction === -1 ? 'scaleX(-1)' : 'scaleX(1)'
                  }}>
                  {fishType === 1 && (
                    <>
                      <div
                        className="absolute rounded-full"
                        style={{
                          width: '70%',
                          height: '100%',
                          left: '0',
                          backgroundColor: fishColor
                        }}
                      />
                      <div
                        className="absolute"
                        style={{
                          width: '30%',
                          height: '80%',
                          right: '0',
                          top: '10%',
                          backgroundColor: fishColor,
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
                          backgroundColor: fishColor,
                          clipPath: 'polygon(0 100%, 100% 100%, 50% 0)'
                        }}
                      />
                    </>
                  )}
                  {fishType === 2 && (
                    <>
                      <div
                        className="absolute rounded-full"
                        style={{
                          width: '80%',
                          height: '100%',
                          left: '0',
                          backgroundColor: fishColor
                        }}
                      />
                      <div
                        className="absolute"
                        style={{
                          width: '25%',
                          height: '70%',
                          right: '0',
                          top: '15%',
                          backgroundColor: fishColor,
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
                          backgroundColor: fishColor,
                          clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
                        }}
                      />
                    </>
                  )}
                  {fishType === 3 && (
                    <>
                      <div
                        className="absolute"
                        style={{
                          width: '85%',
                          height: '60%',
                          left: '0',
                          top: '20%',
                          backgroundColor: fishColor,
                          borderRadius: `${fishSize * 0.3}px ${fishSize * 0.15}px ${fishSize * 0.15}px ${fishSize * 0.3}px`
                        }}
                      />
                      <div
                        className="absolute"
                        style={{
                          width: '20%',
                          height: '90%',
                          right: '0',
                          top: '5%',
                          backgroundColor: fishColor,
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
                          backgroundColor: fishColor,
                          clipPath: 'polygon(0 100%, 100% 100%, 50% 0)'
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {/* Deep sea plants */}
          {[...Array(18)].map((_, i) => (
            <div
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
          ))}

          {/* Deep sea ferns */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`deep-fern-${i}`}
              className="absolute bottom-0 bg-gradient-to-t from-emerald-900/50 to-transparent opacity-40"
              style={{
                width: `${15 + Math.random() * 20}px`,
                height: `${120 + Math.random() * 180}px`,
                left: `${Math.random() * 100}%`,
                borderRadius: '50% 50% 0 0',
                animationName: 'fernSway',
                animationDuration: `${7 + Math.random() * 5}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${Math.random() * 3}s`,
                transformOrigin: 'bottom'
              }}
            />
          ))}
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
          {[...Array(10)].map((_, i) => {
            const fishSize = 28 + Math.random() * 12;
            const fishColor = ['rgba(29, 78, 216, 0.7)', 'rgba(67, 56, 202, 0.7)', 'rgba(8, 145, 178, 0.7)'][
              Math.floor(Math.random() * 3)
            ];
            const direction = Math.random() > 0.5 ? 1 : -1;
            const fishType = Math.floor(Math.random() * 3) + 1;
            return (
              <div
                key={`mid-fish-${i}`}
                className="absolute opacity-40"
                style={{
                  left: direction === 1 ? '-40px' : 'calc(100% + 40px)',
                  top: `${30 + Math.random() * 40}%`,
                  filter: 'blur(3px)',
                  animationName: `fishSwimHorizontal${direction === 1 ? 'Right' : 'Left'}`,
                  animationDuration: `${20 + Math.random() * 15}s`,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                  animationDelay: `${Math.random() * 10}s`
                }}>
                <div
                  className="relative"
                  style={{
                    width: `${fishSize}px`,
                    height: `${fishSize * 0.5}px`,
                    transform: direction === -1 ? 'scaleX(-1)' : 'scaleX(1)'
                  }}>
                  {fishType === 1 && (
                    <>
                      <div
                        className="absolute rounded-full"
                        style={{
                          width: '70%',
                          height: '100%',
                          left: '0',
                          backgroundColor: fishColor
                        }}
                      />
                      <div
                        className="absolute"
                        style={{
                          width: '30%',
                          height: '80%',
                          right: '0',
                          top: '10%',
                          backgroundColor: fishColor,
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
                          backgroundColor: fishColor,
                          clipPath: 'polygon(0 100%, 100% 100%, 50% 0)'
                        }}
                      />
                    </>
                  )}
                  {fishType === 2 && (
                    <>
                      <div
                        className="absolute rounded-full"
                        style={{
                          width: '80%',
                          height: '100%',
                          left: '0',
                          backgroundColor: fishColor
                        }}
                      />
                      <div
                        className="absolute"
                        style={{
                          width: '25%',
                          height: '70%',
                          right: '0',
                          top: '15%',
                          backgroundColor: fishColor,
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
                          backgroundColor: fishColor,
                          clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
                        }}
                      />
                    </>
                  )}
                  {fishType === 3 && (
                    <>
                      <div
                        className="absolute"
                        style={{
                          width: '85%',
                          height: '60%',
                          left: '0',
                          top: '20%',
                          backgroundColor: fishColor,
                          borderRadius: `${fishSize * 0.3}px ${fishSize * 0.15}px ${fishSize * 0.15}px ${fishSize * 0.3}px`
                        }}
                      />
                      <div
                        className="absolute"
                        style={{
                          width: '20%',
                          height: '90%',
                          right: '0',
                          top: '5%',
                          backgroundColor: fishColor,
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
                          backgroundColor: fishColor,
                          clipPath: 'polygon(0 100%, 100% 100%, 50% 0)'
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {/* Mid-level underwater plants */}
          {[...Array(25)].map((_, i) => (
            <div
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
          ))}

          {/* Broad leaf plants */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`broad-leaf-${i}`}
              className="absolute bottom-0 bg-gradient-to-t from-teal-800/55 to-transparent opacity-55"
              style={{
                width: `${20 + Math.random() * 25}px`,
                height: `${100 + Math.random() * 150}px`,
                left: `${Math.random() * 100}%`,
                borderRadius: '50% 50% 20% 20%',
                animationName: 'broadLeafSway',
                animationDuration: `${5 + Math.random() * 3}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${Math.random() * 2}s`,
                transformOrigin: 'bottom'
              }}
            />
          ))}

          {/* Coral formations */}
          {[...Array(10)].map((_, i) => (
            <div
              key={`coral-${i}`}
              className="absolute bottom-0 bg-gradient-to-t from-purple-800/50 to-transparent opacity-60"
              style={{
                width: `${40 + Math.random() * 80}px`,
                height: `${60 + Math.random() * 100}px`,
                left: `${Math.random() * 100}%`,
                borderRadius: `${20 + Math.random() * 15}px ${20 + Math.random() * 15}px 0 0`,
                transform: `rotate(${-5 + Math.random() * 10}deg)`
              }}
            />
          ))}
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
          {[...Array(12)].map((_, i) => {
            const fishSize = 20 + Math.random() * 8;
            const fishColor = [
              'rgba(37, 99, 235, 0.8)',
              'rgba(8, 145, 178, 0.8)',
              'rgba(13, 148, 136, 0.8)',
              'rgba(67, 56, 202, 0.8)'
            ][Math.floor(Math.random() * 4)];
            const direction = Math.random() > 0.5 ? 1 : -1;
            const fishType = Math.floor(Math.random() * 3) + 1;
            return (
              <div
                key={`near-fish-${i}`}
                className="absolute opacity-60"
                style={{
                  left: direction === 1 ? '-30px' : 'calc(100% + 30px)',
                  top: `${20 + Math.random() * 60}%`,
                  filter: 'blur(2px)',
                  animationName: `fishSwimHorizontal${direction === 1 ? 'Right' : 'Left'}`,
                  animationDuration: `${15 + Math.random() * 10}s`,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                  animationDelay: `${Math.random() * 8}s`
                }}>
                <div
                  className="relative"
                  style={{
                    width: `${fishSize}px`,
                    height: `${fishSize * 0.5}px`,
                    transform: direction === -1 ? 'scaleX(-1)' : 'scaleX(1)'
                  }}>
                  {fishType === 1 && (
                    <>
                      <div
                        className="absolute rounded-full"
                        style={{
                          width: '70%',
                          height: '100%',
                          left: '0',
                          backgroundColor: fishColor
                        }}
                      />
                      <div
                        className="absolute"
                        style={{
                          width: '30%',
                          height: '80%',
                          right: '0',
                          top: '10%',
                          backgroundColor: fishColor,
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
                          backgroundColor: fishColor,
                          clipPath: 'polygon(0 100%, 100% 100%, 50% 0)'
                        }}
                      />
                    </>
                  )}
                  {fishType === 2 && (
                    <>
                      <div
                        className="absolute rounded-full"
                        style={{
                          width: '80%',
                          height: '100%',
                          left: '0',
                          backgroundColor: fishColor
                        }}
                      />
                      <div
                        className="absolute"
                        style={{
                          width: '25%',
                          height: '70%',
                          right: '0',
                          top: '15%',
                          backgroundColor: fishColor,
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
                          backgroundColor: fishColor,
                          clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
                        }}
                      />
                    </>
                  )}
                  {fishType === 3 && (
                    <>
                      <div
                        className="absolute"
                        style={{
                          width: '85%',
                          height: '60%',
                          left: '0',
                          top: '20%',
                          backgroundColor: fishColor,
                          borderRadius: `${fishSize * 0.3}px ${fishSize * 0.15}px ${fishSize * 0.15}px ${fishSize * 0.3}px`
                        }}
                      />
                      <div
                        className="absolute"
                        style={{
                          width: '20%',
                          height: '90%',
                          right: '0',
                          top: '5%',
                          backgroundColor: fishColor,
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
                          backgroundColor: fishColor,
                          clipPath: 'polygon(0 100%, 100% 100%, 50% 0)'
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {/* Dense kelp forest */}
          {[...Array(30)].map((_, i) => (
            <div
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
          ))}

          {/* Sea grass */}
          {[...Array(35)].map((_, i) => (
            <div
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
          ))}

          {/* Moss-like plants */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`moss-${i}`}
              className="absolute bottom-0 bg-gradient-to-t from-lime-800/45 to-transparent opacity-45"
              style={{
                width: `${8 + Math.random() * 12}px`,
                height: `${40 + Math.random() * 80}px`,
                left: `${Math.random() * 100}%`,
                borderRadius: '50% 50% 0 0',
                animationName: 'mossSway',
                animationDuration: `${3 + Math.random() * 2}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${Math.random() * 1.5}s`,
                transformOrigin: 'bottom'
              }}
            />
          ))}
        </div>

        {/* Foreground - Close to Glass */}
        <div
          className="absolute inset-0 opacity-90"
          style={{
            transform: 'translateZ(-50px) scale(1.05)',
            background: 'linear-gradient(to bottom, rgba(147, 197, 253, 0.2) 0%, rgba(96, 165, 250, 0.4) 100%)'
          }}>
          {/* Foreground fish - small and lightly blurred */}
          {[...Array(15)].map((_, i) => {
            const fishSize = 14 + Math.random() * 6;
            const fishColor = [
              'rgba(6, 182, 212, 0.9)',
              'rgba(59, 130, 246, 0.9)',
              'rgba(20, 184, 166, 0.9)',
              'rgba(14, 165, 233, 0.9)'
            ][Math.floor(Math.random() * 4)];
            const direction = Math.random() > 0.5 ? 1 : -1;
            const fishType = Math.floor(Math.random() * 3) + 1;
            return (
              <div
                key={`front-fish-${i}`}
                className="absolute opacity-80"
                style={{
                  left: direction === 1 ? '-20px' : 'calc(100% + 20px)',
                  top: `${10 + Math.random() * 80}%`,
                  filter: 'blur(1px)',
                  animationName: `fishSwimHorizontal${direction === 1 ? 'Right' : 'Left'}`,
                  animationDuration: `${12 + Math.random() * 8}s`,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                  animationDelay: `${Math.random() * 6}s`
                }}>
                <div
                  className="relative"
                  style={{
                    width: `${fishSize}px`,
                    height: `${fishSize * 0.5}px`,
                    transform: direction === -1 ? 'scaleX(-1)' : 'scaleX(1)'
                  }}>
                  {fishType === 1 && (
                    <>
                      <div
                        className="absolute rounded-full"
                        style={{
                          width: '70%',
                          height: '100%',
                          left: '0',
                          backgroundColor: fishColor
                        }}
                      />
                      <div
                        className="absolute"
                        style={{
                          width: '30%',
                          height: '80%',
                          right: '0',
                          top: '10%',
                          backgroundColor: fishColor,
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
                          backgroundColor: fishColor,
                          clipPath: 'polygon(0 100%, 100% 100%, 50% 0)'
                        }}
                      />
                    </>
                  )}
                  {fishType === 2 && (
                    <>
                      <div
                        className="absolute rounded-full"
                        style={{
                          width: '80%',
                          height: '100%',
                          left: '0',
                          backgroundColor: fishColor
                        }}
                      />
                      <div
                        className="absolute"
                        style={{
                          width: '25%',
                          height: '70%',
                          right: '0',
                          top: '15%',
                          backgroundColor: fishColor,
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
                          backgroundColor: fishColor,
                          clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
                        }}
                      />
                    </>
                  )}
                  {fishType === 3 && (
                    <>
                      <div
                        className="absolute"
                        style={{
                          width: '85%',
                          height: '60%',
                          left: '0',
                          top: '20%',
                          backgroundColor: fishColor,
                          borderRadius: `${fishSize * 0.3}px ${fishSize * 0.15}px ${fishSize * 0.15}px ${fishSize * 0.3}px`
                        }}
                      />
                      <div
                        className="absolute"
                        style={{
                          width: '20%',
                          height: '90%',
                          right: '0',
                          top: '5%',
                          backgroundColor: fishColor,
                          clipPath: 'polygon(0 0, 0 100%, 100% 50%)'
                        }}
                      />
                      <div
                        className="absolute"
                        style={{
                          backgroundColor: fishColor,
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
                          backgroundColor: fishColor,
                          clipPath: 'polygon(0 100%, 100% 100%, 50% 0)'
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {/* More abundant bubbles with varied sizes */}
          {[...Array(60)].map((_, i) => (
            <div
              key={`bubble-${i}`}
              className="absolute bg-cyan-200/50 rounded-full opacity-0"
              style={{
                width: `${1 + Math.random() * 8}px`,
                height: `${1 + Math.random() * 8}px`,
                left: `${Math.random() * 100}%`,
                top: `${100 + Math.random() * 20}%`, // Start below viewport
                animationName: 'bubbleRise',
                animationDuration: `${5 + Math.random() * 8}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationDelay: `${Math.random() * 6}s`,
                animationFillMode: 'forwards'
              }}
            />
          ))}

          {/* Large bubbles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`large-bubble-${i}`}
              className="absolute bg-cyan-300/40 rounded-full opacity-0"
              style={{
                width: `${8 + Math.random() * 12}px`,
                height: `${8 + Math.random() * 12}px`,
                left: `${Math.random() * 100}%`,
                top: `${100 + Math.random() * 20}%`, // Start below viewport
                animationName: 'largeBubbleRise',
                animationDuration: `${8 + Math.random() * 10}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationDelay: `${Math.random() * 8}s`,
                animationFillMode: 'forwards'
              }}
            />
          ))}

          {/* Plant bubble streams */}
          {[...Array(35)].map((_, i) => (
            <div
              key={`plant-bubble-${i}`}
              className="absolute bg-cyan-300/40 rounded-full opacity-0"
              style={{
                width: `${0.5 + Math.random() * 4}px`,
                height: `${0.5 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${100 + Math.random() * 20}%`, // Start below viewport
                animationName: 'slowBubbleRise',
                animationDuration: `${10 + Math.random() * 8}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationDelay: `${Math.random() * 8}s`,
                animationFillMode: 'forwards'
              }}
            />
          ))}

          {/* Foreground plants */}
          {[...Array(18)].map((_, i) => (
            <div
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
          ))}

          {/* Spiky plants */}
          {[...Array(12)].map((_, i) => (
            <div
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
          ))}
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
          {[...Array(25)].map((_, i) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};
