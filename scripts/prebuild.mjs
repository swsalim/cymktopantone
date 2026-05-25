import { execSync } from 'node:child_process';

if (process.env.MAINTENANCE_MODE !== 'true') {
  execSync('npm run precompute-colors', { stdio: 'inherit' });
} else {
  console.log('Maintenance mode: skipped precompute-colors.');
}
