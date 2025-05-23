/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: '**',
        protocol: 'https',
      }
    ]
  }
};

export default nextConfig;
