import { pgTable, serial, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const universitiesTable = pgTable("universities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  shortCode: text("short_code").notNull().unique(),
  email: text("email").notNull(),
  phone: text("phone"),
  address: text("address"),
  state: text("state"),
  totalSeats: integer("total_seats").notNull().default(1000),
  availableSeats: integer("available_seats").notNull().default(1000),
  isActive: boolean("is_active").notNull().default(true),
  paymentStatus: text("payment_status").notNull().default("paid"),
  paymentRef: text("payment_ref"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUniversitySchema = createInsertSchema(universitiesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertUniversity = z.infer<typeof insertUniversitySchema>;
export type University = typeof universitiesTable.$inferSelect;
