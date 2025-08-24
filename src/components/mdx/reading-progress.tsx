'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function ReadingProgress({
  target = '.ebook-content',
  className,
}: {
  target?: string;
  className?: string;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const element = document.querySelector(target);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementHeight = element.scrollHeight;
      const windowHeight = window.innerHeight;

      // Calculate how much of the content is visible
      const scrollTop = window.scrollY;
      const elementTop = (element as HTMLElement).offsetTop;
      const visibleHeight = Math.max(
        0,
        Math.min(scrollTop + windowHeight - elementTop, elementHeight)
      );

      const progressPercentage = Math.min(
        100,
        Math.max(0, (visibleHeight / elementHeight) * 100)
      );

      setProgress(progressPercentage);
    };

    // Update on scroll
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    updateProgress(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [target]);

  return (
    <div
      className={cn('reading-progress', className)}
      style={{ width: `${progress}%` }}
      aria-label={`Reading progress: ${Math.round(progress)}%`}
    />
  );
}

// Chapter navigation component
export function ChapterNavigation({
  previousChapter,
  nextChapter,
  className,
}: {
  previousChapter?: { slug: string; title: string };
  nextChapter?: { slug: string; title: string };
  className?: string;
}) {
  return (
    <nav className={cn('chapter-nav', className)}>
      <div className="flex justify-between items-center">
        {previousChapter ? (
          <a
            href={`/principles/${previousChapter.slug}`}
            className="flex-1 text-left p-4 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="text-sm text-muted-foreground">Previous</div>
            <div className="font-medium">{previousChapter.title}</div>
          </a>
        ) : (
          <div className="flex-1" />
        )}

        {nextChapter ? (
          <a
            href={`/principles/${nextChapter.slug}`}
            className="flex-1 text-right p-4 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="text-sm text-muted-foreground">Next</div>
            <div className="font-medium">{nextChapter.title}</div>
          </a>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </nav>
  );
}
