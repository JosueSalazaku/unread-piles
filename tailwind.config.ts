import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-dark": "#140300",
        "background-light": "#fcf0ee",
        "dark-brown": "#3e2f2a",
        "main-orange": "#912b12",
        "light-orange": "#ed876e",
        "dark-blue": "#0A054B",
        "main-blue": "#0008ff",
        "accent-blue": "#4096d4",
      },
      borderWidth: {
        1: "1px",
      },
      screens: {
        'xs': '480px', // Extra small devices
        'sm': '640px', // Small devices
        'md': '768px', // Medium devices
        'lg': '1024px', // Large devices
        'xl': '1280px', // Extra large devices
        '2xl': '1536px', // 2X large devices
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
