import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
const configPath = 'backend/wrangler.production.json';
let config;
try { config = JSON.parse(await readFile(configPath,'utf8')); }
catch { throw new Error('Create backend/wrangler.production.json from its example and set your Cloudflare D1 database ID. See backend/README.md.'); }
const id = config.d1_databases?.[0]?.database_id;
if (!/^[0-9a-f-]{36}$/i.test(id || '') || id === '00000000-0000-4000-8000-000000000000') throw new Error('A real production D1 database ID is required.');
if (!config.r2_buckets?.[0]?.bucket_name || !config.vars?.ALLOWED_ORIGINS) throw new Error('Production R2 bucket and ALLOWED_ORIGINS are required.');
for (const origin of config.vars.ALLOWED_ORIGINS.split(',').map(value=>value.trim())) {
  const url = new URL(origin);
  if (url.protocol !== 'https:' || url.origin !== origin) throw new Error('Production origins must be exact HTTPS origins (no paths or wildcards).');
}
for (const args of [
  ['d1','migrations','apply','DB','--remote','--config',configPath],
  ['deploy','--config',configPath],
]) {
  const result = spawnSync('npx',['wrangler',...args],{stdio:'inherit'});
  if (result.status !== 0) process.exit(result.status || 1);
}
