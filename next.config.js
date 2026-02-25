/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  async redirects() {
    return [
      {
        source: '/pillars/longevity',
        destination: '/pillars/health',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
