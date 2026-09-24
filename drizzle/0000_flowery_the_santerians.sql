CREATE TABLE "tools" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(100) NOT NULL,
	"name" varchar(150) NOT NULL,
	"description" text,
	"category" varchar(100) NOT NULL,
	"type" varchar(50) NOT NULL,
	"provider" varchar(100) NOT NULL,
	"icon" varchar,
	"status" varchar(50) DEFAULT 'active',
	"requires_auth" boolean DEFAULT false,
	"auth_type" varchar(50),
	"auth_provider" varchar(100),
	"capabilities" jsonb DEFAULT '[]'::jsonb,
	"use_cases" jsonb DEFAULT '[]'::jsonb,
	"permissions" jsonb DEFAULT '[]'::jsonb,
	"approval_rules" jsonb DEFAULT '{}'::jsonb,
	"config" jsonb,
	"risk_level" varchar(30) DEFAULT 'low',
	"can_read" boolean DEFAULT false,
	"can_write" boolean DEFAULT false,
	"can_delete" boolean DEFAULT false,
	"can_execute" boolean DEFAULT true,
	CONSTRAINT "tools_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"agentCredits" integer DEFAULT 3,
	"usageCredits" integer DEFAULT 100,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
