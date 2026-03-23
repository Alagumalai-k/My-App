import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2d5016',
        secondary: '#8bc34a',
        accent: '#ff9800',
      },
    },
  },
  plugins: [],
}

export default config
