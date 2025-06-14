'use client';

import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { useState } from 'react';

import { Project } from '../../../data/projects';
import { DemoBackground } from './demo-background';
import { DemoControls } from './demo-controls';
import { DemoDisplay } from './demo-display';
import { DemoHeader } from './demo-header';
import type { DemoStat, Device } from './types';

const DEMO_DEVICES: Device[] = [
  {
    id: 'desktop',
    icon: Monitor,
    label: 'Desktop',
    width: 'w-full',
    aspectRatio: 'aspect-[16/9]'
  },
  {
    id: 'tablet',
    icon: Tablet,
    label: 'Tablet',
    width: 'w-3/4',
    aspectRatio: 'aspect-[4/3]'
  },
  {
    id: 'mobile',
    icon: Smartphone,
    label: 'Mobile',
    width: 'w-1/2',
    aspectRatio: 'aspect-[9/16]'
  }
];

const DEMO_STATS: DemoStat[] = [
  { label: 'Responsive', value: '100%' },
  { label: 'Demo Length', value: '1:15' }
];

interface InteractiveDemoProps {
  project: Project;
}

export const InteractiveDemo = ({ project }: InteractiveDemoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDevice, setCurrentDevice] = useState<Device['id']>('desktop');

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
  };

  const handleDeviceChange = (deviceId: Device['id']) => {
    setCurrentDevice(deviceId);
  };

  return (
    <section className="relative py-20" id="demo">
      <DemoBackground />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <DemoHeader gradient={project.gradient} />

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Side: Controls and Stats */}
            <DemoControls
              devices={DEMO_DEVICES}
              currentDevice={currentDevice}
              onDeviceChange={handleDeviceChange}
              isPlaying={isPlaying}
              onPlayToggle={handlePlayToggle}
              onReset={handleReset}
              stats={DEMO_STATS}
              project={project}
            />

            {/* Right Side: Demo Display */}
            <DemoDisplay
              project={project}
              currentDevice={currentDevice}
              devices={DEMO_DEVICES}
              isPlaying={isPlaying}
              onPlayToggle={handlePlayToggle}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
