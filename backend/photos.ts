import type { ReviewEnv } from './types';
export async function getPhoto(id: string, env: ReviewEnv) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}-[0-2]$/.test(id)) return new Response('Not found', { status: 404 });
  try {
    const { DB, REVIEW_PHOTOS } = env;
    const review = await DB.prepare('SELECT id FROM reviews WHERE id = ?').bind(id.slice(0,36)).first();
    if (!review) return new Response('Not found', { status: 404 });
    const object = await REVIEW_PHOTOS.get(id);
    if (!object) return new Response('Not found', { status: 404 });
    return new Response(object.body, { headers: { 'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'private, max-age=3600' } });
  } catch { return new Response('Photos unavailable', { status: 503 }); }
}
