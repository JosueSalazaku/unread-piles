/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
          {
            protocol: 'http', 
            hostname: 'books.google.com',
            pathname: '/books/**', // This covers both /books/content/** and /books/**

          },
          {
            protocol: "https",
            hostname: "lh3.googleusercontent.com",
            pathname: "/**", // Allow all paths under this hostname
          },
    
        ],
      },
};

export default config;
