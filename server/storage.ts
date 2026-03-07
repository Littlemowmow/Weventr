import { type WaitlistEntry, type InsertWaitlistEntry, waitlistEntries, archetypeVotes } from "@shared/schema";
import { db } from "./db";
import { eq, count, sql } from "drizzle-orm";

export interface IStorage {
  createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
  getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined>;
  getWaitlistEntryByPhone(phone: string): Promise<WaitlistEntry | undefined>;
  getWaitlistEntryByReferralCode(code: string): Promise<WaitlistEntry | undefined>;
  getWaitlistCount(): Promise<number>;
  getAllWaitlistEntries(): Promise<WaitlistEntry[]>;
  incrementArchetypeVotes(archetypes: string[]): Promise<void>;
  getArchetypeVotes(): Promise<Record<string, number>>;
}

export class DatabaseStorage implements IStorage {
  async createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    const [result] = await db.insert(waitlistEntries).values(entry).returning();
    return result;
  }

  async getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined> {
    const [result] = await db.select().from(waitlistEntries).where(eq(waitlistEntries.email, email));
    return result;
  }

  async getWaitlistEntryByPhone(phone: string): Promise<WaitlistEntry | undefined> {
    const [result] = await db.select().from(waitlistEntries).where(eq(waitlistEntries.phone, phone));
    return result;
  }

  async getWaitlistEntryByReferralCode(code: string): Promise<WaitlistEntry | undefined> {
    const [result] = await db.select().from(waitlistEntries).where(eq(waitlistEntries.referralCode, code));
    return result;
  }

  async getWaitlistCount(): Promise<number> {
    const [result] = await db.select({ count: count() }).from(waitlistEntries);
    return result.count;
  }

  async getAllWaitlistEntries(): Promise<WaitlistEntry[]> {
    return db.select().from(waitlistEntries).orderBy(waitlistEntries.createdAt);
  }

  async incrementArchetypeVotes(archetypes: string[]): Promise<void> {
    for (const name of archetypes) {
      await db
        .insert(archetypeVotes)
        .values({ archetype: name, count: 1 })
        .onConflictDoUpdate({
          target: archetypeVotes.archetype,
          set: { count: sql`${archetypeVotes.count} + 1` },
        });
    }
  }

  async getArchetypeVotes(): Promise<Record<string, number>> {
    const rows = await db.select().from(archetypeVotes);
    const result: Record<string, number> = {};
    for (const row of rows) {
      result[row.archetype] = row.count;
    }
    return result;
  }
}

export const storage = new DatabaseStorage();
