const { text } = require('express');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#f41581',
        'primary-text': '#671d74',
        secondary: '#f0d2e1',
        'secondary-accent': '#f41581',
        accent: '#fff453',
      },
      fontSize: {
        tiny: '.8rem',
      },
    },
  },
};
