// Save crawling budget by not fetching SSG meta files
const NEXT_SSG_FILES = [
  '/*_buildManifest.js$',
  '/*_middlewareManifest.js$',
  '/*_ssgManifest.js$'
];

const exclude = ['/dashboard*', '/404', '/api*', '/login', '/server-sitemap.xml'];

const siteUrl =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL;

const config = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 7000,
  exclude,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', disallow: NEXT_SSG_FILES }],
    host: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
      ? process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
      : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : process.env.NEXT_PUBLIC_BASE_URL?.replace(/^https?:\/\//, ''),
  },
  // Add explicit paths to ensure sitemap generation
  additionalPaths: async (config) => {
    return [
      await config.transform(config, '/'),
      await config.transform(config, '/color-models'),
      await config.transform(config, '/color-models/rgb'),
      await config.transform(config, '/color-models/cmyk'),
      await config.transform(config, '/color-models/hsl'),
      await config.transform(config, '/color-models/hex'),
      await config.transform(config, '/convert-color'),
      await config.transform(config, '/pantone-colors'),
      await config.transform(config, '/pantone-color-match'),
      await config.transform(config, '/pantone-color-match/challenge'),
      await config.transform(config, '/pantone-color-match/challenge/easy'),
      await config.transform(config, '/pantone-color-match/challenge/medium'),
      await config.transform(config, '/pantone-color-match/challenge/hard'),
      await config.transform(config, '/pantone-color-match/classic'),
      await config.transform(config, '/pantone-color-match/classic/easy'),
      await config.transform(config, '/pantone-color-match/classic/medium'),
      await config.transform(config, '/pantone-color-match/classic/hard'),
      await config.transform(config, '/pantone-color-match/daily'),
      await config.transform(config, '/legal/privacy-policy'),
      await config.transform(config, '/legal/terms-and-conditions'),
      await config.transform(config, '/advertise'),
      await config.transform(config, '/blog'),
    ];
  },
  transform: async (config, path) => {
    // Fix robots.txt after generation
    if (path === 'robots.txt') {
      const fs = await import('fs');
      const robotsPath = './public/robots.txt';

      if (fs.existsSync(robotsPath)) {
        let content = fs.readFileSync(robotsPath, 'utf8');

        // Fix the comment syntax
        content = content.replace('# *', '# All user agents');

        // Fix the Host directive to only include hostname
        const hostMatch = content.match(/Host: (https?:\/\/)?([^\/\s]+)/);
        if (hostMatch) {
          const hostname = hostMatch[2];
          content = content.replace(/Host: https?:\/\/[^\/\s]+/, `Host: ${hostname}`);
        }

        fs.writeFileSync(robotsPath, content);
      }
    }

    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: path === '/' ? 1.0 : 0.7,
    };
  },
};

module.exports = config;
