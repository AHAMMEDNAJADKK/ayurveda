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
          DEFAULT: '#61aa45', // Primary Green
          light: '#7dc45e',   // Light Green tint / variant
          dark: '#4b8e30',    // Darker Green
        },
        accent: {
          DEFAULT: '#00909d', // Primary Teal-Blue
          light: '#e0f5f6',   // Light Blue tint
        },
        gold: {
          DEFAULT: '#00909d', // Primary Teal-Blue (replaces old gold)
          light: '#e0f5f6',   // Light Blue tint
        },
        cream: '#edf7e8',     // Light Green tint
        offWhite: '#edf7e8',  // Light Green tint background
        warmWhite: '#ffffff', // Pure white
        white: '#ffffff',     // Map to pure white
        textDark: '#1a3d10',  // Dark text
        textBody: '#1a3d10',  // Body text
        textMuted: '#61aa45', // Muted green text
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
        accent: ['"Cormorant Garamond"', 'Georgia', 'serif'],
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
