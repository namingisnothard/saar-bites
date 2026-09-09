import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, index, check } from 'drizzle-orm/sqlite-core';

export const reviews = sqliteTable('reviews', {
  id: text('id').primaryKey(),
  place: text('place').notNull(),
  rating: integer('rating').notNull(),
  author: text('author'),
  comment: text('comment').notNull(),
  photos: text('photos').notNull().default('[]'),
  createdAt: integer('created_at').notNull(),
}, table => [
  index('idx_reviews_place_created').on(table.place, table.createdAt),
  check('reviews_rating_range', sql`${table.rating} between 1 and 5`),
]);

export const suggestions = sqliteTable('suggestions', {
  id:text('id').primaryKey(),
  place:text('place').notNull(),
  location:text('location').notNull().default(''),
  message:text('message').notNull(),
  author:text('author'),
  createdAt:integer('created_at').notNull(),
}, table => [index('idx_suggestions_created').on(table.createdAt)]);
