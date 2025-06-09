import { ArrowRight } from 'lucide-react';
import { FaDiscord, FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa6';

import { cn } from '@/lib/utils';

interface SocialLink {
  name: string;
  href: string;
  icon: React.ElementType;
  gradient: string;
  hoverColor: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: FaGithub,
    gradient: 'bg-gradient-to-r from-gray-800 to-gray-900',
    hoverColor: 'hover:text-gray-700 dark:hover:text-gray-300'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: FaLinkedin,
    gradient: 'bg-gradient-to-r from-blue-600 to-blue-700',
    hoverColor: 'hover:text-blue-600 dark:hover:text-blue-400'
  },
  {
    name: 'Telegram',
    href: 'https://t.me/username',
    icon: FaTelegram,
    gradient: 'bg-gradient-to-r from-sky-500 to-blue-500',
    hoverColor: 'hover:text-sky-600 dark:hover:text-sky-400'
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/username',
    icon: FaDiscord,
    gradient: 'bg-gradient-to-r from-indigo-500 to-purple-500',
    hoverColor: 'hover:text-indigo-600 dark:hover:text-indigo-400'
  }
];

export const ContactSocialLinks = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100">Connect With Me</h3>

      <div className="grid grid-cols-2 gap-6">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 md:p-5 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105 border border-gray-100 dark:border-gray-700">
              <div
                className={cn(
                  'w-12 h-12 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg',
                  link.gradient
                )}>
                <Icon size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100">{link.name}</h4>
                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mt-1">
                  <span>Connect</span>
                  <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
