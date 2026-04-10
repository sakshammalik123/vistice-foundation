import { pgTable, serial, text, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const enquiryStatusEnum = pgEnum("enquiry_status", ["new", "contacted", "interested", "converted", "lost"]);
export const enquiryModeEnum = pgEnum("enquiry_mode", ["online", "offline", "distance"]);

export const enquiriesTable = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  course: text("course").notNull(),
  budget: text("budget"),
  mode: enquiryModeEnum("mode").default("online"),
  state: text("state"),
  source: text("source").notNull().default("homepage"),
  status: enquiryStatusEnum("status").notNull().default("new"),
  assignedTo: integer("assigned_to"),
  leadScore: integer("lead_score").default(0),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertEnquirySchema = createInsertSchema(enquiriesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertEnquiry = z.infer<typeof insertEnquirySchema>;
export type Enquiry = typeof enquiriesTable.$inferSelect;
