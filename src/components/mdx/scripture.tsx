import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Book, ExternalLink } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface ScriptureProps {
  children: React.ReactNode;
  ref: string;
  className?: string;
}

export const Scripture = ({ children, ref, className }: ScriptureProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    analytics.trackScriptureOpen(ref);
  };

  return (
    <div
      className={cn(
        'my-6 rounded-xl border border-primary/20 bg-primary/5 p-4',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Book className="h-4 w-4 text-primary" aria-hidden="true" />
          <span className="font-medium text-primary">{ref}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggle}
          className="h-auto p-1"
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} scripture ${ref}`}
        >
          <ExternalLink className="h-3 w-3" />
        </Button>
      </div>

      {isExpanded && (
        <div className="mt-4 border-t border-primary/10 pt-4">
          <div className="prose prose-sm max-w-none dark:prose-invert [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            {children}
          </div>
        </div>
      )}

      {!isExpanded && (
        <p className="mt-2 text-sm text-muted-foreground">
          Click to explore this passage
        </p>
      )}
    </div>
  );
};
