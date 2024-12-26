/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    fontFamily: {
      poppins: ["Poppins"],
    },
  },
  safelist: [
    "border-gray-500",
    "border-b-2",
    "border-transparent",
  ],
  plugins: [],
}

