import { env } from 'cloudflare:workers';
import type { ReviewEnv } from '../../backend/types';

export function reviewStorage() {
  const bindings = env as unknown as ReviewEnv;
  if (!bindings.DB || !bindings.REVIEW_PHOTOS) throw new Error('Review storage is unavailable');
  return bindings;
}
