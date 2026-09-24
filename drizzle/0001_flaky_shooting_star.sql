ALTER TABLE "tools" ALTER COLUMN "slug" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tools" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tools" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tools" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tools" ALTER COLUMN "provider" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tools" ALTER COLUMN "icon" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tools" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tools" ALTER COLUMN "status" SET DEFAULT 'active';--> statement-breakpoint
ALTER TABLE "tools" ALTER COLUMN "auth_type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tools" ALTER COLUMN "auth_provider" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tools" ALTER COLUMN "risk_level" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "tools" ALTER COLUMN "risk_level" SET DEFAULT 'low';