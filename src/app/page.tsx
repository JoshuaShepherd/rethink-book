'use client';

import { FluidHero } from '@/components/sections/fluid-hero';
import { ElegantFeatures } from '@/components/sections/elegant-features';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  Quote,
  Calendar,
  Download,
  MessageCircle,
} from 'lucide-react';

export default function Home() {
  return (
    <main className="relative">
      <FluidHero />
      <ElegantFeatures />

      {/* Thought Leadership Section */}
      <section className="py-24 bg-white/50 dark:bg-gray-950/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="glass-card mb-4">
              Recognized Authority in Missional Theology
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Leading the Conversation
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              For over two decades, Brad Brisco has been shaping how church
              leaders think about multiplication, incarnational mission, and
              post-Christendom ministry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="glass-card text-center">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  20,000+
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Leaders Trained
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card text-center">
              <CardContent className="p-8">
                <Award className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  50+
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Speaking Engagements/Year
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card text-center">
              <CardContent className="p-8">
                <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  500+
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Churches Multiplied
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Featured Quote */}
          <Card className="glass-card mb-12">
            <CardContent className="p-12 text-center">
              <Quote className="w-12 h-12 text-blue-500 mx-auto mb-6" />
              <blockquote className="text-2xl md:text-3xl font-light text-gray-700 dark:text-gray-300 italic mb-6 leading-relaxed">
                "The strategies that worked when we had cultural Christianity on
                our side are not only ineffective in post-Christendom contexts,
                they can actually work against the very outcomes we're trying to
                achieve."
              </blockquote>
              <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                — Brad Brisco
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link href="/about">
              <Button size="lg" className="glass-card mr-4">
                Learn About Brad
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/resources">
              <Button size="lg" variant="outline" className="glass-card">
                <Download className="w-4 h-4 mr-2" />
                Free Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Modules Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Interactive Modules */}
            <div className="text-center md:text-left">
              <h2 className="font-satoshi text-4xl font-semibold text-text-primary mb-6">
                Interactive Learning Modules
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                12 foundational principles featuring video teaching, guided
                reflections, branching simulations, and field experiments.
              </p>
              <Link href="/principles">
                <Button size="lg" className="text-lg px-8 py-6">
                  Start Modules
                </Button>
              </Link>
            </div>

            {/* Enhanced Book */}
            <div className="text-center md:text-left">
              <h2 className="font-satoshi text-4xl font-semibold text-text-primary mb-6">
                Enhanced Digital Book
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                The complete ReThink book with interactive components,
                reflection prompts, and educational enhancements powered by MDX.
              </p>
              <Link href="/book">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6"
                >
                  Read Book
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className="py-24 bg-white/50 dark:bg-gray-950/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Latest Insights
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Fresh perspectives on church multiplication and incarnational
              mission
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="glass-card group hover:shadow-xl transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-xl flex items-center justify-center">
                <MessageCircle className="w-12 h-12 text-white" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    Church Planting
                  </Badge>
                  <span className="text-sm text-gray-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Jan 15, 2024
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-blue-600 transition-colors">
                  Why Church Planting Models from the 1990s Are Failing Today
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  The attractional church model worked in Christendom contexts,
                  but post-Christendom requires different approaches.
                </p>
                <Link href="/blog/church-planting-models-failing">
                  <Button
                    variant="outline"
                    className="glass-card w-full group-hover:bg-blue-600 group-hover:text-white"
                  >
                    Read More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="glass-card group hover:shadow-xl transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-green-500 to-blue-600 rounded-t-xl flex items-center justify-center">
                <Users className="w-12 h-12 text-white" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    Incarnational Mission
                  </Badge>
                  <span className="text-sm text-gray-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Jan 8, 2024
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-blue-600 transition-colors">
                  Incarnational Mission: Beyond Programs to Presence
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  True incarnational mission requires embedding our lives in
                  local contexts, not just running outreach programs.
                </p>
                <Link href="/blog/incarnational-mission-presence">
                  <Button
                    variant="outline"
                    className="glass-card w-full group-hover:bg-blue-600 group-hover:text-white"
                  >
                    Read More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="glass-card group hover:shadow-xl transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-600 rounded-t-xl flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    Theology
                  </Badge>
                  <span className="text-sm text-gray-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Jan 1, 2024
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-blue-600 transition-colors">
                  The Missio Dei: Understanding God's Mission vs. Our Mission
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  The fundamental shift from viewing mission as something we do
                  to participating in what God is already doing.
                </p>
                <Link href="/blog/missio-dei-gods-mission">
                  <Button
                    variant="outline"
                    className="glass-card w-full group-hover:bg-blue-600 group-hover:text-white"
                  >
                    Read More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/blog">
              <Button size="lg" variant="outline" className="glass-card">
                View All Articles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Speaking & Consulting CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Rethink Your Approach?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Bring Brad's insights to your team, conference, or organization.
            Explore keynotes, workshops, and consulting opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="glass-card bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Speaking
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/50 text-white hover:bg-white/10"
            >
              Schedule Consultation
            </Button>
          </div>
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
            additional interactive features for incarnational mission formation
            are being crafted with the same level of sophistication.
          </p>
        </div>
      </div>
    </main>
  );
}
