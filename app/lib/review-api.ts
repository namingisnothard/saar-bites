// Public API origin only. Never put credentials in NEXT_PUBLIC_* variables.
const apiOrigin = (process.env.NEXT_PUBLIC_REVIEW_API_URL || '').replace(/\/+$/, '');
export function reviewApiUrl(path: string): string {
  return `${apiOrigin}${path}`;
}
export function reviewPhotoUrl(id: string): string {
  return reviewApiUrl(`/api/review-photos/${encodeURIComponent(id)}`);
}
