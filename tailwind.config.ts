import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'typing': 'typing 0.05s steps(1)',
        'cursor-blink': 'cursor-blink 1s infinite',
        'slide-in': 'slide-in 0.6s ease-out',
        'fade-in': 'fade-in 0.5s ease-in',
      },
      keyframes: {
        'typing': {
          'to': { 'width': '100%' },
        },
        'cursor-blink': {
          '0%, 49%': { 'border-color': 'rgb(59, 130, 246)' },
          '50%, 100%': { 'border-color': 'transparent' },
        },
        'slide-in': {
          '0%': { 'transform': 'translateY(20px)', 'opacity': '0' },
          '100%': { 'transform': 'translateY(0)', 'opacity': '1' },
        },
        'fade-in': {
          '0%': { 'opacity': '0' },
          '100%': { 'opacity': '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
