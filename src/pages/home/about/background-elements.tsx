export const AboutBackgroundElements = () => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50/30 to-red-50/20 dark:from-gray-900 dark:via-amber-900/10 dark:to-red-900/10"></div>

      <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12]">
        <div className="absolute top-20 left-10 w-64 h-80 bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-800/30 dark:to-orange-800/30 rounded-lg transform rotate-12 shadow-2xl"></div>
        <div className="absolute top-32 left-24 w-64 h-80 bg-gradient-to-br from-orange-200 to-red-200 dark:from-orange-800/30 dark:to-red-800/30 rounded-lg transform rotate-6 shadow-xl"></div>
        <div className="absolute top-44 left-38 w-64 h-80 bg-gradient-to-br from-red-200 to-pink-200 dark:from-red-800/30 dark:to-pink-800/30 rounded-lg transform -rotate-3 shadow-lg"></div>

        <div className="absolute bottom-20 right-10 w-48 h-64 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800/30 dark:to-purple-800/30 rounded-lg transform -rotate-12 shadow-2xl"></div>
        <div className="absolute bottom-32 right-24 w-48 h-64 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800/30 dark:to-pink-800/30 rounded-lg transform -rotate-6 shadow-xl"></div>
      </div>

      <div className="absolute inset-0 opacity-20 dark:opacity-30">
        <div className="absolute top-32 left-32 text-6xl text-amber-400 dark:text-amber-300 font-serif">&quot;</div>
        <div className="absolute bottom-32 right-32 text-6xl text-orange-400 dark:text-orange-300 font-serif rotate-180">
          &quot;
        </div>

        <div className="absolute top-1/4 right-1/4 text-4xl text-red-300 dark:text-red-400 animate-pulse">✨</div>
        <div className="absolute bottom-1/4 left-1/4 text-3xl text-pink-300 dark:text-pink-400 animate-pulse delay-500">
          📖
        </div>
        <div className="absolute top-1/2 left-1/6 text-2xl text-purple-300 dark:text-purple-400 animate-pulse delay-1000">
          🎯
        </div>
        <div className="absolute top-3/4 right-1/6 text-3xl text-blue-300 dark:text-blue-400 animate-pulse delay-1500">
          🚀
        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.15]">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="timeline1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <path d="M0,200 L1200,250" stroke="url(#timeline1)" strokeWidth="3" fill="none" className="animate-pulse" />
          <path
            d="M0,400 L1200,380"
            stroke="url(#timeline1)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse delay-700"
          />
          <path
            d="M0,600 L1200,620"
            stroke="url(#timeline1)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse delay-1400"
          />
        </svg>
      </div>

      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(251, 191, 36, 0.3) 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, rgba(239, 68, 68, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
      </div>

      <div className="absolute top-20 right-20 w-6 h-8 bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-300 dark:to-orange-400 rounded-sm rotate-12 animate-pulse opacity-40"></div>
      <div className="absolute top-40 left-20 w-4 h-6 bg-gradient-to-br from-red-400 to-pink-500 dark:from-red-300 dark:to-pink-400 rounded-sm -rotate-12 animate-pulse opacity-30"></div>
      <div className="absolute bottom-32 right-40 w-5 h-7 bg-gradient-to-br from-purple-400 to-blue-500 dark:from-purple-300 dark:to-blue-400 rounded-sm rotate-6 animate-pulse delay-300 opacity-35"></div>
      <div className="absolute bottom-48 left-40 w-3 h-5 bg-gradient-to-br from-blue-400 to-cyan-500 dark:from-blue-300 dark:to-cyan-400 rounded-sm -rotate-6 animate-pulse delay-1000 opacity-25"></div>
    </>
  );
};
