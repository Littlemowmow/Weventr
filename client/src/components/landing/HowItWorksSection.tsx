import { Zap, Users, Sparkles, Vote, DollarSign, CalendarCheck, MessageCircle } from "lucide-react";
import { useFadeIn } from "@/hooks/use-fade-in";

const steps = [
  {
    icon: Zap,
    title: "Spark a trip",
    description: "Set a destination, dates, and a deadline. We build a starter itinerary instantly.",
    accent: "from-orange-500/20 to-amber-500/10",
    border: "border-orange-500/20",
    iconBg: "bg-orange-500/10",
  },
  {
    icon: Users,
    title: "Get everyone in",
    description: "Drop a link in the group chat. Friends lock in their availability before the deadline hits.",
    accent: "from-blue-500/20 to-cyan-500/10",
    border: "border-blue-500/20",
    iconBg: "bg-blue-500/10",
  },
  {
    icon: Sparkles,
    title: "Knows your vibe",
    description: "Learns from what you swipe on and tailors the trip to you. Surfaces hidden gems and local spots — not just the mainstream stuff.",
    accent: "from-purple-500/20 to-pink-500/10",
    border: "border-purple-500/20",
    iconBg: "bg-purple-500/10",
  },
  {
    icon: Vote,
    title: "Vote on it together",
    description: "Anonymous group voting on destinations and activities that were swiped on. Real preferences, no pressure.",
    accent: "from-rose-500/20 to-orange-500/10",
    border: "border-rose-500/20",
    iconBg: "bg-rose-500/10",
  },
  {
    icon: DollarSign,
    title: "Lock the budget",
    description: "Real cost per person, updated live. No surprises, no one going quiet.",
    accent: "from-emerald-500/20 to-green-500/10",
    border: "border-emerald-500/20",
    iconBg: "bg-emerald-500/10",
  },
  {
    icon: CalendarCheck,
    title: "Smart itinerary",
    description: "Factors in weather, distance, and logistics. Your plan, optimized automatically.",
    accent: "from-amber-500/20 to-yellow-500/10",
    border: "border-amber-500/20",
    iconBg: "bg-amber-500/10",
  },
  {
    icon: MessageCircle,
    title: "Stay in sync on the trip",
    description: "Live feed keeps everyone connected. Know when someone splits off, plans shift, or it's time to regroup.",
    accent: "from-sky-500/20 to-blue-500/10",
    border: "border-sky-500/20",
    iconBg: "bg-sky-500/10",
  },
];

function StepCard({ step, idx }: { step: typeof steps[0]; idx: number }) {
  const { ref, isVisible } = useFadeIn(idx * 0.08);
  const Icon = step.icon;

  return (
    <div
      ref={ref}
      className={`fade-in${isVisible ? " visible" : ""} relative rounded-2xl border ${step.border} bg-gradient-to-br ${step.accent} p-5 sm:p-6 flex flex-col gap-4 hover:scale-[1.02] transition-all duration-300 ${idx === steps.length - 1 && steps.length % 2 !== 0 ? "sm:col-span-2 sm:max-w-[calc(50%-10px)] sm:mx-auto" : ""}`}
      style={{ transitionDelay: `${idx * 0.08}s` }}
      data-testid={`step-${idx}`}
    >
      <div className="flex items-center gap-3">
        <div className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${step.iconBg} border ${step.border} flex items-center justify-center`}>
          <Icon size={18} className="text-orange-400 sm:w-5 sm:h-5" />
        </div>
        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Step {idx + 1}</span>
      </div>

      <div>
        <h3 className="text-base sm:text-lg font-display font-bold text-white mb-1.5" data-testid={`text-step-title-${idx}`}>
          {step.title}
        </h3>
        <p className="text-white/45 text-sm leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  const heading = useFadeIn();

  return (
    <section className="py-16 sm:py-24 px-4" data-testid="section-how-it-works">
      <div className="container mx-auto max-w-5xl">
        <div
          ref={heading.ref}
          className={`fade-in${heading.isVisible ? " visible" : ""} text-center mb-12 sm:mb-16`}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">
            How it works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-3" data-testid="text-how-it-works-title">
            From group chat chaos to actual plans
          </h2>
          <p className="text-white/40 text-sm sm:text-base max-w-2xl mx-auto">
            Before the trip, during the trip, and everything in between.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {steps.map((step, idx) => (
            <StepCard key={step.title} step={step} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
