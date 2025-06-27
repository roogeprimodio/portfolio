import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        body: ['var(--font-body-light)', 'sans-serif'],
        headline: ['var(--font-headline-light)', 'serif'],
        'body-dark': ['var(--font-body-dark)', 'sans-serif'],
        'headline-dark': ['var(--font-headline-dark)', 'serif'],
        code: ['var(--font-code)', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'glitch-subtle': {
          '0%, 100%': { textShadow: '0 0 0 transparent' },
          '25%': { textShadow: '1px 1px 0 hsl(var(--accent) / 0.5)' },
          '50%': { textShadow: '-1px -1px 0 hsl(var(--primary) / 0.3)' },
          '75%': { textShadow: '1px -1px 0 hsl(var(--accent) / 0.5)' },
        },
        'electric-glow': {
          '0%, 100%': { textShadow: '0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary) / 0.8), 0 0 15px hsl(var(--primary) / 0.6)' },
          '50%': { textShadow: '0 0 8px hsl(var(--primary)), 0 0 16px hsl(var(--primary) / 0.8), 0 0 24px hsl(var(--primary) / 0.6)' },
        },
        'electric-glow-accent': {
          '0%, 100%': { textShadow: '0 0 5px hsl(var(--accent)), 0 0 10px hsl(var(--accent) / 0.8), 0 0 15px hsl(var(--accent) / 0.6)' },
          '50%': { textShadow: '0 0 8px hsl(var(--accent)), 0 0 16px hsl(var(--accent) / 0.8), 0 0 24px hsl(var(--accent) / 0.6)' },
        },
        'electric-glow-icon': {
          '0%, 100%': { filter: 'drop-shadow(0 0 3px hsl(var(--accent))) drop-shadow(0 0 5px hsl(var(--accent) / 0.7))' },
          '50%': { filter: 'drop-shadow(0 0 5px hsl(var(--accent))) drop-shadow(0 0 8px hsl(var(--accent) / 0.7))' },
        },
        'electric-glow-box': {
          '0%, 100%': { boxShadow: '0 0 15px hsl(var(--primary) / 0.5), 0 0 25px hsl(var(--primary) / 0.3)' },
          '50%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.7), 0 0 35px hsl(var(--primary) / 0.5)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'glitch': 'glitch 0.2s linear 3',
        'glitch-subtle': 'glitch-subtle 4s cubic-bezier(0.4, 0, 0.6, 1) infinite alternate',
        'electric-glow': 'electric-glow 3s ease-in-out infinite alternate',
        'electric-glow-accent': 'electric-glow-accent 3s ease-in-out infinite alternate',
        'electric-glow-icon': 'electric-glow-icon 3s ease-in-out infinite alternate',
        'electric-glow-box': 'electric-glow-box 3s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
