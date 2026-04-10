import { pgTable, serial, text, timestamp, integer, boolean, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const aiCallsTable = pgTable("ai_calls", {
  id: serial("id").primaryKey(),
  centreId: integer("centre_id").notNull(),
  leadName: text("lead_name").notNull(),
  leadPhone: text("lead_phone").notNull(),
  leadEmail: text("lead_email"),
  scriptId: integer("script_id"),
  language: text("language").notNull().default("hindi"),
  voiceType: text("voice_type").notNull().default("female"),
  status: text("status").notNull().default("initiated"),
  duration: integer("duration").default(0),
  cost: numeric("cost", { precision: 10, scale: 2 }).default("0"),
  interestLevel: text("interest_level"),
  nextAction: text("next_action"),
  campaignId: integer("campaign_id"),
  isScheduled: boolean("is_scheduled").notNull().default(false),
  scheduledAt: timestamp("scheduled_at"),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const aiCallLogsTable = pgTable("ai_call_logs", {
  id: serial("id").primaryKey(),
  callId: integer("call_id").notNull(),
  transcript: text("transcript"),
  recordingUrl: text("recording_url"),
  summary: text("summary"),
  sentiment: text("sentiment"),
  keyPoints: text("key_points"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const centreAiCreditsTable = pgTable("centre_ai_credits", {
  id: serial("id").primaryKey(),
  centreId: integer("centre_id").notNull().unique(),
  balanceRupees: numeric("balance_rupees", { precision: 12, scale: 2 }).notNull().default("0"),
  totalUsedMinutes: numeric("total_used_minutes", { precision: 12, scale: 2 }).notNull().default("0"),
  totalSpent: numeric("total_spent", { precision: 12, scale: 2 }).notNull().default("0"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const aiCallSettingsTable = pgTable("ai_call_settings", {
  id: serial("id").primaryKey(),
  isEnabled: boolean("is_enabled").notNull().default(true),
  ratePerMinute: numeric("rate_per_minute", { precision: 8, scale: 2 }).notNull().default("15"),
  maxCallsPerDayPerCentre: integer("max_calls_per_day_per_centre").notNull().default(50),
  maxCallDurationMinutes: integer("max_call_duration_minutes").notNull().default(30),
  minBalanceRequired: numeric("min_balance_required", { precision: 8, scale: 2 }).notNull().default("50"),
  plan999Minutes: integer("plan_999_minutes").notNull().default(80),
  plan1999Minutes: integer("plan_1999_minutes").notNull().default(180),
  plan4999Minutes: integer("plan_4999_minutes").notNull().default(550),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAiCallSchema = createInsertSchema(aiCallsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertAiCall = z.infer<typeof insertAiCallSchema>;
export type AiCall = typeof aiCallsTable.$inferSelect;
