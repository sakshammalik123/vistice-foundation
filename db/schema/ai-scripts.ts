import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const aiScriptsTable = pgTable("ai_scripts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  content: text("content").notNull(),
  language: text("language").notNull().default("hindi"),
  tone: text("tone").notNull().default("formal"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAiScriptSchema = createInsertSchema(aiScriptsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertAiScript = z.infer<typeof insertAiScriptSchema>;
export type AiScript = typeof aiScriptsTable.$inferSelect;
