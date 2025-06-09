import { FC } from 'react';

export const BackgroundElements: FC = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/50 to-white dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-800"></div>

    <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.15]">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <path
          d="M0,200 Q300,100 600,200 T1200,200 L1200,0 Z"
          fill="url(#wave1)"
          className="animate-pulse duration-4000"
        />
        <path
          d="M0,400 Q400,300 800,400 T1200,400 L1200,200 L0,200 Z"
          fill="url(#wave1)"
          opacity="0.5"
          className="animate-pulse duration-4000 delay-1000"
        />
      </svg>
    </div>

    <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]">
      <div className="absolute top-20 left-20 w-32 h-32 border-2 border-blue-300 dark:border-blue-400 rounded-lg rotate-12 animate-pulse"></div>
      <div className="absolute top-40 right-32 w-24 h-24 border-2 border-purple-300 dark:border-purple-400 rounded-full animate-pulse delay-500"></div>
      <div className="absolute bottom-32 left-32 w-28 h-28 border-2 border-pink-300 dark:border-pink-400 rounded-lg -rotate-12 animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 right-20 w-20 h-20 border-2 border-cyan-300 dark:border-cyan-400 rounded-full animate-pulse delay-1500"></div>

      <div className="absolute top-1/3 left-10 text-6xl text-blue-300 dark:text-blue-400 font-mono opacity-30 animate-pulse">
        {'{'}
      </div>
      <div className="absolute top-1/3 right-10 text-6xl text-purple-300 dark:text-purple-400 font-mono opacity-30 animate-pulse delay-700">
        {'}'}
      </div>
      <div className="absolute bottom-1/3 left-1/4 text-4xl text-pink-300 dark:text-pink-400 font-mono opacity-30 animate-pulse delay-300">
        {'</'}
      </div>
      <div className="absolute bottom-1/3 right-1/4 text-4xl text-cyan-300 dark:text-cyan-400 font-mono opacity-30 animate-pulse delay-1200">
        {'>'}
      </div>
    </div>

    <div className="absolute inset-0 opacity-30 dark:opacity-20">
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-200/40 dark:from-blue-400/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-tr from-purple-200/40 dark:from-purple-400/20 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-pink-200/40 dark:from-pink-400/20 to-transparent rounded-full blur-xl animate-pulse delay-2000"></div>
    </div>

    <div className="absolute top-32 right-20 w-3 h-3 bg-blue-400 dark:bg-blue-300 rounded-full animate-pulse opacity-60"></div>
    <div className="absolute top-48 left-32 w-2 h-2 bg-purple-400 dark:bg-purple-300 rounded-full animate-pulse opacity-50"></div>
    <div className="absolute bottom-32 left-20 w-4 h-4 bg-pink-400 dark:bg-pink-300 rounded-full animate-pulse delay-300 opacity-60"></div>
    <div className="absolute bottom-48 right-32 w-2 h-2 bg-cyan-400 dark:bg-cyan-300 rounded-full animate-pulse delay-1000 opacity-50"></div>

    <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
    </div>
  </>
);
