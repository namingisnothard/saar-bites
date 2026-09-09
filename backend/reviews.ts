import { places } from '../app/data';
import { lifePlaces, lifePlaceKey } from '../app/life-data';
import type { ReviewEnv } from './types';

const validPlaces = new Set([...places.map(place => place.name), ...lifePlaces.map(lifePlaceKey)]);
const MAX_BODY = 16 * 1024 * 1024;
type ReviewRow = { id:string; place:string; rating:number; author:string|null; comment:string; photos:string; created_at:number };
const json = (data: unknown, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });

export async function getReviews(request: Request, env: ReviewEnv) {
  const url = new URL(request.url);
  const place = url.searchParams.get('place');
  if (!place || (place !== 'life:all' && place !== 'restaurants:all' && !validPlaces.has(place))) return json({ error: 'Invalid restaurant' }, 400);
  const offset = Number(url.searchParams.get('offset') || 0);
  if (!Number.isSafeInteger(offset) || offset < 0) return json({ error: 'Invalid offset' }, 400);
  try {
    const { DB } = env;
    const allFinds = place === 'life:all';
    const condition = place === 'restaurants:all' ? "place NOT LIKE ?" : allFinds ? "place LIKE ?" : 'place = ?';
    const key = allFinds || place === 'restaurants:all' ? 'life:%' : place;
    const [list, summary] = await DB.batch([
      DB.prepare(`SELECT id, place, rating, author, comment, photos, created_at FROM reviews WHERE ${condition} ORDER BY created_at DESC, id DESC LIMIT 20 OFFSET ?`).bind(key, offset),
      DB.prepare(`SELECT COUNT(*) AS count, AVG(rating) AS average FROM reviews WHERE ${condition}`).bind(key),
    ]);
    return json({ reviews: (list.results as ReviewRow[]).map(row => ({ ...row, photos: JSON.parse(row.photos) })), ...(summary.results[0] as {count:number; average:number|null}) });
  } catch (error) {
    console.error('Review read failed', error);
    return json({ error: 'Reviews are temporarily unavailable' }, 503);
  }
}

async function limitedForm(request: Request) {
  if (Number(request.headers.get('content-length')) > MAX_BODY) throw new Error('too-large');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('invalid');
  const chunks: ArrayBuffer[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY) { await reader.cancel(); throw new Error('too-large'); }
    chunks.push(new Uint8Array(value).buffer);
  }
  return new Response(new Blob(chunks), { headers: { 'Content-Type': request.headers.get('content-type') || '' } }).formData();
}

export async function postReview(request: Request, env: ReviewEnv) {
  let form: FormData;
  try { form = await limitedForm(request); }
  catch (error) { return json({ error: error instanceof Error && error.message === 'too-large' ? 'Photos are too large' : 'Invalid form' }, 400); }
  const place = form.get('place');
  const rating = Number(form.get('rating'));
  const comment = form.get('comment');
  const author = form.get('author');
  if (typeof place !== 'string' || !validPlaces.has(place) || !Number.isInteger(rating) || rating < 1 || rating > 5 || typeof comment !== 'string' || !comment.trim() || comment.trim().length > 2000 || (author !== null && (typeof author !== 'string' || author.trim().length > 40))) return json({ error: 'Invalid review' }, 400);
  const files = form.getAll('photos');
  if (files.length > 3) return json({ error: 'Maximum 3 photos' }, 400);
  const images: { bytes: ArrayBuffer; type: string }[] = [];
  for (const file of files) {
    if (typeof file === 'string' || file.size === 0 || file.size > 5 * 1024 * 1024) return json({ error: 'Invalid photo size' }, 400);
    const bytes = await file.arrayBuffer();
    const b = new Uint8Array(bytes);
    const jpeg = b[0] === 255 && b[1] === 216 && b[2] === 255;
    const png = [137,80,78,71,13,10,26,10].every((v,i) => b[i] === v);
    const webp = b.length > 12 && String.fromCharCode(...b.slice(0,4)) === 'RIFF' && String.fromCharCode(...b.slice(8,12)) === 'WEBP';
    const type = jpeg ? 'image/jpeg' : png ? 'image/png' : webp ? 'image/webp' : '';
    if (!type || file.type !== type) return json({ error: 'Use JPEG, PNG or WebP photos' }, 400);
    images.push({ bytes, type });
  }
  const id = crypto.randomUUID();
  const photoIds = images.map((_, index) => `${id}-${index}`);
  try {
    const { DB, REVIEW_PHOTOS } = env;
    try {
      for (let i = 0; i < images.length; i++) await REVIEW_PHOTOS.put(photoIds[i], images[i].bytes, { httpMetadata: { contentType: images[i].type } });
      await DB.prepare('INSERT INTO reviews (id, place, rating, author, comment, photos, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)').bind(id, place, rating, typeof author === 'string' ? author.trim() || null : null, comment.trim(), JSON.stringify(photoIds), Date.now()).run();
    } catch (error) {
      await REVIEW_PHOTOS.delete(photoIds);
      throw error;
    }
    return json({ id }, 201);
  } catch (error) {
    console.error('Review submission failed', error);
    return json({ error: 'Could not save review. Please try again.' }, 503);
  }
}
