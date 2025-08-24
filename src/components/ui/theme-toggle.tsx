'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/layout/theme-provider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        'relative overflow-hidden rounded-full w-10 h-10',
        'bg-surface-glass backdrop-blur-glass border border-glass-border',
        'hover:bg-surface-elevated/80 hover:border-glass-white/30',
        'elegant-transition group'
      )}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Sun Icon */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          rotate: theme === 'dark' ? 0 : 180,
          scale: theme === 'dark' ? 1 : 0,
          opacity: theme === 'dark' ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <Sun
          className={cn(
            'h-4 w-4',
            theme === 'dark' ? 'text-accent-gold' : 'text-primary',
            'group-hover:scale-110 elegant-transition'
          )}
        />
      </motion.div>

      {/* Moon Icon */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          rotate: theme === 'light' ? 0 : -180,
          scale: theme === 'light' ? 1 : 0,
          opacity: theme === 'light' ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <Moon
          className={cn(
            'h-4 w-4',
            theme === 'light' ? 'text-primary' : 'text-accent-gold',
            'group-hover:scale-110 elegant-transition'
          )}
        />
      </motion.div>

      {/* Subtle rotating ring effect */}
      <motion.div
        className="absolute inset-0 rounded-full border border-transparent"
        animate={{
          borderColor:
            theme === 'dark'
              ? 'rgba(245, 158, 11, 0.3)'
              : 'rgba(59, 130, 246, 0.3)',
          rotate: 360,
        }}
        transition={{
          borderColor: { duration: 0.5 },
          rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
        }}
        style={{
          borderWidth: '1px',
          borderStyle: 'dashed',
        }}
      />
    </Button>
  );
}
