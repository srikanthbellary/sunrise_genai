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
        sunrise: {
          orange: '#FF6B35',
          cyan: '#00F5FF',
          yellow: '#FFD23F',
          bg: '#060814',
          'bg-light': '#0a0e1a',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
