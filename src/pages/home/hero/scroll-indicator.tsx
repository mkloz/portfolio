import { FC } from 'react';

export const ScrollIndicator: FC = () => (
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
    <div className="flex flex-col items-center space-y-4">
      <div className="text-gray-400 dark:text-gray-500 text-sm font-medium tracking-wider">SCROLL TO EXPLORE</div>
      <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
        <div className="w-1 h-3 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full animate-bounce mt-2"></div>
      </div>
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-purple-400 dark:bg-purple-300 rounded-full animate-pulse delay-300"></div>
        <div className="w-2 h-2 bg-pink-400 dark:bg-pink-300 rounded-full animate-pulse delay-600 "></div>
      </div>
    </div>
  </div>
);
