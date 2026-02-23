import { motion } from "framer-motion";
import { Heart, X, Check, MapPin, DollarSign, Grip, Sparkles, ArrowRight, Star } from "lucide-react";
import { Link } from "wouter";

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: 272 }}>
      {/* Outer shell */}
      <div
        className="relative rounded-[3rem] p-[3px]"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Side volume buttons */}
        <div className="absolute -left-[4px] top-[88px] w-[4px] h-7 rounded-l-full" style={{ background: "rgba(255,255,255,0.08)" }} />
        <div className="absolute -left-[4px] top-[124px] w-[4px] h-7 rounded-l-full" style={{ background: "rgba(255,255,255,0.08)" }} />
        {/* Power button */}
        <div className="absolute -right-[4px] top-[104px] w-[4px] h-10 rounded-r-full" style={{ background: "rgba(255,255,255,0.08)" }} />

        {/* Screen */}
        <div className="rounded-[2.7rem] overflow-hidden" style={{ background: "#0d0d0f" }}>
          {/* Notch */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="h-[18px] w-[80px] rounded-full" style={{ background: "#000", boxShadow: "0 0 0 1px rgba(255,255,255,0.05)" }} />
          </div>
          {/* Screen content */}
          <div className="px-4 pb-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenHeader({ label, subtitle }: { label: string; subtitle: string }) {
  return (
    <div className="flex items-center justify-between mb-4 pt-1">
      <div>
        <div className="text-white font-semibold text-sm leading-tight">{label}</div>
        <div className="text-white/35 text-[11px] mt-0.5">{subtitle}</div>
      </div>
      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <span className="text-white/40 text-[10px] font-bold">···</span>
      </div>
    </div>
  );
}

function SwipeVoteMockup() {
  return (
    <PhoneFrame>
      <ScreenHeader label="Vote on spots" subtitle="Barcelona · 5 members" />

      <div className="relative rounded-2xl overflow-hidden mb-3 border border-white/8" style={{ aspectRatio: "3/4" }}>
        <img
          src="/images/hero-barcelona.jpg"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          alt="Barcelona beach"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }} />

        {/* Vote progress */}
        <div className="absolute top-3 left-3 right-3 flex items-center gap-2">
          <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
            <div className="h-full rounded-full" style={{ width: "50%", background: "rgba(255,255,255,0.7)" }} />
          </div>
          <div className="text-[10px] font-semibold text-white/70">4 of 8</div>
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <div className="text-white font-bold text-base font-display leading-tight">Barceloneta Beach</div>
          <div className="flex items-center gap-1.5 text-[11px] text-white/60 mt-1">
            <MapPin size={9} />
            <span>Beach</span>
            <span className="text-white/30">·</span>
            <span className="text-emerald-400 font-semibold">Free</span>
          </div>
          <div className="flex items-center gap-1 mt-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className={i < 4 ? "text-orange-400 fill-orange-400" : "text-white/20"} />
            ))}
            <span className="text-[10px] text-white/40 ml-1">4.2</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 mb-3">
        <button
          className="flex items-center justify-center rounded-full transition-transform hover:scale-105"
          style={{
            width: 52, height: 52,
            background: "rgba(239,68,68,0.1)",
            border: "1.5px solid rgba(239,68,68,0.25)",
          }}
        >
          <X size={22} className="text-red-400" strokeWidth={2.5} />
        </button>
        <button
          className="flex items-center justify-center rounded-full transition-transform hover:scale-105"
          style={{
            width: 64, height: 64,
            background: "rgba(249,115,22,0.12)",
            border: "2px solid rgba(249,115,22,0.3)",
            boxShadow: "0 0 20px rgba(249,115,22,0.15)",
          }}
        >
          <Heart size={26} className="text-orange-400 fill-orange-400/30" strokeWidth={2} />
        </button>
        <button
          className="flex items-center justify-center rounded-full transition-transform hover:scale-105"
          style={{
            width: 52, height: 52,
            background: "rgba(239,68,68,0.1)",
            border: "1.5px solid rgba(239,68,68,0.25)",
          }}
        >
          <X size={22} className="text-red-400" strokeWidth={2.5} />
        </button>
      </div>

      <div
        className="rounded-xl px-3 py-2.5 flex items-center gap-2"
        style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}
      >
        <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(52,211,153,0.2)" }}>
          <Check size={10} className="text-emerald-400" strokeWidth={3} />
        </div>
        <span className="text-emerald-400 text-[11px] font-semibold">4 out of 5 agreed on this spot</span>
      </div>
    </PhoneFrame>
  );
}

function BudgetLockMockup() {
  const people = [
    { name: "You", emoji: "😎", budget: "$500", pct: 100 },
    { name: "Sarah", emoji: "👩", budget: "$400", pct: 80 },
    { name: "Mike", emoji: "🧑", budget: "$350", pct: 70 },
    { name: "Jess", emoji: "👧", budget: "$450", pct: 90 },
  ];

  return (
    <PhoneFrame>
      <ScreenHeader label="Budget Lock" subtitle="Barcelona · 4 members" />

      {/* Sweet spot card */}
      <div
        className="rounded-2xl p-4 mb-3"
        style={{
          background: "linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(245,158,11,0.06) 100%)",
          border: "1px solid rgba(249,115,22,0.2)",
        }}
      >
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles size={10} className="text-orange-400" />
          <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest">Group Sweet Spot</span>
        </div>
        <div className="flex items-end gap-2">
          <div className="text-3xl font-bold font-display text-white leading-none">$350</div>
          <div className="text-[11px] text-white/40 pb-0.5">per person</div>
        </div>
        <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div className="h-full rounded-full" style={{ width: "70%", background: "linear-gradient(to right, #f97316, #f59e0b)" }} />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[9px] text-white/30">$0</span>
          <span className="text-[9px] text-white/30">$500 max</span>
        </div>
      </div>

      {/* People rows */}
      <div className="space-y-1.5 mb-3">
        {people.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <span className="text-sm shrink-0">{p.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="text-white text-[12px] font-medium">{p.name}</div>
            </div>
            <span className="text-white/60 text-[12px] font-semibold tabular-nums">{p.budget}</span>
            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(52,211,153,0.15)" }}>
              <Check size={9} className="text-emerald-400" strokeWidth={3} />
            </div>
          </div>
        ))}
      </div>

      <div
        className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <DollarSign size={13} className="text-emerald-400 shrink-0" />
        <span className="text-[11px] text-white/40 flex-1">Splits update in real-time</span>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] font-bold text-emerald-400">Live</span>
      </div>
    </PhoneFrame>
  );
}

function SquadItineraryMockup() {
  const items = [
    { time: "9 AM", activity: "La Boqueria Market", icon: "🍊", addedBy: "Jess", color: "rgba(249,115,22,0.15)" },
    { time: "2 PM", activity: "Gothic Quarter Walk", icon: "🏛️", addedBy: "Marco", color: "rgba(139,92,246,0.15)" },
    { time: "7 PM", activity: "Sunset Viewpoint Hike", icon: "🌅", addedBy: "Jess", color: "rgba(14,165,233,0.15)" },
  ];

  return (
    <PhoneFrame>
      <ScreenHeader label="Barcelona · Day 1" subtitle="Sat, Jun 14 · 3 activities" />

      {/* Day tabs */}
      <div
        className="flex rounded-xl p-[3px] mb-4"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        {["Day 1", "Day 2", "Day 3"].map((d, i) => (
          <div
            key={d}
            className="flex-1 text-center py-1.5 rounded-[9px] text-[11px] font-semibold"
            style={
              i === 0
                ? { background: "rgba(249,115,22,0.2)", color: "#f97316", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }
                : { color: "rgba(255,255,255,0.25)" }
            }
          >
            {d}
          </div>
        ))}
      </div>

      {/* Activity rows */}
      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
              style={{ background: item.color }}
            >
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-[12px] font-semibold leading-tight truncate">{item.activity}</div>
              <div className="text-white/30 text-[10px] mt-0.5">by {item.addedBy}</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-orange-400 text-[11px] font-bold">{item.time}</div>
              <Grip size={10} className="text-white/15 mt-1 mx-auto" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-center">
        <span className="text-[10px] text-white/20">Drag to reorder · Tap to edit</span>
      </div>
    </PhoneFrame>
  );
}

export function FeaturesSection() {
  const features = [
    {
      id: "swipe-vote",
      label: "Swipe & Vote",
      title: "Swipe & Vote",
      description: "Everyone swipes on destinations and activities on their own — no awkward standoffs, no \"I'm down for whatever\" from the friend who never decides. SideQuest surfaces what your group actually agrees on.",
      mockup: <SwipeVoteMockup />,
    },
    {
      id: "budget-lock",
      label: "Budget Lock",
      title: "Budget Lock",
      description: "Everyone sees real costs before anyone commits — no sticker shock, no one going quiet when prices come up. Set a budget your whole group is comfortable with, and automatic splits mean nobody's chasing passive-aggressive Venmo requests three months later.",
      mockup: <BudgetLockMockup />,
    },
    {
      id: "squad-itinerary",
      label: "Squad Itinerary",
      title: "Squad Itinerary",
      description: "One shared plan everyone can see, edit, and actually contribute to. No more one person sending 47 unanswered messages while everyone else is just \"vibing.\" If you added it, your name's on it.",
      mockup: <SquadItineraryMockup />,
    },
  ];

  return (
    <section id="features" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4" data-testid="text-features-title">
            From chaos to consensus
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Three features that replace the Google Doc nobody opens, the poll with zero overlap, and the friend doing all the work.
          </p>
        </motion.div>

        <div className="space-y-32">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20`}
              data-testid={`card-feature-${idx}`}
            >
              <div className="flex-1 max-w-md">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">
                  {feature.label}
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed text-[16px]">{feature.description}</p>
              </div>
              <div className="flex-1 flex justify-center">
                {feature.mockup}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Link href="/features">
            <button className="inline-flex items-center gap-2 text-white/50 hover:text-orange-400 transition-colors font-medium text-sm group" data-testid="link-see-all-features">
              Plus: deadline locks so nobody flakes, a trip randomizer for when you're stuck, and a few surprises
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
