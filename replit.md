# Weventr Landing Page

## Overview
Waitlist landing page for Weventr (We + Venture), a group travel planning app. The app solves group trip coordination via voting, budget alignment, and curated local recommendations. The landing page converts visitors to join the waitlist using emotionally resonant Gen Z messaging. Domain: weventr.com

## Tech Stack
- Frontend: React + Vite + TypeScript
- Backend: Express.js
- Styling: Tailwind CSS + shadcn/ui components
- Animation: Framer Motion
- Database: PostgreSQL (Drizzle ORM)
- Routing: wouter

## Pages
- `/` — Landing page (home) with sections: Hero, Social Proof, Waitlist, Archetypes, FAQ, Footer
- `/demo` — Interactive demo page
- `/designs` — Design showcase page
- `/features` — Features detail page
- `/flows` — App flow mockups (Trip Spark → Blind Match → Budget Lock → Squad Itinerary)

## Key Design Language
- Dark glass aesthetic (#0c0c0e background)
- Orange accent palette (#f97316 primary, #f59e0b secondary)
- Glass-morphism cards (white/0.04 fill, white/0.06 border)
- Emerald for success states, red for errors/destructive
- Gen Z vocabulary — sarcastic-but-hopeful tone
- iPhone 15 SVG frames for phone mockups (titanium gradient, Dynamic Island, side buttons)

## Referral & Waitlist Position System
- Each signup generates a unique 8-char referral code
- Referral link format: `weventr.com?ref=<code>`
- Referral clicks tracked with browser fingerprint deduplication (`referral_clicks` table)
- Waitlist position ranked by: referral signups (desc) then signup date (asc)
- Position shown to users after signup and on return visits
- CSV export sorted by position with Position column
- API: `GET /api/waitlist/position/:referralCode` returns `{ position, totalCount, referralSignups }`

## DB Schema
- `waitlist_entries` — id, email, phone, feedback, travel_date, travel_type, referral_code, referred_by, created_at
- `referral_clicks` — id, referral_code, fingerprint, created_at
- `archetype_votes` — id, archetype, count

## Project Structure
- `client/src/components/landing/` — Landing page sections
- `client/src/components/layout/` — Navbar, layout components
- `client/src/components/ui/` — shadcn/ui components
- `client/src/components/mockups/` — iPhone 17 Pro mockup components (archived, not used on landing page; available for /flows and /designs pages)
- `client/src/pages/` — Page components (home, demo, designs, features, flows)
- `server/` — Express backend + Vite dev server
- `shared/` — Shared schema types

## Email
- Sender: `Weventr <noreply@weventr.com>`
- Subject: "You're on the list 🚀 — Weventr"

## GitHub
- Repo: github.com/Littlemowmow/sidequest-landing-v2
- Branch: `replit-dev`
- Connected via Replit GitHub integration
