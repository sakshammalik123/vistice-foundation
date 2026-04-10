import { pgTable, serial, text, timestamp, boolean, numeric, pgEnum, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const kycStatusEnum = pgEnum("kyc_status", ["pending", "verified", "rejected"]);

export const centresTable = pgTable("centres", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ownerName: text("owner_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  pincode: text("pincode"),
  kycStatus: kycStatusEnum("kyc_status").notNull().default("pending"),
  kycRemarks: text("kyc_remarks"),
  isActive: boolean("is_active").notNull().default(true),
  totalAdmissions: numeric("total_admissions", { precision: 10, scale: 0 }).notNull().default("0"),
  totalEarnings: numeric("total_earnings", { precision: 12, scale: 2 }).notNull().default("0"),
  verifiedBadge: boolean("verified_badge").notNull().default(false),
  parentId: integer("parent_id"),
  commissionPercent: numeric("commission_percent", { precision: 5, scale: 2 }).default("0"),
  plan: text("plan").notNull().default("centre"),
  paymentStatus: text("payment_status").notNull().default("paid"),
  paymentRef: text("payment_ref"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCentreSchema = createInsertSchema(centresTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertCentre = z.infer<typeof insertCentreSchema>;
export type Centre = typeof centresTable.$inferSelect;
