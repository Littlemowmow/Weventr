import { Link } from "wouter";
import { ArrowLeft, Check, X, Users, Copy, MessageCircle, Share2, Shuffle, Trophy, Star, MapPin, Lock, Zap, Crown, Wifi, Signal, BatteryFull, ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/logo";

function PhoneFrame({ children, label, glow }: { children: React.ReactNode; label: string; glow?: string }) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative group">
        {glow && <div className={`absolute -inset-4 rounded-[4rem] blur-2xl opacity-20 ${glow}`} />}
        <div className="relative rounded-[3rem] p-[10px] w-[320px] bg-gradient-to-b from-[#222] to-[#171717] border border-white/[0.06] shadow-2xl shadow-black/60">
          <div className="bg-[#0a0a0a] rounded-[2.2rem] overflow-hidden relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-[120px] bg-[#0a0a0a] rounded-b-3xl z-20 flex items-center justify-center pt-1">
              <div className="w-12 h-3 bg-[#1a1a1a] rounded-full" />
            </div>
            <div className="pt-10 pb-5 min-h-[590px] flex flex-col">
              {children}
            </div>
          </div>
        </div>
      </div>
      <div className="text-[11px] font-bold text-white/25 uppercase tracking-[0.2em] text-center">{label}</div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex justify-between items-center px-6 pb-2 text-[10px] font-semibold text-white/35">
      <span>9:41</span>
      <div className="flex gap-1.5 items-center">
        <Signal size={10} />
        <Wifi size={10} />
        <BatteryFull size={12} />
      </div>
    </div>
  );
}

function ScreenHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-5">
      <div className="text-orange-400/60 text-[10px] font-bold uppercase tracking-[0.25em] mb-2">{label}</div>
      <div className="text-white font-bold text-[20px] leading-tight">{title}</div>
      {subtitle && <div className="text-white/25 text-[13px] mt-1">{subtitle}</div>}
    </div>
  );
}

function GreenCheck() {
  return <Check size={16} className="text-emerald-400" strokeWidth={2.5} />;
}

function TabBar({ active }: { active: "discover" | "trips" | "profile" }) {
  const tabs = [
    { id: "discover", icon: "🧭", label: "Discover" },
    { id: "trips", icon: "✈️", label: "Trips" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];
  return (
    <div className="mt-auto border-t border-white/[0.05] pt-2 pb-1 flex justify-around px-4">
      {tabs.map(tab => (
        <div key={tab.id} className={`flex flex-col items-center gap-0.5 px-3 py-1 ${active === tab.id ? "opacity-100" : "opacity-25"}`}>
          <span className="text-base">{tab.icon}</span>
          <span className={`text-[9px] font-bold ${active === tab.id ? "text-orange-400" : "text-white/40"}`}>{tab.label}</span>
        </div>
      ))}
    </div>
  );
}

function GroupChatInviteScreen() {
  const members = [
    { emoji: "😎", name: "You", tag: "Organizer", status: "owner" },
    { emoji: "👩‍🦱", name: "Sarah M.", tag: "Joined", status: "joined" },
    { emoji: "🧔", name: "Jake R.", tag: "Invited", status: "invited" },
    { emoji: "👧", name: "Priya K.", tag: "Invited", status: "invited" },
  ];
  return (
    <PhoneFrame label="Get Out the GC" glow="bg-orange-500">
      <StatusBar />
      <div className="px-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-5">
          <ArrowLeft size={18} className="text-white/30" />
          <div className="text-white font-bold text-[16px]">Barcelona Trip</div>
        </div>
        <ScreenHeader label="Step 1 of 4" title="Who's Coming?" subtitle="Add your squad" />

        <div className="space-y-2.5 mb-4">
          {members.map((m, i) => (
            <div key={i} className={`rounded-2xl px-4 py-3 flex items-center gap-3 border ${m.status === "owner" ? "bg-orange-500/[0.07] border-orange-500/20" : "bg-white/[0.04] border-white/[0.05]"}`}>
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-lg shrink-0">{m.emoji}</div>
              <div className="flex-1">
                <div className="text-white font-semibold text-[14px]">{m.name}</div>
              </div>
              <div className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${m.status === "owner" ? "bg-orange-500/20 text-orange-400" : m.status === "joined" ? "bg-emerald-500/15 text-emerald-400" : "bg-white/8 text-white/30"}`}>
                {m.tag}
              </div>
            </div>
          ))}
          <div className="rounded-2xl px-4 py-3 flex items-center gap-3 border border-dashed border-white/[0.08] bg-transparent">
            <div className="w-9 h-9 rounded-full border border-dashed border-white/15 flex items-center justify-center text-white/20 text-xl">+</div>
            <span className="text-white/20 text-[13px]">Add member</span>
          </div>
        </div>

        <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4 mb-4">
          <div className="text-[10px] font-bold text-orange-400/60 uppercase tracking-widest mb-2">Your Invite Code</div>
          <div className="flex items-center gap-3">
            <div className="font-mono text-white font-bold text-[18px] tracking-widest flex-1">BARCE-7X9K</div>
            <div className="bg-orange-500/15 border border-orange-500/25 rounded-xl px-3 py-2 flex items-center gap-1.5">
              <Copy size={12} className="text-orange-400" />
              <span className="text-orange-400 text-[11px] font-bold">Copy</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-5">
          {[{ icon: "💬", label: "iMessage" }, { icon: "🟢", label: "WhatsApp" }, { icon: "🔗", label: "Copy Link" }].map((opt, i) => (
            <div key={i} className="flex-1 bg-white/[0.04] border border-white/[0.05] rounded-2xl py-2.5 flex flex-col items-center gap-1.5">
              <span className="text-lg">{opt.icon}</span>
              <span className="text-white/20 text-[10px] font-medium">{opt.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl py-3.5 flex items-center justify-center gap-2 mt-auto">
          <span className="text-black font-bold text-[14px]">Next: Pick Destination</span>
          <ArrowRight size={14} className="text-black" />
        </div>
        <TabBar active="trips" />
      </div>
    </PhoneFrame>
  );
}

function TripRandomizerQuizScreen() {
  const options = [
    { emoji: "🧘", label: "Beach & chill", sel: false },
    { emoji: "🚶", label: "City exploring", sel: false },
    { emoji: "⛰️", label: "Adventure mode", sel: true },
    { emoji: "🎉", label: "Full send", sel: false },
  ];
  return (
    <PhoneFrame label="Trip Roulette — Quiz" glow="bg-purple-500">
      <StatusBar />
      <div className="px-5 flex-1 flex flex-col">
        <div className="text-center mb-5">
          <div className="text-[22px] mb-1">🎲</div>
          <div className="text-white font-bold text-[18px]">Trip Roulette</div>
          <div className="text-white/25 text-[12px] mt-0.5">Answer 5 questions. We pick your adventure.</div>
        </div>

        <div className="mb-5">
          <div className="flex justify-between text-[10px] text-white/25 font-medium mb-1.5">
            <span>Question 3 of 5</span>
            <span>60%</span>
          </div>
          <div className="w-full h-1.5 bg-white/[0.06] rounded-full">
            <div className="h-full w-[60%] bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" />
          </div>
        </div>

        <div className="bg-white/[0.04] border border-white/[0.05] rounded-2xl p-4 mb-4 text-center">
          <div className="text-white font-bold text-[15px] leading-snug">What's your group's energy level?</div>
        </div>

        <div className="space-y-2.5 flex-1">
          {options.map((opt, i) => (
            <div key={i} className={`rounded-2xl px-4 py-3.5 flex items-center gap-3 border transition-all ${opt.sel ? "bg-orange-500/[0.08] border-orange-500/30" : "bg-white/[0.04] border-white/[0.05]"}`}>
              <span className="text-xl">{opt.emoji}</span>
              <span className={`flex-1 text-[14px] font-semibold ${opt.sel ? "text-white" : "text-white/40"}`}>{opt.label}</span>
              {opt.sel && (
                <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                  <Check size={11} className="text-white" strokeWidth={3} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl py-3.5 flex items-center justify-center gap-2 mt-4">
          <span className="text-black font-bold text-[15px]">Next →</span>
        </div>
        <TabBar active="discover" />
      </div>
    </PhoneFrame>
  );
}

function TripRandomizerResultScreen() {
  return (
    <PhoneFrame label="Trip Roulette — Result" glow="bg-emerald-500">
      <StatusBar />
      <div className="px-5 flex-1 flex flex-col">
        <div className="text-center mb-5">
          <div className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest mb-2">Your Adventure Awaits</div>
          <div className="text-2xl mb-1">🇵🇹</div>
          <div className="text-white font-bold text-[20px]">Lisbon, Portugal</div>
          <div className="text-white/25 text-[12px] mt-0.5">We picked it. You're going.</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 rounded-2xl p-4 mb-4">
          <div className="flex justify-between mb-3">
            <div className="text-center">
              <div className="text-white font-bold text-[18px]">5</div>
              <div className="text-white/30 text-[10px]">Days</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-white font-bold text-[18px]">$1,800</div>
              <div className="text-white/30 text-[10px]">for 4 people</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-white font-bold text-[18px]">$450</div>
              <div className="text-white/30 text-[10px]">per person</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 justify-center">
            <Star size={11} className="text-emerald-400" fill="currentColor" />
            <span className="text-emerald-400 text-[11px] font-bold">Great match for your group's vibe</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { emoji: "🏡", label: "Alfama District", tag: "Local Pick" },
            { emoji: "🐟", label: "Cervejaria Ramiro", tag: "SideQuest" },
            { emoji: "🌊", label: "Cascais Day Trip", tag: "Adventure" },
          ].map((act, i) => (
            <div key={i} className="bg-white/[0.04] border border-white/[0.05] rounded-xl p-2.5 text-center">
              <div className="text-xl mb-1">{act.emoji}</div>
              <div className="text-white text-[10px] font-semibold leading-tight mb-1">{act.label}</div>
              <div className="text-orange-400/70 text-[9px] font-bold">{act.tag}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-auto">
          <div className="flex-1 bg-white/[0.06] border border-white/[0.08] rounded-2xl py-3.5 text-center">
            <span className="text-white/50 font-bold text-[13px]">Spin Again</span>
          </div>
          <div className="flex-1 bg-white rounded-2xl py-3.5 flex items-center justify-center gap-1.5">
            <span className="text-black font-bold text-[13px]">Let's Go!</span>
            <span className="text-base">🚀</span>
          </div>
        </div>
        <TabBar active="discover" />
      </div>
    </PhoneFrame>
  );
}

function BudgetSettlementScreen() {
  const settlements = [
    { from: "Jake", fromEmoji: "🧔", to: "Sarah", toEmoji: "👩‍🦱", amount: "$47.50", action: "Settle" },
    { from: "You", fromEmoji: "😎", to: "Jake", toEmoji: "🧔", amount: "$23.00", action: "Settle" },
    { from: "Sarah", fromEmoji: "👩‍🦱", to: "You", toEmoji: "😎", amount: "$12.25", action: "Request" },
  ];
  return (
    <PhoneFrame label="Budget Settlement" glow="bg-emerald-500">
      <StatusBar />
      <div className="px-5 flex-1 flex flex-col">
        <div className="text-center mb-4">
          <div className="text-[22px] mb-1">🎉</div>
          <div className="text-white font-bold text-[18px]">Trip Complete!</div>
          <div className="text-white/25 text-[12px] mt-0.5">Here's who owes what</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/5 border border-emerald-500/20 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white/40 text-[12px]">Total Spent</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full">Under budget! 🎯</span>
            </div>
          </div>
          <div className="text-white font-bold text-[24px] mb-1">$2,247</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full">
              <div className="h-full w-[94%] bg-gradient-to-r from-emerald-400 to-green-400 rounded-full" />
            </div>
            <span className="text-white/25 text-[10px]">of $2,400</span>
          </div>
        </div>

        <div className="space-y-2.5 flex-1">
          {settlements.map((s, i) => (
            <div key={i} className="bg-white/[0.04] border border-white/[0.05] rounded-2xl px-4 py-3 flex items-center gap-2">
              <div className="text-lg">{s.fromEmoji}</div>
              <ArrowRight size={12} className="text-white/20 shrink-0" />
              <div className="text-lg">{s.toEmoji}</div>
              <div className="flex-1">
                <div className="text-white text-[13px] font-semibold">{s.from} → {s.to}</div>
                <div className="text-white/30 text-[11px] font-bold">{s.amount}</div>
              </div>
              <div className={`text-[11px] font-bold px-3 py-1.5 rounded-xl ${s.action === "Settle" ? "bg-orange-500/15 text-orange-400 border border-orange-500/25" : "bg-white/8 text-white/40 border border-white/10"}`}>
                {s.action}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/[0.03] border border-white/[0.04] rounded-2xl px-4 py-3 mt-4 text-center">
          <div className="text-[10px] text-white/20 font-medium">Settlements powered by <span className="text-orange-400/50 font-bold">SideQuest+</span></div>
        </div>
        <TabBar active="trips" />
      </div>
    </PhoneFrame>
  );
}

function PlanComparisonScreen() {
  const freeFeatures = [
    "Groups up to 3 people",
    "Swipe & discover activities",
    "Basic itinerary builder",
    "Budget breakdowns (view only)",
    "1 active trip at a time",
  ];
  const plusFeatures = [
    "Everything in Free",
    "Unlimited group size",
    "AI schedule optimization",
    "Budget settlements & splitting",
    "Booking assistance",
    "Unlimited active trips",
    "Trip Randomizer",
    "Priority early access",
  ];
  return (
    <PhoneFrame label="SideQuest vs SideQuest+" glow="bg-amber-400">
      <StatusBar />
      <div className="px-4 flex-1 flex flex-col">
        <div className="text-center mb-4">
          <div className="text-[10px] font-bold text-orange-400/60 uppercase tracking-widest mb-1.5">Pricing</div>
          <div className="text-white font-bold text-[17px]">Unlock the Full Adventure</div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 flex-1 mb-3">
          <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-3 flex flex-col">
            <div className="text-white/40 text-[11px] font-bold uppercase tracking-wider mb-1">Free</div>
            <div className="text-white font-bold text-[16px] mb-3">$0</div>
            <div className="space-y-2 flex-1">
              {freeFeatures.map((f, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <Check size={10} className="text-white/30 mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span className="text-white/30 text-[10px] leading-tight">{f}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-center py-2 rounded-xl border border-white/[0.08]">
              <span className="text-white/30 text-[11px] font-bold">Current Plan</span>
            </div>
          </div>

          <div className="bg-gradient-to-b from-orange-500/[0.12] to-amber-500/[0.06] border border-orange-500/30 rounded-2xl p-3 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-orange-500 text-white text-[8px] font-bold px-2.5 py-1 rounded-bl-xl rounded-tr-2xl">BEST</div>
            <div className="text-orange-400 text-[11px] font-bold uppercase tracking-wider mb-1">SideQuest+</div>
            <div className="text-white font-bold text-[16px] mb-3">$X<span className="text-white/30 text-[11px] font-normal">/mo</span></div>
            <div className="space-y-2 flex-1">
              {plusFeatures.map((f, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <Check size={10} className="text-orange-400 mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span className="text-white/60 text-[10px] leading-tight">{f}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center py-2.5 rounded-xl">
              <span className="text-[12px] font-bold">Upgrade</span>
            </div>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl py-2.5 px-3 text-center">
          <div className="text-amber-400 text-[11px] font-bold">🎁 First trip on SideQuest+ is free</div>
        </div>
        <TabBar active="profile" />
      </div>
    </PhoneFrame>
  );
}

function ProfileGamificationScreen() {
  const badges = [
    { emoji: "🌟", label: "Early Adopter" },
    { emoji: "💰", label: "Budget King" },
    { emoji: "👑", label: "Group Leader" },
    { emoji: "🗺️", label: "Explorer" },
    { emoji: "🤝", label: "Squad Builder" },
    { emoji: "✈️", label: "Jet Setter" },
  ];
  const countries = ["🇪🇸", "🇫🇷", "🇬🇧", "🇵🇹"];

  return (
    <PhoneFrame label="Profile & Gamification" glow="bg-blue-400">
      <StatusBar />
      <div className="flex-1 flex flex-col">
        <div className="bg-gradient-to-b from-orange-500/20 to-transparent px-5 pt-3 pb-5 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-2 shadow-lg shadow-orange-500/30">
            H
          </div>
          <div className="text-white font-bold text-[17px]">Hadi M.</div>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <Trophy size={12} className="text-amber-400" />
            <span className="text-amber-400 text-[11px] font-bold">Gold Explorer</span>
          </div>
        </div>

        <div className="px-5 flex-1 flex flex-col">
          <div className="mb-4">
            <div className="flex justify-between text-[10px] text-white/25 mb-1.5">
              <span>2,450 XP</span>
              <span>5,000 XP to Platinum</span>
            </div>
            <div className="w-full h-2 bg-white/[0.06] rounded-full">
              <div className="h-full w-[49%] bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {[{ num: "4", label: "Trips" }, { num: "12", label: "SideQuests" }, { num: "3", label: "Countries" }].map((s, i) => (
              <div key={i} className="bg-white/[0.04] border border-white/[0.05] rounded-xl py-2.5 text-center">
                <div className="text-white font-bold text-[16px]">{s.num}</div>
                <div className="text-white/25 text-[10px]">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Country Stamps</div>
            <div className="flex gap-2 flex-wrap">
              {countries.map((flag, i) => (
                <div key={i} className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center text-lg">{flag}</div>
              ))}
              <div className="w-9 h-9 rounded-xl border border-dashed border-white/[0.08] flex items-center justify-center text-white/15 text-xl">+</div>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Badges Earned</div>
            <div className="grid grid-cols-3 gap-2">
              {badges.map((b, i) => (
                <div key={i} className="bg-white/[0.04] border border-white/[0.05] rounded-xl py-2 px-1 flex flex-col items-center gap-1">
                  <span className="text-lg">{b.emoji}</span>
                  <span className="text-white/25 text-[9px] font-medium text-center leading-tight">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <TabBar active="profile" />
      </div>
    </PhoneFrame>
  );
}

const SECTIONS = [
  {
    id: "group-invite",
    tag: "Get Out the GC",
    title: "From group chat to trip in seconds",
    description: "Stop copy-pasting availability and chasing replies. Drop your invite code in the group chat — everyone joins, picks their dates, and you're off. No more one person doing all the coordination.",
    screen: <GroupChatInviteScreen />,
    glow: "from-orange-500/10",
  },
  {
    id: "trip-randomizer-quiz",
    tag: "Trip Roulette",
    title: "Can't decide where to go? Let us pick.",
    description: "Answer 5 questions about your group's vibe — beach chill vs. adventure mode, budget range, trip length — and SideQuest generates a destination your whole group will actually agree on.",
    screen: <TripRandomizerQuizScreen />,
    glow: "from-purple-500/10",
  },
  {
    id: "trip-randomizer-result",
    tag: "Trip Roulette — Reveal",
    title: "Your next adventure, revealed",
    description: "A full destination reveal with estimated costs, trip length, and curated activity previews. Love it? Start planning. Want another spin? We've got endless options.",
    screen: <TripRandomizerResultScreen />,
    glow: "from-emerald-500/10",
  },
  {
    id: "budget-settlement",
    tag: "Budget Settlement",
    title: "Trip's over. Here's who owes what.",
    description: "No more awkward \"hey can you Venmo me\" texts three weeks later. SideQuest tracks every expense during the trip and generates clean settlement summaries when you land.",
    screen: <BudgetSettlementScreen />,
    glow: "from-green-500/10",
  },
  {
    id: "plan-comparison",
    tag: "SideQuest+",
    title: "Free to plan. Plus to go further.",
    description: "The core SideQuest experience — swipe, vote, build an itinerary — is free. Upgrade to SideQuest+ for unlimited groups, AI optimization, expense settlements, and booking assistance.",
    screen: <PlanComparisonScreen />,
    glow: "from-amber-500/10",
  },
  {
    id: "profile",
    tag: "Profile & Gamification",
    title: "Your travel story, quantified",
    description: "Level up your explorer rank with every trip. Collect country stamps, earn badges, and track your SideQuest history. Adventure mode: unlocked.",
    screen: <ProfileGamificationScreen />,
    glow: "from-blue-500/10",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto max-w-7xl flex items-center gap-4">
          <Link href="/">
            <button className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-medium" data-testid="link-back-home">
              <ArrowLeft size={16} />
              Back
            </button>
          </Link>
          <div className="w-px h-4 bg-white/10" />
          <Logo className="text-white" />
          <div className="ml-auto">
            <Link href="/#waitlist">
              <button className="bg-white text-black font-semibold text-sm px-5 py-2 rounded-full hover:bg-white/90 transition-colors" data-testid="button-features-cta">
                Claim Your Spot
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">All Features</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Every screen. Every feature.
            </h1>
            <p className="text-lg text-white/50 max-w-xl mx-auto">
              The full SideQuest experience — from trip creation to post-trip settlements.
            </p>
          </motion.div>

          <div className="space-y-32">
            {SECTIONS.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20`}
                data-testid={`card-feature-${section.id}`}
              >
                <div className="flex-1 max-w-md">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">
                    {section.tag}
                  </div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">{section.title}</h2>
                  <p className="text-white/50 leading-relaxed text-[16px]">{section.description}</p>
                </div>
                <div className={`flex-1 flex justify-center relative`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${section.glow} to-transparent rounded-full blur-3xl pointer-events-none`} />
                  <div className="relative z-10">
                    {section.screen}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-32"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Ready to try it?</h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto">Join the waitlist and be first to access every feature when we open the beta.</p>
            <Link href="/">
              <button className="bg-white text-black font-bold text-lg px-10 py-4 rounded-2xl hover:bg-white/90 transition-colors shadow-lg shadow-orange-500/20" data-testid="button-features-bottom-cta">
                Claim Your Spot →
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
