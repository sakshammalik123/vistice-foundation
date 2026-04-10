import { pgTable, serial, text, timestamp, integer, numeric, boolean, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const feeStatusEnum = pgEnum("fee_status", ["unpaid", "partial", "paid", "overdue"]);

export const studentFeesTable = pgTable("student_fees", {
  id: serial("id").primaryKey(),
  admissionId: integer("admission_id").notNull().unique(),
  feesMasterId: integer("fees_master_id"),
  totalFee: numeric("total_fee", { precision: 12, scale: 2 }).notNull(),
  registrationFee: numeric("registration_fee", { precision: 12, scale: 2 }).notNull().default("0"),
  paidAmount: numeric("paid_amount", { precision: 12, scale: 2 }).notNull().default("0"),
  pendingAmount: numeric("pending_amount", { precision: 12, scale: 2 }).notNull(),
  status: feeStatusEnum("status").notNull().default("unpaid"),
  installmentsEnabled: boolean("installments_enabled").notNull().default(false),
  totalInstallments: integer("total_installments").default(1),
  paidInstallments: integer("paid_installments").notNull().default(0),
  dueDate: timestamp("due_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertStudentFeesSchema = createInsertSchema(studentFeesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertStudentFees = z.infer<typeof insertStudentFeesSchema>;
export type StudentFees = typeof studentFeesTable.$inferSelect;
