CREATE TABLE `suggestions` (
	`id` text PRIMARY KEY NOT NULL,
	`place` text NOT NULL,
	`location` text DEFAULT '' NOT NULL,
	`message` text NOT NULL,
	`author` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_suggestions_created` ON `suggestions` (`created_at`);