import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

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
  execSync('next-sitemap --config next-sitemap.config.mjs', { stdio: 'inherit' });
  execSync('tsx scripts/fix-robots.ts', { stdio: 'inherit' });
}
