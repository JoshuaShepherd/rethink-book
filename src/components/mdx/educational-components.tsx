import React from 'react';
import { cn } from '@/lib/utils';

// Chapter Introduction Component
export function ChapterIntro({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'chapter-intro not-prose',
        'bg-gradient-to-r from-blue-50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20',
        'border-l-4 border-blue-500',
        'p-8 my-12 rounded-r-xl',
        'shadow-lg shadow-blue-500/10',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-blue-600 text-lg">✨</span>
        </div>
        <div className="flex-1">
          <div className="text-xl leading-8 text-gray-800 dark:text-gray-200 font-medium">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Practice Box Component
export function PracticeBox({
  title = 'Practice This Week',
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'practice-box not-prose',
        'bg-emerald-50 dark:bg-emerald-950/20',
        'border border-emerald-200 dark:border-emerald-800',
        'rounded-xl p-8 my-12',
        'shadow-lg shadow-emerald-500/10',
        className
      )}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
          <span className="text-white text-sm">🎯</span>
        </div>
        <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200">
          {title}
        </h3>
      </div>
      <div className="text-lg leading-7 text-emerald-900 dark:text-emerald-100 space-y-3">
        {children}
      </div>
    </div>
  );
}

// Reflection Component
export function Reflection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'reflection not-prose',
        'bg-orange-50 dark:bg-orange-950/20',
        'border border-orange-200 dark:border-orange-800',
        'rounded-xl p-8 my-12',
        'shadow-lg shadow-orange-500/10',
        className
      )}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
          <span className="text-white text-sm">💭</span>
        </div>
        <h3 className="text-xl font-bold text-orange-800 dark:text-orange-200">
          Reflection
        </h3>
      </div>
      <div className="text-lg leading-7 text-orange-900 dark:text-orange-100 italic">
        {children}
      </div>
    </div>
  );
}

// Key Insight Component
export function KeyInsight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'key-insight not-prose',
        'bg-amber-50 dark:bg-amber-950/20',
        'border-l-4 border-amber-500',
        'p-8 my-12 rounded-r-xl',
        'shadow-lg shadow-amber-500/10',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-white text-lg">💡</span>
        </div>
        <div className="flex-1">
          <div className="text-xl leading-8 text-amber-900 dark:text-amber-100 font-semibold">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Discussion Questions Component
export function DiscussionQuestions({
  questions,
  className,
}: {
  questions: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        'discussion-questions not-prose',
        'bg-violet-50 dark:bg-violet-950/20',
        'border border-violet-200 dark:border-violet-800',
        'rounded-xl p-8 my-12',
        'shadow-lg shadow-violet-500/10',
        className
      )}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center">
          <span className="text-white text-sm">🤔</span>
        </div>
        <h3 className="text-xl font-bold text-violet-800 dark:text-violet-200">
          Discussion Questions
        </h3>
      </div>
      <ol className="space-y-4">
        {questions.map((question, index) => (
          <li key={index} className="flex items-start space-x-3">
            <span className="w-6 h-6 rounded-full bg-violet-500 text-white text-sm font-medium flex items-center justify-center flex-shrink-0 mt-1">
              {index + 1}
            </span>
            <span className="text-lg leading-7 text-violet-900 dark:text-violet-100">
              {question}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// Chapter Summary Component
export function ChapterSummary({
  keyPoints,
  className,
}: {
  keyPoints: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        'chapter-summary not-prose',
        'bg-slate-50 dark:bg-slate-950/20',
        'border border-slate-200 dark:border-slate-800',
        'rounded-xl p-8 my-12',
        'shadow-lg shadow-slate-500/10',
        className
      )}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
          <span className="text-white text-sm">📝</span>
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
          Chapter Summary
        </h3>
      </div>
      <div className="space-y-4">
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
          Key takeaways from this chapter:
        </p>
        <ul className="space-y-3">
          {keyPoints.map((point, index) => (
            <li key={index} className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium flex items-center justify-center flex-shrink-0 mt-1">
                {index + 1}
              </span>
              <span className="text-lg leading-7 text-slate-800 dark:text-slate-200">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Quote Component for highlighting important quotes
export function Quote({
  children,
  author,
  className,
}: {
  children: React.ReactNode;
  author?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'quote not-prose',
        'bg-gradient-to-r from-indigo-50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20',
        'border-l-4 border-indigo-500',
        'p-8 my-12 rounded-r-xl',
        'shadow-lg shadow-indigo-500/10',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
          <span className="text-indigo-600 text-2xl leading-none">"</span>
        </div>
        <div className="flex-1">
          <blockquote className="text-xl leading-8 text-gray-800 dark:text-gray-200 italic mb-4">
            {children}
          </blockquote>
          {author && (
            <cite className="text-lg text-gray-600 dark:text-gray-400 font-medium not-italic">
              — {author}
            </cite>
          )}
        </div>
      </div>
    </div>
  );
}

// Export all components as default too
const EducationalComponents = {
  ChapterIntro,
  PracticeBox,
  Reflection,
  KeyInsight,
  DiscussionQuestions,
  ChapterSummary,
  Quote,
};

export default EducationalComponents;
