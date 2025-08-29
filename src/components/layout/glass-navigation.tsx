'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const navigationItems = [
  { name: 'About', href: '/about' },
  { name: 'Book', href: '/book' },
  { name: 'Course', href: '/course' },
  { name: 'Principles', href: '/principles' },
  { name: 'Blog', href: '/blog' },
  { name: 'Resources', href: '/resources' },
  { name: 'Contact', href: '/contact' },
];

export function GlassNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll(); // Set initial scroll state
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent hydration mismatch by not applying scroll-dependent styles until client-side
  const scrollDependentClassName = isClient
    ? isScrolled
      ? 'bg-surface-glass/95 backdrop-blur-glass border-b border-glass-border shadow-glass'
      : 'bg-surface-glass/80 backdrop-blur-glass border-b border-transparent'
    : 'bg-surface-glass/80 backdrop-blur-glass border-b border-transparent';

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          'fixed top-0 w-full z-50 elegant-transition-slow',
          scrollDependentClassName
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-glow animate-glow-pulse" />
                <span className="font-satoshi text-xl font-semibold text-text-primary">
                  Brad Brisco
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map(item => (
                <Link key={item.name} href={item.href}>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-text-secondary hover:text-text-primary elegant-transition relative group cursor-pointer"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full elegant-transition" />
                  </motion.span>
                </Link>
              ))}
            </nav>

            {/* Search and CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="relative">
                <motion.div
                  animate={{ width: isSearchExpanded ? 300 : 40 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex items-center"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                    className="relative z-10"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                  <AnimatePresence>
                    {isSearchExpanded && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-0"
                      >
                        <Input
                          placeholder="Search insights..."
                          className="w-60 pr-12"
                          autoFocus
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <ThemeToggle />

              <Link href="/contact">
                <Button variant="premium" size="lg" className="font-medium">
                  Book Speaking
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed right-0 top-0 h-full w-80 bg-surface-glass backdrop-blur-glass border-l border-glass-border p-6"
            >
              <div className="flex flex-col space-y-6 mt-20">
                {navigationItems.map(item => (
                  <Link key={item.name} href={item.href}>
                    <motion.span
                      whileHover={{ x: 10 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-lg text-text-secondary hover:text-text-primary elegant-transition cursor-pointer"
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                ))}

                <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-text-secondary">Theme</span>
                    <ThemeToggle />
                  </div>
                  <Input placeholder="Search..." className="mb-4" />
                  <Link href="/contact">
                    <Button variant="premium" size="lg" className="w-full">
                      Book Speaking
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
