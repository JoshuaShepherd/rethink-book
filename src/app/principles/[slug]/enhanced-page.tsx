import { loadPrincipleMDX, getAllPrincipleMDX } from '@/lib/mdx-loader';
import { ReadingProgress } from '@/components/mdx/reading-progress';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Calendar, BookOpen } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  try {
    const principles = await getAllPrincipleMDX();
    return principles.map(principle => ({
      slug: principle.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function EnhancedPrinciplePage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const principle = await loadPrincipleMDX(params.slug);

    if (!principle) {
      notFound();
    }

    return (
      <article className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20">
        <ReadingProgress />

        <div className="container mx-auto max-w-4xl px-4 py-8">
          {/* Header Section */}
          <div className="mb-12 text-center space-y-6">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <Badge
                variant="outline"
                className="glass-card border-blue-200/50 bg-blue-50/80 text-blue-700 dark:border-blue-800/50 dark:bg-blue-950/80 dark:text-blue-300"
              >
                <BookOpen className="w-3 h-3 mr-1" />
                Chapter {principle.frontmatter.chapter}
              </Badge>
              <Badge
                variant="outline"
                className="glass-card border-purple-200/50 bg-purple-50/80 text-purple-700 dark:border-purple-800/50 dark:bg-purple-950/80 dark:text-purple-300"
              >
                <Clock className="w-3 h-3 mr-1" />
                {principle.frontmatter.readingTime}
              </Badge>
              <Badge
                variant="outline"
                className="glass-card border-green-200/50 bg-green-50/80 text-green-700 dark:border-green-800/50 dark:bg-green-950/80 dark:text-green-300"
              >
                <User className="w-3 h-3 mr-1" />
                {principle.frontmatter.author}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              {principle.frontmatter.title}
            </h1>

            {/* Key Points Preview */}
            {principle.frontmatter.keyPoints &&
              principle.frontmatter.keyPoints.length > 0 && (
                <div className="mt-8 p-6 glass-card rounded-xl border border-white/20 backdrop-blur-sm">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    Key Insights You'll Discover
                  </h2>
                  <ul className="space-y-2 text-left">
                    {principle.frontmatter.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>

          <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700" />

          {/* Content */}
          <div className="prose prose-lg prose-blue dark:prose-invert mx-auto max-w-none">
            <div className="space-y-8">{principle.content}</div>
          </div>

          {/* Navigation Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200/50 dark:border-gray-800/50">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Chapter {principle.frontmatter.chapter} of the ReThink Book
              </div>
              <div className="flex space-x-4">
                {/* Add navigation buttons for previous/next chapters if needed */}
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  } catch (error) {
    console.error('Error loading principle:', error);
    notFound();
  }
}
