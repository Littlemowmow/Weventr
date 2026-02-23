import { motion } from "framer-motion";
import { Heart, X, Check, Clock, MapPin, DollarSign, Users, Grip, Sparkles } from "lucide-react";

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-[2.5rem] p-2.5 w-full max-w-[280px] mx-auto">
      <div className="bg-white/5 rounded-[2rem] overflow-hidden relative border border-white/5">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 h-4 w-14 bg-black rounded-full z-20" />
        <div className="pt-8 pb-6 px-4">
          {children}
        </div>
      </div>
    </div>
  );
}

function SwipeVoteMockup() {
  return (
    <PhoneFrame>
      <div className="text-center mb-3">
        <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Swipe to Vote</div>
        <div className="text-xs text-white/40">Barcelona Trip &middot; 5 members</div>
      </div>
      <div className="relative rounded-2xl overflow-hidden shadow-lg mb-4 aspect-[3/4] border border-white/10">
        <img src="/images/hero-barcelona.jpg" loading="lazy" decoding="async" className="w-full h-full object-cover" alt="Barcelona beach" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="text-lg font-bold font-display">Barceloneta Beach</div>
          <div className="flex items-center gap-2 text-xs opacity-70 mt-0.5">
            <MapPin size={10} /> Beach &middot; Free
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6 mb-3">
        <div className="w-14 h-14 rounded-full bg-red-500/10 border-2 border-red-500/20 flex items-center justify-center text-red-400 shadow-sm hover:scale-110 transition-transform cursor-default">
          <X size={24} />
        </div>
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-sm hover:scale-110 transition-transform cursor-default">
          <Heart size={24} />
        </div>
      </div>
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2 text-center">
        <div className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1.5">
          <Check size={12} /> Group Match: 4/5 agreed
        </div>
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
      <div className="text-center mb-4">
        <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Budget Lock</div>
        <div className="text-xs text-white/40">Barcelona Trip &middot; 4 members</div>
      </div>
      <div className="space-y-2 mb-4">
        {people.map((person, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-center gap-2.5">
            <div className="text-base">{person.emoji}</div>
            <div className="flex-1">
              <div className="text-white text-xs font-bold">{person.name}</div>
            </div>
            <div className="text-white/70 font-bold text-sm">{person.budget}</div>
            <Check size={12} className="text-emerald-400" />
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 rounded-2xl p-3.5 mb-3 border border-orange-500/20">
        <div className="flex items-center gap-1.5 mb-1">
          <Sparkles size={10} className="text-orange-400" />
          <div className="text-[9px] font-bold text-orange-400 uppercase tracking-widest">Group Sweet Spot</div>
        </div>
        <div className="text-2xl font-bold font-display text-white">$350</div>
        <div className="text-xs text-white/40 mt-0.5">per person &middot; $1,400 total</div>
      </div>
      <div className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2.5 border border-white/10">
        <div className="flex items-center gap-2">
          <DollarSign size={14} className="text-emerald-400" />
          <span className="text-xs font-medium text-white/50">Real-time splits</span>
        </div>
        <div className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">Live</div>
      </div>
    </PhoneFrame>
  );
}

function SquadItineraryMockup() {
  const items = [
    { time: "Morning", activity: "La Boqueria Market", icon: "🍊", addedBy: "Jess" },
    { time: "Afternoon", activity: "Gothic Quarter Walk", icon: "🏛️", addedBy: "Marco" },
    { time: "Evening", activity: "Sunset Viewpoint Hike", icon: "🌅", addedBy: "Jess" },
  ];

  return (
    <PhoneFrame>
      <div className="text-center mb-4">
        <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Squad Itinerary</div>
        <div className="text-xs text-white/40">Barcelona Trip &middot; Day 1</div>
      </div>
      <div className="flex gap-2 mb-4">
        {["Day 1", "Day 2", "Day 3"].map((d, i) => (
          <div key={d} className={`flex-1 text-center py-1.5 rounded-lg text-[11px] font-bold ${i === 0 ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" : "bg-white/5 text-white/30 border border-white/5"}`}>
            {d}
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/10 flex items-start gap-3 group hover:border-orange-500/20 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-lg shrink-0">{item.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">{item.time}</div>
              <div className="text-sm font-bold text-white truncate">{item.activity}</div>
              <div className="text-[10px] text-white/30 mt-0.5">Added by {item.addedBy}</div>
            </div>
            <Grip size={14} className="text-white/15 mt-1 shrink-0" />
          </div>
        ))}
      </div>
      <div className="mt-3 text-center">
        <div className="text-[10px] text-white/20 font-medium">Drag to reorder &middot; Tap to edit</div>
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
      description: "No more \"I'm down if you are.\" Everyone swipes on destinations and activities independently. SideQuest finds what your group actually agrees on — no awkward standoffs.",
      mockup: <SwipeVoteMockup />,
    },
    {
      id: "budget-lock",
      label: "Budget Lock",
      title: "Budget Lock",
      description: "Set a group budget everyone's comfortable with before anyone books anything. Real-time expense tracking and automatic splits so nobody's chasing Venmo requests three months later.",
      mockup: <BudgetLockMockup />,
    },
    {
      id: "squad-itinerary",
      label: "Squad Itinerary",
      title: "Squad Itinerary",
      description: "Build a shared itinerary everyone can see and edit. Drag, drop, remix. No more one person doing all the work while everyone else says \"whatever you think.\"",
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
            Three tools that replace 200 unread messages.
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
      </div>
    </section>
  );
}
