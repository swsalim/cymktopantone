import type { NextConfig } from 'next';

import { withContentCollections } from '@content-collections/next';

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [200, 350, 600, 900, 1200, 1800],
    imageSizes: [16, 32, 48, 64, 128, 256, 384],
    dangerouslyAllowSVG: true,
    remotePatterns: [{ protocol: 'https', hostname: 'ik.imagekit.io', port: '' }],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
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
        destination: '/convert-pantone-pms-to-cmyk',
        permanent: true,
      },
      {
        source: '/convert-rgb-to-pantone-pms',
        destination: 'https://www.rgbtopantone.com/',
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
