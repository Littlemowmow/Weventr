import { type WaitlistEntry, type InsertWaitlistEntry, waitlistEntries, archetypeVotes, referralClicks } from "@shared/schema";
import { db } from "./db";
import { eq, count, sql, and } from "drizzle-orm";

export interface IStorage {
  createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
  getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined>;
  getWaitlistEntryByPhone(phone: string): Promise<WaitlistEntry | undefined>;
  getWaitlistEntryByReferralCode(code: string): Promise<WaitlistEntry | undefined>;
  getWaitlistCount(): Promise<number>;
  getAllWaitlistEntries(): Promise<WaitlistEntry[]>;
  getWaitlistPosition(referralCode: string): Promise<{ position: number; totalCount: number; referralSignups: number } | null>;
  incrementArchetypeVotes(archetypes: string[]): Promise<void>;
  getArchetypeVotes(): Promise<Record<string, number>>;
  trackReferralClick(referralCode: string, fingerprint: string): Promise<boolean>;
  getReferralClickCount(referralCode: string): Promise<number>;
  getAllReferralClickCounts(): Promise<Record<string, number>>;
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

  async getWaitlistPosition(referralCode: string): Promise<{ position: number; totalCount: number; referralSignups: number } | null> {
    const entry = await this.getWaitlistEntryByReferralCode(referralCode);
    if (!entry) return null;

    const entries = await db.select().from(waitlistEntries);
    const totalCount = entries.length;

    const signupCounts: Record<string, number> = {};
    for (const e of entries) {
      if (e.referredBy) {
        signupCounts[e.referredBy] = (signupCounts[e.referredBy] || 0) + 1;
      }
    }

    const ranked = entries
      .map((e) => ({
        referralCode: e.referralCode,
        referralSignups: signupCounts[e.referralCode] || 0,
        createdAt: e.createdAt,
      }))
      .sort((a, b) => {
        if (b.referralSignups !== a.referralSignups) return b.referralSignups - a.referralSignups;
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });

    const position = ranked.findIndex((r) => r.referralCode === referralCode) + 1;
    const mySignups = signupCounts[referralCode] || 0;

    return { position, totalCount, referralSignups: mySignups };
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
  async trackReferralClick(referralCode: string, fingerprint: string): Promise<boolean> {
    const [existing] = await db
      .select()
      .from(referralClicks)
      .where(
        and(
          eq(referralClicks.referralCode, referralCode),
          eq(referralClicks.fingerprint, fingerprint)
        )
      );
    if (existing) return false;
    await db.insert(referralClicks).values({ referralCode, fingerprint });
    return true;
  }

  async getReferralClickCount(referralCode: string): Promise<number> {
    const [result] = await db
      .select({ count: count() })
      .from(referralClicks)
      .where(eq(referralClicks.referralCode, referralCode));
    return result.count;
  }

  async getAllReferralClickCounts(): Promise<Record<string, number>> {
    const rows = await db
      .select({
        referralCode: referralClicks.referralCode,
        count: count(),
      })
      .from(referralClicks)
      .groupBy(referralClicks.referralCode);
    const result: Record<string, number> = {};
    for (const row of rows) {
      result[row.referralCode] = row.count;
    }
    return result;
  }
}

export const storage = new DatabaseStorage();
