import { GlassNavigation } from '@/components/layout/glass-navigation';
import { FluidHero } from '@/components/sections/fluid-hero';
import { ElegantFeatures } from '@/components/sections/elegant-features';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="relative">
      <GlassNavigation />
      <FluidHero />
      <ElegantFeatures />

      {/* Learning Modules Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-satoshi text-4xl font-semibold text-text-primary mb-6">
            Interactive Learning Modules
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-12">
            12 foundational principles for incarnational mission, featuring
            video teaching, guided reflections, branching simulations, and field
            experiments.
          </p>
          <Link href="/principles">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Learning
            </Button>
          </Link>
        </div>
      </section>

      {/* Placeholder for additional sections that will be built */}
      <div className="py-32 text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-satoshi text-4xl font-semibold text-text-primary mb-8">
            More Premium Sections Coming Soon
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Assessment & Gamification, Journal & Cohorts, Admin CMS, and
            additional interactive features for incarnational mission formation.
            sections are being crafted with the same level of sophistication.
          </p>
        </div>
      </div>
    </main>
  );
}
