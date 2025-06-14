import { ArrowUpRight, Globe } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/data/projects';
import { cn } from '@/lib/utils';

import { GitHubButton } from '../../../components/common/github-button';
import { Image } from '../../../components/common/image';
import { Link } from '../../../components/common/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../components/ui/tooltip';

interface OtherProjectCardProps {
  project: Project;
}

export const OtherProjectCard = ({ project }: OtherProjectCardProps) => {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 bg-transparent backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 p-0 gap-2 min-w-60 hover:z-10">
      <div className="relative overflow-hidden">
        <Image
          src={project.image || '/placeholder.svg'}
          alt={project.title}
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
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech, techIndex) => (
            <div key={techIndex} className="group/tech relative">
              <div className="relative backdrop-blur-sm border-2 border-gray-200/50 text-blue-100 px-2 py-1 rounded-full text-xs font-semibold hover:border-purple-400 duration-300 transform hover:scale-105">
                {tech}
              </div>
            </div>
          ))}
          {project.technologies.length > 4 && (
            <div className="group/tech relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300"></div>
              <div className="relative backdrop-blur-sm border-2 border-gray-200/50 text-blue-100 px-2 py-1 rounded-full text-xs font-semibold hover:border-purple-400 duration-300 transform hover:scale-105">
                +{project.technologies.length - 4}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <Link
            to={`/projects/${project.slug}`}
            unstyled
            className={cn(buttonVariants({ gradient: project.gradient }), 'flex-1 font-bold')}>
            <ArrowUpRight size={16} className="mr-2" />
            View Project
          </Link>
          {project.website && (
            <Tooltip>
              <TooltipTrigger>
                <Link
                  unstyled
                  to={project.website}
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'icon' }),
                    'bg-transparent text-white hover:bg-transparent border-gray-200/50 hover:text-white'
                  )}>
                  <Globe size={16} />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-blue-400 text-white [&_.tooltip-arrow]:bg-blue-400 [&_.tooltip-arrow]:fill-blue-400">
                Visit Website
              </TooltipContent>
            </Tooltip>
          )}
          {project.github && (
            <Tooltip>
              <TooltipTrigger>
                <GitHubButton
                  github={project.github}
                  variant="outline"
                  size="icon"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'icon' }),
                    'bg-transparent text-white hover:bg-transparent border-gray-200/50 hover:text-white'
                  )}></GitHubButton>
              </TooltipTrigger>
              <TooltipContent className="bg-blue-400 text-white [&_.tooltip-arrow]:bg-blue-400 [&_.tooltip-arrow]:fill-blue-400">
                View on GitHub
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
