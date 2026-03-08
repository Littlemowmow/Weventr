import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { waitlistRequestSchema } from "@shared/schema";
import { randomBytes, timingSafeEqual } from "crypto";
import { sendWaitlistConfirmationEmail } from "./email";
import rateLimit from "express-rate-limit";

function sanitize(val: string | null | undefined): string | null {
  if (val == null) return null;
  return val
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim();
}

function isAlphanumeric(val: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(val);
}

function isHex(val: string): boolean {
  return /^[a-fA-F0-9]+$/.test(val);
}

const waitlistLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

const voteLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: "Too many requests" },
  standardHeaders: true,
  legacyHeaders: false,
});

const readLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: "Too many requests" },
  standardHeaders: true,
  legacyHeaders: false,
});

const clickLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: "Too many requests" },
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.use("/api/", generalLimiter);

  app.post("/api/waitlist", waitlistLimiter, async (req, res) => {
    try {
      const parsed = waitlistRequestSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid input" });
      }

      parsed.data.email = parsed.data.email.toLowerCase().trim();
      parsed.data.feedback = sanitize(parsed.data.feedback) || null;
      parsed.data.travelDate = sanitize(parsed.data.travelDate) || null;
      parsed.data.travelType = sanitize(parsed.data.travelType) || "group";

      const existingEmail = await storage.getWaitlistEntryByEmail(parsed.data.email);
      if (existingEmail) {
        const posData = await storage.getWaitlistPosition(existingEmail.referralCode);
        return res.status(409).json({ error: "already_registered", referralCode: existingEmail.referralCode, position: posData?.position, totalCount: posData?.totalCount, referralSignups: posData?.referralSignups });
      }

      if (parsed.data.phone) {
        const normalizedPhone = parsed.data.phone.replace(/\D/g, "");
        if (normalizedPhone.length >= 7) {
          const existingPhone = await storage.getWaitlistEntryByPhone(normalizedPhone);
          if (existingPhone) {
            const posData = await storage.getWaitlistPosition(existingPhone.referralCode);
            return res.status(409).json({ error: "already_registered", referralCode: existingPhone.referralCode, position: posData?.position, totalCount: posData?.totalCount, referralSignups: posData?.referralSignups });
          }
          parsed.data.phone = normalizedPhone;
        }
      }

      if (parsed.data.referredBy) {
        if (!isHex(parsed.data.referredBy)) {
          parsed.data.referredBy = null;
        } else {
          const referrer = await storage.getWaitlistEntryByReferralCode(parsed.data.referredBy);
          if (!referrer) {
            parsed.data.referredBy = null;
          }
        }
      }

      const referralCode = randomBytes(4).toString("hex");
      const entry = await storage.createWaitlistEntry({
        ...parsed.data,
        referralCode,
      });

      sendWaitlistConfirmationEmail({
        email: entry.email,
        referralCode: entry.referralCode,
      }).catch(err => {
        console.error("Background email send failed:", err);
      });

      const positionData = await storage.getWaitlistPosition(entry.referralCode);
      res.status(201).json({ referralCode: entry.referralCode, position: positionData?.position, totalCount: positionData?.totalCount });
    } catch (error) {
      console.error("Waitlist error:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  app.get("/api/waitlist/export", async (req, res) => {
    try {
      const key = req.headers.authorization?.replace("Bearer ", "");
      const secret = process.env.SESSION_SECRET;
      if (!secret || !key || !timingSafeEqual(Buffer.from(key), Buffer.from(secret))) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const [entries, clickCounts] = await Promise.all([
        storage.getAllWaitlistEntries(),
        storage.getAllReferralClickCounts(),
      ]);

      const signupCounts: Record<string, number> = {};
      for (const e of entries) {
        if (e.referredBy) {
          signupCounts[e.referredBy] = (signupCounts[e.referredBy] || 0) + 1;
        }
      }

      const escape = (val: string | null | undefined) => {
        if (val == null) return "";
        const str = String(val);
        if (str.includes(",") || str.includes('"') || str.includes("\n")) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };

      const ranked = entries
        .map((e) => ({
          ...e,
          referralSignups: signupCounts[e.referralCode] || 0,
        }))
        .sort((a, b) => {
          if (b.referralSignups !== a.referralSignups) return b.referralSignups - a.referralSignups;
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });

      const headers = ["Position", "ID", "Email", "Phone", "Feedback", "Travel Date", "Travel Type", "Referral Code", "Referred By", "Referral Clicks", "Referral Signups", "Signed Up"];
      const rows = ranked.map((e, idx) => [
        idx + 1,
        e.id,
        escape(e.email),
        escape(e.phone),
        escape(e.feedback),
        escape(e.travelDate),
        escape(e.travelType),
        escape(e.referralCode),
        escape(e.referredBy),
        clickCounts[e.referralCode] || 0,
        e.referralSignups,
        e.createdAt ? new Date(e.createdAt).toISOString() : "",
      ].join(","));

      const csv = [headers.join(","), ...rows].join("\n");

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=weventr-waitlist.csv");
      res.send(csv);
    } catch (error) {
      console.error("Export error:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  app.post("/api/referral/click", clickLimiter, async (req, res) => {
    try {
      const { referralCode, fingerprint } = req.body;
      if (!referralCode || typeof referralCode !== "string" || referralCode.length > 20 || !isHex(referralCode)) {
        return res.status(400).json({ error: "Invalid referral code" });
      }
      if (!fingerprint || typeof fingerprint !== "string" || fingerprint.length > 128 || !isHex(fingerprint)) {
        return res.status(400).json({ error: "Invalid fingerprint" });
      }

      const referrer = await storage.getWaitlistEntryByReferralCode(referralCode);
      if (!referrer) {
        return res.status(404).json({ error: "Referral code not found" });
      }

      const isNew = await storage.trackReferralClick(referralCode, fingerprint);
      const clickCount = await storage.getReferralClickCount(referralCode);
      res.json({ tracked: isNew, clickCount });
    } catch (error) {
      console.error("Referral click error:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  app.post("/api/archetypes/vote", voteLimiter, async (req, res) => {
    try {
      const { archetypes } = req.body;
      const valid = ["The Planner", "The Flaker", "The Viber", "The Budget Ghost"];
      if (!Array.isArray(archetypes) || archetypes.length === 0 || !archetypes.every((a: string) => valid.includes(a))) {
        return res.status(400).json({ error: "Invalid archetypes" });
      }
      await storage.incrementArchetypeVotes(archetypes);
      const counts = await storage.getArchetypeVotes();
      res.json({ counts });
    } catch (error) {
      console.error("Archetype vote error:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  app.get("/api/archetypes/votes", readLimiter, async (_req, res) => {
    try {
      const counts = await storage.getArchetypeVotes();
      res.json({ counts });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  app.get("/api/waitlist/position/:referralCode", readLimiter, async (req, res) => {
    try {
      const { referralCode } = req.params;
      if (!referralCode || referralCode.length > 20 || !isHex(referralCode)) {
        return res.status(400).json({ error: "Invalid referral code" });
      }
      const result = await storage.getWaitlistPosition(referralCode);
      if (!result) {
        return res.status(404).json({ error: "Not found" });
      }
      res.json(result);
    } catch (error) {
      console.error("Position error:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  app.get("/api/waitlist/count", readLimiter, async (_req, res) => {
    try {
      const count = await storage.getWaitlistCount();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  return httpServer;
}
