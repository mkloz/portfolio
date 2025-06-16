'use client';

import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import { ArchitectureBackground } from './architecture-background';
import { StepCard } from './step-card';
import { StepTimeline } from './step-timeline';
import type { TechnicalArchitectureProps } from './types';

export const TechnicalArchitecture = ({ developmentJourney }: TechnicalArchitectureProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % developmentJourney.steps.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlay, developmentJourney.steps.length]);

  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
    setIsAutoPlay(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const resetToStart = () => {
    setActiveStep(0);
    setIsAutoPlay(false);
  };

  const goToPrevious = () => {
    setActiveStep((prev) => (prev - 1 + developmentJourney.steps.length) % developmentJourney.steps.length);
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setActiveStep((prev) => (prev + 1) % developmentJourney.steps.length);
    setIsAutoPlay(false);
  };

  if (!developmentJourney?.steps || developmentJourney.steps.length === 0) {
    return null;
  }

  return (
    <section className="py-20 relative overflow-hidden" id="development-journey">
      {/* Background - Fixed position to prevent rerendering */}
      <div className="absolute inset-0">
        <ArchitectureBackground />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            {/* Title */}
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Development{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>

            <p className="text-lg text-slate-400 max-w-4xl mx-auto leading-relaxed mb-8">
              Technical decisions, implementation strategies, and key achievements at each development phase.
            </p>

            {/* Mobile-Responsive Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              {/* Navigation Controls - First line on mobile */}
              <div className="flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-2 shadow-xl h-12 max-sm:w-1/2">
                <Button
                  onClick={goToPrevious}
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                  disabled={activeStep === 0}>
                  <ChevronLeft size={16} />
                </Button>

                <div className="flex gap-2 px-4 grow items-center justify-center">
                  <div className="text-sm font-medium text-white">{activeStep + 1}</div>
                  <div className="text-xs text-slate-500">/</div>
                  <div className="text-sm text-slate-400">{developmentJourney.steps.length}</div>
                </div>

                <Button
                  onClick={goToNext}
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                  disabled={activeStep === developmentJourney.steps.length - 1}>
                  <ChevronRight size={16} />
                </Button>
              </div>

              {/* Playback Controls - Second line on mobile */}
              <div className="flex items-center gap-3 max-sm:min-w-1/2">
                <Button
                  onClick={toggleAutoPlay}
                  variant="outline"
                  size="sm"
                  className={`
                    px-4 h-12 rounded-xl border transition-all duration-200 grow hover:text-white active:bg-white/20
                    ${
                      isAutoPlay
                        ? 'bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30'
                        : 'bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30'
                    }
                  `}>
                  {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
                  <span className="ml-2 text-sm font-medium">{isAutoPlay ? 'Pause' : 'Auto'}</span>
                </Button>

                <Button
                  onClick={resetToStart}
                  variant="outline"
                  size="sm"
                  className="px-4 h-12 rounded-xl bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white transition-all duration-200 active:bg-white/20">
                  <RotateCcw size={16} />
                  <span className="ml-2 text-sm font-medium">Reset</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <StepTimeline steps={developmentJourney.steps} activeStep={activeStep} onStepClick={handleStepClick} />

          {/* Step Details */}
          <StepCard step={developmentJourney.steps[activeStep]} isActive={true} stepNumber={activeStep + 1} />
        </div>
      </div>
    </section>
  );
};
