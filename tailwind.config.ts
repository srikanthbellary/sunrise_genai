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
          deep: '#00040e',
        },
        royal: '#0a1633',
        indigo: '#0d1b3f',
        sun: '#D9661C',
        hot: '#FAC345',
        teal: '#06B6C3',
      },
      fontFamily: {
        sans: ['Geist Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
