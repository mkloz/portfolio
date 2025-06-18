'use client';

import { ChevronRight } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

import { cn } from '@/lib/utils';

import { StepIcon } from './step-icon';
import type { StepTimelineProps } from './types';

export const StepTimeline = ({ steps, activeStep, onStepClick }: StepTimelineProps) => {
  return (
    <div className="relative mb-10">
      {/* Timeline container */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-1 sm:gap-3 min-[20rem]:gap-2 lg:gap-6">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;
            const isLast = index === steps.length - 1;

            return (
              <Fragment key={step.id}>
                {/* Step node */}
                <div className="flex flex-col items-center cursor-pointer group" onClick={() => onStepClick(index)}>
                  <StepIcon stepId={step.id} isActive={isActive} isCompleted={isCompleted} />

                  {/* Step label - hidden on mobile */}
                  <div className="mt-4 sm:mt-6 text-center max-w-20 sm:max-w-28 hidden md:block min-h-10 line-clamp-2">
                    <div
                      className={cn(
                        'text-xs sm:text-sm font-medium transition-all duration-300',
                        isActive
                          ? 'text-white'
                          : isCompleted
                            ? 'text-slate-300 group-hover:text-white'
                            : 'text-slate-500 group-hover:text-slate-400'
                      )}>
                      {step.title}
                    </div>
                  </div>
                </div>

                {/* Arrow between steps */}
                {!isLast && (
                  <div className="mx-0 sm:mx-3 lg:mx-6 flex items-center">
                    <ChevronRight
                      size={20}
                      className={cn(
                        'sm:w-6 sm:h-6 md:w-8 md:h-8 transition-all duration-500',
                        index < activeStep
                          ? 'text-white'
                          : index === activeStep - 1
                            ? 'text-slate-300 animate-pulse'
                            : 'text-slate-600'
                      )}
                    />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
