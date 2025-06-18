import '@/styles/lava-animations.css';

import { memo } from 'react';

export const ArchitectureBackground = memo(() => {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#1a0000]/95 via-[#5c0303]/85 to-[#990000]/60 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6),inset_0_20px_60px_rgba(255,255,255,0.1),inset_0_-10px_30px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Bright stars - only the largest ones */}
      {[...Array(20)].map((_, i) => (
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

      {/* Large lava lamp blobs */}
      <div
        className="absolute"
        style={{
          width: '150px',
          height: '210px',
          left: '8%',
          top: '20%',
          background: `radial-gradient(circle at 50% 50%, 
            rgba(255,69,0,0.85) 0%, 
            rgba(220,20,60,0.75) 60%, 
            rgba(139,0,0,0.7) 100%)`,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          filter: 'blur(1px) brightness(0.9)',
          opacity: 0.8,
          boxShadow:
            '0 0 60px rgba(255,69,0,0.4), inset 0 20px 30px rgba(255,165,0,0.2), inset 0 -10px 20px rgba(139,0,0,0.3)',
          animation: 'lava-blob-1 25s ease-in-out infinite'
        }}
      />

      <div
        className="absolute"
        style={{
          width: '135px',
          height: '190px',
          left: '75%',
          top: '50%',
          background: `radial-gradient(circle at 50% 50%, 
            rgba(255,69,0,0.85) 0%, 
            rgba(220,20,60,0.75) 60%, 
            rgba(139,0,0,0.7) 100%)`,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          filter: 'blur(1px) brightness(0.9)',
          opacity: 0.8,
          boxShadow:
            '0 0 60px rgba(255,69,0,0.4), inset 0 20px 30px rgba(255,165,0,0.2), inset 0 -10px 20px rgba(139,0,0,0.3)',
          animation: 'lava-blob-2 28s ease-in-out infinite',
          animationDelay: '8s'
        }}
      />

      {/* Medium lava lamp blobs */}
      <div
        className="absolute"
        style={{
          width: '105px',
          height: '150px',
          left: '85%',
          top: '5%',
          background: `radial-gradient(circle at 50% 50%, 
            rgba(255,69,0,0.85) 0%, 
            rgba(220,20,60,0.75) 60%, 
            rgba(139,0,0,0.7) 100%)`,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          filter: 'blur(1px) brightness(0.9)',
          opacity: 0.75,
          boxShadow:
            '0 0 40px rgba(255,69,0,0.3), inset 0 15px 25px rgba(255,165,0,0.15), inset 0 -8px 15px rgba(139,0,0,0.25)',
          animation: 'lava-blob-3 22s ease-in-out infinite',
          animationDelay: '15s'
        }}
      />

      <div
        className="absolute"
        style={{
          width: '90px',
          height: '130px',
          left: '35%',
          top: '30%',
          background: `radial-gradient(circle at 50% 50%, 
            rgba(255,69,0,0.85) 0%, 
            rgba(220,20,60,0.75) 60%, 
            rgba(139,0,0,0.7) 100%)`,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          filter: 'blur(1px) brightness(0.9)',
          opacity: 0.75,
          boxShadow:
            '0 0 40px rgba(255,69,0,0.3), inset 0 15px 25px rgba(255,165,0,0.15), inset 0 -8px 15px rgba(139,0,0,0.25)',
          animation: 'lava-blob-4 24s ease-in-out infinite',
          animationDelay: '3s'
        }}
      />

      {/* Small lava lamp blobs */}
      <div
        className="absolute"
        style={{
          width: '75px',
          height: '105px',
          left: '18%',
          top: '70%',
          background: `radial-gradient(circle at 50% 50%, 
            rgba(255,69,0,0.85) 0%, 
            rgba(220,20,60,0.75) 60%, 
            rgba(139,0,0,0.7) 100%)`,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          filter: 'blur(1px) brightness(0.9)',
          opacity: 0.7,
          boxShadow:
            '0 0 30px rgba(255,69,0,0.25), inset 0 10px 20px rgba(255,165,0,0.1), inset 0 -5px 10px rgba(139,0,0,0.2)',
          animation: 'lava-blob-5 20s ease-in-out infinite',
          animationDelay: '12s'
        }}
      />

      <div
        className="absolute"
        style={{
          width: '65px',
          height: '90px',
          left: '3%',
          top: '45%',
          background: `radial-gradient(circle at 50% 50%, 
            rgba(255,69,0,0.85) 0%, 
            rgba(220,20,60,0.75) 60%, 
            rgba(139,0,0,0.7) 100%)`,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          filter: 'blur(1px) brightness(0.9)',
          opacity: 0.7,
          boxShadow:
            '0 0 30px rgba(255,69,0,0.25), inset 0 10px 20px rgba(255,165,0,0.1), inset 0 -5px 10px rgba(139,0,0,0.2)',
          animation: 'lava-blob-6 18s ease-in-out infinite',
          animationDelay: '6s'
        }}
      />

      <div
        className="absolute"
        style={{
          width: '70px',
          height: '95px',
          left: '62%',
          top: '75%',
          background: `radial-gradient(circle at 50% 50%, 
            rgba(255,69,0,0.85) 0%, 
            rgba(220,20,60,0.75) 60%, 
            rgba(139,0,0,0.7) 100%)`,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          filter: 'blur(1px) brightness(0.9)',
          opacity: 0.7,
          boxShadow:
            '0 0 30px rgba(255,69,0,0.25), inset 0 10px 20px rgba(255,165,0,0.1), inset 0 -5px 10px rgba(139,0,0,0.2)',
          animation: 'lava-blob-7 21s ease-in-out infinite',
          animationDelay: '9s'
        }}
      />

      {/* Tiny lava lamp blobs */}
      <div
        className="absolute"
        style={{
          width: '50px',
          height: '65px',
          left: '28%',
          top: '8%',
          background: `radial-gradient(circle at 50% 50%, 
            rgba(255,69,0,0.85) 0%, 
            rgba(220,20,60,0.75) 60%, 
            rgba(139,0,0,0.7) 100%)`,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          filter: 'blur(1px) brightness(0.9)',
          opacity: 0.65,
          boxShadow:
            '0 0 20px rgba(255,69,0,0.2), inset 0 8px 15px rgba(255,165,0,0.08), inset 0 -4px 8px rgba(139,0,0,0.15)',
          animation: 'lava-blob-8 16s ease-in-out infinite',
          animationDelay: '4s'
        }}
      />

      <div
        className="absolute"
        style={{
          width: '42px',
          height: '58px',
          left: '82%',
          top: '32%',
          background: `radial-gradient(circle at 50% 50%, 
            rgba(255,69,0,0.85) 0%, 
            rgba(220,20,60,0.75) 60%, 
            rgba(139,0,0,0.7) 100%)`,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          filter: 'blur(1px) brightness(0.9)',
          opacity: 0.65,
          boxShadow:
            '0 0 20px rgba(255,69,0,0.2), inset 0 8px 15px rgba(255,165,0,0.08), inset 0 -4px 8px rgba(139,0,0,0.15)',
          animation: 'lava-blob-9 14s ease-in-out infinite',
          animationDelay: '11s'
        }}
      />

      <div
        className="absolute"
        style={{
          width: '28px',
          height: '35px',
          left: '15%',
          top: '25%',
          background: `radial-gradient(circle at 50% 50%, 
            rgba(255,69,0,0.85) 0%, 
            rgba(220,20,60,0.75) 60%, 
            rgba(139,0,0,0.7) 100%)`,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          filter: 'blur(1px) brightness(0.9)',
          opacity: 0.5,
          boxShadow:
            '0 0 15px rgba(255,69,0,0.15), inset 0 5px 10px rgba(255,165,0,0.05), inset 0 -3px 6px rgba(139,0,0,0.1)',
          animation: 'lava-blob-10 13s ease-in-out infinite',
          animationDelay: '7s'
        }}
      />

      <div
        className="absolute"
        style={{
          width: '22px',
          height: '30px',
          left: '48%',
          top: '52%',
          background: `radial-gradient(circle at 50% 50%, 
            rgba(255,69,0,0.85) 0%, 
            rgba(220,20,60,0.75) 60%, 
            rgba(139,0,0,0.7) 100%)`,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          filter: 'blur(1px) brightness(0.9)',
          opacity: 0.5,
          boxShadow:
            '0 0 15px rgba(255,69,0,0.15), inset 0 5px 10px rgba(255,165,0,0.05), inset 0 -3px 6px rgba(139,0,0,0.1)',
          animation: 'lava-blob-11 12s ease-in-out infinite',
          animationDelay: '2s'
        }}
      />

      <div
        className="absolute"
        style={{
          width: '32px',
          height: '40px',
          left: '70%',
          top: '68%',
          background: `radial-gradient(circle at 50% 50%, 
            rgba(255,69,0,0.85) 0%, 
            rgba(220,20,60,0.75) 60%, 
            rgba(139,0,0,0.7) 100%)`,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          filter: 'blur(1px) brightness(0.9)',
          opacity: 0.5,
          boxShadow:
            '0 0 15px rgba(255,69,0,0.15), inset 0 5px 10px rgba(255,165,0,0.05), inset 0 -3px 6px rgba(139,0,0,0.1)',
          animation: 'lava-blob-12 15s ease-in-out infinite',
          animationDelay: '13s'
        }}
      />
    </div>
  );
});

ArchitectureBackground.displayName = 'ArchitectureBackground';
