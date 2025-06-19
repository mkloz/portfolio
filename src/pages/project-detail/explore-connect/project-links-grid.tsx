import { Download, Github, Globe, Share2 } from 'lucide-react';

import { useShare } from '@/hooks/use-share';
import { cn } from '@/lib/utils';

import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover';
import { GitHubLink } from '../../../data/projects';

interface ProjectLinksGridProps {
  website?: string;
  github?: GitHubLink[];
  className?: string;
}

export const ProjectLinksGrid = ({ website, github, className }: ProjectLinksGridProps) => {
  const handleShare = useShare();

  return (
    <div className={cn(className)}>
      <h3 className="text-2xl font-bold text-center mb-8 text-blue-50 drop-shadow">Explore the Project</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Demo Link */}
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group border-0 shadow-2xl backdrop-blur-3xl rounded-2xl overflow-hidden cursor-pointer',
              'transform hover:scale-105 transition-all duration-300',
              'bg-white/15 border-blue-200/30 hover:bg-white/20 hover:border-blue-100/40',
              className
            )}
            tabIndex={0}
            aria-label={website}>
            <div className="p-6 text-center">
              <div
                className={cn(
                  'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4',
                  'group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30',
                  'bg-gradient-to-r from-blue-500 to-cyan-500'
                )}>
                <Globe className="text-white" size={24} />
              </div>
              <h4 className="text-lg font-black text-white mb-2 drop-shadow">Live Demo</h4>
              <p className="text-blue-50 text-sm mb-4 drop-shadow-sm">Visit the live demo of the project</p>
              <div className="w-full mt-2 flex items-center justify-center">
                <Globe className="mr-2" size={20} /> Visit Website
              </div>
            </div>
          </a>
        )}
        {/* Source Code (card is popover trigger for multiple, direct link for single) */}
        {github && github.length === 1 && (
          <a
            href={github[0].link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group border-0 shadow-2xl backdrop-blur-3xl rounded-2xl overflow-hidden cursor-pointer',
              'transform hover:scale-105 transition-all duration-300',
              'bg-white/15 border-blue-200/30 hover:bg-white/20 hover:border-blue-100/40',
              className,
              'flex items-center justify-center'
            )}
            tabIndex={0}
            aria-label={github[0].name}>
            <div className="p-6 text-center w-full">
              <div
                className={cn(
                  'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4',
                  'group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30',
                  'bg-gradient-to-r from-gray-700 to-gray-900'
                )}>
                <Github className="text-white" size={24} />
              </div>
              <h4 className="text-lg font-black text-white mb-2 drop-shadow">Source Code</h4>
              <p className="text-blue-50 text-sm mb-4 drop-shadow-sm">View the source code of the project</p>
              <div className="w-full mt-2 flex items-center justify-center">
                <Github className="mr-2" size={20} /> View Source
              </div>
            </div>
          </a>
        )}
        {github && github.length > 1 && (
          <Popover>
            <PopoverTrigger asChild>
              <div
                className={cn(
                  'group border-0 shadow-2xl backdrop-blur-3xl rounded-2xl overflow-hidden cursor-pointer',
                  'transform hover:scale-105 transition-all duration-300',
                  'bg-white/15 border-blue-200/30 hover:bg-white/20 hover:border-blue-100/40',
                  className,
                  'flex items-center justify-center'
                )}
                tabIndex={0}
                aria-label={github[0].name}
                role="button">
                <div className="p-6 text-center w-full">
                  <div
                    className={cn(
                      'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4',
                      'group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30',
                      'bg-black'
                    )}>
                    <Github className="text-white" size={24} />
                  </div>
                  <h4 className="text-lg font-black text-white mb-2 drop-shadow">Source Code</h4>
                  <p className="text-blue-50 text-sm mb-4 drop-shadow-sm">View the source code of the project</p>
                  <div className="w-full mt-2 flex items-center justify-center">
                    <Github className="mr-2" size={20} /> View Source
                  </div>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2" align="center">
              <div className="space-y-1">
                <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground text-center">
                  Choose Repository
                </div>
                {github.map((repo, idx) => (
                  <a
                    key={idx}
                    href={repo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'flex items-center gap-3 w-full px-2 py-2 text-sm rounded-md',
                      'hover:bg-accent hover:text-accent-foreground',
                      'transition-colors duration-150'
                    )}>
                    <Github className="h-4 w-4 flex-shrink-0" />
                    <span className="flex-1 text-left">{repo.name}</span>
                  </a>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
        <div
          className={cn(
            'group border-0 shadow-2xl backdrop-blur-3xl rounded-2xl overflow-hidden cursor-pointer',
            'transform hover:scale-105 transition-all duration-300',
            'bg-white/15 border-blue-200/30 hover:bg-white/20 hover:border-blue-100/40',
            className,
            'flex items-center justify-center'
          )}
          tabIndex={0}
          aria-label="Share Project"
          role="button"
          onClick={() =>
            handleShare({
              title: document.title,
              text: 'Share the project with others',
              url: window.location.href
            })
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleShare({
                title: document.title,
                text: 'Share the project with others',
                url: window.location.href
              });
            }
          }}>
          <div className="p-6 text-center w-full">
            <div
              className={cn(
                'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4',
                'group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30',
                'bg-gradient-to-r from-indigo-500 to-blue-500'
              )}>
              <Share2 className="text-white" size={24} />
            </div>
            <h4 className="text-lg font-black text-white mb-2 drop-shadow">Share Project</h4>
            <p className="text-blue-50 text-sm mb-4 drop-shadow-sm">Share the project with others</p>
            <div className="w-full mt-2 flex items-center justify-center">
              <Share2 className="mr-2" size={20} /> Share
            </div>
          </div>
        </div>
        {/* Download (Popover with multiple links if available, card is popover trigger) */}
        {github && github.length > 1 && (
          <Popover>
            <PopoverTrigger asChild>
              <div
                className={cn(
                  'group border-0 shadow-2xl backdrop-blur-3xl rounded-2xl overflow-hidden cursor-pointer',
                  'transform hover:scale-105 transition-all duration-300',
                  'bg-white/15 border-blue-200/30 hover:bg-white/20 hover:border-blue-100/40',
                  className,
                  'flex items-center justify-center'
                )}
                tabIndex={0}
                aria-label={github[0].name}
                role="button">
                <div className="p-6 text-center w-full">
                  <div
                    className={cn(
                      'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4',
                      'group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30',
                      'bg-gradient-to-r from-green-500 to-emerald-500'
                    )}>
                    <Download className="text-white" size={24} />
                  </div>
                  <h4 className="text-lg font-black text-white mb-2 drop-shadow">Download</h4>
                  <p className="text-blue-50 text-sm mb-4 drop-shadow-sm">Download the project</p>
                  <div className="w-full mt-2 flex items-center justify-center">
                    <Download className="mr-2" size={20} /> Download
                  </div>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2" align="center">
              <div className="space-y-1">
                <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground text-center">Choose File</div>
                {github.map((file, idx) => (
                  <a
                    key={idx}
                    href={`${file.link}/archive/refs/heads/main.zip`}
                    download
                    className={cn(
                      'flex items-center gap-3 w-full px-2 py-2 text-sm rounded-md',
                      'hover:bg-accent hover:text-accent-foreground',
                      'transition-colors duration-150'
                    )}>
                    <Download className="h-4 w-4 flex-shrink-0" />
                    <span className="flex-1 text-left">{file.name} (zip)</span>
                  </a>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
        {github && github.length === 1 && (
          <a
            href={`${github[0].link}/archive/refs/heads/main.zip`}
            download
            className={cn(
              'group border-0 shadow-2xl backdrop-blur-3xl rounded-2xl overflow-hidden cursor-pointer',
              'transform hover:scale-105 transition-all duration-300',
              'bg-white/15 border-blue-200/30 hover:bg-white/20 hover:border-blue-100/40',
              className,
              'flex items-center justify-center'
            )}
            tabIndex={0}
            aria-label={github[0].name}
            role="button">
            <div className="p-6 text-center w-full">
              <div
                className={cn(
                  'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4',
                  'group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30',
                  'bg-gradient-to-r from-green-500 to-emerald-500'
                )}>
                <Download className="text-white" size={24} />
              </div>
              <h4 className="text-lg font-black text-white mb-2 drop-shadow">Download</h4>
              <p className="text-blue-50 text-sm mb-4 drop-shadow-sm">Download the project</p>
              <div className="w-full mt-2 flex items-center justify-center">
                <Download className="mr-2" size={20} /> Download
              </div>
            </div>
          </a>
        )}
      </div>
    </div>
  );
};
