import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
  basePath: '/toomanycharts',
  assetPrefix: '/toomanycharts/',
};

export default withMDX(config);
