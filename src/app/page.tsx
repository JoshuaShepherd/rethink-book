import { GlassNavigation } from '@/components/layout/glass-navigation';
import { FluidHero } from '@/components/sections/fluid-hero';
import { ElegantFeatures } from '@/components/sections/elegant-features';

export default function Home() {
  return (
    <main className="relative">
      <GlassNavigation />
      <FluidHero />
      <ElegantFeatures />

      {/* Placeholder for additional sections that will be built */}
      <div className="py-32 text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-satoshi text-4xl font-semibold text-text-primary mb-8">
            More Premium Sections Coming Soon
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Data Visualization, Executive Testimonials, Premium Pricing,
            Sophisticated FAQ, Executive Contact Form, and Elegant Footer
            sections are being crafted with the same level of sophistication.
          </p>
        </div>
      </div>
    </main>
  );
}
