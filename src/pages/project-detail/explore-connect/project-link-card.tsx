import { cn } from '@/lib/utils';

import { Link } from '../../../components/common/link';
import type { ProjectLinkData } from './types';

interface ProjectLinkCardProps {
  link: ProjectLinkData;
  className?: string;
}

export const ProjectLinkCard = ({ link, className }: ProjectLinkCardProps) => {
  const Icon = link.icon;

  return (
    <Link
      to={link.href}
      unstyled
      className={cn(
        'group border-0 shadow-2xl backdrop-blur-3xl rounded-2xl overflow-hidden',
        'transform hover:scale-105 transition-all duration-300',
        'bg-white/15 border-blue-200/30 hover:bg-white/20 hover:border-blue-100/40',
        className
      )}>
      <div className="p-6 text-center">
        <div
          className={cn(
            'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4',
            'group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30',
            `bg-gradient-to-r ${link.color}`
          )}>
          <Icon className="text-white" size={24} />
        </div>
        <h4 className="text-lg font-black text-white mb-2 drop-shadow">{link.title}</h4>
        <p className="text-blue-50 text-sm mb-4 drop-shadow-sm">{link.description}</p>
      </div>
    </Link>
  );
};
