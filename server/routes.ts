import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { waitlistRequestSchema } from "@shared/schema";
import { randomBytes } from "crypto";
import { sendWaitlistConfirmationEmail } from "./email";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/waitlist", async (req, res) => {
    try {
      const parsed = waitlistRequestSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
      }

      parsed.data.email = parsed.data.email.toLowerCase().trim();

      const existing = await storage.getWaitlistEntryByEmail(parsed.data.email);
      if (existing) {
        return res.status(409).json({ error: "already_registered", referralCode: existing.referralCode });
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
      const key = req.query.key;
      if (!process.env.SESSION_SECRET || key !== process.env.SESSION_SECRET) {
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
