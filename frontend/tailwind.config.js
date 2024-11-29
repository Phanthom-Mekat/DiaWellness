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
        secondary: '#3498db',
        tertiary: '#F5C489',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}