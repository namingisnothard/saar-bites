import type { ReviewEnv } from './types';
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export async function getSuggestions(request:Request,env:ReviewEnv) {
  const offset=Number(new URL(request.url).searchParams.get('offset') || 0);
  if(!Number.isSafeInteger(offset)||offset<0) return json({error:'Invalid offset'},400);
  const [list,count]=await env.DB.batch([
    env.DB.prepare('SELECT id, place, location, message, author, created_at FROM suggestions ORDER BY created_at DESC, id DESC LIMIT 20 OFFSET ?').bind(offset),
    env.DB.prepare('SELECT COUNT(*) AS count FROM suggestions'),
  ]);
  return json({messages:list.results,count:(count.results[0] as {count:number}).count});
}
async function readBody(request:Request) {
  const reader=request.body?.getReader(); if(!reader) throw new Error('Empty');
  let size=0; const chunks:Uint8Array[]=[];
  while(true) { const {done,value}=await reader.read(); if(done) break; size+=value.byteLength; if(size>16384) {await reader.cancel();throw new Error('Large');} chunks.push(value); }
  const bytes=new Uint8Array(size); let offset=0; for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  return JSON.parse(new TextDecoder().decode(bytes)) as unknown;
}
export async function postSuggestion(request:Request,env:ReviewEnv) {
  if(!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return json({error:'Use JSON'},415);
  let body:unknown; try {body=await readBody(request);} catch {return json({error:'Invalid or oversized message'},400);}
  if(!body || typeof body!=='object') return json({error:'Invalid message'},400);
  const {place,location='',message,author=null}=body as Record<string,unknown>;
  if(typeof place!=='string'||!place.trim()||place.trim().length>100||typeof location!=='string'||location.trim().length>200||typeof message!=='string'||!message.trim()||message.trim().length>2000||author!==null&&(typeof author!=='string'||!author.trim()||author.trim().length>40)) return json({error:'Invalid message fields'},400);
  const id=crypto.randomUUID();
  await env.DB.prepare('INSERT INTO suggestions (id,place,location,message,author,created_at) VALUES (?,?,?,?,?,?)').bind(id,place.trim(),location.trim(),message.trim(),typeof author==='string'?author.trim():null,Date.now()).run();
  return json({id},201);
}
