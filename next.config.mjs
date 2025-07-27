import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
  basePath: '/NanoCharts/docs',
  assetPrefix: '/NanoCharts/docs/',
};

export default withMDX(config);
