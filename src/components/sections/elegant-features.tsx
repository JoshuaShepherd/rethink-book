'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BarChart3, Globe, Zap, Lock, TrendingUp } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { elegantVariants, staggerContainer } from '@/lib/motion-variants';

const executiveFeatures = [
  {
    title: 'Enterprise Security',
    description:
      'Bank-grade security architecture with end-to-end encryption, multi-factor authentication, and compliance frameworks including SOC 2, GDPR, and HIPAA.',
    icon: Shield,
    glow: 'glow-blue',
  },
  {
    title: 'Executive Analytics',
    description:
      'Real-time insights and predictive modeling for strategic decision making. Advanced AI-powered dashboards with executive-level KPI tracking.',
    icon: BarChart3,
    glow: 'glow-emerald',
  },
  {
    title: 'Global Scale',
    description:
      'Built for Fortune 500 operations with 99.99% uptime SLA, worldwide infrastructure, and unlimited concurrent users across all time zones.',
    icon: Globe,
    glow: 'glow-gold',
  },
  {
    title: 'Lightning Performance',
    description:
      'Sub-100ms response times with advanced caching, CDN optimization, and enterprise-grade infrastructure for instant data processing.',
    icon: Zap,
    glow: 'glow-blue',
  },
  {
    title: 'Advanced Compliance',
    description:
      'Complete regulatory compliance suite with automated reporting, audit trails, and enterprise governance frameworks.',
    icon: Lock,
    glow: 'glow-emerald',
  },
  {
    title: 'Strategic Intelligence',
    description:
      'AI-powered market analysis, competitive intelligence, and predictive business modeling for executive strategic planning.',
    icon: TrendingUp,
    glow: 'glow-gold',
  },
];

export function ElegantFeatures() {
  return (
    <section
      id="features"
      className="py-32 bg-gradient-to-b from-background to-surface/30"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.div
              variants={elegantVariants}
              className="inline-flex items-center px-4 py-2 rounded-full bg-surface-glass backdrop-blur-glass border border-glass-border mb-6"
            >
              <span className="text-primary font-medium">
                Why Executives Choose Us
              </span>
            </motion.div>

            <motion.h2
              variants={elegantVariants}
              className="font-satoshi text-4xl md:text-6xl font-semibold text-text-primary mb-6"
            >
              Enterprise-Grade
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Excellence
              </span>
            </motion.h2>

            <motion.p
              variants={elegantVariants}
              className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
            >
              Sophisticated solutions architected for C-suite requirements.
              Every feature designed with executive excellence in mind.
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executiveFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={elegantVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
              >
                <Card
                  className={`h-full group hover:shadow-elevation hover:${feature.glow} elegant-transition-slow`}
                >
                  <CardHeader>
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br from-surface-elevated to-surface border border-glass-border flex items-center justify-center mb-6 group-hover:${feature.glow} elegant-transition-slow`}
                    >
                      <feature.icon className="h-8 w-8 text-primary group-hover:scale-110 elegant-transition" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-text-primary group-hover:text-glow elegant-transition">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-text-secondary leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <motion.div variants={elegantVariants} className="text-center mt-20">
            <div className="max-w-2xl mx-auto">
              <h3 className="font-satoshi text-2xl font-semibold text-text-primary mb-4">
                Ready to Experience Excellence?
              </h3>
              <p className="text-text-secondary mb-8">
                Join over 500+ Fortune 500 companies that trust our platform for
                their critical operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary text-white rounded-lg font-medium shadow-glow hover:shadow-glow-lg elegant-transition"
                >
                  Schedule Executive Demo
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-surface-glass backdrop-blur-glass border border-glass-border text-text-primary rounded-lg font-medium hover:bg-surface-elevated/80 elegant-transition"
                >
                  Download Executive Brief
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
