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
        cyan:    '#00f5ff',
        magenta: '#ff006e',
        yellow:  '#ffe600',
        dark:    '#050810',
        dark2:   '#0a0f1e',
        dark3:   '#0d1529',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        mono:     ['Share Tech Mono', 'monospace'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float':      'float 3s ease-in-out infinite',
        'blink':      'blink 1s step-end infinite',
        'scanline':   'scanline 8s linear infinite',
      },
      keyframes: {
        float:    { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        blink:    { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        scanline: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100vh)' } },
      },
    },
  },
  plugins: [],
}

export default config
