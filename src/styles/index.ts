// Styles directory index
// Import this file to access centralized style utilities

// Re-export utility functions that work with styles
export * from '../lib/glass-styles';
export * from '../lib/utils';

// Style constants that might be shared
export const STYLE_CONSTANTS = {
  GLASS_BLUR: 'backdrop-blur-xl',
  GLASS_OPACITY: 'bg-white/5',
  ANIMATION_DURATION: '0.3s',
  BORDER_RADIUS: '12px',
} as const;

// Common CSS class combinations
export const COMMON_CLASSES = {
  glassCard: 'backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl',
  button: 'px-6 py-2 rounded-lg font-medium transition-all duration-300',
  input:
    'px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2',
} as const;
