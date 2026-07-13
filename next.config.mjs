/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Remote image hosts. The client should swap the Unsplash placeholders in
    // src/data/products.ts for their own product photography (e.g. hosted on a
    // CDN or /public). Add that host here when they do.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
