import { ArrowUpRight, Globe, Sparkles } from 'lucide-react';

import { buttonGradients, buttonVariants } from '@/components/ui/button';
import type { Project } from '@/data/projects';
import { cn } from '@/lib/utils';

import { GitHubButton } from '../../../components/common/github-button';
import { Image } from '../../../components/common/image';
import { Link } from '../../../components/common/link';
import { Separator } from '../../../components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../components/ui/tooltip';

interface FeaturedProjectCardProps {
  project: Project;
  index: number;
}

export const FeaturedProjectCard = ({ project, index }: FeaturedProjectCardProps) => {
  const isEven = index % 2 === 0;

  return (
    <div className={cn('group relative px-4 sm:px-6', isEven ? 'lg:pr-16' : 'lg:pl-16')}>
      <div className={cn('grid lg:grid-cols-2 gap-6 lg:gap-10 items-center', !isEven && 'lg:grid-flow-dense')}>
        <div className={cn('relative', isEven ? 'lg:order-1' : 'lg:order-2')}>
          <div className="relative group/image">
            <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl blur-lg group-hover:blur-xl transition-transform duration-700"></div>

            <div className="relative overflow-hidden rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700">
              <Image
                src={project.image || '/placeholder.svg'}
                alt={project.title}
                className="w-full h-60 sm:h-80 object-cover"
                wrapperClassName="group-hover/image:scale-120 transition-transform duration-600"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="absolute top-4 left-4">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-2 rounded-full shadow-lg flex items-center gap-2 transform group-hover:scale-110 transition-transform duration-300 aspect-square">
                  <Sparkles className="animate-pulse size-4" />
                </div>
              </div>

              <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-transform duration-500 transform translate-y-4 group-hover:translate-y-0">
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      unstyled
                      to={project.liveDemo}
                      className={cn(
                        buttonVariants({ gradient: project.gradient, size: 'icon' }),
                        'bg-card hover:bg-card/90 text-foreground'
                      )}>
                      <ArrowUpRight />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>View Live Demo</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <GitHubButton
                      github={project.github}
                      variant="default"
                      size="icon"
                      className={cn(
                        buttonVariants({ gradient: project.gradient, size: 'icon' }),
                        'bg-card hover:bg-card/90 text-foreground'
                      )}></GitHubButton>
                  </TooltipTrigger>
                  <TooltipContent>View on GitHub</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      unstyled
                      to={project.website}
                      className={cn(
                        buttonVariants({ gradient: project.gradient, size: 'icon' }),
                        'bg-card hover:bg-card/90 text-foreground'
                      )}>
                      <Globe />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Visit Website</TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div
              className={cn(
                'absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full opacity-5',
                isEven ? '-right-8 sm:-right-12 top-8 sm:top-12' : '-left-8 sm:-left-12 top-8 sm:top-12',
                buttonGradients[project.gradient]
              )}></div>
            <div
              className={cn(
                'absolute w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-xl rotate-45',
                isEven ? '-left-4 sm:-left-6 bottom-8 sm:bottom-12' : '-right-4 sm:-right-6 bottom-8 sm:bottom-12'
              )}></div>
          </div>
        </div>

        <div className={cn('space-y-4 sm:space-y-6', isEven ? 'lg:order-2' : 'lg:order-1')}>
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <Separator className="w-24 sm:w-48 flex-1 h-0.5 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600" />
            <div
              className={cn(
                buttonGradients[project.gradient],
                'text-4xl sm:text-5xl font-black bg-clip-text text-transparent opacity-50 mx-4 shadow-none text-center pb-1'
              )}>
              0{index + 1}
            </div>
            <Separator className="w-24 sm:w-48 flex-1 h-0.5 bg-gradient-to-r from-gray-300 dark:from-gray-600 to-transparent" />
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h4
              className={cn(
                buttonGradients[project.gradient],
                'text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text duration-500 bg-transparent shadow-none text-foreground'
              )}>
              {project.title}
            </h4>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <h5 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              Technologies Used
            </h5>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {project.technologies.map((tech, techIndex) => (
                <div key={techIndex} className="group/tech relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative backdrop-blur-sm border-2 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold hover:border-purple-300 dark:hover:border-purple-500 hover:bg-white dark:hover:bg-gray-800 duration-300 transform hover:scale-105">
                    {tech}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4 pt-3 sm:pt-4">
            <Link
              to={`/projects/${project.slug}`}
              unstyled
              className={cn(
                buttonVariants({ gradient: project.gradient, size: 'lg' }),
                'font-bold grow text-sm sm:text-base min-w-60'
              )}>
              Learn More
            </Link>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  to={project.website}
                  unstyled
                  className={cn(buttonVariants({ variant: 'outline', size: 'icon-lg' }), 'text-sm sm:text-base')}>
                  <Globe className="size-4 sm:size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Visit Website</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <GitHubButton github={project.github} variant="outline" size="icon" />
              </TooltipTrigger>
              <TooltipContent>View on GitHub</TooltipContent>
            </Tooltip>
          </div>

          <div className="flex gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="text-center">
              <div
                className={cn(
                  buttonGradients[project.gradient],
                  'text-xl sm:text-2xl font-black bg-clip-text text-transparent shadow-none'
                )}>
                {project.year}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">YEAR</div>
            </div>
            <div className="text-center">
              <div
                className={cn(
                  buttonGradients[project.gradient],
                  'text-xl sm:text-2xl font-black bg-clip-text text-transparent shadow-none'
                )}>
                {project.technologies.length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">TECHS</div>
            </div>
            <div className="text-center">
              <div
                className={cn(
                  buttonGradients[project.gradient],
                  'text-xl sm:text-2xl font-black bg-clip-text text-transparent shadow-none'
                )}>
                {project.progress}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">COMPLETE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
