import type { NextConfig } from "next";

const isCI = process.env.GITHUB_ACTIONS === 'true'
const repo = process.env.REPO_NAME || ''

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // produce static HTML in out/
  images: { unoptimized: true }, // required for static export + GH Pages
  basePath: isCI && repo ? `/${repo}` : '',
  assetPrefix: isCI && repo ? `/${repo}/` : '',
};

export default nextConfig;
