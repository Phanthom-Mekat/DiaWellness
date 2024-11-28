/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ADD8E6',
        secondary: '#B2E6CE', 
        tertiary: '#F7D2C4',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}