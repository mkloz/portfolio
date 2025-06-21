'use client';

import { ArrowUpRight, Globe } from 'lucide-react';
import type React from 'react';
import { useNavigate } from 'react-router-dom';

import { buttonGradients, buttonVariants } from '@/components/ui/button';
import type { Project } from '@/data/projects';
import { cn } from '@/lib/utils';

import { GitHubButton } from '../../../components/common/github-button';
import { Image } from '../../../components/common/image';
import { Separator } from '../../../components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../components/ui/tooltip';
import { useTheme } from '../../../hooks/theme.store';

interface FeaturedProjectCardProps {
  project: Project;
  index: number;
}

export const FeaturedProjectCard = ({ project, index }: FeaturedProjectCardProps) => {
  const navigate = useNavigate();
  const isEven = index % 2 === 0;
  const { theme } = useTheme();
  const image = typeof project.image === 'string' ? project.image : project.image[theme];
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on interactive elements
    const target = e.target as HTMLElement;

    // Check if we clicked on an interactive element or its children
    if (
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button') ||
      target.closest('[data-no-card-click]')
    ) {
      e.stopPropagation();
      return;
    }

    // Navigate to project detail page
    navigate(`/projects/${project.slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(`/projects/${project.slug}#hero`);
    }
  };

  const handleExternalLink = (url: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={cn(
        'group relative px-4 py-4 sm:px-6 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg',
        isEven ? 'lg:pr-16' : 'lg:pl-16'
      )}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title} project. ${project.description}. Built in ${project.year} using ${project.technologies.length} technologies. ${project.progress}% complete.`}>
      <div className={cn('grid lg:grid-cols-2 gap-6 lg:gap-10 items-center', !isEven && 'lg:grid-flow-dense')}>
        <div className={cn('relative', isEven ? 'lg:order-1' : 'lg:order-2')}>
          <div className="relative group/image">
            <div
              className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl blur-lg group-hover:blur-xl transition-transform duration-700"
              aria-hidden="true"></div>

            <div className="relative overflow-hidden rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700">
              <Image
                src={image}
                alt={`Screenshot of ${project.title} project`}
                className="w-full h-auto object-cover"
                wrapperClassName="group-hover/image:scale-120 transition-transform duration-600"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"></div>

              {/* Category Badge - Full Text */}
              <div className="absolute top-4 left-4">
                <div
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-bold text-white shadow-lg backdrop-blur-sm border border-white/20 transform group-hover:scale-110 transition-transform duration-300',
                    buttonGradients[project.gradient]
                  )}
                  aria-label={`${project.category} project`}>
                  {project.category}
                </div>
              </div>

              <div
                className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-transform duration-500 transform translate-y-4 group-hover:translate-y-0"
                role="group"
                aria-label="Project actions">
                {project.liveDemo && (
                  <div data-no-card-click>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={handleExternalLink(project.liveDemo)}
                          className={cn(
                            buttonVariants({ gradient: project.gradient, size: 'icon' }),
                            'bg-card hover:bg-card/90 text-foreground'
                          )}
                          aria-label="View live demo">
                          <ArrowUpRight />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>View Live Demo</TooltipContent>
                    </Tooltip>
                  </div>
                )}

                {project.github && (
                  <div data-no-card-click>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <GitHubButton
                            github={project.github}
                            variant="default"
                            size="icon"
                            className={cn(
                              buttonVariants({ gradient: project.gradient, size: 'icon' }),
                              'bg-card hover:bg-card/90 text-foreground'
                            )}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>View on GitHub</TooltipContent>
                    </Tooltip>
                  </div>
                )}

                {project.website && (
                  <div data-no-card-click>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={handleExternalLink(project.website)}
                          className={cn(
                            buttonVariants({ gradient: project.gradient, size: 'icon' }),
                            'bg-card hover:bg-card/90 text-foreground'
                          )}
                          aria-label="Visit project website">
                          <Globe />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Visit Website</TooltipContent>
                    </Tooltip>
                  </div>
                )}
              </div>
            </div>

            <div
              className={cn(
                'absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full opacity-5',
                isEven ? '-right-8 sm:-right-12 top-8 sm:top-12' : '-left-8 sm:-left-12 top-8 sm:top-12',
                buttonGradients[project.gradient]
              )}
              aria-hidden="true"></div>
            <div
              className={cn(
                'absolute w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-xl rotate-45',
                isEven ? '-left-4 sm:-left-6 bottom-8 sm:bottom-12' : '-right-4 sm:-right-6 bottom-8 sm:bottom-12'
              )}
              aria-hidden="true"></div>
          </div>
        </div>

        <div className={cn('space-y-4 sm:space-y-6', isEven ? 'lg:order-2' : 'lg:order-1')}>
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <Separator
              className="w-24 sm:w-48 flex-1 h-0.5 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600"
              aria-hidden="true"
            />
            <div
              className={cn(
                buttonGradients[project.gradient],
                'text-4xl sm:text-5xl font-black bg-clip-text text-transparent opacity-50 mx-4 shadow-none text-center pb-1'
              )}
              aria-hidden="true">
              0{index + 1}
            </div>
            <Separator
              className="w-24 sm:w-48 flex-1 h-0.5 bg-gradient-to-r from-gray-300 dark:from-gray-600 to-transparent"
              aria-hidden="true"
            />
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h3
              className={cn(
                buttonGradients[project.gradient],
                'text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text duration-500 bg-transparent shadow-none text-foreground'
              )}>
              {project.title}
            </h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2 sm:gap-3" role="list" aria-label="Technologies used in this project">
              {project.technologies.slice(0, 10).map((tech, techIndex) => (
                <div key={techIndex} className="group/tech relative" role="listitem">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"></div>
                  <div className="relative backdrop-blur-sm border-2 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold hover:border-purple-300 dark:hover:border-purple-500 hover:bg-white dark:hover:bg-gray-800 duration-300 transform hover:scale-105">
                    {tech}
                  </div>
                </div>
              ))}
              {project.technologies.length > 10 && (
                <div className="group/tech relative" role="listitem">
                  <div className="relative backdrop-blur-sm border-2 border-gray-200/50 dark:border-gray-700/50 text-gray-500 dark:text-gray-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    +{project.technologies.length - 10} more
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4 pt-3 sm:pt-4" role="group" aria-label="Project actions">
            <div
              className={cn(
                buttonVariants({ gradient: project.gradient, size: 'lg' }),
                'font-bold grow text-sm sm:text-base min-w-40 flex items-center justify-center'
              )}>
              Learn More
            </div>

            {project.website && (
              <div data-no-card-click>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleExternalLink(project.website)}
                      className={cn(buttonVariants({ variant: 'outline', size: 'icon-lg' }), 'text-sm sm:text-base')}
                      aria-label="Visit project website">
                      <Globe className="size-4 sm:size-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Visit Website</TooltipContent>
                </Tooltip>
              </div>
            )}

            {project.github && (
              <div data-no-card-click>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <GitHubButton github={project.github} variant="outline" size="icon-lg" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>View on GitHub</TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>

          <div
            className="flex gap-10  pt-4 sm:pt-6 border-t border-gray-200/50 dark:border-gray-700/50 justify-center sm:justify-start"
            role="group"
            aria-label="Project statistics">
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
