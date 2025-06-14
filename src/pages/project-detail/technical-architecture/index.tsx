'use client';

import { useEffect, useState } from 'react';

import { ArchitectureBackground } from './architecture-background';
import { ArchitectureDiagram } from './architecture-diagram';
import { ArchitectureHeader } from './architecture-header';
import { LayerDetails } from './layer-details';
import type { TechnicalArchitectureProps } from './types';

// Constants defined outside component
const FLOW_STEPS = ['frontend', 'backend', 'database', 'infrastructure'];

export const TechnicalArchitecture = ({ architecture }: TechnicalArchitectureProps) => {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [isFlowActive, setIsFlowActive] = useState(false);
  const [_, setAnimationStep] = useState(0);

  useEffect(() => {
    if (isFlowActive) {
      const interval = setInterval(() => {
        setAnimationStep((prev) => {
          const nextStep = (prev + 1) % FLOW_STEPS.length;
          setActiveLayer(FLOW_STEPS[nextStep]); // Set the active layer during autoplay
          return nextStep;
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isFlowActive]);

  return (
    <section className="py-20 relative overflow-hidden" id="architecture">
      {/* Deep Space Background */}
      <ArchitectureBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <ArchitectureHeader isFlowActive={isFlowActive} setIsFlowActive={setIsFlowActive} />

          {/* Architecture Diagram */}
          <ArchitectureDiagram
            activeLayer={activeLayer}
            setActiveLayer={setActiveLayer}
            isFlowActive={isFlowActive}
            setIsFlowActive={setIsFlowActive}
          />

          {/* Layer Details */}
          {activeLayer && <LayerDetails activeLayer={activeLayer} architecture={architecture} />}
        </div>
      </div>
    </section>
  );
};
