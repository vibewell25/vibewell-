/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/web/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: ['class', 'media'],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: '#F8F6F2',
          100: '#F1EEE9',
          200: '#E6DFDA',
          300: '#D2C9C0',
          400: '#B8ADA1',
          500: '#9E9183',
          600: '#847668',
          700: '#6A5D50',
          800: '#504537',
          900: '#2D3142'
        },
        coral: {
          50: '#FDF1EE',
          100: '#FAE3DD',
          200: '#F5C7BB',
          300: '#F0A999',
          400: '#EB8B77',
          500: '#E07A5F',
          600: '#D65F40',
          700: '#C44A28',
          800: '#A33A1F',
          900: '#822E18'
        },
        teal: {
          50: '#E6F6F7',
          100: '#CCECEF',
          200: '#99D9DF',
          300: '#66C7CF',
          400: '#33B4BF',
          500: '#00A1AF',
          600: '#00818C',
          700: '#006069',
          800: '#004046',
          900: '#002023'
        },
        blush: {
          50: '#FEF2F7',
          100: '#FDE6EF',
          200: '#FBCCDE',
          300: '#F9B3CE',
          400: '#F799BD',
          500: '#F580AD',
          600: '#C4668A',
          700: '#934D68',
          800: '#623345',
          900: '#311A23'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        md: '1.125rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '1.875rem',
        '3xl': '2.25rem',
        '4xl': '3rem',
        '5xl': '3.75rem'
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        md: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
        lg: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)'
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        md: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px'
      },
      transitionTimingFunction: {
        'ease-in': 'cubic-bezier(0.4,0,1,1)',
        'ease-out': 'cubic-bezier(0,0,0.2,1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      transitionDuration: {
        50: '50ms',
        100: '100ms',
        200: '200ms',
        300: '300ms',
        500: '500ms'
      },
      zIndex: {
        hide: '-1',
        base: '0',
        dropdown: '1000',
        modal: '1400',
        tooltip: '1800'
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    }
  },
  plugins: []
}; 