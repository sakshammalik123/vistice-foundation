import { pgTable, serial, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const aiCampaignsTable = pgTable("ai_campaigns", {
  id: serial("id").primaryKey(),
  centreId: integer("centre_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  scriptId: integer("script_id"),
  language: text("language").notNull().default("hindi"),
  voiceType: text("voice_type").notNull().default("female"),
  status: text("status").notNull().default("draft"),
  totalLeads: integer("total_leads").notNull().default(0),
  calledLeads: integer("called_leads").notNull().default(0),
  answeredLeads: integer("answered_leads").notNull().default(0),
  hotLeads: integer("hot_leads").notNull().default(0),
  callIntervalSeconds: integer("call_interval_seconds").notNull().default(30),
  maxRetries: integer("max_retries").notNull().default(1),
  scheduleType: text("schedule_type").notNull().default("immediate"),
  scheduledAt: timestamp("scheduled_at"),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const aiCampaignLeadsTable = pgTable("ai_campaign_leads", {
  id: serial("id").primaryKey(),
  campaignId: integer("campaign_id").notNull(),
  centreId: integer("centre_id").notNull(),
  leadName: text("lead_name").notNull(),
  leadPhone: text("lead_phone").notNull(),
  leadEmail: text("lead_email"),
  status: text("status").notNull().default("pending"),
  callAttempts: integer("call_attempts").notNull().default(0),
  lastCalledAt: timestamp("last_called_at"),
  callId: integer("call_id"),
  interestLevel: text("interest_level"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAiCampaignSchema = createInsertSchema(aiCampaignsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertAiCampaign = z.infer<typeof insertAiCampaignSchema>;
export type AiCampaign = typeof aiCampaignsTable.$inferSelect;
export type AiCampaignLead = typeof aiCampaignLeadsTable.$inferSelect;
