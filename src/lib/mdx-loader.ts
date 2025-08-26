import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import { compileMDX } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import React from 'react';

// Enhanced MDX Components
import { Callout, Scripture, Quote } from '@/components/mdx/components';
import { cn } from '@/lib/utils';

// Educational components defined inline to avoid module issues
const ChapterIntro = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) =>
  React.createElement(
    'div',
    {
      className: cn(
        'chapter-intro not-prose bg-gradient-to-r from-blue-50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 border-l-4 border-blue-500 p-8 my-12 rounded-r-xl shadow-lg shadow-blue-500/10',
        className
      ),
    },
    React.createElement('div', { className: 'flex items-start gap-4' }, [
      React.createElement(
        'div',
        {
          key: 'icon',
          className:
            'w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1',
        },
        React.createElement(
          'span',
          { className: 'text-blue-600 text-lg' },
          '✨'
        )
      ),
      React.createElement(
        'div',
        {
          key: 'content',
          className: 'flex-1',
        },
        React.createElement(
          'div',
          {
            className:
              'text-xl leading-8 text-gray-800 dark:text-gray-200 font-medium',
          },
          children
        )
      ),
    ])
  );

const PracticeBox = ({
  title = 'Practice This Week',
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) =>
  React.createElement(
    'div',
    {
      className: cn(
        'practice-box not-prose bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-8 my-12 shadow-lg shadow-emerald-500/10',
        className
      ),
    },
    [
      React.createElement(
        'div',
        { key: 'header', className: 'flex items-center gap-3 mb-6' },
        [
          React.createElement(
            'div',
            {
              key: 'icon',
              className:
                'w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center',
            },
            React.createElement(
              'span',
              { className: 'text-white text-sm' },
              '🎯'
            )
          ),
          React.createElement(
            'h3',
            {
              key: 'title',
              className:
                'text-xl font-bold text-emerald-800 dark:text-emerald-200',
            },
            title
          ),
        ]
      ),
      React.createElement(
        'div',
        {
          key: 'content',
          className:
            'text-lg leading-7 text-emerald-900 dark:text-emerald-100 space-y-3',
        },
        children
      ),
    ]
  );

const Reflection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) =>
  React.createElement(
    'div',
    {
      className: cn(
        'reflection not-prose bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-xl p-8 my-12 shadow-lg shadow-orange-500/10',
        className
      ),
    },
    [
      React.createElement(
        'div',
        { key: 'header', className: 'flex items-center gap-3 mb-6' },
        [
          React.createElement(
            'div',
            {
              key: 'icon',
              className:
                'w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center',
            },
            React.createElement(
              'span',
              { className: 'text-white text-sm' },
              '💭'
            )
          ),
          React.createElement(
            'h3',
            {
              key: 'title',
              className:
                'text-xl font-bold text-orange-800 dark:text-orange-200',
            },
            'Reflection'
          ),
        ]
      ),
      React.createElement(
        'div',
        {
          key: 'content',
          className:
            'text-lg leading-7 text-orange-900 dark:text-orange-100 italic',
        },
        children
      ),
    ]
  );

const KeyInsight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) =>
  React.createElement(
    'div',
    {
      className: cn(
        'key-insight not-prose bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-8 my-12 rounded-r-xl shadow-lg shadow-amber-500/10',
        className
      ),
    },
    React.createElement('div', { className: 'flex items-start gap-4' }, [
      React.createElement(
        'div',
        {
          key: 'icon',
          className:
            'w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-1',
        },
        React.createElement('span', { className: 'text-white text-lg' }, '💡')
      ),
      React.createElement(
        'div',
        {
          key: 'content',
          className: 'flex-1',
        },
        React.createElement(
          'div',
          {
            className:
              'text-xl leading-8 text-amber-900 dark:text-amber-100 font-semibold',
          },
          children
        )
      ),
    ])
  );

const DiscussionQuestions = ({
  questions,
  className,
}: {
  questions: string[];
  className?: string;
}) =>
  React.createElement(
    'div',
    {
      className: cn(
        'discussion-questions not-prose bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800 rounded-xl p-8 my-12 shadow-lg shadow-violet-500/10',
        className
      ),
    },
    [
      React.createElement(
        'div',
        { key: 'header', className: 'flex items-center gap-3 mb-6' },
        [
          React.createElement(
            'div',
            {
              key: 'icon',
              className:
                'w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center',
            },
            React.createElement(
              'span',
              { className: 'text-white text-sm' },
              '🤔'
            )
          ),
          React.createElement(
            'h3',
            {
              key: 'title',
              className:
                'text-xl font-bold text-violet-800 dark:text-violet-200',
            },
            'Discussion Questions'
          ),
        ]
      ),
      React.createElement(
        'ol',
        { key: 'questions', className: 'space-y-4' },
        questions.map((question, index) =>
          React.createElement(
            'li',
            {
              key: index,
              className: 'flex items-start space-x-3',
            },
            [
              React.createElement(
                'span',
                {
                  key: 'number',
                  className:
                    'w-6 h-6 rounded-full bg-violet-500 text-white text-sm font-medium flex items-center justify-center flex-shrink-0 mt-1',
                },
                index + 1
              ),
              React.createElement(
                'span',
                {
                  key: 'text',
                  className:
                    'text-lg leading-7 text-violet-900 dark:text-violet-100',
                },
                question
              ),
            ]
          )
        )
      ),
    ]
  );

const ChapterSummary = ({
  keyPoints,
  className,
}: {
  keyPoints: string[];
  className?: string;
}) =>
  React.createElement(
    'div',
    {
      className: cn(
        'chapter-summary not-prose bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 rounded-xl p-8 my-12 shadow-lg shadow-slate-500/10',
        className
      ),
    },
    [
      React.createElement(
        'div',
        { key: 'header', className: 'flex items-center gap-3 mb-6' },
        [
          React.createElement(
            'div',
            {
              key: 'icon',
              className:
                'w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center',
            },
            React.createElement(
              'span',
              { className: 'text-white text-sm' },
              '📝'
            )
          ),
          React.createElement(
            'h3',
            {
              key: 'title',
              className: 'text-xl font-bold text-slate-800 dark:text-slate-200',
            },
            'Chapter Summary'
          ),
        ]
      ),
      React.createElement('div', { key: 'content', className: 'space-y-4' }, [
        React.createElement(
          'p',
          {
            key: 'intro',
            className: 'text-lg text-slate-700 dark:text-slate-300 mb-4',
          },
          'Key takeaways from this chapter:'
        ),
        React.createElement(
          'ul',
          { key: 'points', className: 'space-y-3' },
          keyPoints.map((point, index) =>
            React.createElement(
              'li',
              {
                key: index,
                className: 'flex items-start space-x-3',
              },
              [
                React.createElement(
                  'span',
                  {
                    key: 'number',
                    className:
                      'w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium flex items-center justify-center flex-shrink-0 mt-1',
                  },
                  index + 1
                ),
                React.createElement(
                  'span',
                  {
                    key: 'text',
                    className:
                      'text-lg leading-7 text-slate-800 dark:text-slate-200',
                  },
                  point
                ),
              ]
            )
          )
        ),
      ]),
    ]
  );

const mdxComponents = {
  // Basic components
  Callout,
  Scripture,
  Quote,

  // Educational components
  ChapterIntro,
  PracticeBox,
  Reflection,
  KeyInsight,
  DiscussionQuestions,
  ChapterSummary,
};

export interface PrincipleMDX {
  slug: string;
  title: string;
  content: string;
  frontmatter: {
    title?: string;
    chapter?: number;
    author?: string;
    readingTime?: string;
    keyPoints?: string[];
    order?: number;
    [key: string]: any;
  };
  compiledMDX?: any;
}

/**
 * Load and compile MDX content from principles directory
 */
export async function loadPrincipleMDX(
  slug: string
): Promise<PrincipleMDX | null> {
  const contentRoot = path.join(process.cwd(), 'content', 'principles');
  const mdxPath = path.join(contentRoot, slug, 'overview.mdx');

  if (!fs.existsSync(mdxPath)) {
    // Try ebook.mdx as fallback
    const ebookPath = path.join(contentRoot, slug, 'ebook.mdx');
    if (!fs.existsSync(ebookPath)) {
      return null;
    }
    return loadMDXFile(ebookPath, slug);
  }

  return loadMDXFile(mdxPath, slug);
}

async function loadMDXFile(
  filePath: string,
  slug: string
): Promise<PrincipleMDX> {
  const source = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);

  const { content: compiledContent, frontmatter } = await compileMDX({
    source: content,
    options: { parseFrontmatter: true },
    components: mdxComponents,
  });

  return {
    slug,
    title: data.title || frontmatter.title || slug,
    content,
    frontmatter: { ...data, ...frontmatter },
    compiledMDX: compiledContent,
  };
}

/**
 * Get all principle MDX files
 */
export async function getAllPrincipleMDX(): Promise<PrincipleMDX[]> {
  const contentRoot = path.join(process.cwd(), 'content', 'principles');

  if (!fs.existsSync(contentRoot)) {
    return [];
  }

  const directories = fs
    .readdirSync(contentRoot, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const principles: PrincipleMDX[] = [];

  for (const slug of directories) {
    const principle = await loadPrincipleMDX(slug);
    if (principle) {
      principles.push(principle);
    }
  }

  return principles.sort(
    (a, b) => (a.frontmatter.order || 999) - (b.frontmatter.order || 999)
  );
}

/**
 * MDX Renderer Component
 */
interface MDXRendererProps {
  source: string;
  components?: Record<string, React.ComponentType<any>>;
}

export async function MDXRenderer({
  source,
  components = {},
}: MDXRendererProps) {
  const { content } = await compileMDX({
    source,
    components: { ...mdxComponents, ...components },
    options: {
      parseFrontmatter: true,
    },
  });

  return content;
}
