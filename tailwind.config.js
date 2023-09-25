/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{html,js,ts,svelte}"],
  theme: {
    extend: {
      fontFamily: {
        "logo": ["Josefin Sans", "sans-serif"],
      },
      spacing: {
        "xxs": "0.5rem",
        "xs": "1rem",
        "sm": "2rem",
        "md": "4rem",
        "lg": "6rem",
        "xl": "8rem",
      },
      borderRadius: {
        "sm": "4px",
      },
      colors: {
        "border": "#333333",
      },
      scale: {
        "smaller": "98%",
      }
    },
  },
  plugins: [],
}

