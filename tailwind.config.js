/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./**/*.{astro,js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      em: '1em',
      0: '0',
      sm: '14px',
      md: '16px',
      lg: '24px',
      xl: '36px',
      xxl: '64px',
      ...scale({ start: 14, end: 18, step: 2 }),
      ...scale({ start: 24, end: 96, step: 6 }),
    },
    spacing: {
      ...scale({ start: 0, end: 24, step: 4 }),
      ...scale({ start: 24, end: 144, step: 12 }),
    },
    height: {
      ...scale({ start: 0, end: 64, step: 8 }),
    },
    width: {
      ...scale({ start: 0, end: 64, step: 8 }),
      auto: 'auto',
      content: 'fit-content',
      screen: '100vw',
      full: '100%',
    },
    maxWidth: {
      ...scale({ start: 64, end: 1024, step: 64 }),
      content: 'max-content',
      full: '100%',
      screen: '100vw',
    },
    borderColor: {
      DEFAULT: 'var(--colors-border)',
    },
    borderRadius: {
      DEFAULT: '4px',
    },
    extend: {
      screens: {
        xs: '384px',
      },
      colors: {
        'text': 'var(--colors-text)',
        'text-soft': 'var(--colors-text-soft)',
        'text-accent': 'var(--colors-text-accent)',
        'text-danger': 'var(--colors-text-danger)',
        'background': 'var(--colors-background)',
        'background-soft': 'var(--colors-background-soft)',
        'border': 'var(--colors-border)',
        'black': '#101010',
      },
    },
  },
};

module.exports = config;

function scale({ start, end, step }) {
  let output = {};
  for (let i = start; i <= end; i += step) {
    output[i] = `${i}px`;
  }
  return output;
}
