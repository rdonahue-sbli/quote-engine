/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      // sans: ['var(--font-inter)'],
      "inter": "var(--inter-font)",
      "merriweather": "var(--merriweather-font)",
      "assistant": "var(--assistant-font)",
    },
    extend: {
      colors: {
        // blue: '#0f2f6f',
        navy: '#11254d',
        midnight: '#0d1e40'
      }
    },
  },
  plugins: [require("daisyui")],
}
