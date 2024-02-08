/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: {
      ssr: true,
      pure: true,
    },
  },
};

module.exports = nextConfig;
