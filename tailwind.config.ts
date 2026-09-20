import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#06102A', 900: '#0A1A3F', 800: '#0C1D47', 700: '#10275A' },
        brand: { blue: '#2E6BFF', 'blue-2': '#5B8DFF', cyan: '#27D4F0', amber: '#FFA51F' },
        ink: { DEFAULT: '#EAF1FF', muted: '#9BABD1' },
        line: { DEFAULT: 'rgba(130,170,255,0.18)', strong: 'rgba(130,170,255,0.36)' },
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'Segoe UI', 'system-ui', '-apple-system', 'Roboto', 'Arial', 'sans-serif'],
      },
      maxWidth: { site: '1180px' },
    },
  },
  plugins: [],
};
export default config;
