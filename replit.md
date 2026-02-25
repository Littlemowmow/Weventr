# SideQuest Landing Page

## Overview
Waitlist landing page for SideQuest, a group travel planning app targeting college students. The app solves group trip coordination via voting, budget alignment, and curated local recommendations. The landing page converts visitors to join the waitlist using emotionally resonant Gen Z messaging.

## Tech Stack
- Frontend: React + Vite + TypeScript
- Backend: Express.js
- Styling: Tailwind CSS + shadcn/ui components
- Animation: Framer Motion
- Database: PostgreSQL (Drizzle ORM)
- Routing: wouter

## Pages
- `/` — Landing page (home) with 11 sections: Hero, Social Proof, Problem, Archetypes, Features, Comparison, Cities, FAQ, Waitlist, Footer
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

## Project Structure
- `client/src/components/landing/` — Landing page sections
- `client/src/components/layout/` — Navbar, layout components
- `client/src/components/ui/` — shadcn/ui components
- `client/src/components/mockups/` — iPhone 17 Pro mockup components (consolidated design file)
- `client/src/pages/` — Page components (home, demo, designs, features, flows)
- `server/` — Express backend + Vite dev server
- `shared/` — Shared schema types

## GitHub
- Repo: github.com/Littlemowmow/sidequest-landing-v2
- Branch: `replit-dev`
- Connected via Replit GitHub integration

## Known Issues
- Hero.tsx fetchPriority prop warning (non-breaking, React/Vite mismatch)
