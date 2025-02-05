/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  distDir: 'standalone/_next', // Moves _next into standalone/_next

  async rewrites() {
    return [
      {
        source: "/_next/:path*", // Redirect _next requests
        destination: "/standalone/_next/:path*",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
