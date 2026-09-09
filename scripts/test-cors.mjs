import assert from 'node:assert/strict';
const api = 'http://localhost:8787';
const allowed = 'https://namingisnothard.github.io';
const path = '/api/reviews?place=life%3Aall';
const request = (path, options={}) => fetch(api+path,options);
let response = await request(path,{headers:{Origin:allowed}});
assert.equal(response.status,200);
assert.equal(response.headers.get('access-control-allow-origin'),allowed);
assert.match(response.headers.get('vary'),/Origin/);
assert.equal(response.headers.get('access-control-allow-credentials'),null);
response = await request('/api/reviews',{method:'OPTIONS',headers:{Origin:allowed,'Access-Control-Request-Method':'POST','Access-Control-Request-Headers':'content-type'}});
assert.equal(response.status,204);
assert.equal(response.headers.get('access-control-allow-origin'),allowed);
assert.match(response.headers.get('access-control-allow-methods'),/POST/);
for (const origin of ['https://evil.example','https://namingisnothard.github.io.evil.example','null']) {
  response = await request(path,{headers:{Origin:origin}});
  assert.equal(response.status,403);
  assert.equal(response.headers.get('access-control-allow-origin'),null);
}
for (const headers of [
  {Origin:allowed,'Access-Control-Request-Method':'DELETE'},
  {Origin:allowed,'Access-Control-Request-Method':'POST','Access-Control-Request-Headers':'authorization'},
]) assert.equal((await request('/api/reviews',{method:'OPTIONS',headers})).status,403);
assert.equal((await request('/api/reviews',{method:'POST'})).status,403);
response = await request('/api/reviews?place=invalid',{headers:{Origin:allowed}});
assert.equal(response.status,400); assert.equal(response.headers.get('access-control-allow-origin'),allowed);
response = await request('/api/review-photos/not-found',{headers:{Origin:allowed}});
assert.equal(response.status,404); assert.equal(response.headers.get('access-control-allow-origin'),allowed);
response = await request('/api/review-photos/not-found',{method:'OPTIONS',headers:{Origin:allowed,'Access-Control-Request-Method':'GET'}});
assert.equal(response.status,204);
response = await request('/api/reviews',{method:'DELETE',headers:{Origin:allowed}});
assert.equal(response.status,405); assert.equal(response.headers.get('access-control-allow-origin'),allowed);
console.log('PASS: exact-origin allowlist, denied origins, preflight, methods/headers, missing Origin, CORS on errors and photo responses.');
