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
        void: {
          DEFAULT: '#000818',
          deep: '#000000',
        },
        sun: '#D9661C',
        hot: '#FAC345',
        teal: '#06B6C3',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
      },
      letterSpacing: {
        'tighter': '-0.04em',
        'tight': '-0.02em',
        'wide': '0.1em',
        'wider': '0.2em',
        'widest': '0.3em',
      },
    },
  },
  plugins: [],
}
export default config
