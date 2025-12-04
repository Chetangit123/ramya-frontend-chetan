/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/customer/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        brand: '#551F3D', // you can name it 'brand' or anything else
      },
    },
  },
  plugins: [],
}