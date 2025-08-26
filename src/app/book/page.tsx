import { getAllPrincipleMDX } from '@/lib/mdx-loader';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen, User, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default async function BookIndexPage() {
  try {
    const principles = await getAllPrincipleMDX();

    // Sort by chapter order
    const sortedPrinciples = principles.sort(
      (a, b) => (a.frontmatter.order || 0) - (b.frontmatter.order || 0)
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              ReThink Book
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A comprehensive guide to rethinking mission, church, and ministry
              in our post-Christendom context. Each chapter contains interactive
              components, reflection prompts, and practical applications.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Badge className="glass-card text-lg px-4 py-2">
                <BookOpen className="w-4 h-4 mr-2" />
                {principles.length} Chapters
              </Badge>
              <Badge variant="outline" className="glass-card text-lg px-4 py-2">
                Enhanced with MDX
              </Badge>
            </div>
          </div>

          {/* Chapter Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sortedPrinciples.map(principle => (
              <Link
                key={principle.slug}
                href={`/book/${principle.slug}`}
                className="group"
              >
                <Card className="glass-card h-full border border-white/20 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group-hover:scale-[1.02] group-hover:border-blue-300/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        Chapter {principle.frontmatter.chapter}
                      </Badge>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <CardTitle className="text-xl leading-tight text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {principle.frontmatter.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {principle.frontmatter.readingTime}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <User className="w-3 h-3 mr-1" />
                        {principle.frontmatter.author}
                      </Badge>
                    </div>

                    {/* Key Points Preview */}
                    {principle.frontmatter.keyPoints &&
                      principle.frontmatter.keyPoints.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Key Insights:
                          </h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {principle.frontmatter.keyPoints
                              .slice(0, 2)
                              .map((point, index) => (
                                <li
                                  key={index}
                                  className="flex items-start space-x-2"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2"></span>
                                  <span className="leading-relaxed">
                                    {point}
                                  </span>
                                </li>
                              ))}
                            {principle.frontmatter.keyPoints.length > 2 && (
                              <li className="text-xs text-gray-500 italic">
                                +{principle.frontmatter.keyPoints.length - 2}{' '}
                                more insights...
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <div className="glass-card rounded-xl p-8 border border-white/20 backdrop-blur-sm max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                Enhanced Reading Experience
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                This digital version of the ReThink book includes interactive
                components, reflection prompts, practice exercises, and
                discussion questions to help you apply these principles in your
                ministry context.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading principles:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Content</h1>
          <p className="text-gray-600">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }
}
