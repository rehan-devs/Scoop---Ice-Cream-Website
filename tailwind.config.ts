import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FFF8F0',
          dark: '#F5EBE0',
        },
        chocolate: {
          DEFAULT: '#2C1810',
          light: '#8B6F5E',
          rich: '#5C3D2E',
        },
        accent: {
          pink: '#E8A0BF',
          mint: '#A8D8B9',
          vanilla: '#F5DEB3',
          blueberry: '#7B8CDE',
          caramel: '#D4A574',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
      fontSize: {
        hero: 'clamp(3rem, 8vw, 10rem)',
        section: 'clamp(2rem, 5vw, 5rem)',
        'nav-overlay': 'clamp(3rem, 7vw, 8rem)',
        flavor: 'clamp(1.5rem, 2.5vw, 2.5rem)',
      },
      maxWidth: {
        content: '1400px',
      },
      spacing: {
        section: 'clamp(6rem, 15vh, 12rem)',
        page: 'clamp(1rem, 4vw, 4rem)',
      },
      transitionTimingFunction: {
        'power4-out': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'power4-inout': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        melt: {
          '0%': { clipPath: 'inset(0 0 0 0)' },
          '100%': { clipPath: 'inset(0 0 100% 0)' },
        },
      },
      animation: {
        marquee: 'marquee 75s linear infinite',
        'marquee-reverse': 'marquee-reverse 75s linear infinite',
        grain: 'grain 8s steps(10) infinite',
        melt: 'melt 1s cubic-bezier(0.76, 0, 0.24, 1) forwards',
      },
    },
  },
  plugins: [],
};

export default config;