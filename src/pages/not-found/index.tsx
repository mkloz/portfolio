'use client';

import { ArrowLeft, Home, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { UnderwaterBackground } from '@/pages/project-detail/explore-connect/underwater-background';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
      {/* Underwater Background Only */}
      <UnderwaterBackground />

      {/* Content Overlay */}
      <div className="relative z-20 text-center px-6 max-w-2xl mx-auto my-8">
        {/* Description */}
        <p className="text-lg md:text-xl text-white/80  leading-relaxed drop-shadow-md max-w-lg mx-auto">
          The page you&apos;re looking for has drifted away into the digital depths. Let&apos;s navigate you back to
          shore.
        </p>
        {/* Large 404 Display */}
        <div className="mb-12">
          <h1 className="text-9xl md:text-[12rem] lg:text-[14rem] font-black text-white/90 leading-none tracking-tight drop-shadow-2xl">
            404
          </h1>
          <div className="relative ">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-teal-500/30 blur-xl rounded-full"></div>
            <h2 className="relative text-3xl md:text-5xl font-bold text-white drop-shadow-lg">Page Lost at Sea</h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            onClick={() => navigate('/')}
            size="lg"
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 backdrop-blur-md font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
            <Home size={22} className="mr-3" />
            Return Home
          </Button>

          <Button
            onClick={() => navigate(-1)}
            size="lg"
            variant="outline"
            className="border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 backdrop-blur-md font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:text-white">
            <ArrowLeft />
            Go Back
          </Button>

          <Button
            onClick={() => navigate('/projects')}
            size="lg"
            variant="outline"
            className="border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 backdrop-blur-md font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:text-white">
            <Search />
            Explore
          </Button>
        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="group p-6 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <Home size={24} className="text-white" />
            </div>
            <h3 className="text-white font-semibold mb-1">Home</h3>
            <p className="text-white/70 text-sm">Main portfolio</p>
          </button>

          <button
            onClick={() => navigate('/projects')}
            className="group p-6 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <Search size={24} className="text-white" />
            </div>
            <h3 className="text-white font-semibold mb-1">Projects</h3>
            <p className="text-white/70 text-sm">View all work</p>
          </button>

          <button
            onClick={() => navigate('/#contact')}
            className="group p-6 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-1">Contact</h3>
            <p className="text-white/70 text-sm">Get in touch</p>
          </button>
        </div>
      </div>
    </div>
  );
};
