/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Noto Sans"',
          '"Noto Sans Devanagari"',
          '"Noto Sans Kannada"',
          '"Noto Sans Tamil"',
          '"Noto Sans Telugu"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif'
        ],
      },
      colors: {
        // Design System Semantic Tokens
        // 1. Primary: Deep Teal
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e', // Deep Teal Primary
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
          DEFAULT: '#0f766e',
          dark: '#14b8a6',
        },
        // 2. Credit: Amber (Udhaar Owed)
        credit: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          DEFAULT: '#d97706',
          light: '#fef3c7',
          dark: '#fbbf24',
        },
        // 3. Payment: Green (Jama Mila)
        payment: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          DEFAULT: '#16a34a',
          light: '#dcfce7',
          dark: '#4ade80',
        },
        // 4. Danger: High-contrast Alert / Error
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          DEFAULT: '#dc2626',
        },
        // 5. Surface Tokens for Light and Dark themes
        surface: {
          DEFAULT: 'var(--color-surface, #ffffff)',
          subtle: 'var(--color-surface-subtle, #f8fafc)',
          card: 'var(--color-surface-card, #ffffff)',
          border: 'var(--color-surface-border, #e2e8f0)',
          dark: '#0f172a',
          darkSubtle: '#1e293b',
          darkBorder: '#334155',
        },
        // 6. Text Tokens
        txt: {
          primary: 'var(--color-text-primary, #0f172a)',
          muted: 'var(--color-text-muted, #64748b)',
          inverted: 'var(--color-text-inverted, #ffffff)',
        }
      },
      minHeight: {
        touch: '56px',
        touchLg: '64px',
      },
      minWidth: {
        touch: '56px',
        touchLg: '64px',
      },
      boxShadow: {
        'touch': '0 4px 14px 0 rgba(0, 0, 0, 0.08)',
        'sheet': '0 -8px 30px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}
