import type { NextConfig } from 'next';

const isGitHubPages = process.env.DEPLOY_GITHUB_PAGES === '1';
const basePath = isGitHubPages ? '/saar-bites' : '';

const nextConfig: NextConfig = {
  ...(isGitHubPages ? { output: 'export' as const } : {}),
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: isGitHubPages,
  // Vinext applies this limit while inspecting multipart API requests too.
  experimental: { serverActions: { bodySizeLimit: '16mb' } },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
