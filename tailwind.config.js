/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sbi: {
          50: '#eaf3fb',
          100: '#d3e6f6',
          200: '#a7cded',
          300: '#7bb3e3',
          400: '#4f9ad9',
          500: '#0A5FA8', // primary SBI blue
          600: '#095496',
          700: '#08447a',
          800: '#06355f',
          900: '#052846',
          950: '#03182b',
        },
        accent: {
          orange: '#F58220', // SBI-adjacent accent for notifications/actions
          teal: '#12B5A6',
          violet: '#6C5CE7',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(10, 95, 168, 0.25)',
        card: '0 4px 24px -8px rgba(16, 42, 67, 0.12)',
        glow: '0 0 0 1px rgba(255,255,255,0.35), 0 20px 45px -15px rgba(10,95,168,0.45)',
        float: '0 18px 50px -12px rgba(10, 95, 168, 0.45)',
      },
      backgroundImage: {
        'sbi-gradient': 'linear-gradient(135deg, #0A5FA8 0%, #0b6fc4 45%, #12A0E0 100%)',
        'sbi-soft': 'linear-gradient(135deg, #eaf3fb 0%, #f6fafe 100%)',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.35) 100%)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.7' },
          '80%, 100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.24,0,0.38,1) infinite',
        float: 'float 5s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
      },
    },
  },
  plugins: [],
}
