import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  backgroundTitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const SectionTitle = ({ title, subtitle, className, titleClassName, subtitleClassName }: SectionTitleProps) => (
  <div className={cn('mb-14 border-t-2 pt-5 md:mb-20 md:grid md:grid-cols-12 md:gap-8', className)}>
    <h2 className={cn('section-type md:col-span-8', titleClassName)}>{title}</h2>
    {subtitle && (
      <p
        className={cn(
          'mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:col-span-4 md:mt-2',
          subtitleClassName
        )}>
        {subtitle}
      </p>
    )}
  </div>
);
