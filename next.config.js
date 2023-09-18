/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.sbli.com',
      },
      {
        protocol: 'http',
        hostname: 'prototype.local',
      },
      {
        protocol: 'https',
        hostname: '**.wpenginepowered.com',
      },
    ],
  },
}

module.exports = nextConfig
