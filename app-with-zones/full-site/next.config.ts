/* eslint-disable @typescript-eslint/no-require-imports */
import type { NextConfig } from "next";
const withSvgr = require('next-plugin-svgr')

const {NEXT_PUBLIC_INVESTMENTS_BASE_URL} = process.env

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true
            },
          },
        ],
        as: '*.tsx',
      },
    },
  },
  experimental: {
    staleTimes: {
      static: 60 * 60 * 24,
      dynamic: 60,
    },
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `/:path*`,
      },
      {
        source: '/investments',
        destination: `${NEXT_PUBLIC_INVESTMENTS_BASE_URL}/investments`,
      },
      {
        source: "/investments/:path*",
        destination: `${NEXT_PUBLIC_INVESTMENTS_BASE_URL}/investments/:path*`,
      },
      {
        source: "/investments-static/_next/:path+",
        destination: `${NEXT_PUBLIC_INVESTMENTS_BASE_URL}/investments-static/_next/:path+`,
      },
    ];
  },
  output: "standalone"
};

module.exports = withSvgr(nextConfig)
