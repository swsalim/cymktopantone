import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SITE_DOMAIN = 'colormapper.xyz';

function fixRobotsTxt() {
  const robotsPath = join(process.cwd(), 'public', 'robots.txt');
  if (!existsSync(robotsPath)) return;

  const host =
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL?.replace(/^https?:\/\//, '') ??
    SITE_DOMAIN;

  let content = readFileSync(robotsPath, 'utf8');
  content = content.replace(/^# \*$/m, '# All user agents');
  content = content.replace(/Host: .+/, `Host: ${host}`);
  writeFileSync(robotsPath, content);
  console.log('robots.txt fixed!');
}

const isMaintenance = process.env.MAINTENANCE_MODE === 'true';

if (isMaintenance) {
  const publicDir = join(process.cwd(), 'public');
  const emptyIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</sitemapindex>
`;
  const emptyUrlset = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>
`;
  writeFileSync(join(publicDir, 'sitemap.xml'), emptyIndex);
  writeFileSync(join(publicDir, 'sitemap-0.xml'), emptyUrlset);
  console.log('Maintenance mode: wrote empty sitemap stubs.');
} else {
  execSync('npx next-sitemap --config next-sitemap.config.mjs', { stdio: 'inherit' });
  fixRobotsTxt();
}
