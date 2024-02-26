/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: {
      ssr: true,
      pure: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/backend/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
