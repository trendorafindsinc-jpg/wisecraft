/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    formats: ["image/webp", "image/avif"],
  },
  // Experimental features for performance
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // Uncomment for static export (e.g., GitHub Pages):
  // output: 'export',
  // distDir: 'dist',
};

module.exports = nextConfig;
