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
      // {
      //   source: "/api/auth/session",
      //   destination: "/api/auth/session",
      // },
      // {
      //   source: "/api/auth/log",
      //   destination: "/api/auth/log",
      // },
      // {
      //   source: "/api/auth/signin",
      //   destination: "/api/auth/signin",
      // },
      // {
      //   source: "/api/auth/signout",
      //   destination: "/api/auth/signout",
      // },
      // {
      //   source: "/api/:path*",
      //   destination: `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/:path*`,
      // },
    ]
  },
}

module.exports = nextConfig
