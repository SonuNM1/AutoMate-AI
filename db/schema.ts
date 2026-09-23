import { boolean, uuid } from "drizzle-orm/gel-core";
import { varchar } from "drizzle-orm/mysql-core";
import {integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  agentCredits: integer('agentCredits').default(3),
  usageCredits: integer('usageCredits').default(100),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tools = pgTable("tools", {
  id: uuid("id").defaultRandom().primaryKey(),

  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 150 }).notNull(),
  description: text("description"),

  category: varchar("category", { length: 100 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  provider: varchar("provider", { length: 100 }).notNull(),

  icon: varchar("icon", { length: 100 }),

  status: varchar("status", { length: 50 }).default("active"),

  requiresAuth: boolean("requires_auth").default(false),

  authType: varchar("auth_type", {length: 50})
});



export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
