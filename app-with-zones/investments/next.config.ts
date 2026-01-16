/* eslint-disable @typescript-eslint/no-require-imports */
import type { NextConfig } from "next";
const withSvgr = require('next-plugin-svgr')

const nextConfig: NextConfig = {
  assetPrefix: '/investments-static',
  basePath: '/investments',
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
  output: "standalone"
};

module.exports = withSvgr(nextConfig)
