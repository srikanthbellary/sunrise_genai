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
          DEFAULT: '#000816',
          deep: '#00040d',
        },
        sun: '#D9661C',
        hot: '#FAC345',
        teal: '#06B6C3',
        bone: '#F2EDE4',
        ink: '#0A0C10',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Garamond', 'Georgia', 'serif'],
        body: ['Source Serif 4', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
