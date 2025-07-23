/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Add trailing slashes to all paths
  trailingSlash: true,

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Configure base path for GitHub Pages
  basePath: process.env.NODE_ENV === "production" ? "/newbie-interpreter" : "",
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/newbie-interpreter/" : "",
};

module.exports = nextConfig;
