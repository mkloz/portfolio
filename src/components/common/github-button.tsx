'use client';

import type React from 'react';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa6';

import { cn } from '@/lib/utils';

import { Button, buttonVariants } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Link } from './link';

export interface GitHubLink {
  name: string;
  link: string;
}

interface GitHubButtonProps {
  github: GitHubLink[];
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'xs' | 'sm' | 'lg' | 'xl' | 'icon' | 'icon-sm' | 'icon-xs' | 'icon-lg' | 'icon-xl';
  className?: string;
  children?: React.ReactNode;
}

export const GitHubButton = ({
  github,
  variant = 'outline',
  size = 'default',
  className,
  children
}: GitHubButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle empty array
  if (!github || github.length === 0) {
    return null;
  }

  // Handle single GitHub link
  if (github.length === 1) {
    return (
      <Link to={github[0].link} unstyled className={cn(buttonVariants({ variant, size }), className)}>
        <FaGithub className="group-hover:scale-110 transition-transform" />
        {children}
      </Link>
    );
  }

  // Multiple links - show popover
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant={variant} size={size} className={cn('gap-2', className)}>
          <FaGithub className="group-hover:scale-110 transition-transform" />
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-42 p-2" align="center">
        <div className="space-y-1">
          <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground text-center">Choose Repository</div>
          {github.map((repo, index) => (
            <Link
              key={index}
              to={repo.link}
              unstyled
              className={cn(
                'flex items-center gap-3 w-full px-2 py-2 text-sm rounded-md',
                'hover:bg-accent hover:text-accent-foreground',
                'transition-colors duration-150'
              )}
              onClick={() => setIsOpen(false)}>
              <FaGithub className="h-4 w-4 flex-shrink-0" />
              <span className="flex-1 text-left">{repo.name}</span>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
