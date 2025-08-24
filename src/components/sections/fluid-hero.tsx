'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { elegantVariants, staggerContainer } from '@/lib/motion-variants';

export function FluidHero() {
  // Generate deterministic particle positions to avoid hydration mismatch
  const particlePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 20; i++) {
      positions.push({
        left: (i * 7.5 + 10 + (i % 3) * 15) % 100,
        top: (i * 5.2 + 15 + (i % 4) * 12) % 100,
      });
    }
    return positions;
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('features');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-surface/50 to-background">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"
        />

        {/* Floating Particles */}
        {particlePositions.map((position, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
            className="absolute w-2 h-2 bg-primary/40 rounded-full"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Headline */}
          <motion.h1
            variants={elegantVariants}
            className="font-satoshi text-5xl md:text-7xl lg:text-8xl font-semibold text-text-primary leading-tight mb-8"
          >
            Executive
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent-gold bg-clip-text text-transparent animate-glow-pulse">
              Excellence
            </span>
            <span className="text-text-secondary text-4xl md:text-5xl lg:text-6xl font-light">
              Redefined
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={elegantVariants}
            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Sophisticated business solutions designed for Fortune 500
            excellence. Experience the pinnacle of digital craftsmanship with
            enterprise-grade security, predictive analytics, and global
            scalability.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={elegantVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Button
              variant="premium"
              size="xl"
              className="group font-medium text-lg px-8 py-4 min-w-[250px]"
            >
              Schedule Strategic Discussion
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 elegant-transition" />
            </Button>

            <Button
              variant="glass"
              size="xl"
              className="group font-medium text-lg px-8 py-4 min-w-[200px]"
            >
              <Play className="mr-3 h-5 w-5 group-hover:scale-110 elegant-transition" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={elegantVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-text-muted text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span>99.99% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Fortune 500 Trusted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent-gold rounded-full animate-pulse" />
              <span>SOC 2 Compliant</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        whileHover={{ scale: 1.1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-3 rounded-full bg-surface-glass backdrop-blur-glass border border-glass-border hover:border-glass-white/30 elegant-transition group"
      >
        <ChevronDown className="h-6 w-6 text-text-secondary group-hover:text-primary animate-bounce-subtle elegant-transition" />
      </motion.button>
    </section>
  );
}
