/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        canvas: '#F8FAFC',
        surface: '#FFFFFF',
        'surface-subdued': '#F1F5F9',
        'text-primary': '#0F172A',
        'text-secondary': '#475569',
        'text-muted': '#94A3B8',
        primary: {
          DEFAULT: '#0F766E',
          dark: '#0D9488',
          light: '#CCFBF1',
          soft: '#F0FDFA',
        },
        secondary: {
          DEFAULT: '#0284C7',
          dark: '#0369A1',
          light: '#E0F2FE',
          soft: '#F0F9FF',
        },
        warning: {
          DEFAULT: '#D97706',
          light: '#FEF3C7',
        },
        critical: {
          DEFAULT: '#BE123C',
          light: '#FFE4E6',
          soft: '#FFF1F2',
        },
        border: {
          DEFAULT: '#E2E8F0',
          subtle: '#F1F5F9',
        },
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '22px' }],
        lg: ['18px', { lineHeight: '24px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
      },
      minHeight: {
        touch: '48px',
      },
      minWidth: {
        touch: '48px',
      },
    },
  },
  plugins: [],
};
