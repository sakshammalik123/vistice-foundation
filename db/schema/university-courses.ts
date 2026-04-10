import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { universitiesTable } from "./universities";

export const universityCoursesTable = pgTable("university_courses", {
  id: serial("id").primaryKey(),
  universityId: integer("university_id").notNull().references(() => universitiesTable.id, { onDelete: "cascade" }),
  courseName: text("course_name").notNull(),
  totalSeats: integer("total_seats").notNull().default(100),
  filledSeats: integer("filled_seats").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUniversityCourseSchema = createInsertSchema(universityCoursesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertUniversityCourse = z.infer<typeof insertUniversityCourseSchema>;
export type UniversityCourse = typeof universityCoursesTable.$inferSelect;
