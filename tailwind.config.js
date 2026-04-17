/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'hsl(var(--bg) / <alpha-value>)',
        'bg-elevated': 'hsl(var(--bg-elevated) / <alpha-value>)',
        surface: 'hsl(var(--surface) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        'border-hover': 'hsl(var(--border-hover) / <alpha-value>)',
        fg: 'hsl(var(--fg) / <alpha-value>)',
        'fg-muted': 'hsl(var(--fg-muted) / <alpha-value>)',
        'fg-subtle': 'hsl(var(--fg-subtle) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        'accent-2': 'hsl(var(--accent-2) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -10px hsl(var(--accent) / 0.45)',
        'glow-sm': '0 0 24px -8px hsl(var(--accent) / 0.4)',
        card: '0 1px 0 0 hsl(var(--border)) inset, 0 8px 24px -12px rgb(0 0 0 / 0.4)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, hsl(var(--border) / 0.6) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.6) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(ellipse 80% 60% at 50% 0%, hsl(var(--accent) / 0.15), transparent 70%)',
        'brand-gradient':
          'linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--accent-2)) 100%)',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'pulse-dot': {
          '0%, 100%': {
            boxShadow: '0 0 0 0 hsl(142 76% 55% / 0.7)',
          },
          '70%': {
            boxShadow: '0 0 0 8px hsl(142 76% 55% / 0)',
          },
        },
      },
      animation: {
        blink: 'blink 1s steps(2, start) infinite',
        'pulse-dot': 'pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
