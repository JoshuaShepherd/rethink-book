import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MDXContentProps {
  content: string;
  className?: string;
}

// Custom components for MDX rendering
const components = {
  // Headings
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "text-3xl font-bold tracking-tight text-foreground mb-6",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "text-2xl font-semibold text-foreground mb-4 mt-8",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "text-xl font-semibold text-foreground mb-3 mt-6",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "text-lg font-medium text-foreground mb-2 mt-4",
        className
      )}
      {...props}
    />
  ),
  
  // Paragraphs
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        "text-foreground leading-7 mb-4",
        className
      )}
      {...props}
    />
  ),
  
  // Lists
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn(
        "list-disc list-inside text-foreground mb-4 space-y-2",
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        "list-decimal list-inside text-foreground mb-4 space-y-2",
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      className={cn(
        "text-foreground leading-6",
        className
      )}
      {...props}
    />
  ),
  
  // Links
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        "text-primary hover:text-primary/80 underline underline-offset-4",
        className
      )}
      {...props}
    />
  ),
  
  // Emphasis
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong
      className={cn(
        "font-semibold text-foreground",
        className
      )}
      {...props}
    />
  ),
  
  em: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em
      className={cn(
        "italic text-foreground",
        className
      )}
      {...props}
    />
  ),
  
  // Code
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "bg-muted px-2 py-1 rounded-md text-sm font-mono text-foreground",
        className
      )}
      {...props}
    />
  ),
  
  // Blockquotes
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "border-l-4 border-primary pl-6 my-6 italic text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  
  // Horizontal rule
  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr
      className={cn(
        "border-border my-8",
        className
      )}
      {...props}
    />
  ),
};

export function MDXContent({ content, className }: MDXContentProps) {
  return (
    <div className={cn("prose prose-lg max-w-none dark:prose-invert", className)}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

// For when we need to render raw markdown content as HTML
export function MarkdownContent({ content, className }: MDXContentProps) {
  // Simple markdown-to-HTML conversion for basic formatting
  const htmlContent = content
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    // Wrap in paragraphs
    .replace(/^(.*)$/gm, '<p>$1</p>')
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, '')
    .replace(/<p><h([1-6])>/g, '<h$1>')
    .replace(/<\/h([1-6])><\/p>/g, '</h$1>');

  return (
    <div 
      className={cn("prose prose-lg max-w-none dark:prose-invert", className)}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
