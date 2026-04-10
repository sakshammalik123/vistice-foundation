import { pgTable, serial, text, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const kycVerificationStatusEnum = pgEnum("kyc_verification_status", ["pending", "verified", "rejected"]);

export const kycVerificationsTable = pgTable("kyc_verifications", {
  id: serial("id").primaryKey(),
  centreId: integer("centre_id").notNull(),
  aadhaarNumber: text("aadhaar_number").notNull(),
  panNumber: text("pan_number").notNull(),
  aadhaarDocUrl: text("aadhaar_doc_url"),
  panDocUrl: text("pan_doc_url"),
  status: kycVerificationStatusEnum("status").notNull().default("pending"),
  remarks: text("remarks"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  reviewedAt: timestamp("reviewed_at"),
});

export const insertKycSchema = createInsertSchema(kycVerificationsTable).omit({ id: true, submittedAt: true });
export type InsertKyc = z.infer<typeof insertKycSchema>;
export type KycVerification = typeof kycVerificationsTable.$inferSelect;
