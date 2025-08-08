/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      height: {
        'content' : 'calc(100% - 112px)',
        'pricepanel' : 'calc(100vh - 112px)'
      },
    },
  },
  plugins: [],
}

