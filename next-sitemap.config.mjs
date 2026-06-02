// Save crawling budget by not fetching SSG meta files
const NEXT_SSG_FILES = [
  '/*_buildManifest.js$',
  '/*_middlewareManifest.js$',
  '/*_ssgManifest.js$',
];

const SITE_DOMAIN = 'colormapper.xyz';

const exclude = [
  '/dashboard*',
  '/404',
  '/api*',
  '/login',
  '/server-sitemap.xml',
  '/robots.txt',
  '/manifest.webmanifest',
];

const siteUrl =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ?? SITE_DOMAIN}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL ?? `https://${SITE_DOMAIN}`;

const config = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 7000,
  exclude,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', disallow: NEXT_SSG_FILES }],
    host:
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ?? SITE_DOMAIN)
        : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
          ? process.env.NEXT_PUBLIC_VERCEL_URL
          : process.env.NEXT_PUBLIC_BASE_URL?.replace(/^https?:\/\//, '') ?? SITE_DOMAIN,
  },
  additionalPaths: async (config) => {
    return [
      await config.transform(config, '/'),
      await config.transform(config, '/color-models'),
      await config.transform(config, '/color-models/rgb'),
      await config.transform(config, '/color-models/cmyk'),
      await config.transform(config, '/color-models/hsl'),
      await config.transform(config, '/color-models/hsv'),
      await config.transform(config, '/color-models/hex'),
      await config.transform(config, '/convert-color'),
      await config.transform(config, '/legal/privacy-policy'),
      await config.transform(config, '/legal/terms-and-conditions'),
      await config.transform(config, '/advertise'),
      await config.transform(config, '/blog'),
      await config.transform(config, '/blog/color-theory-101'),
      await config.transform(config, '/blog/best-color-palettes-startup'),
    ];
  },
  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: path === '/' ? 1.0 : 0.7,
    };
  },
};

export default config;
