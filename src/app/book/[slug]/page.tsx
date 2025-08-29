import { loadPrincipleMDX, getAllPrincipleMDX } from '@/lib/mdx-loader';
import { ReadingProgress } from '@/components/mdx/reading-progress';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  User,
  Calendar,
  BookOpen,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  try {
    const principle = await loadPrincipleMDX(resolvedParams.slug);

    if (!principle) {
      notFound();
    }

    return (
      <article className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20">
        <ReadingProgress />

        {/* Navigation Bar */}
        <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50">
          <div className="container mx-auto max-w-7xl px-4 py-3">
            <div className="flex justify-between items-center">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="glass-card">
                  Chapter {principle.frontmatter.chapter}
                </Badge>
                <Badge variant="outline" className="glass-card">
                  {principle.frontmatter.readingTime}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-4xl px-4 pt-20 pb-12">
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

            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              {principle.frontmatter.title}
            </h1>

            {/* Key Points Preview */}
            {principle.frontmatter.keyPoints &&
              principle.frontmatter.keyPoints.length > 0 && (
                <div className="mt-8 p-8 glass-card rounded-2xl border border-white/20 backdrop-blur-sm max-w-2xl mx-auto">
                  <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center justify-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Key Insights You'll Discover</span>
                  </h2>
                  <ul className="space-y-4 text-left">
                    {principle.frontmatter.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-4">
                        <span className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-1">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700" />

          {/* Content */}
          <div className="mx-auto max-w-4xl">
            <div className="mdx-content prose prose-lg md:prose-xl prose-slate dark:prose-invert mx-auto prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-h1:mb-8 prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-lg prose-p:leading-8 prose-p:mb-6 prose-strong:text-blue-600 dark:prose-strong:text-blue-400 prose-em:text-gray-600 dark:prose-em:text-gray-400 prose-li:text-lg prose-li:leading-8 prose-li:mb-2 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-950/20 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg max-w-none">
              <div className="space-y-6 text-gray-800 dark:text-gray-200 leading-relaxed [&>*:first-child]:mt-0">
                {principle.content}
              </div>
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="mt-20 pt-8 border-t border-gray-200/50 dark:border-gray-800/50">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>
                  Chapter {principle.frontmatter.chapter} of the ReThink Book
                </p>
                <p className="mt-1">By {principle.frontmatter.author}</p>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="glass-card">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="glass-card">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
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
