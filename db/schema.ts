import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  agentCredits: integer("agentCredits").default(3),
  usageCredits: integer("usageCredits").default(100),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tools = pgTable("tools", {
  id: uuid("id").defaultRandom().primaryKey(),

  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),

  category: text("category").notNull(),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  icon: text("icon"),

  status: text("status").default("active"),

  requiresAuth: boolean("requires_auth").default(false),
  authType: text("auth_type"),
  authProvider: text("auth_provider"),

  capabilities: jsonb("capabilities").$type<string[]>().default([]),

  useCases: jsonb("use_cases").$type<string[]>().default([]),

  permissions: jsonb("permissions").$type<string[]>().default([]),

  approvalRules: jsonb("approval_rules")
    .$type<Record<string, boolean>>()
    .default({}),

  config: jsonb("config").$type<Record<string, any>>(),

  riskLevel: text("risk_level").default("low"),

  canRead: boolean("can_read").default(false),
  canWrite: boolean("can_write").default(false),
  canDelete: boolean("can_delete").default(false),
  canExecute: boolean("can_execute").default(true),
});

export const AgentConfig = pgTable("agentConfig", {
  id: serial("id").primaryKey(),
  userEmail: text("email").references(() => users.email),
  agentId: varchar("agentId").notNull().unique(),
  name: varchar("name"),
  agentImage: varchar("agentImage"),
  description: text("description"),
  instructions: text("instructions"),
  objective: text("objective"),
  tools: jsonb("tools"),
  skills: jsonb("skills"),
  schedule: jsonb("schedule"),
  outputFormat: text("outputFormat"),
  status: varchar("status").default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
