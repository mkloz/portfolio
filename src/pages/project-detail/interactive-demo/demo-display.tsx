'use client';

import { Play } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { Image } from '@/components/common/image';
import { cn } from '@/lib/utils';

import type { DemoDisplayProps } from './types';

export const DemoDisplay = ({ project, currentDevice, devices, isPlaying, onPlayToggle }: DemoDisplayProps) => {
  const currentDeviceConfig = devices.find((d) => d.id === currentDevice);
  // Find the demo for the current device
  const demo = project.demo?.find((d) => d.device === currentDevice);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Reset video to start when isPlaying becomes false
  useEffect(() => {
    if (!isPlaying && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  }, [isPlaying, demo?.link]);

  if (!currentDeviceConfig) return null;

  return (
    <div className="lg:col-span-2">
      <div className="relative">
        {/* Device Frame */}
        <div className="flex justify-center">
          <div className={cn('transition-all duration-500 max-w-full', currentDeviceConfig.width)}>
            <div className="relative bg-gray-900 rounded-2xl p-4 shadow-2xl">
              {/* Device Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <div className="flex-1 bg-gray-700 rounded-full px-4 py-1 text-center min-w-20">
                  <span className="text-gray-300 text-sm font-mono line-clamp-1 ">
                    {currentDevice === 'mobile' ? project.liveDemo?.replace('https://', '') : project.liveDemo}
                  </span>
                </div>
              </div>

              {/* Demo Content */}
              <div className={cn('relative overflow-hidden rounded-lg w-full', currentDeviceConfig.aspectRatio)}>
                {/* If playing and demo exists, show video */}
                {isPlaying && demo ? (
                  <video
                    ref={videoRef}
                    src={demo.link}
                    controlsList="nodownload nofullscreen noplaybackrate noremoteplayback novolume"
                    controls
                    disablePictureInPicture
                    disableRemotePlayback
                    autoPlay
                    muted
                    className="w-full h-full object-cover rounded-lg"
                    style={{ background: '#000' }}
                  />
                ) : (
                  <Image
                    src={
                      demo?.preview ||
                      (typeof project.image === 'string' ? project.image : project.image.light) ||
                      '/placeholder.svg'
                    }
                    alt="Demo preview"
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Play Overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <button
                      onClick={onPlayToggle}
                      className={cn(
                        'w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full',
                        'flex items-center justify-center border border-white/30',
                        'hover:bg-white/30 transition-colors'
                      )}>
                      <Play className="text-white ml-1" size={24} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
