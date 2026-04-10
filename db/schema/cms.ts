import { pgTable, serial, varchar, text, boolean, integer, timestamp, json } from "drizzle-orm/pg-core";

export const settingsTable = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});

export const homepageSectionsTable = pgTable("homepage_sections", {
  id: serial("id").primaryKey(),
  sectionName: varchar("section_name", { length: 100 }).notNull().unique(),
  status: boolean("status").notNull().default(true),
  content: json("content").$type<Record<string, unknown>>(),
  order: integer("order").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});

export const pricingSettingsTable = pgTable("pricing_settings", {
  id: serial("id").primaryKey(),
  role: varchar("role", { length: 50 }).notNull().unique(),
  price: integer("price").notNull(),
  originalPrice: integer("original_price"),
  isFree: boolean("is_free").notNull().default(false),
  discountLabel: varchar("discount_label", { length: 100 }),
  features: json("features").$type<string[]>(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});
