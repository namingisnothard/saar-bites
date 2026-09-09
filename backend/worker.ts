import { getReviews, postReview } from './reviews';
import { getPhoto } from './photos';
import type { ReviewEnv } from './types';

function corsResponse(response: Response, origin: string | null, allowed: boolean) {
  const headers = new Headers(response.headers);
  headers.append('Vary', 'Origin');
  if (origin && allowed) headers.set('Access-Control-Allow-Origin', origin);
  headers.set('X-Content-Type-Options', 'nosniff');
  return new Response(response.body, { status:response.status, headers });
}

export async function handleReviewRequest(request: Request, env: ReviewEnv): Promise<Response> {
  const url = new URL(request.url);
  const origin = request.headers.get('Origin');
  const origins = new Set((env.ALLOWED_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean));
  // Same-origin Sites/local requests work without CORS configuration. External
  // frontends must be explicitly allowed; no wildcard or credentialed CORS.
  const allowed = origin !== null && (origin === url.origin || origins.has(origin));
  const respond = (response: Response) => corsResponse(response, origin, allowed);
  if (origin && !allowed) return respond(Response.json({ error:'Origin not allowed' }, {status:403}));
  const photoMatch = /^\/api\/review-photos\/([^/]+)$/.exec(url.pathname);
  const isReviews = url.pathname === '/api/reviews';
  if (!isReviews && !photoMatch) return respond(new Response('Not found', {status:404}));
  const methods = isReviews ? ['GET','POST','OPTIONS'] : ['GET','HEAD','OPTIONS'];
  if (request.method === 'OPTIONS') {
    const requestedMethod = request.headers.get('Access-Control-Request-Method') || '';
    const requestedHeaders = (request.headers.get('Access-Control-Request-Headers') || '').split(',').map(value => value.trim().toLowerCase()).filter(Boolean);
    if (!allowed || !methods.includes(requestedMethod) || requestedMethod === 'OPTIONS' || requestedHeaders.some(header => header !== 'content-type')) return respond(new Response(null, {status:403}));
    return respond(new Response(null, {status:204, headers:{
      'Access-Control-Allow-Methods': methods.join(', '),
      'Access-Control-Allow-Headers':'Content-Type',
      'Access-Control-Max-Age':'600',
    }}));
  }
  if (!methods.includes(request.method)) return respond(new Response('Method not allowed', {status:405, headers:{Allow:methods.join(', ')}}));
  if (request.method === 'POST' && !allowed) return respond(Response.json({error:'Origin required'}, {status:403}));
  try {
    if (!env.DB || !env.REVIEW_PHOTOS) throw new Error('Missing storage bindings');
    if (isReviews) return respond(await (request.method === 'GET' ? getReviews(request,env) : postReview(request,env)));
    const response = await getPhoto(photoMatch![1],env);
    return respond(request.method === 'HEAD' ? new Response(null,{status:response.status,headers:response.headers}) : response);
  } catch (error) {
    console.error('Reviews API failed',error);
    return respond(Response.json({error:'Service temporarily unavailable'}, {status:503}));
  }
}

export default { fetch: handleReviewRequest };
