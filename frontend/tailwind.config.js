/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2B5219', // deep forest green
          light: '#3E7A2A',
          dark: '#182F0F',
        },
        accent: {
          DEFAULT: '#7FB069', // sage leaf green
          light: '#A8C89A',
        },
        gold: {
          DEFAULT: '#C8A96E', // warm gold
          light: '#E4D4A8',
        },
        cream: '#F2EDE3',     // warm parchment
        offWhite: '#F9F6F0',  // body background
        warmWhite: '#FFFDF8',
        white: '#FFFDF8',     // Map standard white to warmWhite/off-white if appropriate
        textDark: '#1B2E14',
        textBody: '#3D4F35',
        textMuted: '#7A8C72',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        accent: ['Lora', 'serif']
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'marquee': 'marquee 25s linear infinite'
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '0.5' },
          '50%': { transform: 'scale(1.2)', opacity: '0' },
          '100%': { transform: 'scale(0.95)', opacity: '0' }
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(10deg)' }
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      }
    },
  },
  plugins: [],
}
