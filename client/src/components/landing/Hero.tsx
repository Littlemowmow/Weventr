import { useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, PlayCircle } from "lucide-react";

const MOBILE_BREAKPOINT = 1024;

export function Hero() {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (window.innerWidth < MOBILE_BREAKPOINT) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[90vh] flex flex-col justify-center px-4 pt-28 pb-16 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="relative z-10 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sq-primary/10 text-sq-primary font-bold text-sm mb-6 border border-sq-primary/20" data-testid="badge-beta">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sq-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sq-primary"></span>
                </span>
                Beta Launching Soon
              </div>

              <h1 className="font-display font-bold leading-[1.05] tracking-tight text-white mb-6" data-testid="text-hero-title">
                <span className="text-5xl md:text-6xl lg:text-7xl">The World Is <br/>
                <span className="text-gradient-gold">Waiting.</span></span>
                <br/>
                <span className="text-4xl md:text-5xl lg:text-[3.5rem] text-white/50">Your groupchat is <span className="text-blue-400/80">frozen.</span></span>
              </h1>
              
              <p className="text-base md:text-xl text-white/50 leading-relaxed mb-10 max-w-lg" data-testid="text-hero-subtitle">
                SideQuest is the app that turns "I'm down if you are" into an actual trip — with group voting, budget alignment, and hidden gems your guidebook doesn't know about. Built by college students, for college students.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button 
                    onClick={scrollToWaitlist}
                    size="lg" 
                    className="rounded-full bg-white hover:bg-white/90 text-black text-base font-semibold h-14 px-10 shadow-2xl shadow-orange-500/15 hover:shadow-orange-500/30 hover:scale-[1.02] transition-all"
                    data-testid="button-hero-cta"
                  >
                    Claim Your Spot <ArrowRight className="ml-2" size={18} />
                  </Button>
                </motion.div>
                
                <button 
                  onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center gap-3 cursor-pointer group px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Try interactive demo"
                  data-testid="button-hero-demo"
                >
                   <div className="w-10 h-10 rounded-full bg-white/15 border border-white/25 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <PlayCircle className="text-white w-5 h-5" />
                   </div>
                   <span className="font-medium text-white/60 group-hover:text-white transition-colors text-sm">Try the demo</span>
                </button>
              </div>

            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:hidden mt-10 mx-auto max-w-[320px]"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-[4/3] border border-white/10">
              <img src="/images/hero-barcelona.jpg" className="w-full h-full object-cover" alt="Barcelona trip destination" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/60 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[9px] font-semibold opacity-70 uppercase tracking-[0.2em] mb-0.5">Group Trip</div>
                    <div className="text-xl font-display font-bold">Barcelona</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-full px-2.5 py-1 text-xs font-semibold border border-white/10">
                    <Users size={12} className="inline mr-1" />5 going
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="relative h-[550px] lg:h-[650px] w-full hidden lg:block" style={{ perspective: "2000px" }}>
            <motion.div 
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="w-full h-full relative flex items-center justify-center"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-[440px] h-[580px] rounded-[2rem] overflow-hidden shadow-2xl relative z-20 group cinematic-glow"
                style={{ transform: "translateZ(40px)" }}
              >
                 <img src="/images/hero-barcelona.jpg" className="w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-110" alt="Barcelona trip destination" fetchPriority="high" />
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
                       <span>80% agreed</span>
                    </div>
                 </div>
              </motion.div>

              <motion.div 
                 className="absolute top-24 left-0 xl:-left-8 p-4 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl z-30 animate-float-slow border border-white/10"
                 style={{ transform: "translateZ(70px)" }}
              >
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg">
                      ✓
                    </div>
                    <div>
                      <div className="text-[10px] text-white/40 font-semibold uppercase tracking-wider">Vote Result</div>
                      <div className="text-sm font-bold text-white">Barcelona won 4-1</div>
                    </div>
                 </div>
              </motion.div>

              <motion.div 
                 className="absolute bottom-32 right-0 xl:-right-4 p-4 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl z-30 border border-white/10"
                 style={{ transform: "translateZ(60px)", animation: "float-slow 8s ease-in-out 2s infinite" }}
              >
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 text-lg">
                      $
                    </div>
                    <div>
                      <div className="text-[10px] text-white/40 font-semibold uppercase tracking-wider">Per Person</div>
                      <div className="text-sm font-bold text-white">$85/day</div>
                    </div>
                 </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
