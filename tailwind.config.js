/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['Inter', 'monospace'],
      },
      colors: {
        // CSS Variables for sophisticated color system
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        'accent-gold': 'hsl(var(--accent-gold))',
        background: 'hsl(var(--background))',
        surface: 'hsl(var(--surface))',
        'surface-elevated': 'hsl(var(--surface-elevated))',
        'surface-glass': 'hsl(var(--surface-glass))',
        'text-primary': 'hsl(var(--text-primary))',
        'text-secondary': 'hsl(var(--text-secondary))',
        'text-muted': 'hsl(var(--text-muted))',
        border: 'hsl(var(--border))',
        'glow-blue': 'hsl(var(--glow-blue))',
        'glow-emerald': 'hsl(var(--glow-emerald))',
        'glass-white': 'rgba(255, 255, 255, 0.1)',
        'glass-border': 'rgba(255, 255, 255, 0.2)',
      },
      boxShadow: {
        glow: '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.4)',
        'glow-emerald': '0 0 30px rgba(16, 185, 129, 0.3)',
        'glow-gold': '0 0 30px rgba(245, 158, 11, 0.4)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.3)',
        elevation: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      backdropBlur: {
        xs: '2px',
        glass: '16px',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'float-elegant': 'float-elegant 8s ease-in-out infinite',
        'slide-elegant': 'slide-elegant 0.4s ease-out',
        'fade-elegant': 'fade-elegant 0.3s ease-out',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)' },
        },
        'float-elegant': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'slide-elegant': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-elegant': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
};
