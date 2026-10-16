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

  // Remove non-standard Host directive (not part of robots.txt spec)
  content = content.replace(/\n# Host\nHost: .+\n?/, '\n');

  writeFileSync(robotsPath, content);
  console.log('robots.txt fixed!');
} else {
  console.log('robots.txt not found.');
}
