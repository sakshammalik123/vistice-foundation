import { pgTable, serial, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const aiIntegrationsTable = pgTable("ai_integrations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  provider: text("provider").notNull().default("mock"),
  accountSid: text("account_sid"),
  authToken: text("auth_token"),
  apiKey: text("api_key"),
  apiSecret: text("api_secret"),
  phoneNumber: text("phone_number"),
  region: text("region"),
  isActive: boolean("is_active").notNull().default(false),
  isDefault: boolean("is_default").notNull().default(false),
  ttsProvider: text("tts_provider").notNull().default("google"),
  ttsApiKey: text("tts_api_key"),
  ttsRegion: text("tts_region"),
  webhookUrl: text("webhook_url"),
  webhookSecret: text("webhook_secret"),
  callbackUrl: text("callback_url"),
  testStatus: text("test_status").notNull().default("not_tested"),
  testMessage: text("test_message"),
  testedAt: timestamp("tested_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const aiBlacklistTable = pgTable("ai_blacklist", {
  id: serial("id").primaryKey(),
  phone: text("phone").notNull(),
  reason: text("reason"),
  centreId: integer("centre_id"),
  addedBy: integer("added_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAiIntegrationSchema = createInsertSchema(aiIntegrationsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertAiIntegration = z.infer<typeof insertAiIntegrationSchema>;
export type AiIntegration = typeof aiIntegrationsTable.$inferSelect;
export type AiBlacklist = typeof aiBlacklistTable.$inferSelect;
