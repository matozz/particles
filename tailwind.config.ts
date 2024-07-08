import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        light: "0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 0 10vw #000",
      },
    },
  },
  plugins: [],
} satisfies Config;
