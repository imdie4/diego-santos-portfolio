import type { Config } from "tailwindcss";

// Theme-aware colors are CSS variables (space-separated RGB) set in
// globals.css: light by default, flipped under `html.dark`. The neutral scale
// keeps Tailwind's names so existing classes follow the theme.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;
const neutral = Object.fromEntries(
  [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((n) => [n, v(`n-${n}`)])
);

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: v("canvas"),
        // page/card surfaces: white in light mode, Figma dark grey in dark
        surface: v("surface"),
        neutral,
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
        panel: "var(--shadow-panel)",
      },
    },
  },
  plugins: [],
};

export default config;
