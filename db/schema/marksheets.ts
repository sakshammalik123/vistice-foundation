import { pgTable, serial, text, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const marksheetStatusEnum = pgEnum("marksheet_status", ["pending", "approved", "rejected"]);

export const marksheetsTable = pgTable("marksheets", {
  id: serial("id").primaryKey(),
  admissionId: integer("admission_id").notNull(),
  universityId: integer("university_id").notNull(),
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  version: integer("version").notNull().default(1),
  status: marksheetStatusEnum("status").notNull().default("pending"),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
  approvedAt: timestamp("approved_at"),
});

export const insertMarksheetSchema = createInsertSchema(marksheetsTable).omit({ id: true, uploadedAt: true });
export type InsertMarksheet = z.infer<typeof insertMarksheetSchema>;
export type Marksheet = typeof marksheetsTable.$inferSelect;
