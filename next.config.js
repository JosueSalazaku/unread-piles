/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: 'http', 
        hostname: 'books.google.com',
        pathname: '/books/content/**',
      },
    ],
  },
};

module.exports = nextConfig;