import { Metadata } from 'next';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Clock, Users, ArrowRight, Sparkles } from 'lucide-react';
import { mockPrinciples, mockBadges } from '@/lib/mocks/content';

export const metadata: Metadata = {
  title: 'Principles - Rethink Mission',
  description:
    'Explore 12 foundational principles for incarnational mission in post-Christendom contexts.',
};

export default function PrinciplesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-6 pt-20 pb-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Learning Modules
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Rethink Principles
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              12 foundational principles for incarnational mission in our
              post-Christendom context. Each module combines video teaching,
              reflection, simulations, and field experiments to form you in
              missional practices.
            </p>
          </div>
        </div>
      </div>

      {/* Principles Grid */}
      <div className="container mx-auto px-6 pt-8 pb-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockPrinciples.map(principle => {
            const badge = mockBadges.find(b => b.id === principle.badgeId);

            return (
              <Link
                key={principle.id}
                href={`/principles/${principle.slug}`}
                className="group"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 hover:ring-2 hover:ring-primary/20">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                          {principle.title}
                        </CardTitle>
                        <CardDescription className="mt-2 line-clamp-2">
                          {principle.summary}
                        </CardDescription>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Metadata */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {principle.estMinutes} min
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Interactive
                        </div>
                      </div>

                      {/* Badge */}
                      {badge && (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            🏆 {badge.name}
                          </Badge>
                        </div>
                      )}

                      {/* Progress placeholder */}
                      <div className="pt-2 border-t">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Ready to start
                          </span>
                          <div className="h-2 w-16 bg-muted rounded-full">
                            <div className="h-full w-0 bg-primary rounded-full transition-all" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-6 bg-muted/50 rounded-xl">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Start Your Journey
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Begin with any principle that resonates with your current context.
              Each module builds practical wisdom for incarnational presence.
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
              <span>💡 Interactive simulations</span>
              <span>•</span>
              <span>📝 Guided reflections</span>
              <span>•</span>
              <span>🧪 Field experiments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
