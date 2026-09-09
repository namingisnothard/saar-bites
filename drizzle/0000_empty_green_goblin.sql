CREATE TABLE `reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`place` text NOT NULL,
	`rating` integer NOT NULL,
	`author` text,
	`comment` text NOT NULL,
	`photos` text DEFAULT '[]' NOT NULL,
	`created_at` integer NOT NULL,
	CONSTRAINT "reviews_rating_range" CHECK("reviews"."rating" between 1 and 5)
);
--> statement-breakpoint
CREATE INDEX `idx_reviews_place_created` ON `reviews` (`place`,`created_at`);