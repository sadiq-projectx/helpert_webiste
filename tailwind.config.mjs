/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Include all files in the src directory
  ],
  darkMode: "class", // Enables dark mode
  theme: {
    extend: {
      colors: {
        "background-color": "var(--background-color)",
        "surface-color": "var(--surface-color)",
        "text-color": "var(--text-color)",
        "secondary-text-color": "var(--secondary-text-color)",
        "primary-color": "var(--primary-color)",
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"], // Matches the --font-sans variable in globals.css
      },
      fontSize: {
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.75rem", // 28px
        "4xl": "2rem", // 32px
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // Adds better form styling
    require("@tailwindcss/typography"), // Adds typography utilities
  ],
}; 