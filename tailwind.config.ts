import type { Config } from 'tailwindcss';

const withMT = require('@material-tailwind/react/utils/withMT');
const config: Config = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      width: {
        screen80: '80vw',
      },
    },
  },
  plugins: [],
});

export default config;
