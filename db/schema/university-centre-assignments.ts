import { pgTable, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const universityCentreAssignmentsTable = pgTable("university_centre_assignments", {
  id: serial("id").primaryKey(),
  centreId: integer("centre_id").notNull(),
  universityId: integer("university_id").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUniversityCentreAssignmentSchema = createInsertSchema(universityCentreAssignmentsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertUniversityCentreAssignment = z.infer<typeof insertUniversityCentreAssignmentSchema>;
export type UniversityCentreAssignment = typeof universityCentreAssignmentsTable.$inferSelect;
