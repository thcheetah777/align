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
        "nav": "10vh",
      },
      borderRadius: {
        "sm": "4px",
      },
      colors: {
        "border": "#333333",
        "faded": "#808080",
        "lighter": "#1c1c1c",
        "background": "#111111",
      },
      scale: {
        "smaller": "98%",
      }
    },
  },
  plugins: [],
}

