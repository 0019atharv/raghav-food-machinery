/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        industrial: {
          950: '#06090F',
          900: '#0B111E',
          850: '#111A2E',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
          500: '#64748B',
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#F1F5F9',
          50: '#F8FAFC',
        },
        navy: {
          DEFAULT: '#16233F',
          dark: '#0B1324',
          light: '#1E3055',
        },
        brandgreen: {
          DEFAULT: '#3D9B28',
          dark: '#2E7D1E',
          light: '#4EBC35',
          glow: 'rgba(61, 155, 40, 0.25)',
        },
        amber: {
          brand: '#3D9B28',
          glow: '#4EBC35',
          dark: '#2E7D1E',
          deep: '#1B5E20',
        },
        steel: {
          base: '#64748B',
          light: '#E2E8F0',
          chrome: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        montserrat: ['Montserrat', 'Inter', 'sans-serif'],
        display: ['Montserrat', 'Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.35)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      }
    },
  },
  plugins: [],
}

