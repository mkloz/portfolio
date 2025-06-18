'use client';

import { ArrowUpRight, Globe } from 'lucide-react';
import type React from 'react';
import { useNavigate } from 'react-router-dom';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/data/projects';
import { cn } from '@/lib/utils';

import { GitHubButton } from '../../../components/common/github-button';
import { Image } from '../../../components/common/image';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../components/ui/tooltip';
import { useTheme } from '../../../hooks/theme.store';

interface OtherProjectCardProps {
  project: Project;
}

export const OtherProjectCard = ({ project }: OtherProjectCardProps) => {
  const navigate = useNavigate();
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

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    // Handle Enter and Space key presses
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
    <Card
      className="group hover:shadow-2xl transition-all duration-500 bg-transparent backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 p-0 gap-2 min-w-60 hover:z-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${project.title} project details. ${project.description}`}>
      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={`Screenshot of ${project.title} project`}
          className="w-full h-56 object-cover"
          wrapperClassName="group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <CardHeader className="grow">
        <CardTitle
          className={cn('text-xl text-white duration-500 truncate bg-transparent shadow-none transition-none')}>
          {project.title}
        </CardTitle>
        <CardDescription className="text-blue-100 leading-relaxed line-clamp-3 grow">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 py-4">
        <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
          {project.technologies.slice(0, 4).map((tech, techIndex) => (
            <div key={techIndex} className="group/tech relative" role="listitem">
              <div className="relative backdrop-blur-sm border-2 border-gray-200/50 text-blue-100 px-2 py-1 rounded-full text-xs font-semibold hover:border-purple-400 duration-300 transform hover:scale-105">
                {tech}
              </div>
            </div>
          ))}
          {project.technologies.length > 4 && (
            <div className="group/tech relative" role="listitem">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300"></div>
              <div
                className="relative backdrop-blur-sm border-2 border-gray-200/50 text-blue-100 px-2 py-1 rounded-full text-xs font-semibold hover:border-purple-400 duration-300 transform hover:scale-105"
                aria-label={`${project.technologies.length - 4} more technologies`}>
                +{project.technologies.length - 4}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-2" role="group" aria-label="Project actions">
          <div
            className={cn(
              buttonVariants({ gradient: project.gradient }),
              'flex-1 font-bold flex items-center justify-center'
            )}
            aria-hidden="true">
            <ArrowUpRight size={16} className="mr-2" aria-hidden="true" />
            View Project
          </div>
          {project.website && (
            <div data-no-card-click>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleExternalLink(project.website)}
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'icon' }),
                      'bg-transparent text-white hover:bg-transparent border-gray-200/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'
                    )}
                    aria-label={`Visit ${project.title} website`}>
                    <Globe size={16} aria-hidden="true" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-blue-400 text-white [&_.tooltip-arrow]:bg-blue-400 [&_.tooltip-arrow]:fill-blue-400">
                  Visit Website
                </TooltipContent>
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
                      variant="outline"
                      size="icon"
                      className={cn(
                        buttonVariants({ variant: 'outline', size: 'icon' }),
                        'bg-transparent text-white hover:bg-transparent border-gray-200/50 hover:text-white'
                      )}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-blue-400 text-white [&_.tooltip-arrow]:bg-blue-400 [&_.tooltip-arrow]:fill-blue-400">
                  View on GitHub
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
