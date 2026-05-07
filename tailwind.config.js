/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        bg: "var(--color-bg)",
      },
      fontFamily: {
        head: "var(--font-head)",
        body: "var(--font-body)",
      },
    },
  },
  plugins: [],
}
