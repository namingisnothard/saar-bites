import { cp, mkdir, mkdtemp, rm, symlink, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const api = process.env.NEXT_PUBLIC_REVIEW_API_URL;
if (!api) throw new Error('Set NEXT_PUBLIC_REVIEW_API_URL to the deployed reviews API origin before building GitHub Pages.');
const url = new URL(api);
const local = ['localhost','127.0.0.1'].includes(url.hostname);
if ((!local && url.protocol !== 'https:') || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw new Error('NEXT_PUBLIC_REVIEW_API_URL must be an HTTPS origin without a path, credentials, query or fragment.');
if (process.env.GITHUB_ACTIONS && local) throw new Error('GitHub Pages needs a deployed API, not localhost.');

// Build an isolated static frontend. API routes remain available to Sites and
// local development; they never enter the GitHub Pages build or artifact.
await mkdir('.pages-build', {recursive:true});
const stage = await mkdtemp(resolve('.pages-build/frontend-'));
try {
  await cp('app',join(stage,'app'), {recursive:true, filter: source => source !== join('app','api') && source !== join('app','lib','review-storage.ts')});
  await cp('public',join(stage,'public'), {recursive:true});
  for (const file of ['package.json','next.config.ts','tsconfig.json']) await cp(file,join(stage,file));
  await symlink(resolve('node_modules'),join(stage,'node_modules'),'dir');
  const result = spawnSync(process.execPath,[resolve('node_modules/next/dist/bin/next'),'build','--webpack'], {
    cwd:stage, stdio:'inherit', env:{...process.env,DEPLOY_GITHUB_PAGES:'1',NEXT_PUBLIC_BASE_PATH:'/saar-bites',NEXT_PUBLIC_REVIEW_API_URL:url.origin},
  });
  if (result.status !== 0) throw new Error(`Static build failed (${result.status ?? result.error})`);
  // Only replace previous output after a successful build.
  await rm(resolve(root,'out'), {recursive:true,force:true});
  await cp(join(stage,'out'),resolve(root,'out'), {recursive:true});
  await writeFile(resolve(root,'out','.nojekyll'),'');
  console.log(`GitHub Pages frontend ready in out/; API: ${url.origin}`);
} finally {
  await rm(stage,{recursive:true,force:true});
}
