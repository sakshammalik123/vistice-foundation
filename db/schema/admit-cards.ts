import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const admitCardsTable = pgTable("admit_cards", {
  id: serial("id").primaryKey(),
  admissionId: integer("admission_id").notNull(),
  admissionNumber: text("admission_number").notNull(),
  studentName: text("student_name").notNull(),
  course: text("course").notNull(),
  universityName: text("university_name"),
  session: text("session"),
  generatedAt: timestamp("generated_at").defaultNow().notNull(),
});

export const insertAdmitCardSchema = createInsertSchema(admitCardsTable).omit({ id: true, generatedAt: true });
export type InsertAdmitCard = z.infer<typeof insertAdmitCardSchema>;
export type AdmitCard = typeof admitCardsTable.$inferSelect;
