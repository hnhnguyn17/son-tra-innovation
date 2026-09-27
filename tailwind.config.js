/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        navy: {
          900: '#0A192F',
        },
        ocean: {
          500: '#0077B6',
          600: '#005f92',
        },
        slate: {
          dark: '#4A5568',
        },
      },
      keyframes: {
        'fade-rise': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-rise': 'fade-rise 1s ease-out forwards',
        'fade-rise-delay': 'fade-rise 1s ease-out 0.3s forwards',
        'fade-rise-delay-2': 'fade-rise 1s ease-out 0.6s forwards',
      },
    },
  },
  plugins: [],
}
