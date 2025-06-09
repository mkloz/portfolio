export const ProjectsBackgroundElements = () => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50/40 to-pink-50/30 dark:from-gray-900 dark:via-indigo-900/20 dark:to-pink-900/10"></div>

      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]">
        <div className="absolute top-20 left-10 w-64 h-8 bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-600/50 dark:to-purple-600/50 rounded-full transform rotate-12 blur-sm"></div>
        <div className="absolute top-40 right-20 w-48 h-6 bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-600/50 dark:to-pink-600/50 rounded-full transform -rotate-6 blur-sm"></div>
        <div className="absolute bottom-32 left-20 w-56 h-10 bg-gradient-to-r from-pink-300 to-orange-300 dark:from-pink-600/50 dark:to-orange-600/50 rounded-full transform rotate-6 blur-sm"></div>
        <div className="absolute bottom-48 right-32 w-40 h-4 bg-gradient-to-r from-orange-300 to-yellow-300 dark:from-orange-600/50 dark:to-yellow-600/50 rounded-full transform -rotate-12 blur-sm"></div>

        <div className="absolute top-1/4 left-10 w-32 h-32 border-4 border-indigo-200 dark:border-indigo-600/30 rounded-2xl transform rotate-45 opacity-40"></div>
        <div className="absolute top-1/2 right-10 w-24 h-24 border-3 border-purple-200 dark:border-purple-600/30 rounded-full opacity-30"></div>
        <div className="absolute bottom-1/4 left-10 w-28 h-28 border-4 border-pink-200 dark:border-pink-600/30 transform rotate-12 opacity-25"></div>
      </div>

      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div className="absolute top-32 left-16 text-4xl text-indigo-400 dark:text-indigo-300 animate-pulse">🎨</div>
        <div className="absolute top-48 right-16 text-3xl text-purple-400 dark:text-purple-300 animate-pulse delay-300">
          ✨
        </div>
        <div className="absolute bottom-40 left-16 text-2xl text-pink-400 dark:text-pink-300 animate-pulse delay-700">
          🚀
        </div>
        <div className="absolute bottom-32 right-16 text-3xl text-orange-400 dark:text-orange-300 animate-pulse delay-1000">
          💡
        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}></div>
      </div>

      <div className="absolute inset-0 opacity-15 dark:opacity-10">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-indigo-300/40 dark:from-indigo-400/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/3 left-20 w-24 h-24 bg-gradient-to-br from-purple-300/40 dark:from-purple-400/20 to-transparent rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 right-20 w-36 h-36 bg-gradient-to-br from-pink-300/40 dark:from-pink-400/20 to-transparent rounded-full blur-3xl animate-pulse delay-1400"></div>
        <div className="absolute bottom-1/3 left-20 w-28 h-28 bg-gradient-to-br from-orange-300/40 dark:from-orange-400/20 to-transparent rounded-full blur-xl animate-pulse delay-300"></div>
      </div>

      <div className="absolute inset-0 opacity-20 dark:opacity-30">
        <div className="absolute top-24 left-24 w-2 h-2 bg-indigo-400 dark:bg-indigo-300 rounded-full animate-ping"></div>
        <div className="absolute top-56 right-24 w-3 h-3 bg-purple-400 dark:bg-purple-300 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-24 left-56 w-2 h-2 bg-pink-400 dark:bg-pink-300 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-56 right-56 w-3 h-3 bg-orange-400 dark:bg-orange-300 rounded-full animate-ping delay-1500"></div>
      </div>

      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="artistic1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="33%" stopColor="#8b5cf6" />
              <stop offset="66%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 Q300,50 600,100 T1200,100"
            stroke="url(#artistic1)"
            strokeWidth="3"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M0,300 Q400,250 800,300 T1200,300"
            stroke="url(#artistic1)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse delay-700"
          />
          <path
            d="M0,500 Q200,450 400,500 T800,500 Q1000,450 1200,500"
            stroke="url(#artistic1)"
            strokeWidth="4"
            fill="none"
            className="animate-pulse delay-1400"
          />
          <path
            d="M0,700 Q600,650 1200,700"
            stroke="url(#artistic1)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse delay-300"
          />
        </svg>
      </div>
    </>
  );
};
