import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

interface CalloutProps {
  children: React.ReactNode;
  variant?: 'note' | 'warning' | 'success';
  className?: string;
}

export const Callout = ({
  children,
  variant = 'note',
  className,
}: CalloutProps) => {
  const variants = {
    note: {
      icon: Info,
      className:
        'border-blue-200 bg-blue-50/50 text-blue-900 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-100',
    },
    warning: {
      icon: AlertCircle,
      className:
        'border-amber-200 bg-amber-50/50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-100',
    },
    success: {
      icon: CheckCircle2,
      className:
        'border-green-200 bg-green-50/50 text-green-900 dark:border-green-800 dark:bg-green-950/50 dark:text-green-100',
    },
  };

  const { icon: Icon, className: variantClassName } = variants[variant];

  return (
    <div
      className={cn(
        'my-6 flex gap-3 rounded-xl border p-4',
        variantClassName,
        className
      )}
      role="note"
      aria-label={`${variant} callout`}
    >
      <Icon className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
      <div className="flex-1 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
};
