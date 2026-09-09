export type ReviewEnv = {
  DB: D1Database;
  REVIEW_PHOTOS: R2Bucket;
  ALLOWED_ORIGINS?: string;
};
