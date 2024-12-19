/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  publicRuntimeConfig: {
    // Available on both server and client
    theme: "DEFAULT",
  },
  images: {
    domains: ['seller.tizaraa.com', 'ae01.alicdn.com'],  // Add the domain here
    unoptimized: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
   // middleware: true,
  },
};

module.exports = nextConfig;



