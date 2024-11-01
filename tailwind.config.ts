import { type Config } from "tailwindcss";
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@clerk/nextjs/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
    },
  },
  plugins: [],
} satisfies Config;
