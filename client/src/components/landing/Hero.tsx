import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";

const tripMembers = [
  { name: "Sarah", emoji: "👩‍🦰" },
  { name: "Mike", emoji: "🧔" },
  { name: "Jess", emoji: "👩" },
  { name: "Danny", emoji: "🧑‍🦱" },
  { name: "Priya", emoji: "👩‍🦳" },
];

const itinerary = [
  { day: "Day 1", label: "Arrive + Settle In", cost: 65 },
  { day: "Day 2", label: "Beach + Old Town", cost: 45 },
  { day: "Day 3", label: "Culture Day", cost: 80 },
  { day: "Day 4", label: "Day Trip + Fly Out", cost: 95 },
];

function CardFront() {
  return (
    <>
      <img src="/images/hero-barcelona.jpg" className="w-full h-full object-cover" alt="Barcelona trip destination" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/50 pointer-events-none" />

      <div className="absolute bottom-6 left-6 right-6 text-white">
        <div className="flex justify-between items-end mb-3">
          <div>
            <div className="text-[10px] font-semibold opacity-70 uppercase tracking-[0.2em] mb-1">Group Trip</div>
            <div className="text-2xl font-display font-bold tracking-tight">Barcelona</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 text-sm font-semibold border border-white/10">
            <Users size={14} className="inline mr-1" />5 going
          </div>
        </div>
        <div className="w-full h-[1px] bg-white/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            className="h-full bg-white/80"
          />
        </div>
        <div className="flex justify-between text-[10px] uppercase tracking-widest mt-1.5 opacity-50">
          <span>Budget: $1,200</span>
          <span>4 out of 5 are in</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 bg-white/15 backdrop-blur-md rounded-full px-3 py-1.5 text-[10px] font-semibold text-white/70 border border-white/10 uppercase tracking-wider">
        Tap to flip
      </div>
    </>
  );
}

function CardBack() {
  const totalPerPerson = itinerary.reduce((sum, d) => sum + d.cost, 0);

  return (
    <div className="w-full h-full bg-[#0c0c0e] flex flex-col overflow-hidden">
      <div className="bg-white/5 border-b border-white/10 px-4 pt-5 pb-3 flex items-center justify-between shrink-0">
        <div>
          <div className="text-[9px] font-bold text-orange-400 uppercase tracking-[0.2em] mb-0.5">4-Day Trip</div>
          <div className="text-base font-display font-bold text-white">Barcelona</div>
        </div>
        <div className="flex items-center -space-x-2">
          {tripMembers.map((m) => (
            <div key={m.name} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-sm border-2 border-[#0c0c0e]">
              {m.emoji}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 py-3 space-y-2">
        {itinerary.map((day, idx) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-white/[0.04] rounded-xl px-3 py-2.5 border border-white/[0.06] flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-md">{day.day}</span>
              <span className="text-xs font-bold text-white">{day.label}</span>
            </div>
            <span className="text-xs font-bold text-white/50">${day.cost}</span>
          </motion.div>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-white/10 bg-white/[0.03] shrink-0">
        <div className="flex justify-between items-center">
          <div className="text-[9px] font-bold text-white/30 uppercase tracking-wider">Total / person</div>
          <div className="text-sm font-bold text-orange-400">${totalPerPerson}</div>
        </div>
        <div className="text-[9px] text-white/25 mt-1 text-right uppercase tracking-wider">Tap to flip back</div>
      </div>
    </div>
  );
}

export function Hero() {
  const [isFlipped, setIsFlipped] = useState(false);

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-[70vh] lg:min-h-[90vh] flex flex-col justify-center px-4 pt-24 pb-12 lg:pt-28 lg:pb-16 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text content — CSS entrance animation, no JS dependency */}
          <div className="relative z-10 max-w-xl hero-entrance">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 font-bold text-sm mb-6 border border-orange-500/20" data-testid="badge-beta">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Beta Launching Soon
              </div>

              <h1 className="font-display font-bold leading-[1.05] tracking-tight text-white mb-5" data-testid="text-hero-title">
                <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl">The trip that actually<br/>makes it out of the <span className="text-gradient-gold">group chat.</span></span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-white/45 leading-relaxed mb-8 lg:mb-10 max-w-lg" data-testid="text-hero-subtitle">
                Weventr turns "I'm down if you are" into an actual trip. Group voting so nobody gets ignored, budget alignment so nobody goes quiet, and hidden gems your guidebook doesn't know about.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    onClick={scrollToWaitlist}
                    size="lg"
                    className="rounded-full bg-white hover:bg-white/90 text-black text-base font-semibold h-14 px-10 w-full sm:w-auto shadow-2xl shadow-orange-500/15 hover:shadow-orange-500/30 hover:scale-[1.02] transition-all"
                    data-testid="button-hero-cta"
                  >
                    Claim Your Spot <ArrowRight className="ml-2" size={18} />
                  </Button>
                </motion.div>
              </div>
          </div>

          <div className="lg:hidden mt-10 mx-auto max-w-[300px] hero-entrance-delayed">
            <motion.div
              className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 cursor-pointer"
              onClick={() => setIsFlipped(!isFlipped)}
              animate={{ height: isFlipped ? 340 : 230 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              data-testid="hero-card-mobile"
            >
              <AnimatePresence mode="wait">
                {!isFlipped ? (
                  <motion.div key="front-mobile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full h-[230px] relative">
                    <img src="/images/hero-barcelona.jpg" className="w-full h-full object-cover" alt="Barcelona trip destination" loading="eager" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/60 pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-[9px] font-semibold opacity-70 uppercase tracking-[0.2em] mb-0.5">Group Trip</div>
                          <div className="text-lg font-display font-bold">Barcelona</div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-md rounded-full px-2 py-0.5 text-[10px] font-semibold border border-white/10">
                          <Users size={10} className="inline mr-1" />5 going
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-2.5 right-2.5 bg-white/15 backdrop-blur-md rounded-full px-2 py-0.5 text-[8px] font-semibold text-white/70 border border-white/10 uppercase tracking-wider">
                      Tap
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="back-mobile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full h-[340px]">
                    <CardBack />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="relative h-[550px] lg:h-[650px] w-full hidden lg:block">
            <div className="w-full h-full relative flex items-center justify-center" style={{ perspective: "1200px" }}>
              <motion.div
                className="w-[440px] h-[580px] relative z-20 cursor-pointer hero-card-entrance"
                onClick={() => setIsFlipped(!isFlipped)}
                style={{ transformStyle: "preserve-3d" }}
                data-testid="hero-card-desktop"
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="w-full h-full relative"
                >
                  <div
                    className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl cinematic-glow"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <CardFront />
                  </div>

                  <div
                    className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <CardBack />
                  </div>
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {!isFlipped && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4 }}
                      className="absolute top-24 left-0 xl:-left-8 p-4 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl z-30 animate-float-slow border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg">
                          ✓
                        </div>
                        <div>
                          <div className="text-[10px] text-white/40 font-semibold uppercase tracking-wider">The group has spoken</div>
                          <div className="text-sm font-bold text-white">Barcelona won 4-1</div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.4 }}
                      className="absolute bottom-32 right-0 xl:-right-4 p-4 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl z-30 animate-float-slow border border-white/10"
                      style={{ animationDelay: "2s" }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 text-lg">
                          $
                        </div>
                        <div>
                          <div className="text-[10px] text-white/40 font-semibold uppercase tracking-wider">Per Person</div>
                          <div className="text-sm font-bold text-white">$71/day</div>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
