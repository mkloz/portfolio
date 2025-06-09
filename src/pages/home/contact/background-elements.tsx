export const ContactBackgroundElements = () => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50/40 to-cyan-50/30 dark:from-gray-900 dark:via-emerald-900/10 dark:to-cyan-900/10"></div>

      <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.15]">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="network1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <line x1="100" y1="100" x2="300" y2="200" stroke="url(#network1)" strokeWidth="2" className="animate-pulse" />
          <line
            x1="300"
            y1="200"
            x2="500"
            y2="150"
            stroke="url(#network1)"
            strokeWidth="2"
            className="animate-pulse delay-300"
          />
          <line
            x1="500"
            y1="150"
            x2="700"
            y2="250"
            stroke="url(#network1)"
            strokeWidth="2"
            className="animate-pulse delay-700"
          />
          <line
            x1="700"
            y1="250"
            x2="900"
            y2="180"
            stroke="url(#network1)"
            strokeWidth="2"
            className="animate-pulse delay-1000"
          />
          <line
            x1="900"
            y1="180"
            x2="1100"
            y2="220"
            stroke="url(#network1)"
            strokeWidth="2"
            className="animate-pulse delay-500"
          />

          <line
            x1="150"
            y1="400"
            x2="350"
            y2="350"
            stroke="url(#network1)"
            strokeWidth="2"
            className="animate-pulse delay-1200"
          />
          <line
            x1="350"
            y1="350"
            x2="550"
            y2="400"
            stroke="url(#network1)"
            strokeWidth="2"
            className="animate-pulse delay-200"
          />
          <line
            x1="550"
            y1="400"
            x2="750"
            y2="320"
            stroke="url(#network1)"
            strokeWidth="2"
            className="animate-pulse delay-800"
          />
          <line
            x1="750"
            y1="320"
            x2="950"
            y2="380"
            stroke="url(#network1)"
            strokeWidth="2"
            className="animate-pulse delay-400"
          />

          <line
            x1="300"
            y1="200"
            x2="350"
            y2="350"
            stroke="url(#network1)"
            strokeWidth="1"
            className="animate-pulse delay-600"
          />
          <line
            x1="500"
            y1="150"
            x2="550"
            y2="400"
            stroke="url(#network1)"
            strokeWidth="1"
            className="animate-pulse delay-900"
          />
          <line
            x1="700"
            y1="250"
            x2="750"
            y2="320"
            stroke="url(#network1)"
            strokeWidth="1"
            className="animate-pulse delay-1100"
          />

          <circle cx="100" cy="100" r="6" fill="#10b981" className="animate-pulse" />
          <circle cx="300" cy="200" r="8" fill="#06b6d4" className="animate-pulse delay-300" />
          <circle cx="500" cy="150" r="7" fill="#3b82f6" className="animate-pulse delay-700" />
          <circle cx="700" cy="250" r="9" fill="#8b5cf6" className="animate-pulse delay-1000" />
          <circle cx="900" cy="180" r="6" fill="#ec4899" className="animate-pulse delay-500" />
          <circle cx="1100" cy="220" r="8" fill="#f59e0b" className="animate-pulse delay-1200" />

          <circle cx="150" cy="400" r="7" fill="#10b981" className="animate-pulse delay-200" />
          <circle cx="350" cy="350" r="6" fill="#06b6d4" className="animate-pulse delay-800" />
          <circle cx="550" cy="400" r="8" fill="#3b82f6" className="animate-pulse delay-400" />
          <circle cx="750" cy="320" r="7" fill="#8b5cf6" className="animate-pulse delay-600" />
          <circle cx="950" cy="380" r="9" fill="#ec4899" className="animate-pulse delay-900" />
        </svg>
      </div>

      <div className="absolute inset-0 opacity-15 dark:opacity-25">
        <div className="absolute top-32 left-32 text-5xl text-emerald-400 dark:text-emerald-300 animate-pulse">📧</div>
        <div className="absolute top-48 right-48 text-4xl text-teal-400 dark:text-teal-300 animate-pulse delay-300">
          📱
        </div>
        <div className="absolute bottom-40 left-48 text-3xl text-cyan-400 dark:text-cyan-300 animate-pulse delay-700">
          💬
        </div>
        <div className="absolute bottom-32 right-32 text-4xl text-blue-400 dark:text-blue-300 animate-pulse delay-1000">
          🌐
        </div>
        <div className="absolute top-1/2 left-1/6 text-2xl text-purple-400 dark:text-purple-300 animate-pulse delay-500">
          📞
        </div>
        <div className="absolute top-2/3 right-1/6 text-3xl text-pink-400 dark:text-pink-300 animate-pulse delay-1500">
          ✉️
        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12]">
        <div className="absolute top-1/4 left-1/4">
          <div className="w-32 h-32 border-2 border-emerald-300 dark:border-emerald-400 rounded-full animate-ping"></div>
          <div className="absolute inset-4 w-24 h-24 border-2 border-teal-300 dark:border-teal-400 rounded-full animate-ping delay-500"></div>
          <div className="absolute inset-8 w-16 h-16 border-2 border-cyan-300 dark:border-cyan-400 rounded-full animate-ping delay-1000"></div>
        </div>

        <div className="absolute bottom-1/4 right-1/4">
          <div className="w-40 h-40 border-2 border-blue-300 dark:border-blue-400 rounded-full animate-ping delay-300"></div>
          <div className="absolute inset-6 w-28 h-28 border-2 border-purple-300 dark:border-purple-400 rounded-full animate-ping delay-800"></div>
          <div className="absolute inset-12 w-16 h-16 border-2 border-pink-300 dark:border-pink-400 rounded-full animate-ping delay-1300"></div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-20 dark:opacity-15">
        <div className="absolute top-20 right-20 w-36 h-36 bg-gradient-to-br from-emerald-300/40 dark:from-emerald-400/20 to-transparent rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 left-20 w-28 h-28 bg-gradient-to-br from-teal-300/40 dark:from-teal-400/20 to-transparent rounded-full blur-lg animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 right-1/4 w-44 h-44 bg-gradient-to-br from-cyan-300/40 dark:from-cyan-400/20 to-transparent rounded-full blur-2xl animate-pulse delay-1400"></div>
        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 bg-gradient-to-br from-blue-300/40 dark:from-blue-400/20 to-transparent rounded-full blur-xl animate-pulse delay-300"></div>
      </div>

      <div className="absolute inset-0 opacity-25 dark:opacity-35">
        <div className="absolute top-24 left-24 w-3 h-3 bg-emerald-400 dark:bg-emerald-300 rounded-full animate-ping"></div>
        <div className="absolute top-56 right-24 w-2 h-2 bg-teal-400 dark:bg-teal-300 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-24 left-56 w-4 h-4 bg-cyan-400 dark:bg-cyan-300 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-56 right-56 w-2 h-2 bg-blue-400 dark:bg-blue-300 rounded-full animate-ping delay-1500"></div>
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-purple-400 dark:bg-purple-300 rounded-full animate-ping delay-300"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-pink-400 dark:bg-pink-300 rounded-full animate-ping delay-800"></div>
      </div>

      <div className="absolute top-32 right-20 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 rounded-full animate-pulse opacity-30"></div>
      <div className="absolute top-48 left-32 w-4 h-4 bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-400 dark:to-cyan-400 rounded-full animate-pulse opacity-25"></div>
      <div className="absolute bottom-32 left-20 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-400 rounded-full animate-pulse delay-500 opacity-35"></div>
      <div className="absolute bottom-48 right-32 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full animate-pulse delay-1000 opacity-20"></div>
    </>
  );
};
