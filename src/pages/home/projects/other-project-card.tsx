import { ArrowUpRight, Github, Globe } from 'lucide-react';

import { buttonGradients, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { Image } from '../../../components/common/image';
import { Link } from '../../../components/common/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../components/ui/tooltip';
import type { Project } from './project-data';

interface OtherProjectCardProps {
  project: Project;
}

export const OtherProjectCard = ({ project }: OtherProjectCardProps) => {
  return (
    <Card className="group hover:shadow-2xl transition-transform duration-500 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 p-0 gap-2 min-w-60 hover:z-10">
      <div className="relative overflow-hidden">
        <Image
          src={project.image || '/placeholder.svg'}
          alt={project.title}
          className="w-full h-56 object-cover"
          wrapperClassName="group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div
          className={cn(
            'absolute top-4 right-4 w-4 h-4 rounded-full shadow-lg animate-pulse bg-gradient-to-r',
            buttonGradients[project.gradient]
          )}></div>

        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-transform duration-300 transform translate-y-2 group-hover:translate-y-0">
          {project.liveDemo && (
            <Tooltip>
              <TooltipTrigger>
                <Link
                  unstyled
                  to={project.liveDemo}
                  className={cn(
                    buttonVariants({ gradient: project.gradient, size: 'icon' }),
                    'bg-card hover:bg-card/90 text-foreground'
                  )}>
                  <ArrowUpRight size={16} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>View Live Demo</TooltipContent>
            </Tooltip>
          )}
          {project.github && (
            <Tooltip>
              <TooltipTrigger>
                <Link
                  unstyled
                  to={project.github}
                  className={cn(
                    buttonVariants({ gradient: project.gradient, size: 'icon' }),
                    'bg-card hover:bg-card/90 text-foreground'
                  )}>
                  <Github size={16} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>View on GitHub</TooltipContent>
            </Tooltip>
          )}
          {project.website && (
            <Tooltip>
              <TooltipTrigger>
                <Link
                  unstyled
                  to={project.website}
                  className={cn(
                    buttonVariants({ gradient: project.gradient, size: 'icon' }),
                    'bg-card hover:bg-card/90 text-foreground'
                  )}>
                  <Globe size={16} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Visit Website</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      <CardHeader className="grow">
        <CardTitle
          className={cn(
            buttonGradients[project.gradient],
            'text-xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text duration-500 truncate bg-transparent text-foreground shadow-none transition-none'
          )}>
          {project.title}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 grow">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 py-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech, techIndex) => (
            <div key={techIndex} className="group/tech relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300"></div>
              <div className="relative backdrop-blur-sm border-2 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs font-semibold hover:border-purple-300 dark:hover:border-purple-500 hover:bg-white dark:hover:bg-gray-800 duration-300 transform hover:scale-105">
                {tech}
              </div>
            </div>
          ))}
          {project.technologies.length > 4 && (
            <div className="group/tech relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300"></div>
              <div className="relative backdrop-blur-sm border-2 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs font-semibold hover:border-purple-300 dark:hover:border-purple-500 hover:bg-white dark:hover:bg-gray-800 duration-300 transform hover:scale-105">
                +{project.technologies.length - 4}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          {project.liveDemo && (
            <Link
              to={project.liveDemo}
              unstyled
              className={cn(buttonVariants({ gradient: project.gradient }), 'flex-1 font-bold')}>
              <ArrowUpRight size={16} className="mr-2" />
              View Project
            </Link>
          )}
          {project.website && (
            <Tooltip>
              <TooltipTrigger>
                <Link
                  unstyled
                  to={project.website}
                  className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}>
                  <Globe size={16} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Visit Website</TooltipContent>
            </Tooltip>
          )}
          {project.github && (
            <Tooltip>
              <TooltipTrigger>
                <Link unstyled to={project.github} className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}>
                  <Github size={16} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>View on GitHub</TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
