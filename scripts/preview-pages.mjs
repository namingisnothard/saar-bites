import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('out');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.ico':'image/x-icon','.txt':'text/plain; charset=utf-8'};
createServer(async (request,response) => {
  try {
    const path = decodeURIComponent(new URL(request.url,'http://localhost').pathname);
    if (!['GET','HEAD'].includes(request.method)) {response.writeHead(405).end();return;}
    if (path === '/') {response.writeHead(302,{Location:'/saar-bites/'}).end();return;}
    if (!path.startsWith('/saar-bites/')) {response.writeHead(404).end();return;}
    let file = resolve(root,path.slice('/saar-bites/'.length));
    if (file !== root && !file.startsWith(root+sep)) {response.writeHead(403).end();return;}
    if ((await stat(file)).isDirectory()) file = resolve(file,'index.html');
    const body = await readFile(file);
    response.writeHead(200,{'Content-Type':types[extname(file)] || 'application/octet-stream','Cache-Control':'no-store'});
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {response.writeHead(404).end('Not found');}
}).listen(4173,'localhost',() => console.log('GitHub Pages preview: http://localhost:4173/saar-bites/'));
