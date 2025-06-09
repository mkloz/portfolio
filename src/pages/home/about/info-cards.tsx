import { Globe, GraduationCap, MapPin } from 'lucide-react';
import type React from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface InfoCardProps {
  title: string;
  icon: React.ElementType;
  gradient: string;
  children: React.ReactNode;
  className?: string;
}

const InfoCard = ({ title, icon: Icon, gradient, children, className }: InfoCardProps) => {
  return (
    <div
      className={cn(
        'group border-0 shadow-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl transition-transform duration-500 rounded-3xl transform hover:scale-105',
        className
      )}>
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div
              className={cn(
                'relative w-14 h-14 rounded-3xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-xl',
                `bg-gradient-to-r`,
                gradient
              )}>
              <Icon size={20} className="text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-black text-gray-900 dark:text-gray-100 mb-2">{title}</h4>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export const EducationCard = () => {
  return (
    <InfoCard title="Education" icon={GraduationCap} gradient="from-blue-500 to-purple-500">
      <p className="text-gray-700 dark:text-gray-300 font-bold mb-1">Software Development</p>
      <p className="text-gray-600 dark:text-gray-400 mb-2">Kharkiv Polytechnic Institute</p>
    </InfoCard>
  );
};

export const LocationCard = () => {
  return (
    <InfoCard title="Location" icon={MapPin} gradient="from-green-500 to-emerald-500">
      <p className="text-gray-700 dark:text-gray-300 font-bold mb-1">Manchester City</p>
      <p className="text-gray-600 dark:text-gray-400 mb-2">United Kingdom</p>
      <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 font-bold">
        UK Based
      </Badge>
    </InfoCard>
  );
};

interface Language {
  name: string;
  level: string;
  flag: string;
  percentage: number;
}

export const LanguagesCard = () => {
  const languages: Language[] = [
    { name: 'English', level: 'Highly proficient', flag: '🇬🇧', percentage: 90 },
    { name: 'Ukrainian', level: 'Native speaker', flag: '🇺🇦', percentage: 100 },
    { name: 'Russian', level: 'Native speaker', flag: '🇷🇺', percentage: 100 }
  ];

  return (
    <div className="border-0 shadow-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl transform hover:scale-105 transition-transform duration-500">
      <div className="p-6">
        <h4 className="text-lg font-black text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-3">
          <Globe size={20} className="text-blue-500 dark:text-blue-400" />
          Languages
        </h4>
        <div className="space-y-4">
          {languages.map((lang, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-black text-gray-900 dark:text-gray-100">{lang.name}</span>
                </div>
                <span className="text-gray-600 dark:text-gray-400 font-medium text-sm">{lang.level}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 shadow-lg"
                  style={{ width: `${lang.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
