import type { NextConfig } from 'next';

import { withContentCollections } from '@content-collections/next';

import { getNextConfigRedirects } from './lib/legacy-path-resolver';

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [200, 350, 600, 900, 1200, 1800],
    imageSizes: [16, 32, 48, 64, 128, 256, 384],
    dangerouslyAllowSVG: true,
    remotePatterns: [{ protocol: 'https', hostname: 'ik.imagekit.io', port: '' }],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400,
  },
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  async redirects() {
    return getNextConfigRedirects();
  },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
