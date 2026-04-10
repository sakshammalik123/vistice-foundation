import { pgTable, serial, text, timestamp, integer, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const feesMasterTable = pgTable("fees_master", {
  id: serial("id").primaryKey(),
  course: text("course").notNull(),
  universityId: integer("university_id"),
  totalFee: numeric("total_fee", { precision: 12, scale: 2 }).notNull(),
  registrationFee: numeric("registration_fee", { precision: 12, scale: 2 }).notNull().default("0"),
  remainingFee: numeric("remaining_fee", { precision: 12, scale: 2 }).notNull().default("0"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertFeesMasterSchema = createInsertSchema(feesMasterTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertFeesMaster = z.infer<typeof insertFeesMasterSchema>;
export type FeesMaster = typeof feesMasterTable.$inferSelect;
