'use client';

import { Eye, Mail } from 'lucide-react';
import type { FC } from 'react';

import { Button } from '@/components/ui/button';
import { useScrollIntoView } from '@/hooks/use-scroll-into-view';
import { PersonalService } from '@/services/personal.service';

import { BackgroundElements } from './background-elements';
import { ProfilePhoto } from './profile-photo';
import { ScrollIndicator } from './scroll-indicator';
import { SocialLinksSection } from './social-links-section';

export const Hero: FC = () => {
  const scrollToSection = useScrollIntoView();
  const { name, title } = PersonalService.getBasicInfo();

  return (
    <section id="hero" className="relative pt-20 pb-5 md:pt-20 md:pb-8 overflow-hidden min-h-screen flex items-center">
      <BackgroundElements />
      <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 opacity-5 dark:opacity-10 pointer-events-none lg:left-8">
            <div className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-gray-100 leading-none">
              DEVELOPER
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="text-center lg:text-left space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight">
                    <span className="block mb-2 text-gray-900 dark:text-gray-100">Hi, I&apos;m</span>
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {name}
                    </span>
                  </h1>
                </div>

                <div className="relative w-fit m-auto lg:m-0">
                  <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 font-bold">
                    {title}
                  </h2>
                  <div className="w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
                </div>
              </div>

              <div className="space-y-6 w-1/2 min-w-70 m-auto lg:m-0">
                <div className="flex justify-center lg:justify-start">
                  <Button size="lg" onClick={() => scrollToSection('projects')} className="w-full" gradient="purple">
                    <Eye />
                    View My Work
                  </Button>
                </div>

                <div className="flex justify-center lg:justify-start">
                  <Button size="lg" gradient="yellow" onClick={() => scrollToSection('contact')} className="w-full">
                    <Mail />
                    Get In Touch
                  </Button>
                </div>

                <SocialLinksSection />
              </div>
            </div>
            <ProfilePhoto />
          </div>
        </div>
      </div>
      <ScrollIndicator />
    </section>
  );
};
