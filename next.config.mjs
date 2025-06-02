/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  basePath: '/abclick',
  assetPrefix: '/abclick',
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
