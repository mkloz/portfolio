'use client';

import { cn } from '@/lib/utils';

import type { DeviceSelectorProps } from './types';

export const DeviceSelector = ({ devices, currentDevice, onDeviceChange }: DeviceSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Device Preview & Controls</h3>
      <div className="grid grid-cols-3 gap-3">
        {devices.map((device) => {
          const Icon = device.icon;
          const isActive = currentDevice === device.id;

          return (
            <button
              key={device.id}
              onClick={() => onDeviceChange(device.id)}
              className={cn(
                'p-3 rounded-xl border-2 transition-all duration-300',
                isActive
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500'
              )}>
              <Icon className="mx-auto mb-2" size={20} />
              <div className="text-sm font-semibold">{device.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
