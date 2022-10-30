/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["randomuser.me"], formats: ["image/avif", "image/webp"] },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
