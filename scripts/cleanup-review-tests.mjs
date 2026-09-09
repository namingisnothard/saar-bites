import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { getPlatformProxy } from 'wrangler';
const ids = JSON.parse(await readFile('.wrangler/review-test-ids.json','utf8'));
if (!ids.length) process.exit(0);
if (!ids.every(id=>/^[0-9a-f-]{36}$/.test(id))) throw new Error('Invalid test IDs');
const runtime = await getPlatformProxy({configPath:'scripts/wrangler.local.json',persist:{path:resolve('.wrangler/state/v3')}});
try {
  for (const id of ids) {
    const row = await runtime.env.DB.prepare('SELECT comment, photos FROM reviews WHERE id = ?').bind(id).first();
    if (!row) continue;
    if (!row.comment.startsWith('TEST-')) throw new Error('Refusing to remove a non-test review');
    const photos = JSON.parse(row.photos);
    if (photos.length) await runtime.env.REVIEW_PHOTOS.delete(photos);
    await runtime.env.DB.prepare('DELETE FROM reviews WHERE id = ?').bind(id).run();
  }
  await writeFile('.wrangler/review-test-ids.json','[]');
  console.log('Removed local integration-test reviews and photos.');
} finally { await runtime.dispose(); }
