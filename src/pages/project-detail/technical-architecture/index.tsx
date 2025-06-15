'use client';

import { useEffect, useState } from 'react';

import { ArchitectureBackground } from './architecture-background';
import { ArchitectureDiagram } from './architecture-diagram';
import { ArchitectureHeader } from './architecture-header';

// Constants defined outside component
const FLOW_STEPS = ['frontend', 'backend', 'database', 'infrastructure'];

export const TechnicalArchitecture = () => {
  const [activeLayer, setActiveLayer] = useState<string | null>('frontend');

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLayer((current) => {
        const currentIndex = current ? FLOW_STEPS.indexOf(current) : 0;
        const nextIndex = (currentIndex + 1) % FLOW_STEPS.length;
        return FLOW_STEPS[nextIndex];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden" id="architecture">
      {/* Deep Space Background */}
      <ArchitectureBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <ArchitectureHeader />

          {/* Architecture Diagram */}
          <ArchitectureDiagram activeLayer={activeLayer} />
        </div>
      </div>
    </section>
  );
};
