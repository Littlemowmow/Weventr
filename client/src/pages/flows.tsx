import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import {
  TripSparkCreate,
  TripSparkResponse,
  TripSparkStatus,
  TripSparkResults,
  BlindMatchSwipe,
  BlindMatchReveal,
  BudgetSetCaps,
  BudgetGroupSweetSpot,
  ItineraryDayPlan,
  TaskDelegation,
} from "@/components/mockups/iPhone17ProMockupSideQuestDesigns";

function ScreenLabel({ step, label }: { step: number; label: string }) {
  return (
    <div className="text-center mt-4">
      <div className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Step {step}</div>
      <div className="text-sm font-semibold text-white/70 mt-0.5">{label}</div>
    </div>
  );
}

const PHASES = [
  {
    id: "trip-spark",
    phase: 0,
    title: "Trip Spark",
    subtitle: "From group chat idea → committed group",
    description: "One person creates a trip idea, drops a link in the group chat. Friends respond with dates, budget caps across 5 categories, and a hard commitment — no \"I'll let you know later\" option. A countdown deadline makes non-participation visible.",
    screens: [
      { component: <TripSparkCreate />, step: 1, label: "Create the Spark" },
      { component: <TripSparkResponse />, step: 2, label: "Friends Respond" },
      { component: <TripSparkStatus />, step: 3, label: "Track Responses" },
      { component: <TripSparkResults />, step: 4, label: "See the Overlap" },
    ],
  },
  {
    id: "blind-match",
    phase: 1,
    title: "Blind Match",
    subtitle: "Group agrees on activities without debate",
    description: "Everyone swipes independently on activities — blind, no social pressure. The reveal shows match strength: Squad Lock (100%), Majority Pick (60%+), or Split (triggers AI Tiebreaker). Matched activities link directly to booking.",
    screens: [
      { component: <BlindMatchSwipe />, step: 1, label: "Swipe Independently" },
      { component: <BlindMatchReveal />, step: 2, label: "Match Reveal" },
    ],
  },
  {
    id: "budget-lock",
    phase: 2,
    title: "Budget Lock",
    subtitle: "Costs transparent before anyone books",
    description: "Each person sets max spend across 5 categories — accommodation per night, flights, food per day, activities per day, and a hard total cap. The app calculates the sweet spot everyone's comfortable with and shows budget impact on every activity.",
    screens: [
      { component: <BudgetSetCaps />, step: 1, label: "Set Your Caps" },
      { component: <BudgetGroupSweetSpot />, step: 2, label: "Group Sweet Spot" },
    ],
  },
  {
    id: "squad-itinerary",
    phase: 3,
    title: "Squad Itinerary",
    subtitle: "Shared plan with accountability",
    description: "Matched activities auto-populate into a day-by-day timeline. Everyone can add, reorder, and edit — with attribution so no one person does all the work. Task delegation assigns responsibilities with due dates and tracks who's contributing.",
    screens: [
      { component: <ItineraryDayPlan />, step: 1, label: "Day-by-Day Plan" },
      { component: <TaskDelegation />, step: 2, label: "Task Delegation" },
    ],
  },
];

export default function FlowsPage() {
  const [activePhase, setActivePhase] = useState(0);
  const phase = PHASES[activePhase];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white" data-testid="flows-page">
      <header className="sticky top-0 z-50 border-b border-white/[0.08]" style={{ background: "rgba(10,10,12,0.9)", backdropFilter: "blur(20px)" }}>
        <div className="container mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group" data-testid="link-back-home">
              <ArrowLeft size={16} className="text-white/40 group-hover:text-orange-400 transition-colors" />
              <Logo />
            </div>
          </Link>
          <div className="text-white/40 text-sm font-medium">App Flows</div>
        </div>
      </header>

      <div className="sticky top-[57px] z-40 border-b border-white/[0.08]" style={{ background: "rgba(10,10,12,0.85)", backdropFilter: "blur(16px)" }}>
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex gap-1 py-2 overflow-x-auto scrollbar-hide">
            {PHASES.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActivePhase(i)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold whitespace-nowrap transition-all"
                style={i === activePhase
                  ? { background: "rgba(249,115,22,0.15)", color: "#f97316", border: "1px solid rgba(249,115,22,0.3)" }
                  : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.06)" }
                }
                data-testid={`tab-phase-${i}`}
              >
                <span className="text-[11px] font-bold opacity-60">P{p.phase}</span>
                {p.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-7xl px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-3"
                style={{ background: "rgba(249,115,22,0.1)", color: "#f97316", border: "1px solid rgba(249,115,22,0.2)" }}>
                Phase {phase.phase}
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{phase.title}</h1>
              <p className="text-white/40 text-lg mb-2">{phase.subtitle}</p>
              <p className="text-white/30 text-sm max-w-2xl mx-auto leading-relaxed">{phase.description}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
              {phase.screens.map((screen, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex flex-col items-center"
                >
                  {screen.component}
                  <ScreenLabel step={screen.step} label={screen.label} />
                </motion.div>
              ))}
            </div>

            {activePhase < PHASES.length - 1 && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setActivePhase(activePhase + 1)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:gap-3"
                  style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
                  data-testid="button-next-phase"
                >
                  Next: Phase {PHASES[activePhase + 1].phase} — {PHASES[activePhase + 1].title}
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
