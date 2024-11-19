import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	},
  	colors: {
  		'background-dark': '#110503',
  		'background-light': '#fcf0ee',
  		'dark-brown': '#19100D',
  		'main-orange': '#912b12',
  		'light-orange': '#ed876e',
  		'dark-blue': '#0A054B',
  		'main-blue': '#0008ff',
		'accent-blue': '#4096d4'
	},
  },
  plugins: [tailwindcssAnimate],
};
export default config;
