/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',  // Change to 'http' since the image URL uses http
        hostname: 'books.google.com',
        pathname: '/books/content/**',
      },
    ],
  },
};

export default nextConfig;