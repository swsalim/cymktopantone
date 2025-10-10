import { existsSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

const robotsPath: string = join(__dirname, '../public/robots.txt');

if (existsSync(robotsPath)) {
  let content: string = readFileSync(robotsPath, 'utf8');

  // Fix the comment syntax
  content = content.replace(/^# \*$/m, '# All user agents');

  // Fix the Host directive to only include hostname
  content = content.replace(
    /Host: (https?:\/\/)?([^\s/]+)/,
    (match: string, proto: string | undefined, host: string): string => {
      // Use production domain if available
      const prodDomain: string | undefined = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
      return 'Host: ' + (prodDomain || host);
    },
  );

  writeFileSync(robotsPath, content);
  console.log('robots.txt fixed!');
} else {
  console.log('robots.txt not found.');
}
