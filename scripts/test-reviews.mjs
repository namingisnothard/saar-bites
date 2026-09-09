import assert from 'node:assert/strict';
const base = process.env.REVIEW_TEST_URL || 'http://localhost:3001';
assert.ok(['localhost','127.0.0.1'].includes(new URL(base).hostname), 'Integration tests only run locally');
const restaurant = 'Pizza Gotti';
const store = 'life:dm-bahnhofstrasse';
const prefix = `TEST-${Date.now()}`;
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aJRkAAAAASUVORK5CYII=', 'base64');
const ids = [];
async function post(place, rating, comment, author, photos = [], origin=process.env.REVIEW_TEST_ORIGIN || base) {
  const data = new FormData(); data.set('place', place); data.set('rating', String(rating)); data.set('comment', comment);
  if (author) data.set('author',author);
  for (const photo of photos) data.append('photos',photo,'test.png');
  return fetch(`${base}/api/reviews`, {method:'POST', headers:{Origin:origin},body:data});
}
async function list(place) { const response=await fetch(`${base}/api/reviews?place=${encodeURIComponent(place)}`); assert.equal(response.status,200,await response.clone().text());return response.json(); }
try {
  if (!process.env.REVIEW_TEST_ORIGIN) assert.equal((await fetch(`${base}/life`)).status,200);
  assert.equal((await post(restaurant,6,prefix)).status,400);
  assert.equal((await post('unknown',4,prefix)).status,400);
  assert.equal((await post(restaurant,4,' ')).status,400);
  assert.equal((await post(restaurant,4,prefix,undefined,[],'https://example.com')).status,403);
  assert.equal((await post(restaurant,4,prefix,undefined,[new Blob(['not-an-image'],{type:'image/png'})])).status,400);
  assert.equal((await post(restaurant,4,prefix,undefined,Array(4).fill(new Blob([png],{type:'image/png'})))).status,400);
  assert.equal((await post(restaurant,4,prefix,undefined,[new Blob([new Uint8Array(5*1024*1024+1)],{type:'image/png'})])).status,400);
  const first = await post(restaurant,4,`${prefix} anonymous`);
  assert.equal(first.status,201,await first.clone().text());
  if (process.env.REVIEW_TEST_ORIGIN) assert.equal(first.headers.get('access-control-allow-origin'), process.env.REVIEW_TEST_ORIGIN); ids.push((await first.json()).id);
  const second = await post(store,5,`${prefix} shopping`, 'Test author',[new Blob([png],{type:'image/png'})]);
  assert.equal(second.status,201,await second.clone().text()); ids.push((await second.json()).id);
  const restaurantReviews = await list(restaurant);
  const anon = restaurantReviews.reviews.find(item=>item.id===ids[0]);
  assert.equal(anon.author,null); assert.equal(anon.rating,4);
  assert.ok(!restaurantReviews.reviews.some(item=>item.id===ids[1]));
  const shopReviews = await list(store);
  const signed = shopReviews.reviews.find(item=>item.id===ids[1]);
  assert.equal(signed.author,'Test author'); assert.equal(signed.photos.length,1);
  const photo = await fetch(`${base}/api/review-photos/${signed.photos[0]}`);
  assert.equal(photo.status,200); assert.equal(photo.headers.get('content-type'),'image/png');
  assert.deepEqual(Buffer.from(await photo.arrayBuffer()),png);
  const feed = await list('life:all'); assert.ok(feed.reviews.some(item=>item.id===ids[1])); assert.ok(!feed.reviews.some(item=>item.id===ids[0]));
  const repeat = await list(store); assert.ok(repeat.reviews.some(item=>item.id===ids[1]));
  assert.equal((await fetch(`${base}/api/review-photos/not-valid`)).status,404);
  console.log('PASS: validation, anonymous and signed posts, photo bytes, restaurant/shop isolation, life feed, repeated reads.');
} finally {
  // Tests run locally only; record exact created IDs for cleanup by the local DB utility.
  const {writeFile} = await import('node:fs/promises');
  await writeFile('.wrangler/review-test-ids.json',JSON.stringify(ids));
  console.log('Local test review IDs:', ids.join(', '));
}
