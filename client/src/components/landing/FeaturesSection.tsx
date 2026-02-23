import { motion } from "framer-motion";
import { Heart, X, Check, ChevronLeft, MapPin, ArrowRight, MoreHorizontal, Plus } from "lucide-react";
import { Link } from "wouter";

function IOSStatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pb-1">
      <span className="text-white text-[13px] font-semibold tracking-tight">9:41</span>
      <div className="flex items-center gap-[5px]">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="white" aria-hidden="true">
          <rect x="0" y="4" width="3" height="8" rx="0.8" opacity="1" />
          <rect x="4.5" y="2.5" width="3" height="9.5" rx="0.8" opacity="1" />
          <rect x="9" y="1" width="3" height="11" rx="0.8" opacity="1" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.8" opacity="0.3" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="white" aria-hidden="true">
          <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm0-4A6.5 6.5 0 0 1 13.5 8L12 9.5A4.5 4.5 0 0 0 8 7.5 4.5 4.5 0 0 0 4 9.5L2.5 8A6.5 6.5 0 0 1 8 5.5zm0-4.5A11 11 0 0 1 16 4.6L14.5 6a9 9 0 0 0-13 0L0 4.6A11 11 0 0 1 8 1z" />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none" aria-hidden="true">
          <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="white" strokeOpacity="0.35" />
          <rect x="1.5" y="1.5" width="19" height="10" rx="2.5" fill="white" />
          <path d="M24.5 4.5v4a2 2 0 0 0 0-4z" fill="white" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

function IOSNavBar({ back, title, action }: { back?: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 py-1.5 border-b border-white/8">
      <div className="w-16">
        {back && (
          <div className="flex items-center gap-0.5" style={{ color: "#0A84FF" }}>
            <ChevronLeft size={20} strokeWidth={2.5} />
            <span className="text-[15px] font-normal">{back}</span>
          </div>
        )}
      </div>
      <span className="text-white font-semibold text-[17px]">{title}</span>
      <div className="w-16 flex justify-end">{action}</div>
    </div>
  );
}

function IOSPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative w-full max-w-[264px] mx-auto"
      style={{ filter: "drop-shadow(0 48px 96px rgba(0,0,0,0.85))" }}
    >
      <div
        className="relative rounded-[44px] p-[2px]"
        style={{
          background: "#1a1a1a",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.13), 0 0 0 1px #000",
        }}
      >
        <div className="absolute -left-[3px] top-[68px] w-[3px] h-7 rounded-l-full bg-[#2a2a2a]" />
        <div className="absolute -left-[3px] top-[104px] w-[3px] h-7 rounded-l-full bg-[#2a2a2a]" />
        <div className="absolute -right-[3px] top-[86px] w-[3px] h-12 rounded-r-full bg-[#2a2a2a]" />

        <div className="rounded-[42px] bg-black overflow-hidden relative">
          <div
            className="absolute top-[10px] left-1/2 -translate-x-1/2 z-30 bg-black rounded-full"
            style={{
              width: 108,
              height: 30,
              boxShadow: "0 0 0 1px rgba(255,255,255,0.06)",
            }}
          />
          <div className="pt-[50px]">{children}</div>
        </div>
      </div>
    </div>
  );
}

function SwipeVoteMockup() {
  return (
    <IOSPhoneFrame>
      <IOSStatusBar />
      <IOSNavBar
        back="Trips"
        title="Vote"
        action={
          <button style={{ color: "#0A84FF" }} className="text-[15px]">
            <MoreHorizontal size={20} />
          </button>
        }
      />

      <div className="px-3 pt-3 pb-4">
        <div className="relative rounded-[18px] overflow-hidden mb-3" style={{ aspectRatio: "3/4" }}>
          <img
            src="/images/hero-barcelona.jpg"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            alt="Barceloneta Beach"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          <div className="absolute top-3 right-3">
            <div
              className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-white"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
            >
              4 of 8
            </div>
          </div>

          <div className="absolute bottom-3 left-3 right-3">
            <div className="text-white font-semibold text-[18px] leading-tight">Barceloneta Beach</div>
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
              >
                🏖️ Beach
              </span>
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                style={{ background: "rgba(48,209,88,0.25)", color: "#30D158" }}
              >
                Free
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-8 mb-3">
          <button
            className="flex items-center justify-center rounded-full"
            style={{
              width: 64,
              height: 64,
              background: "rgba(255,69,58,0.15)",
              border: "1.5px solid rgba(255,69,58,0.4)",
            }}
          >
            <X size={28} style={{ color: "#FF453A" }} strokeWidth={2.5} />
          </button>
          <button
            className="flex items-center justify-center rounded-full"
            style={{
              width: 64,
              height: 64,
              background: "rgba(48,209,88,0.15)",
              border: "1.5px solid rgba(48,209,88,0.4)",
            }}
          >
            <Heart size={26} style={{ color: "#30D158" }} strokeWidth={2.5} />
          </button>
        </div>

        <div
          className="rounded-[12px] px-3 py-2.5 flex items-center gap-2"
          style={{ background: "rgba(48,209,88,0.12)", border: "1px solid rgba(48,209,88,0.25)" }}
        >
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "#30D158" }}
          >
            <Check size={11} className="text-black" strokeWidth={3} />
          </div>
          <span className="text-[12px] font-semibold" style={{ color: "#30D158" }}>
            4 out of 5 agreed on this spot
          </span>
        </div>
      </div>
    </IOSPhoneFrame>
  );
}

function BudgetLockMockup() {
  const people = [
    { name: "You", emoji: "😎", budget: "$500", committed: true },
    { name: "Sarah", emoji: "👩", budget: "$400", committed: true },
    { name: "Mike", emoji: "🧑", budget: "$350", committed: true },
    { name: "Jess", emoji: "👧", budget: "$450", committed: true },
  ];

  return (
    <IOSPhoneFrame>
      <IOSStatusBar />
      <IOSNavBar
        back="Back"
        title="Budget"
        action={
          <span className="text-[15px] font-semibold" style={{ color: "#0A84FF" }}>
            Done
          </span>
        }
      />

      <div className="px-0 pt-4 pb-4">
        <div className="text-center px-4 mb-4">
          <div
            className="text-[11px] font-semibold uppercase tracking-wider mb-1"
            style={{ color: "rgba(235,235,245,0.5)" }}
          >
            Group Sweet Spot
          </div>
          <div className="text-white font-bold" style={{ fontSize: 44, lineHeight: 1 }}>
            $350
          </div>
          <div className="text-[13px] mt-1" style={{ color: "rgba(235,235,245,0.5)" }}>
            per person · $1,400 total
          </div>
        </div>

        <div
          className="mx-3 rounded-[12px] overflow-hidden mb-3"
          style={{ background: "#1C1C1E" }}
        >
          {people.map((p, i) => (
            <div key={i}>
              <div className="flex items-center gap-3 px-4 py-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-base shrink-0"
                  style={{ background: "#2C2C2E" }}
                >
                  {p.emoji}
                </div>
                <div className="flex-1">
                  <div className="text-white text-[15px] font-medium">{p.name}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-semibold" style={{ color: "rgba(235,235,245,0.85)" }}>
                    {p.budget}
                  </span>
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "#30D158" }}
                  >
                    <Check size={11} className="text-black" strokeWidth={3} />
                  </div>
                </div>
              </div>
              {i < people.length - 1 && (
                <div className="ml-[56px] h-px" style={{ background: "rgba(60,60,67,0.36)" }} />
              )}
            </div>
          ))}
        </div>

        <div className="px-3">
          <button
            className="w-full py-3.5 rounded-[12px] text-white font-semibold text-[17px]"
            style={{ background: "#0A84FF" }}
          >
            Lock It In
          </button>
        </div>
      </div>
    </IOSPhoneFrame>
  );
}

function SquadItineraryMockup() {
  const days = ["Fri", "Sat", "Sun"];
  const items = [
    { time: "9:00 AM", activity: "La Boqueria Market", icon: "🍊", addedBy: "Jess" },
    { time: "2:00 PM", activity: "Gothic Quarter Walk", icon: "🏛️", addedBy: "Marco" },
    { time: "7:00 PM", activity: "Sunset Viewpoint", icon: "🌅", addedBy: "Jess" },
  ];

  return (
    <IOSPhoneFrame>
      <IOSStatusBar />
      <IOSNavBar
        title="Barcelona Trip"
        action={
          <span className="text-[15px] font-semibold" style={{ color: "#0A84FF" }}>
            Edit
          </span>
        }
      />

      <div className="px-3 pt-3 pb-4">
        <div
          className="flex rounded-[9px] p-[2px] mb-4"
          style={{ background: "rgba(118,118,128,0.24)" }}
        >
          {days.map((d, i) => (
            <div
              key={d}
              className="flex-1 text-center py-1.5 rounded-[7px] text-[13px] font-semibold transition-all"
              style={
                i === 0
                  ? { background: "#2C2C2E", color: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.4)" }
                  : { color: "rgba(235,235,245,0.6)" }
              }
            >
              {d}
            </div>
          ))}
        </div>

        <div className="space-y-0">
          {items.map((item, i) => (
            <div key={i}>
              <div className="flex items-start gap-3 py-3">
                <div className="shrink-0 text-right" style={{ width: 52 }}>
                  <div className="text-[11px] font-medium" style={{ color: "rgba(235,235,245,0.4)" }}>
                    {item.time.split(" ")[0]}
                  </div>
                  <div className="text-[10px]" style={{ color: "rgba(235,235,245,0.3)" }}>
                    {item.time.split(" ")[1]}
                  </div>
                </div>
                <div
                  className="w-px self-stretch rounded-full mx-1 shrink-0"
                  style={{ background: "rgba(60,60,67,0.5)" }}
                />
                <div
                  className="w-9 h-9 rounded-[10px] flex items-center justify-center text-lg shrink-0"
                  style={{ background: "#1C1C1E" }}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="text-white text-[14px] font-semibold leading-tight truncate">
                    {item.activity}
                  </div>
                  <div className="text-[11px] mt-0.5" style={{ color: "rgba(235,235,245,0.4)" }}>
                    Added by {item.addedBy}
                  </div>
                </div>
              </div>
              {i < items.length - 1 && (
                <div className="ml-[64px] h-px" style={{ background: "rgba(60,60,67,0.36)" }} />
              )}
            </div>
          ))}
        </div>

        <button
          className="mt-3 w-full py-3 rounded-[12px] flex items-center justify-center gap-2 text-[15px] font-semibold"
          style={{ background: "rgba(10,132,255,0.15)", color: "#0A84FF", border: "1px solid rgba(10,132,255,0.25)" }}
        >
          <Plus size={16} strokeWidth={2.5} />
          Add Activity
        </button>
      </div>
    </IOSPhoneFrame>
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
