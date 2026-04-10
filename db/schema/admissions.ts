import { pgTable, serial, text, timestamp, integer, pgEnum, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const admissionStatusEnum = pgEnum("admission_status", [
  "draft", "submitted", "under_review", "approved", "assigned", "processing", "completed", "rejected"
]);

export const genderEnum = pgEnum("gender", ["male", "female", "other"]);

export const admissionsTable = pgTable("admissions", {
  id: serial("id").primaryKey(),
  studentName: text("student_name").notNull(),
  studentEmail: text("student_email").notNull(),
  studentPhone: text("student_phone").notNull(),
  fatherName: text("father_name"),
  motherName: text("mother_name"),
  dateOfBirth: date("date_of_birth"),
  gender: genderEnum("gender"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  pincode: text("pincode"),
  course: text("course").notNull(),
  qualification: text("qualification"),
  status: admissionStatusEnum("status").notNull().default("draft"),
  admissionNumber: text("admission_number").unique(),
  centreId: integer("centre_id"),
  subCentreId: integer("sub_centre_id"),
  universityId: integer("university_id"),
  studentUserId: integer("student_user_id"),
  sessionId: integer("session_id"),
  remarks: text("remarks"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAdmissionSchema = createInsertSchema(admissionsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertAdmission = z.infer<typeof insertAdmissionSchema>;
export type Admission = typeof admissionsTable.$inferSelect;
