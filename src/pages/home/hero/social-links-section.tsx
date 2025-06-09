'use client';

import { FaGithub, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa6';

import { cn } from '@/lib/utils';

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: FaGithub,
    dotColor: 'bg-gray-900 dark:bg-gray-100',
    hoverText: 'text-gray-900 dark:text-gray-100'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: FaLinkedin,
    dotColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    hoverText: 'text-blue-600 dark:text-blue-400'
  },
  {
    name: 'Telegram',
    href: 'https://t.me/username',
    icon: FaTelegram,
    dotColor: 'bg-gradient-to-r from-sky-500 to-blue-500',
    hoverText: 'text-sky-500 dark:text-sky-400'
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/447388232276',
    icon: FaWhatsapp,
    dotColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
    hoverText: 'text-green-500 dark:text-green-400'
  }
] as const;

export const SocialLinksSection = () => {
  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-center gap-3">
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium px-2">connect via</span>
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
      </div>

      <div className="flex justify-between flex-wrap gap-4" role="list" aria-label="Social media links">
        {SOCIAL_LINKS.map(({ name, href, icon: Icon, dotColor, hoverText }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group relative flex items-center justify-center w-14 h-14 rounded-2xl backdrop-blur-sm',
              'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300',
              'hover:bg-white dark:hover:bg-gray-800',
              'transition-transform duration-300 shadow-lg hover:shadow-xl transform hover:scale-110',
              'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2',
              hoverText
            )}
            aria-label={`Connect with me on ${name}`}>
            <Icon size={22} className="group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />

            <div
              className={cn(
                'absolute -top-1 -right-1 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                dotColor
              )}
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
    </div>
  );
};
