import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const waitlistEntries = pgTable("waitlist_entries", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  destination: text("destination"),
  travelDate: text("travel_date"),
  travelType: text("travel_type").notNull().default("group"),
  university: text("university"),
  referralCode: text("referral_code").notNull(),
  referredBy: text("referred_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertWaitlistSchema = createInsertSchema(waitlistEntries).omit({
  id: true,
  createdAt: true,
});

export const waitlistRequestSchema = insertWaitlistSchema.omit({
  referralCode: true,
});

export type InsertWaitlistEntry = z.infer<typeof insertWaitlistSchema>;
export type WaitlistRequest = z.infer<typeof waitlistRequestSchema>;
export type WaitlistEntry = typeof waitlistEntries.$inferSelect;
