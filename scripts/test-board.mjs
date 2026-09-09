import assert from 'node:assert/strict';
import {getPlatformProxy} from 'wrangler';
import {resolve} from 'node:path';
import {compareCommunity} from '../app/lib/community-sort.ts';
const scores={A:{average:5,count:1},B:{average:4,count:3},C:{average:5,count:2}};
assert.deepEqual(['None','B','A','C'].sort((a,b)=>compareCommunity(a,b,scores,'site-rating')),['C','A','B','None']);
assert.deepEqual(['None','A','B','C'].sort((a,b)=>compareCommunity(a,b,scores,'site-reviews')),['B','C','A','None']);
const base='http://localhost:8787',origin='https://namingisnothard.github.io';
const ids=[];const prefix=`TEST-${Date.now()}`;
const post=(body,site=origin)=>fetch(`${base}/api/suggestions`,{method:'POST',headers:{Origin:site,'Content-Type':'application/json'},body:JSON.stringify(body)});
try {
  assert.equal((await post({place:' ',message:'x'})).status,400);
  assert.equal((await post({place:'x',message:'x',author:' '})).status,400);
  assert.equal((await post({place:'x',message:'a'.repeat(2001)})).status,400);
  assert.equal((await post({place:'x',message:'a'.repeat(17000)})).status,400);
  assert.equal((await post({place:'x',message:'x'},'https://example.com')).status,403);
  assert.equal((await fetch(`${base}/api/suggestions?offset=-1`)).status,400);
  const preflight=await fetch(`${base}/api/suggestions`,{method:'OPTIONS',headers:{Origin:origin,'Access-Control-Request-Method':'POST','Access-Control-Request-Headers':'content-type'}});assert.equal(preflight.status,204);
  for(const author of [null,'Test person']) {const response=await post({place:'Test recommendation',location:'Saarbrücken',message:prefix,author});assert.equal(response.status,201,await response.clone().text());ids.push((await response.json()).id);}
  const response=await fetch(`${base}/api/suggestions`,{headers:{Origin:origin}});assert.equal(response.headers.get('access-control-allow-origin'),origin);
  const data=await response.json();const found=data.messages.filter(item=>ids.includes(item.id));assert.equal(found.length,2);assert.ok(found.some(item=>item.author===null));assert.ok(found.some(item=>item.author==='Test person'));assert.equal(found[0].message,prefix);
  const page=await(await fetch(`${base}/api/suggestions?offset=1`)).json();assert.equal(page.messages[0].id,data.messages[1].id);
  console.log('PASS: community sorting, suggestion validation, body cap, CORS, anonymous/named posts, persistence and pagination.');
} finally {
  const runtime=await getPlatformProxy({configPath:'scripts/wrangler.local.json',persist:{path:resolve('.wrangler/state/v3')}});
  try {for(const id of ids) await runtime.env.DB.prepare('DELETE FROM suggestions WHERE id = ? AND message = ?').bind(id,prefix).run();}finally{await runtime.dispose();}
}
