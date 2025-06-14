export const ArchitectureBackground = () => {
  return (
    <div
      className="absolute inset-0 bg-gradient-to-b from-[#1a0000]/95 via-[#5c0303]/85 to-[#990000]/60
shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6),inset_0_20px_60px_rgba(255,255,255,0.1),inset_0_-10px_30px_rgba(0,0,0,0.5)]">
      {/* Distant stars - smallest layer */}
      {[...Array(50)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute w-px h-px bg-white/30 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        />
      ))}
      {/* Medium stars */}
      {[...Array(30)].map((_, i) => (
        <div
          key={`star-med-${i}`}
          className="absolute w-0.5 h-0.5 bg-cyan-300/40 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}
      {/* Bright stars - closest layer */}
      {[...Array(10)].map((_, i) => (
        <div
          key={`star-bright-${i}`}
          className="absolute w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse shadow-lg shadow-cyan-400/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${1.5 + Math.random() * 2}s`
          }}
        />
      ))}
      {/* Grid pattern with depth */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.4)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.6)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      {/* Floating particles with depth */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse shadow-sm shadow-cyan-400/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};
