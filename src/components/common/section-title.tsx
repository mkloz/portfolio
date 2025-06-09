import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle: string;
  backgroundTitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const SectionTitle = ({
  title,
  subtitle,
  backgroundTitle,
  className,
  titleClassName,
  subtitleClassName
}: SectionTitleProps) => {
  const words = title.split(' ');
  const backgroundWord = backgroundTitle || words[0].toUpperCase();

  return (
    <div className={cn('text-center mb-2', className)}>
      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-10">
          <div className="md:text-9xl text-7xl  font-black text-gray-900 dark:text-gray-100">{backgroundWord}</div>
        </div>
        <div className="relative z-10">
          <h2 className={cn('text-4xl md:text-6xl font-black mb-4 leading-none', titleClassName)}>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {words[0]}
            </span>
            {words.length > 1 && (
              <>
                <br />
                <span className="bg-gradient-to-r from-pink-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  {words.slice(1).join(' ')}
                </span>
              </>
            )}
          </h2>
        </div>
      </div>

      <p
        className={cn(
          'text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed ',
          subtitleClassName
        )}>
        {subtitle}
      </p>
    </div>
  );
};
