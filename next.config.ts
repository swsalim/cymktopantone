import type { NextConfig } from 'next';

import { withContentCollections } from '@content-collections/next';

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
    return [
      {
        source: '/api/og',
        destination: '/images/og-default.png',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/legal/privacy-policy',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/legal/terms-and-conditions',
        permanent: true,
      },
      {
        source: '/convert-pantone-to-cmyk',
        destination: '/convert-rgb-to-cmyk',
        permanent: true,
      },
      {
        source: '/convert-cmyk-to-pantone-pms',
        destination: '/convert-rgb-to-cmyk',
        permanent: true,
      },
      {
        source: '/convert-hex-to-pantone-pms',
        destination: '/convert-hex-to-cmyk',
        permanent: true,
      },
      {
        source: '/convert-hsl-to-pantone-pms',
        destination: '/convert-hsl-to-cmyk',
        permanent: true,
      },
      {
        source: '/convert-hsv-to-pantone-pms',
        destination: '/convert-hsv-to-cmyk',
        permanent: true,
      },
      {
        source: '/convert-pantone-pms-to-cmyk',
        destination: '/convert-rgb-to-cmyk',
        permanent: true,
      },
      {
        source: '/convert-pantone-pms-to-hex',
        destination: '/convert-rgb-to-hex',
        permanent: true,
      },
      {
        source: '/convert-pantone-pms-to-hsl',
        destination: '/convert-rgb-to-hsl',
        permanent: true,
      },
      {
        source: '/convert-pantone-pms-to-hsv',
        destination: '/convert-hsv-to-hsl',
        permanent: true,
      },
      {
        source: '/convert-pantone-pms-to-rgb',
        destination: '/convert-cmyk-to-rgb',
        permanent: true,
      },
      {
        source: '/pantone-color-match',
        destination: '/',
        permanent: true,
      },
      {
        source: '/pantone-colors',
        destination: '/convert-color',
        permanent: true,
      },
      {
        source: '/pantone',
        destination: '/convert-color',
        permanent: true,
      },
      {
        source: '/color-models/test',
        destination: '/color-models',
        permanent: true,
      },
    ];
  },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
