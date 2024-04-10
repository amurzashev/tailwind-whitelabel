/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "button-bg": "var(--button-bg)",
        "button-text": "var(--button-text)",
      }
    }
  },
  plugins: [],
}

