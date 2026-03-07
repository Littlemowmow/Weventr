import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { waitlistRequestSchema } from "@shared/schema";
import { randomBytes, timingSafeEqual } from "crypto";
import { sendWaitlistConfirmationEmail } from "./email";
import rateLimit from "express-rate-limit";

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

      const existingEmail = await storage.getWaitlistEntryByEmail(parsed.data.email);
      if (existingEmail) {
        return res.status(409).json({ error: "already_registered" });
      }

      if (parsed.data.phone) {
        const normalizedPhone = parsed.data.phone.replace(/\D/g, "");
        if (normalizedPhone.length >= 7) {
          const existingPhone = await storage.getWaitlistEntryByPhone(normalizedPhone);
          if (existingPhone) {
            return res.status(409).json({ error: "already_registered" });
          }
          parsed.data.phone = normalizedPhone;
        }
      }

      if (parsed.data.referredBy) {
        const referrer = await storage.getWaitlistEntryByReferralCode(parsed.data.referredBy);
        if (!referrer) {
          parsed.data.referredBy = null;
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

      res.status(201).json({ referralCode: entry.referralCode });
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

      const entries = await storage.getAllWaitlistEntries();

      const escape = (val: string | null | undefined) => {
        if (val == null) return "";
        const str = String(val);
        if (str.includes(",") || str.includes('"') || str.includes("\n")) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };

      const headers = ["ID", "Email", "Phone", "Feedback", "Travel Date", "Travel Type", "Referral Code", "Referred By", "Signed Up"];
      const rows = entries.map((e) => [
        e.id,
        escape(e.email),
        escape(e.phone),
        escape(e.feedback),
        escape(e.travelDate),
        escape(e.travelType),
        escape(e.referralCode),
        escape(e.referredBy),
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

  app.get("/api/archetypes/votes", async (_req, res) => {
    try {
      const counts = await storage.getArchetypeVotes();
      res.json({ counts });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  app.get("/api/waitlist/count", async (_req, res) => {
    try {
      const count = await storage.getWaitlistCount();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  });

  return httpServer;
}
