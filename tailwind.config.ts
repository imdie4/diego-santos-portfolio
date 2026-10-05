import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F3F4F6",
        "figma-blue": "#0D99FF",
        "figma-selection": "#0C8CE9",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'SF Pro Display'",
          "'Segoe UI'",
          "Inter",
          "sans-serif",
        ],
      },
      boxShadow: {
        panel:
          "0 0 0 1px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
