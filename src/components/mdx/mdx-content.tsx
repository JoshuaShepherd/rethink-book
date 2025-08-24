import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MDXContentProps {
  content: string;
  className?: string;
}

export function MDXContent({ content, className }: MDXContentProps) {
  return (
    <div
      className={cn('prose prose-lg max-w-none dark:prose-invert', className)}
    >
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

// Enhanced ebook-optimized markdown content renderer
export function MarkdownContent({ content, className }: MDXContentProps) {
  // Enhanced markdown-to-HTML conversion with ebook typography
  const htmlContent = content
    // Headers with better formatting and scroll anchors
    .replace(
      /^### (.*$)/gim,
      '<h3 class="text-xl font-medium mb-4 mt-8 text-foreground scroll-mt-20" id="$1">$1</h3>'
    )
    .replace(
      /^## (.*$)/gim,
      '<h2 class="text-2xl font-semibold mb-6 mt-10 text-foreground scroll-mt-20" id="$1">$1</h2>'
    )
    .replace(
      /^# (.*$)/gim,
      '<h1 class="text-3xl font-bold mb-8 mt-12 text-foreground border-b border-border pb-4 scroll-mt-20" id="$1">$1</h1>'
    )

    // Enhanced text formatting
    .replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-semibold text-foreground">$1</strong>'
    )
    .replace(/\*(.*?)\*/g, '<em class="italic text-muted-foreground">$1</em>')

    // Better list handling
    .replace(
      /^\* (.*$)/gim,
      '<li class="mb-2 text-muted-foreground leading-relaxed">$1</li>'
    )
    .replace(
      /^- (.*$)/gim,
      '<li class="mb-2 text-muted-foreground leading-relaxed">$1</li>'
    )

    // Paragraph processing with better spacing
    .split('\n\n')
    .map(paragraph => {
      paragraph = paragraph.trim();
      if (!paragraph) return '';

      // Skip if already processed as heading or list
      if (paragraph.startsWith('<h') || paragraph.startsWith('<li')) {
        return paragraph;
      }

      // Handle lists
      if (paragraph.includes('<li')) {
        return `<ul class="mb-6 pl-6 space-y-1">${paragraph}</ul>`;
      }

      // Regular paragraphs
      if (!paragraph.startsWith('<')) {
        return `<p class="mb-6 text-muted-foreground leading-relaxed">${paragraph}</p>`;
      }

      return paragraph;
    })
    .join('\n')

    // Clean up extra spacing
    .replace(/\n+/g, '\n')
    .replace(/<\/h([1-6])>\s*<p>/g, '</h$1>\n<p>')
    .replace(/<\/ul>\s*<p>/g, '</ul>\n<p>')
    .replace(/<\/p>\s*<h([1-6])/g, '</p>\n<h$1');

  return (
    <div
      className={cn(
        'ebook-content max-w-none',
        'prose prose-lg prose-slate dark:prose-invert',
        // Ebook-specific typography
        '[&>*]:max-w-[65ch] [&>*]:mx-auto', // Optimal reading width
        // Override prose styles for better ebook experience
        'prose-headings:font-display prose-headings:tracking-tight',
        'prose-p:text-muted-foreground prose-p:leading-relaxed',
        'prose-strong:text-foreground prose-strong:font-semibold',
        'prose-em:text-muted-foreground',
        className
      )}
    >
      <div
        className="space-y-0"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}

// Table of Contents extractor
export function extractHeadings(content: string) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Array<{ id: string; title: string; level: number }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    headings.push({ id, title, level });
  }

  return headings;
}

// Table of Contents component
export function TableOfContents({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const headings = extractHeadings(content);

  if (headings.length === 0) return null;

  return (
    <nav className={cn('toc bg-muted/30 rounded-lg p-6', className)}>
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        Table of Contents
      </h3>
      <ul className="space-y-2">
        {headings.map(({ id, title, level }) => (
          <li
            key={id}
            className={cn(
              'text-sm',
              level === 1 && 'font-medium text-foreground',
              level === 2 && 'pl-4 text-muted-foreground',
              level === 3 && 'pl-8 text-muted-foreground',
              level >= 4 && 'pl-12 text-muted-foreground'
            )}
          >
            <a href={`#${id}`} className="hover:text-primary transition-colors">
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
