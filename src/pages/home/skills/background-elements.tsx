'use client';

export const SkillsBackgroundElements = () => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/10"></div>

      <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.15]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 dark:via-green-400/20 to-transparent animate-pulse"></div>
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            animation: 'matrix 20s linear infinite'
          }}></div>
      </div>

      <div className="absolute inset-0 opacity-15 dark:opacity-25">
        <div className="absolute top-20 left-20 text-4xl text-green-400 dark:text-green-300 font-mono animate-pulse">{`{}`}</div>
        <div className="absolute top-32 right-32 text-3xl text-blue-400 dark:text-blue-300 font-mono animate-pulse delay-300">{`</>`}</div>
        <div className="absolute bottom-40 left-40 text-5xl text-purple-400 dark:text-purple-300 font-mono animate-pulse delay-700">{`<>`}</div>
        <div className="absolute bottom-20 right-20 text-3xl text-cyan-400 dark:text-cyan-300 font-mono animate-pulse delay-1000">{`[]`}</div>
        <div className="absolute top-1/2 left-1/4 text-2xl text-pink-400 dark:text-pink-300 font-mono animate-pulse delay-1500">{`()`}</div>
        <div className="absolute top-1/3 right-1/3 text-4xl text-yellow-400 dark:text-yellow-300 font-mono animate-pulse delay-500">{`=>`}</div>
      </div>

      <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12]">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="circuit1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <line x1="0" y1="100" x2="300" y2="100" stroke="url(#circuit1)" strokeWidth="2" />
          <line x1="400" y1="200" x2="800" y2="200" stroke="url(#circuit1)" strokeWidth="2" />
          <line x1="200" y1="300" x2="600" y2="300" stroke="url(#circuit1)" strokeWidth="2" />
          <line x1="700" y1="400" x2="1200" y2="400" stroke="url(#circuit1)" strokeWidth="2" />
          <line x1="0" y1="500" x2="500" y2="500" stroke="url(#circuit1)" strokeWidth="2" />
          <line x1="600" y1="600" x2="1000" y2="600" stroke="url(#circuit1)" strokeWidth="2" />

          <line x1="150" y1="0" x2="150" y2="200" stroke="url(#circuit1)" strokeWidth="2" />
          <line x1="350" y1="150" x2="350" y2="350" stroke="url(#circuit1)" strokeWidth="2" />
          <line x1="550" y1="100" x2="550" y2="400" stroke="url(#circuit1)" strokeWidth="2" />
          <line x1="750" y1="200" x2="750" y2="500" stroke="url(#circuit1)" strokeWidth="2" />
          <line x1="950" y1="0" x2="950" y2="300" stroke="url(#circuit1)" strokeWidth="2" />

          <circle cx="150" cy="100" r="4" fill="#22c55e" className="animate-pulse" />
          <circle cx="350" cy="200" r="4" fill="#3b82f6" className="animate-pulse delay-300" />
          <circle cx="550" cy="300" r="4" fill="#8b5cf6" className="animate-pulse delay-700" />
          <circle cx="750" cy="400" r="4" fill="#ec4899" className="animate-pulse delay-1000" />
          <circle cx="950" cy="200" r="4" fill="#f59e0b" className="animate-pulse delay-500" />
        </svg>
      </div>

      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]">
        <div className="absolute top-0 left-10 text-green-400 dark:text-green-300 font-mono text-xs leading-3 animate-pulse">
          1010101
          <br />
          0101010
          <br />
          1100110
          <br />
          0011001
          <br />
          1111000
          <br />
          0000111
        </div>
        <div className="absolute top-20 left-1/4 text-blue-400 dark:text-blue-300 font-mono text-xs leading-3 animate-pulse delay-500">
          1100101
          <br />
          0011010
          <br />
          1010110
          <br />
          0101001
          <br />
          1001000
          <br />
          0110111
        </div>
        <div className="absolute top-40 right-1/4 text-purple-400 dark:text-purple-300 font-mono text-xs leading-3 animate-pulse delay-1000">
          0110101
          <br />
          1001010
          <br />
          0101110
          <br />
          1010001
          <br />
          0011000
          <br />
          1100111
        </div>
        <div className="absolute bottom-20 right-10 text-cyan-400 dark:text-cyan-300 font-mono text-xs leading-3 animate-pulse delay-1500">
          1010001
          <br />
          0101110
          <br />
          1100010
          <br />
          0011101
          <br />
          1111100
          <br />
          0000011
        </div>
      </div>

      <div className="absolute inset-0 opacity-20 dark:opacity-15">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-green-400/30 dark:from-green-400/20 to-transparent rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-blue-400/30 dark:from-blue-400/20 to-transparent rounded-full blur-lg animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-br from-purple-400/30 dark:from-purple-400/20 to-transparent rounded-full blur-2xl animate-pulse delay-1400"></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-gradient-to-br from-cyan-400/30 dark:from-cyan-400/20 to-transparent rounded-full blur-xl animate-pulse delay-300"></div>
      </div>

      <div className="absolute top-32 right-20 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 rounded-lg rotate-45 animate-pulse opacity-30"></div>
      <div className="absolute top-48 left-32 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 rounded-full animate-pulse opacity-25"></div>
      <div className="absolute bottom-32 left-20 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 rounded-xl rotate-12 animate-pulse delay-500 opacity-35"></div>
      <div className="absolute bottom-48 right-32 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400 rounded-full animate-pulse delay-1000 opacity-20"></div>

      <style>{`
        @keyframes matrix {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </>
  );
};
