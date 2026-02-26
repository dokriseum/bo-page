import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme backgrounds
        bg: {
          DEFAULT: '#0d1117',
          card: '#161b27',
          hover: '#1e2535',
          muted: '#1a2235',
          nav: '#0f1623',
        },
        // Borders
        border: {
          DEFAULT: '#2d3748',
          light: '#374151',
        },
        // Text
        text: {
          DEFAULT: '#e2e8f0',
          muted: '#8892a4',
          light: '#64748b',
        },
        // Event type colors
        standard: '#3B82F6',
        machbar: '#F97316',
        verified: '#FBBF24',
        // Action buttons
        'btn-create': '#22C55E',
        'btn-login-from': '#7C3AED',
        'btn-login-to': '#EC4899',
        // Diversity / Rainbow colors
        diversity: {
          red: '#e74c3c',
          orange: '#f39c12',
          yellow: '#f1c40f',
          green: '#27ae60',
          teal: '#16a085',
          blue: '#3498db',
          indigo: '#2c3e50',
          purple: '#9b59b6',
          pink: '#e91e63',
        },
        // Section labels
        label: {
          teal: '#0ea5e9',
          orange: '#f97316',
        },
        // ===== Admin Panel Semantic Colors =====
        // Mapped to existing Bündnis OST design tokens
        background: '#0d1117',
        foreground: '#e2e8f0',
        card: {
          DEFAULT: '#161b27',
          foreground: '#e2e8f0',
        },
        popover: {
          DEFAULT: '#161b27',
          foreground: '#e2e8f0',
        },
        primary: {
          DEFAULT: '#3B82F6',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#1e2535',
          foreground: '#e2e8f0',
        },
        muted: {
          DEFAULT: '#1a2235',
          foreground: '#8892a4',
        },
        accent: {
          DEFAULT: '#3B82F6',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        ring: '#3B82F6',
        input: '#2d3748',
        'switch-background': '#374151',
        sidebar: {
          DEFAULT: '#0f1623',
          foreground: '#e2e8f0',
          primary: '#3B82F6',
          'primary-foreground': '#ffffff',
          accent: '#1e2535',
          'accent-foreground': '#e2e8f0',
          border: '#2d3748',
          ring: '#3B82F6',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      borderRadius: {
        card: '0.75rem',
        badge: '9999px',
      },
      boxShadow: {
        card: '0 4px 15px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.4)',
        btn: '0 4px 12px rgba(0,0,0,0.2)',
      },
      backgroundImage: {
        'rainbow': 'linear-gradient(90deg, #e74c3c 0%, #f39c12 14%, #f1c40f 28%, #27ae60 42%, #16a085 56%, #3498db 70%, #9b59b6 85%, #e91e63 100%)',
        'hero-gradient': 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #1e3a5f 100%)',
        'standard-badge': 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
        'machbar-badge': 'linear-gradient(135deg, #c2410c, #f97316)',
        'create-btn': 'linear-gradient(135deg, #16a34a, #22c55e)',
        'login-btn': 'linear-gradient(135deg, #7c3aed, #ec4899)',
        'stories-card': 'linear-gradient(135deg, #4c1d95, #7c3aed)',
      },
      animation: {
        'stripe-move': 'stripeMove 21s linear infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out backwards',
      },
      keyframes: {
        stripeMove: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 0%' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
