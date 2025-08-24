import { cn } from '@/lib/utils';
import { Quote as QuoteIcon } from 'lucide-react';

interface QuoteProps {
  children: React.ReactNode;
  author?: string;
  className?: string;
}

export const Quote = ({ children, author, className }: QuoteProps) => {
  return (
    <blockquote
      className={cn('my-6 border-l-4 border-primary/30 pl-6 italic', className)}
    >
      <div className="relative">
        <QuoteIcon
          className="absolute -left-2 -top-1 h-4 w-4 text-primary/40"
          aria-hidden="true"
        />
        <div className="text-foreground/90 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          {children}
        </div>
        {author && (
          <footer className="mt-3 text-sm text-muted-foreground">
            <cite>— {author}</cite>
          </footer>
        )}
      </div>
    </blockquote>
  );
};
