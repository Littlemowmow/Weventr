import { motion } from "framer-motion";
import { Heart, X, Check, MapPin, DollarSign, Grip, Sparkles, ArrowRight, Star } from "lucide-react";
import { Link } from "wouter";

const PHONE_W = 282;
const PHONE_H = 580;
const FRAME_RADIUS = 50;
const SCREEN_INSET = 10;
const SCREEN_RADIUS = 42;
const SCREEN_W = PHONE_W - SCREEN_INSET * 2;
const SCREEN_H = PHONE_H - SCREEN_INSET * 2;

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto select-none" style={{ width: PHONE_W, height: PHONE_H }}>

      {/* Screen content — sits behind the SVG frame overlay */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: SCREEN_INSET,
          top: SCREEN_INSET,
          width: SCREEN_W,
          height: SCREEN_H,
          borderRadius: SCREEN_RADIUS,
          background: "#0c0c0e",
          zIndex: 1,
        }}
      >
        {/* Status bar row */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          <span className="text-white text-[12px] font-semibold tracking-tight">9:41</span>
          <div className="flex items-center gap-[5px]">
            {/* Signal */}
            <svg width="16" height="11" viewBox="0 0 16 11" fill="white">
              <rect x="0" y="4" width="3" height="7" rx="0.8" />
              <rect x="4.5" y="2.5" width="3" height="8.5" rx="0.8" />
              <rect x="9" y="1" width="3" height="10" rx="0.8" />
              <rect x="13.5" y="0" width="2.5" height="11" rx="0.8" opacity="0.3" />
            </svg>
            {/* Wifi */}
            <svg width="15" height="11" viewBox="0 0 15 11" fill="white">
              <circle cx="7.5" cy="9.5" r="1.5" />
              <path d="M4 6.5A5 5 0 0 1 11 6.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M1.5 4A8.5 8.5 0 0 1 13.5 4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
            {/* Battery */}
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.35" />
              <rect x="1.5" y="1.5" width="18" height="9" rx="2.5" fill="white" />
              <path d="M23 4v4a2 2 0 0 0 0-4z" fill="white" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Dynamic Island */}
        <div className="flex justify-center mb-2">
          <div
            style={{
              width: 110,
              height: 28,
              borderRadius: 20,
              background: "#000",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.06)",
            }}
          />
        </div>

        {/* Screen content */}
        <div className="px-4 pb-4" style={{ height: SCREEN_H - 90, overflowY: "hidden" }}>
          {children}
        </div>
      </div>

      {/* iPhone frame SVG — renders on top as chrome */}
      <svg
        width={PHONE_W}
        height={PHONE_H}
        viewBox={`0 0 ${PHONE_W} ${PHONE_H}`}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 10, pointerEvents: "none" }}
      >
        <defs>
          {/* Titanium frame gradient */}
          <linearGradient id="frameGradA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#8e8e93" />
            <stop offset="20%"  stopColor="#aeaeb2" />
            <stop offset="45%"  stopColor="#6c6c70" />
            <stop offset="70%"  stopColor="#9a9a9f" />
            <stop offset="100%" stopColor="#3a3a3c" />
          </linearGradient>
          {/* Specular highlight on top edge */}
          <linearGradient id="frameGradTop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          {/* Screen edge glow */}
          <radialGradient id="screenGlow" cx="50%" cy="0%" r="80%">
            <stop offset="0%"  stopColor="rgba(255,255,255,0.04)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          {/* Mask: full rect minus screen cutout */}
          <mask id="frameMask">
            <rect width={PHONE_W} height={PHONE_H} fill="white" />
            <rect
              x={SCREEN_INSET} y={SCREEN_INSET}
              width={SCREEN_W} height={SCREEN_H}
              rx={SCREEN_RADIUS}
              fill="black"
            />
          </mask>
        </defs>

        {/* Main frame body */}
        <rect width={PHONE_W} height={PHONE_H} rx={FRAME_RADIUS} fill="url(#frameGradA)" mask="url(#frameMask)" />
        {/* Highlight layer */}
        <rect width={PHONE_W} height={PHONE_H} rx={FRAME_RADIUS} fill="url(#frameGradTop)" mask="url(#frameMask)" />

        {/* Outer edge shine */}
        <rect
          width={PHONE_W} height={PHONE_H} rx={FRAME_RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1"
        />
        {/* Screen edge */}
        <rect
          x={SCREEN_INSET} y={SCREEN_INSET}
          width={SCREEN_W} height={SCREEN_H}
          rx={SCREEN_RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
        />
        {/* Screen glow */}
        <rect
          x={SCREEN_INSET} y={SCREEN_INSET}
          width={SCREEN_W} height={SCREEN_H}
          rx={SCREEN_RADIUS}
          fill="url(#screenGlow)"
        />

        {/* Volume up */}
        <rect x="-1" y="126" width="4" height="28" rx="2" fill="#57575c" />
        {/* Volume down */}
        <rect x="-1" y="166" width="4" height="50" rx="2" fill="#57575c" />
        {/* Mute toggle */}
        <rect x="-1" y="100" width="4" height="18" rx="2" fill="#57575c" />
        {/* Power / side button */}
        <rect x={PHONE_W - 3} y="178" width="4" height="72" rx="2" fill="#57575c" />

        {/* Bottom chin reflection */}
        <ellipse cx={PHONE_W / 2} cy={PHONE_H - 18} rx={60} ry={6}
          fill="rgba(255,255,255,0.04)" />
      </svg>

      {/* Outer ambient shadow */}
      <div
        className="absolute inset-0 rounded-[50px] pointer-events-none"
        style={{
          zIndex: 0,
          boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,0,0,0.5)",
        }}
      />
    </div>
  );
}

function SwipeVoteMockup() {
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-white font-semibold text-[13px]">Vote on Spots</div>
          <div className="text-white/35 text-[11px]">Barcelona · 5 members</div>
        </div>
        <div className="text-white/30 text-xs font-semibold">4 of 8</div>
      </div>

      <div className="relative rounded-2xl overflow-hidden mb-3 border border-white/8" style={{ height: 240 }}>
        <img src="/images/hero-barcelona.jpg" loading="lazy" decoding="async" className="w-full h-full object-cover" alt="Barcelona" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 55%)" }} />

        {/* Progress bar */}
        <div className="absolute top-3 left-3 right-3">
          <div className="h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
            <div className="h-full rounded-full" style={{ width: "50%", background: "rgba(255,255,255,0.75)" }} />
          </div>
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <div className="text-white font-bold text-[15px] font-display leading-tight">Barceloneta Beach</div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1 text-[11px] text-white/55">
              <MapPin size={9} /><span>Beach</span>
            </div>
            <span className="text-emerald-400 font-semibold text-[11px]">Free</span>
            <div className="flex items-center gap-0.5 ml-auto">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={9} className={i < 4 ? "text-orange-400 fill-orange-400" : "text-white/20"} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mb-3">
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)", border: "1.5px solid rgba(239,68,68,0.3)" }}>
          <X size={20} className="text-red-400" strokeWidth={2.5} />
        </div>
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(249,115,22,0.12)", border: "2px solid rgba(249,115,22,0.35)", boxShadow: "0 0 24px rgba(249,115,22,0.18)" }}>
          <Heart size={26} className="text-orange-400" strokeWidth={2} style={{ fill: "rgba(249,115,22,0.25)" }} />
        </div>
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)", border: "1.5px solid rgba(239,68,68,0.3)" }}>
          <X size={20} className="text-red-400" strokeWidth={2.5} />
        </div>
      </div>

      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}>
        <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(52,211,153,0.2)" }}>
          <Check size={9} className="text-emerald-400" strokeWidth={3} />
        </div>
        <span className="text-emerald-400 text-[11px] font-semibold">4 out of 5 agreed on this spot</span>
      </div>
    </PhoneFrame>
  );
}

function BudgetLockMockup() {
  const people = [
    { name: "You", emoji: "😎", budget: "$500" },
    { name: "Sarah", emoji: "👩", budget: "$400" },
    { name: "Mike", emoji: "🧑", budget: "$350" },
    { name: "Jess", emoji: "👧", budget: "$450" },
  ];

  return (
    <PhoneFrame>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-white font-semibold text-[13px]">Budget Lock</div>
          <div className="text-white/35 text-[11px]">Barcelona · 4 members</div>
        </div>
      </div>

      {/* Sweet spot */}
      <div className="rounded-2xl p-4 mb-3" style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.14) 0%, rgba(245,158,11,0.07) 100%)", border: "1px solid rgba(249,115,22,0.22)" }}>
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles size={10} className="text-orange-400" />
          <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest">Group Sweet Spot</span>
        </div>
        <div className="flex items-end gap-2 mb-2">
          <div className="text-[32px] font-bold font-display text-white leading-none">$350</div>
          <div className="text-[11px] text-white/40 pb-0.5">/ person</div>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div className="h-full rounded-full" style={{ width: "70%", background: "linear-gradient(to right, #f97316, #f59e0b)" }} />
        </div>
      </div>

      {/* Members */}
      <div className="space-y-1.5 mb-3">
        {people.map((p, i) => (
          <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="text-sm shrink-0">{p.emoji}</span>
            <span className="text-white text-[12px] font-medium flex-1">{p.name}</span>
            <span className="text-white/60 text-[12px] font-semibold tabular-nums">{p.budget}</span>
            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(52,211,153,0.15)" }}>
              <Check size={9} className="text-emerald-400" strokeWidth={3} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <DollarSign size={12} className="text-emerald-400 shrink-0" />
        <span className="text-[11px] text-white/40 flex-1">Splits update in real-time</span>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] font-bold text-emerald-400">Live</span>
      </div>
    </PhoneFrame>
  );
}

function SquadItineraryMockup() {
  const items = [
    { time: "9 AM",  activity: "La Boqueria Market",  icon: "🍊", addedBy: "Jess",  color: "rgba(249,115,22,0.15)" },
    { time: "2 PM",  activity: "Gothic Quarter Walk", icon: "🏛️", addedBy: "Marco", color: "rgba(139,92,246,0.15)" },
    { time: "7 PM",  activity: "Sunset Viewpoint",    icon: "🌅", addedBy: "Jess",  color: "rgba(14,165,233,0.15)" },
  ];

  return (
    <PhoneFrame>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-white font-semibold text-[13px]">Barcelona · Day 1</div>
          <div className="text-white/35 text-[11px]">Sat, Jun 14 · 3 activities</div>
        </div>
      </div>

      {/* Day tabs */}
      <div className="flex rounded-xl p-[3px] mb-4" style={{ background: "rgba(255,255,255,0.05)" }}>
        {["Day 1", "Day 2", "Day 3"].map((d, i) => (
          <div
            key={d}
            className="flex-1 text-center py-1.5 rounded-[9px] text-[11px] font-semibold"
            style={i === 0 ? { background: "rgba(249,115,22,0.2)", color: "#f97316", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" } : { color: "rgba(255,255,255,0.25)" }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Activities */}
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0" style={{ background: item.color }}>
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
