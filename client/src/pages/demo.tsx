import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, MapPin, Users, Calendar, DollarSign, Sun, Cloud, Heart, X, Check, Crown, ArrowUp, Sparkles } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import confetti from "canvas-confetti";

const SECTION_COUNT = 9;

const SECTION_IDS = ["hero", "imessage", "setup", "itinerary", "swipe", "vote", "schedule", "budget", "cta"];

const IMESSAGE_MESSAGES = [
  { text: "guys we NEED to plan this Barcelona trip", isMe: false, sender: "Sarah" },
  { text: "I'm so down. When are we thinking??", isMe: false, sender: "Mike" },
  { text: "June works for me but idk about budget", isMe: false, sender: "Jess" },
  { text: "let's just figure it out lol", isMe: true, sender: "You" },
  { text: "we say that every time and nothing happens 😭", isMe: false, sender: "Sarah" },
];

const ITINERARY_SLOTS = [
  { time: "Morning", activity: "La Boqueria Market", icon: "🍊", category: "Food" },
  { time: "Afternoon", activity: "Sagrada Familia", icon: "⛪", category: "Culture" },
  { time: "Evening", activity: "Gothic Quarter Walk", icon: "🏛️", category: "Explore" },
  { time: "Morning", activity: "Park Güell", icon: "🦎", category: "Culture", day: 2 },
  { time: "Afternoon", activity: "Barceloneta Beach", icon: "🏖️", category: "Relax", day: 2 },
  { time: "Evening", activity: "Tapas Crawl", icon: "🍷", category: "Food", day: 2 },
];

const SWIPE_CARDS = [
  { name: "Sunset Rooftop Tapas", icon: "🍷", tag: "Food & Drinks" },
  { name: "Rooftop Sunset Yoga", icon: "🧘", tag: "Wellness" },
  { name: "Secret Garden Brunch", icon: "🌿", tag: "Food" },
];

const VOTE_RESULTS = [
  { name: "Sunset Rooftop Tapas", votes: 4, total: 4, status: "Must Do", color: "bg-emerald-500" },
  { name: "Rooftop Yoga", votes: 3, total: 4, status: "Group Pick", color: "bg-blue-500" },
  { name: "Flamenco Show", votes: 2, total: 4, status: "", color: "bg-orange-500" },
  { name: "Tapas Tour", votes: 2, total: 4, status: "", color: "bg-amber-500" },
];

const AI_INSIGHTS = [
  { icon: "☀️", text: "Beach day → Wednesday (sunny)" },
  { icon: "⛪", text: "Sagrada Familia at 9am (shorter lines)" },
  { icon: "✈️", text: "Mike lands at 2pm (free afternoon first)" },
];

const BUDGET_PEOPLE = [
  { name: "You", emoji: "😎", budget: "$500", color: "border-orange-500/30" },
  { name: "Sarah", emoji: "👩", budget: "$400", color: "border-pink-500/30" },
  { name: "Mike", emoji: "🧑", budget: "$350", color: "border-blue-500/30" },
  { name: "Jess", emoji: "👧", budget: "$450", color: "border-emerald-500/30" },
];

const BUDGET_CATEGORIES = [
  { name: "Stays", amount: "$560", pct: 40, color: "bg-orange-500" },
  { name: "Food", amount: "$350", pct: 25, color: "bg-amber-500" },
  { name: "Activities", amount: "$280", pct: 20, color: "bg-emerald-500" },
  { name: "Transport", amount: "$210", pct: 15, color: "bg-blue-500" },
];

function SectionWrapper({ children, id, className = "" }: { children: React.ReactNode; id: string; className?: string }) {
  return (
    <section id={id} className={`min-h-screen flex items-center px-4 py-20 relative ${className}`}>
      <div className="container mx-auto max-w-6xl w-full">
        {children}
      </div>
    </section>
  );
}

function TwoCol({ text, mockup, reverse = false }: { text: React.ReactNode; mockup: React.ReactNode; reverse?: boolean }) {
  return (
    <div className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20 w-full`}>
      <div className="flex-1 max-w-lg">{text}</div>
      <div className="flex-1 flex justify-center">{mockup}</div>
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-[2.5rem] p-2.5 w-full max-w-[340px] mx-auto">
      <div className="bg-white/5 rounded-[2rem] overflow-hidden relative border border-white/5">
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 h-5 w-16 bg-black rounded-full z-20" />
        <div className="pt-10 pb-6 px-4 min-h-[480px]">
          {children}
        </div>
      </div>
    </div>
  );
}

function HookText({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center py-16"
    >
      <p className="text-white/40 italic text-lg font-medium">{text}</p>
    </motion.div>
  );
}

function SectionCounter({ current }: { current: number }) {
  if (current >= SECTION_COUNT) return null;
  return (
    <div aria-hidden="true" className="fixed bottom-6 right-6 z-50 text-white/20 font-mono text-sm font-bold tracking-wider hidden md:block">
      {String(current).padStart(2, "0")} / {String(SECTION_COUNT).padStart(2, "0")}
    </div>
  );
}

function IMessageSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleMessages(i);
      if (i >= IMESSAGE_MESSAGES.length) clearInterval(interval);
    }, 700);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div ref={ref}>
      <TwoCol
        text={
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
            <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">Step 1</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">It starts where your friends already are</h2>
            <p className="text-white/50 leading-relaxed text-lg">Open SideQuest right from your iMessage group chat — like GamePigeon, but for trips.</p>
          </motion.div>
        }
        mockup={
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
            <PhoneFrame>
              <div className="flex items-center justify-between mb-4">
                <div className="text-white/50 text-xs font-bold">← Messages</div>
                <div className="text-white font-bold text-sm">Summer Plans 🌴</div>
                <div className="w-6" />
              </div>
              <div className="space-y-2 mb-6">
                {IMESSAGE_MESSAGES.slice(0, visibleMessages).map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`py-2 px-3.5 rounded-2xl text-xs max-w-[80%] ${msg.isMe ? "bg-[#007AFF] text-white rounded-br-sm" : "bg-white/10 text-white/70 rounded-bl-sm"}`}>
                      {!msg.isMe && <div className="text-[9px] font-bold text-white/30 mb-0.5">{msg.sender}</div>}
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>
              {visibleMessages >= IMESSAGE_MESSAGES.length && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="border-t border-white/10 pt-4"
                >
                  <div className="flex items-center gap-3 justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/30 cursor-pointer"
                    >
                      S
                    </motion.div>
                    <span className="text-white/40 text-xs font-medium">Tap to plan with SideQuest</span>
                  </div>
                </motion.div>
              )}
            </PhoneFrame>
          </motion.div>
        }
      />
    </div>
  );
}

function QuickSetupSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setStep(i);
      if (i >= 5) clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  }, [isInView]);

  const items = [
    { icon: <MapPin size={16} />, label: "Barcelona, Spain", emoji: "📍" },
    { icon: <Users size={16} />, label: "4 people", emoji: "👥" },
    { icon: <Calendar size={16} />, label: "5 days · June 12-16", emoji: "📅" },
    { icon: <DollarSign size={16} />, label: "$$  · ~$1,700 budget", emoji: "💰" },
  ];

  return (
    <div ref={ref}>
      <TwoCol
        reverse
        text={
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
            <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">Step 2</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Set up your trip in seconds</h2>
            <p className="text-white/50 leading-relaxed text-lg">Location, group size, dates, budget — four quick picks and you're planning.</p>
          </motion.div>
        }
        mockup={
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
            <PhoneFrame>
              <div className="text-center mb-6">
                <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">New Trip</div>
                <div className="text-white font-display font-bold text-lg">Trip Setup</div>
              </div>
              <div className="space-y-3">
                {items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={step > i ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3"
                  >
                    <div className="text-xl">{item.emoji}</div>
                    <div className="text-white text-sm font-medium">{item.label}</div>
                    {step > i && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto">
                        <Check size={16} className="text-emerald-400" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
              {step >= 5 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl p-4 text-center"
                >
                  <div className="text-emerald-400 font-bold text-sm flex items-center justify-center gap-2">
                    <Check size={16} /> Trip Created!
                  </div>
                </motion.div>
              )}
            </PhoneFrame>
          </motion.div>
        }
      />
    </div>
  );
}

function SmartItinerarySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [visibleSlots, setVisibleSlots] = useState(0);
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i <= 3) {
        setVisibleSlots(i);
      } else if (i === 4) {
        setActiveDay(2);
        setVisibleSlots(4);
      } else {
        setVisibleSlots(i);
      }
      if (i >= ITINERARY_SLOTS.length) clearInterval(interval);
    }, 400);
    return () => clearInterval(interval);
  }, [isInView]);

  const day1Slots = ITINERARY_SLOTS.filter(s => !s.day || s.day === 1);
  const day2Slots = ITINERARY_SLOTS.filter(s => s.day === 2);
  const currentSlots = activeDay === 1 ? day1Slots : day2Slots;
  const slotsToShow = activeDay === 1
    ? currentSlots.slice(0, Math.min(visibleSlots, 3))
    : currentSlots.slice(0, Math.max(visibleSlots - 3, 0));

  return (
    <div ref={ref}>
      <TwoCol
        text={
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
            <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">Step 3</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">We handle the must-sees</h2>
            <p className="text-white/50 leading-relaxed text-lg">AI generates a base itinerary with the top activities, optimized for your schedule and preferences.</p>
          </motion.div>
        }
        mockup={
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
            <PhoneFrame>
              <div className="text-center mb-4">
                <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">AI Itinerary</div>
                <div className="text-white font-display font-bold">Barcelona · Day 1-2</div>
              </div>
              <div className="flex gap-2 mb-4">
                {["Day 1", "Day 2"].map((d, i) => (
                  <div key={d} className={`flex-1 text-center py-1.5 rounded-lg text-[11px] font-bold transition-colors duration-300 ${activeDay === i + 1 ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" : "bg-white/5 text-white/30 border border-white/5"}`}>
                    {d}
                  </div>
                ))}
              </div>
              <div className="space-y-2.5">
                {slotsToShow.map((slot, i) => (
                  <motion.div
                    key={`${activeDay}-${i}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3"
                  >
                    <div className="text-xl">{slot.icon}</div>
                    <div className="flex-1">
                      <div className="text-[9px] font-bold text-orange-400/80 uppercase tracking-wider">{slot.time}</div>
                      <div className="text-white text-sm font-medium">{slot.activity}</div>
                    </div>
                    <div className="text-[9px] font-bold text-white/20 bg-white/5 px-2 py-1 rounded-full">{slot.category}</div>
                  </motion.div>
                ))}
              </div>
              {visibleSlots >= ITINERARY_SLOTS.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2"
                >
                  <Sparkles size={14} className="text-orange-400" />
                  <span className="text-white/50 text-xs">Try Sarah's Barcelona 2024 remix</span>
                </motion.div>
              )}
            </PhoneFrame>
          </motion.div>
        }
      />
    </div>
  );
}

function SwipeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [currentCard, setCurrentCard] = useState(0);
  const [swipeDir, setSwipeDir] = useState<string | null>(null);
  const [addedItems, setAddedItems] = useState<string[]>([]);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const directions = ["right", "left", "right"];
    const timer = setInterval(() => {
      if (i >= SWIPE_CARDS.length) { clearInterval(timer); return; }
      const current = i;
      setSwipeDir(directions[current]);
      if (directions[current] === "right") {
        setAddedItems(prev => [...prev, SWIPE_CARDS[current].name]);
      }
      setTimeout(() => {
        setSwipeDir(null);
        setCurrentCard(prev => prev + 1);
      }, 400);
      i++;
    }, 750);
    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <div ref={ref}>
      <TwoCol
        reverse
        text={
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
            <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">Step 4</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Discover hidden gems</h2>
            <p className="text-white/50 leading-relaxed text-lg">Swipe through local SideQuests — rooftop yoga, secret gardens, sunset viewpoints. The stuff your guidebook doesn't know about.</p>
          </motion.div>
        }
        mockup={
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
            <PhoneFrame>
              <div className="text-center mb-4">
                <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">SideQuests</div>
                <div className="text-white font-display font-bold">Discover</div>
              </div>
              <div className="relative h-[300px] flex items-center justify-center mb-4">
                {currentCard < SWIPE_CARDS.length ? (
                  <motion.div
                    key={currentCard}
                    animate={{
                      x: swipeDir === "right" ? 200 : swipeDir === "left" ? -200 : 0,
                      rotate: swipeDir === "right" ? 15 : swipeDir === "left" ? -15 : 0,
                      opacity: swipeDir ? 0 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-4 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center"
                  >
                    <div className="text-5xl mb-4">{SWIPE_CARDS[currentCard].icon}</div>
                    <div className="text-white font-bold text-lg mb-1">{SWIPE_CARDS[currentCard].name}</div>
                    <div className="text-white/30 text-xs font-bold uppercase tracking-wider">{SWIPE_CARDS[currentCard].tag}</div>
                    {swipeDir === "right" && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-4 right-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full">
                        Added!
                      </motion.div>
                    )}
                    {swipeDir === "left" && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-4 left-4 bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold px-3 py-1 rounded-full">
                        Nah
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <div className="text-white/20 text-sm font-medium">All cards swiped!</div>
                )}
              </div>
              <div className="flex justify-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 opacity-60 cursor-default">
                  <X size={20} />
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 opacity-60 cursor-default">
                  <Heart size={20} />
                </div>
              </div>
              {addedItems.length > 0 && (
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {addedItems.map((item, i) => (
                    <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {item}
                    </motion.div>
                  ))}
                </div>
              )}
            </PhoneFrame>
          </motion.div>
        }
      />
    </div>
  );
}

function GroupVoteSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [fillPct, setFillPct] = useState(0);
  const [showTiebreaker, setShowTiebreaker] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      setFillPct(prev => {
        if (prev >= 100) { clearInterval(timer); return 100; }
        return prev + 2;
      });
    }, 30);
    const tieTimer = setTimeout(() => setShowTiebreaker(true), 1200);
    return () => { clearInterval(timer); clearTimeout(tieTimer); };
  }, [isInView]);

  return (
    <div ref={ref}>
      <TwoCol
        text={
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
            <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">Step 5</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Democracy, but for vacations</h2>
            <p className="text-white/50 leading-relaxed text-lg">Everyone votes anonymously — no peer pressure. SideQuest tallies it up and picks what the group actually wants.</p>
          </motion.div>
        }
        mockup={
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
            <PhoneFrame>
              <div className="text-center mb-6">
                <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Group Vote</div>
                <div className="text-white font-display font-bold">Results</div>
              </div>
              <div className="space-y-4">
                {VOTE_RESULTS.map((vote, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-white/70 font-medium">{vote.name}</span>
                      <span className="text-white/30 font-bold">{vote.votes}/{vote.total}</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        className={`h-full ${vote.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(vote.votes / vote.total) * fillPct}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    {fillPct >= 100 && vote.status && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-[9px] font-bold mt-1 ${vote.status === "Must Do" ? "text-emerald-400" : "text-blue-400"}`}>
                        {vote.status === "Must Do" ? "✓ " : "★ "}{vote.status}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
              {showTiebreaker && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-center"
                >
                  <div className="text-amber-400 text-xs font-bold mb-1">⚡ Tiebreaker!</div>
                  <div className="text-white/70 text-xs">Flamenco Show vs Tapas Tour</div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-2 flex items-center justify-center gap-1.5"
                  >
                    <Crown size={12} className="text-amber-400" />
                    <span className="text-white text-xs font-bold">Tapas Tour wins!</span>
                  </motion.div>
                </motion.div>
              )}
            </PhoneFrame>
          </motion.div>
        }
      />
    </div>
  );
}

function AIScheduleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 500),
      setTimeout(() => setPhase(3), 900),
      setTimeout(() => setPhase(4), 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <div ref={ref}>
      <TwoCol
        reverse
        text={
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
            <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">Step 6</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">AI builds the perfect schedule</h2>
            <p className="text-white/50 leading-relaxed text-lg">Weather, crowds, flights, travel times — SideQuest's AI factors in everything to create a schedule that actually makes sense.</p>
          </motion.div>
        }
        mockup={
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
            <PhoneFrame>
              <div className="text-center mb-6">
                <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Smart Schedule</div>
                <div className="text-white font-display font-bold">Optimizing...</div>
              </div>
              {phase >= 1 && (
                <div className="space-y-3">
                  {AI_INSIGHTS.slice(0, phase).map((insight, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3"
                    >
                      <div className="text-xl">{insight.icon}</div>
                      <div className="text-white/70 text-sm">{insight.text}</div>
                    </motion.div>
                  ))}
                </div>
              )}
              {phase >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4"
                >
                  <div className="text-emerald-400 text-xs font-bold mb-3 flex items-center gap-1.5">
                    <Check size={12} /> Optimized Schedule Ready
                  </div>
                  <div className="space-y-2">
                    {[
                      { time: "9:00", activity: "Sagrada Familia", weather: <Sun size={10} /> },
                      { time: "12:30", activity: "La Boqueria Market", weather: <Sun size={10} /> },
                      { time: "2:00", activity: "Pick up Mike ✈️", weather: <Cloud size={10} /> },
                      { time: "4:00", activity: "Gothic Quarter", weather: <Sun size={10} /> },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px]">
                        <span className="text-white/30 font-mono w-10">{item.time}</span>
                        <span className="text-white/70 flex-1">{item.activity}</span>
                        <span className="text-amber-400">{item.weather}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </PhoneFrame>
          </motion.div>
        }
      />
    </div>
  );
}

function BudgetSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timers = [
      setTimeout(() => setPhase(1), 150),
      setTimeout(() => setPhase(2), 300),
      setTimeout(() => setPhase(3), 450),
      setTimeout(() => setPhase(4), 600),
      setTimeout(() => setPhase(5), 900),
      setTimeout(() => setPhase(6), 1300),
      setTimeout(() => setPhase(7), 1700),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <div ref={ref}>
      <TwoCol
        text={
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
            <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">Step 7</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Everyone sets their budget. We find the sweet spot.</h2>
            <p className="text-white/50 leading-relaxed text-lg">Each person enters what they can spend — no awkward conversations. SideQuest aligns the group automatically and splits costs fairly.</p>
          </motion.div>
        }
        mockup={
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
            <PhoneFrame>
              <div className="text-center mb-4">
                <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Budget</div>
                <div className="text-white font-display font-bold">Set Your Budget</div>
              </div>

              <div className="space-y-2 mb-4">
                {BUDGET_PEOPLE.map((person, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={phase > i ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.35 }}
                    className={`bg-white/5 border ${person.color} rounded-xl p-2.5 flex items-center gap-2.5`}
                  >
                    <div className="text-lg">{person.emoji}</div>
                    <div className="flex-1">
                      <div className="text-white text-xs font-bold">{person.name}</div>
                      <div className="text-white/30 text-[9px]">submitted budget</div>
                    </div>
                    <div className="text-white font-bold text-sm">{person.budget}</div>
                    <Check size={12} className="text-emerald-400" />
                  </motion.div>
                ))}
              </div>

              {phase >= 5 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 rounded-2xl p-3 mb-3"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles size={12} className="text-orange-400" />
                    <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Group Alignment</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-white font-display font-bold text-xl">$350</div>
                      <div className="text-white/30 text-[10px]">per person target</div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 text-[10px] font-bold">$1,400 total</div>
                      <div className="text-white/20 text-[9px]">fits everyone's range</div>
                    </div>
                  </div>
                  <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              )}

              {phase >= 6 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1.5 mb-3">
                  <div className="text-white/30 text-[9px] font-bold uppercase tracking-widest mb-1">Suggested Breakdown</div>
                  {BUDGET_CATEGORIES.map((cat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${cat.color}`} />
                      <span className="text-white/50 text-[10px] flex-1">{cat.name}</span>
                      <span className="text-white/70 text-[10px] font-bold">{cat.amount}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {phase >= 7 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1.5">
                  <div className="text-white/30 text-[9px] font-bold uppercase tracking-widest mb-1">Settlements</div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-center justify-between">
                    <span className="text-white/60 text-[11px]">You owe Sarah</span>
                    <span className="text-red-400 text-[11px] font-bold">$45</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-center justify-between">
                    <span className="text-white/60 text-[11px]">Jess owes Mike</span>
                    <span className="text-emerald-400 text-[11px] font-bold">$20</span>
                  </div>
                </motion.div>
              )}
            </PhoneFrame>
          </motion.div>
        }
      />
    </div>
  );
}

function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const hasFired = useRef(false);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    fetch("/api/waitlist/count")
      .then(r => r.json())
      .then(data => { if (data.count >= 100) setWaitlistCount(data.count); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (isInView && !hasFired.current) {
      hasFired.current = true;
      setTimeout(() => {
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#F97316", "#FB923C", "#FDBA74", "#ffffff"],
          });
        } catch { /* confetti unavailable */ }
      }, 300);
    }
  }, [isInView]);

  const countText = waitlistCount
    ? `${waitlistCount.toLocaleString()}+ people already signed up`
    : "Join hundreds already signed up";

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="absolute inset-0 bg-gradient-radial from-orange-500/10 via-transparent to-transparent pointer-events-none" style={{ background: "radial-gradient(circle at center, rgba(249,115,22,0.08) 0%, transparent 70%)" }} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-center max-w-2xl relative z-10"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
          Plan trips the way they should be <span className="text-gradient">planned.</span>
        </h2>
        <p className="text-white/50 text-lg mb-10 max-w-lg mx-auto">
          Stop letting trips die in the group chat. SideQuest makes it happen.
        </p>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button
            onClick={() => {
              navigate("/");
              requestAnimationFrame(() => {
                document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
              });
            }}
            size="lg"
            className="rounded-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold h-16 px-12 shadow-2xl shadow-orange-500/30"
            data-testid="button-demo-cta"
          >
            Join the Waitlist
          </Button>
        </motion.div>
        <div className="mt-8 text-white/25 text-sm font-medium">
          {countText}
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-6 text-white/20 hover:text-white/40 text-sm inline-flex items-center gap-1.5 transition-colors"
          aria-label="Scroll to top and watch demo again"
        >
          <ArrowUp size={14} /> Watch again
        </button>
      </motion.div>
    </div>
  );
}

export default function DemoPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [activeSection, setActiveSection] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTION_IDS.indexOf(entry.target.id);
            if (idx >= 0) setActiveSection(idx + 1);
          }
        });
      },
      { threshold: 0.3 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-sq-primary selection:text-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-orange-500 origin-left z-50"
        style={{ scaleX }}
      />

      <SectionCounter current={activeSection} />

      <nav aria-label="Demo navigation" className="fixed top-[2px] left-0 right-0 z-40 px-4 py-3 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto max-w-6xl flex justify-between items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity" aria-label="Back to home">
            <Logo size="text-xl" className="text-white" />
          </Link>
          <Link href="/" className="inline-flex">
            <Button variant="ghost" className="text-white/40 hover:text-white text-sm rounded-full min-h-[44px]" data-testid="link-back-home">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      <section id="hero" className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4" data-testid="text-demo-hero">
            See How <span className="text-gradient">SideQuest</span> Works
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto mb-10">
            From group chat to group trip — scroll to see the magic.
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={28} className="text-white/20 mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      <SectionWrapper id="imessage"><IMessageSection /></SectionWrapper>
      <HookText text="Four taps. That's all it takes." />

      <SectionWrapper id="setup"><QuickSetupSection /></SectionWrapper>
      <HookText text="Now the AI does the boring part." />

      <SectionWrapper id="itinerary"><SmartItinerarySection /></SectionWrapper>
      <HookText text="But the best spots aren't in any guidebook." />

      <SectionWrapper id="swipe"><SwipeSection /></SectionWrapper>
      <HookText text="But how does the group decide?" />

      <SectionWrapper id="vote"><GroupVoteSection /></SectionWrapper>
      <HookText text="Now let the AI put it all together." />

      <SectionWrapper id="schedule"><AIScheduleSection /></SectionWrapper>
      <HookText text="One last thing — who owes who?" />

      <SectionWrapper id="budget"><BudgetSection /></SectionWrapper>
      <HookText text="That's SideQuest. Ready?" />

      <section id="cta"><CTASection /></section>
    </div>
  );
}
