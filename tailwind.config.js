/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'cyan-gradient': '#00d1ff', // Top color
        'purple-gradient': '#8b00ff', // Bottom color
      },
    },
  },
  plugins: [],
}