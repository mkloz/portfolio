'use client';

import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { useState } from 'react';

import { Project } from '../../../data/projects';
import { DemoBackground } from './demo-background';
import { DemoControls } from './demo-controls';
import { DemoDisplay } from './demo-display';
import { DemoHeader } from './demo-header';

// Remove DEMO_DEVICES and instead generate devices from project.demo
const DEVICE_CONFIGS = {
  desktop: {
    icon: Monitor,
    label: 'Desktop',
    width: 'w-full',
    aspectRatio: 'aspect-[23/11]'
  },
  tablet: {
    icon: Tablet,
    label: 'Tablet',
    width: 'w-11/12',
    aspectRatio: 'aspect-[256/165]'
  },
  mobile: {
    icon: Smartphone,
    label: 'Mobile',
    width: 'w-70 h-full',
    aspectRatio: 'aspect-[10/18]'
  },
  laptop: {
    icon: Monitor,
    label: 'Laptop',
    width: 'w-2/3',
    aspectRatio: 'aspect-auto'
  }
};

interface InteractiveDemoProps {
  project: Project;
}

export const InteractiveDemo = ({ project }: InteractiveDemoProps) => {
  // Derive devices from project.demo
  const devices = (project.demo || []).map((d) => ({
    id: d.device,
    icon: DEVICE_CONFIGS[d.device]?.icon || Monitor,
    label: DEVICE_CONFIGS[d.device]?.label || d.device,
    width: DEVICE_CONFIGS[d.device]?.width || 'w-full',
    length: d.length,
    aspectRatio: DEVICE_CONFIGS[d.device]?.aspectRatio || 'aspect-[16/9]'
  }));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDevice, setCurrentDevice] = useState(devices[0]?.id || 'desktop');
  const currentDeviceConfig = devices.find((d) => d.id === currentDevice);
  return (
    <section className="relative py-20" id="demo">
      <DemoBackground />

      <div className="container mx-auto px-4 relative ">
        <div className="max-w-6xl mx-auto">
          <DemoHeader gradient={project.gradient} />

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Side: Controls and Stats */}
            <DemoControls
              devices={devices}
              currentDevice={currentDevice}
              onDeviceChange={setCurrentDevice}
              isPlaying={isPlaying}
              onPlayToggle={() => setIsPlaying(!isPlaying)}
              onReset={() => {
                setIsPlaying(false);
                setTimeout(() => setIsPlaying(true), 0);
              }}
              stats={[
                { label: 'Responsive', value: '100%' },
                { label: 'Demo Length', value: currentDeviceConfig?.length || '0:00' }
              ]}
              project={project}
            />

            {/* Right Side: Demo Display */}
            <DemoDisplay
              project={project}
              currentDevice={currentDevice}
              devices={devices}
              isPlaying={isPlaying}
              onPlayToggle={() => setIsPlaying(!isPlaying)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
