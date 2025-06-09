import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ContactInfoCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  href?: string;
  gradient: string;
  hoverColor: string;
}

export const ContactInfoCard = ({ icon: Icon, title, value, href, gradient, hoverColor }: ContactInfoCardProps) => {
  const content = (
    <Card className="group border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 p-0">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300',
              gradient
            )}>
            <Icon className="text-white" size={20} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{title}</h4>
            <div
              className={cn(
                'transition-colors text-sm',
                href ? `${hoverColor} hover:opacity-80` : 'text-gray-600 dark:text-gray-400'
              )}>
              {value}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
};
