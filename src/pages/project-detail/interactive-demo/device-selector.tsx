'use client';

import { cn } from '@/lib/utils';

import type { DeviceSelectorProps } from './types';

export const DeviceSelector = ({ devices, currentDevice, onDeviceChange }: DeviceSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Device Preview & Controls</h3>
      <div className="flex gap-3">
        {devices.map((device) => {
          const Icon = device.icon;
          const isActive = currentDevice === device.id;

          return (
            <button
              key={device.id}
              onClick={() => onDeviceChange(device.id)}
              className={cn(
                'p-3 rounded-xl border-2 transition-all duration-300 dark:hover:border-white hover:border-black grow',
                isActive && 'border-black dark:border-white'
              )}>
              <Icon className={cn('mx-auto mb-2', device.label === 'Tablet' && 'rotate-270 scale-120')} size={20} />
              <div className="text-sm font-semibold">{device.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
