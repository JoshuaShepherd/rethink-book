import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CalloutProps {
  variant?: 'note' | 'warning' | 'success' | 'error';
  children: ReactNode;
  className?: string;
}

interface ScriptureProps {
  ref: string;
  children: ReactNode;
  className?: string;
}

interface QuoteProps {
  author?: string;
  children: ReactNode;
  className?: string;
}

export const Callout = ({
  variant = 'note',
  children,
  className,
}: CalloutProps) => (
  <div
    className={cn(
      'rounded-lg border p-4 my-6',
      {
        'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950':
          variant === 'note',
        'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950':
          variant === 'warning',
        'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950':
          variant === 'success',
        'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950':
          variant === 'error',
      },
      className
    )}
  >
    <div className="text-sm font-medium text-foreground">{children}</div>
  </div>
);

export const Scripture = ({ ref, children, className }: ScriptureProps) => (
  <blockquote
    className={cn(
      'border-l-4 border-primary pl-6 my-6 italic bg-muted/30 rounded-r-lg p-4',
      className
    )}
  >
    <div className="text-muted-foreground mb-2 leading-relaxed">{children}</div>
    <cite className="text-sm font-medium text-primary not-italic">— {ref}</cite>
  </blockquote>
);

export const Quote = ({ author, children, className }: QuoteProps) => (
  <blockquote
    className={cn(
      'border-l-4 border-muted pl-6 my-6 italic text-lg bg-muted/20 rounded-r-lg p-4',
      className
    )}
  >
    <div className="mb-4 text-foreground leading-relaxed">{children}</div>
    {author && (
      <cite className="text-sm font-medium not-italic text-muted-foreground">
        — {author}
      </cite>
    )}
  </blockquote>
);

// Enhanced heading components with scroll margin
export const H1 = ({ children, className, ...props }: any) => (
  <h1
    className={cn(
      'text-3xl font-bold mb-8 mt-12 text-foreground border-b border-border pb-4 scroll-mt-20',
      className
    )}
    {...props}
  >
    {children}
  </h1>
);

export const H2 = ({ children, className, ...props }: any) => (
  <h2
    className={cn(
      'text-2xl font-semibold mb-6 mt-10 text-foreground scroll-mt-20',
      className
    )}
    {...props}
  >
    {children}
  </h2>
);

export const H3 = ({ children, className, ...props }: any) => (
  <h3
    className={cn(
      'text-xl font-medium mb-4 mt-8 text-foreground scroll-mt-20',
      className
    )}
    {...props}
  >
    {children}
  </h3>
);

// Export all components
export const mdxComponents = {
  Callout,
  Scripture,
  Quote,
  h1: H1,
  h2: H2,
  h3: H3,
};
