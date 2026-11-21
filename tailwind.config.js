/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Noto Sans', 'sans-serif'],
      },
      colors: {
        // High contrast semantic palette
        // Udhaar / Credit Given / Owed: Amber-Red
        udhaar: {
          light: '#fef2f2',
          border: '#f87171',
          DEFAULT: '#dc2626', // High-contrast red/rose
          dark: '#991b1b',
          amber: '#d97706',
          bg: '#450a0a',
        },
        // Jama / Payment Received / Paid: Green
        jama: {
          light: '#f0fdf4',
          border: '#4ade80',
          DEFAULT: '#16a34a', // High-contrast green/emerald
          dark: '#14532d',
          bg: '#052e16',
        },
        // Kirana Theme Palette
        kirana: {
          dark: '#0f172a',    // 900 slate
          surface: '#1e293b', // 800 slate
          card: '#1e293b',
          border: '#334155',  // 700 slate
          accent: '#2563eb',  // royal blue
          gold: '#f59e0b',
        }
      },
      minHeight: {
        'touch': '56px',
      },
      minWidth: {
        'touch': '56px',
      }
    },
  },
  plugins: [],
}
