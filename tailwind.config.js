/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#F4F6FC',
        'dark-primary-bg': '#202226',
        'dark-secondary-bg': '#121212',
        'dark-tertiary-bg': '#262635',
        'primary-accent': '#8062D6',
        'dark-primary-accent': '#a180f8',
        'secondary-accent': '#322653',
        'tertiary-accent': '#9288F8',
        'dark-secondary-accent': '#f1deff',
        'primary-text': '#5A6269',
        'dark-primary-text': '#a1aab1',
        'alpha-bg': '#9288F8'
      },
      screens: {
        'semi-lg': '964px'
      }
    }
  },
  plugins: [
    require('tailwindcss-animated')],
  darkMode: 'class'
}
