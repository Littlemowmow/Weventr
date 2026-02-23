import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const oldWay = [
  "Links get lost in 200 unread messages",
  "\"I'm down if you are\" — nobody decides",
  "Budget fights that kill the vibe",
  "One person does all the work",
  "Venmo requests 3 months later",
];

const sidequestWay = [
  "All ideas organized in one place",
  "Anonymous voting — no awkward standoffs",
  "Smart budget matching for your group",
  "Shared itinerary everyone contributes to",
  "Automatic expense splitting in real-time",
];

export function ComparisonSection() {
  return (
    <section className="py-24 px-4" data-testid="section-comparison">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">Compare</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white" data-testid="text-comparison-title">
            The perfect companion to your group chat
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-white/15 transition-colors"
          >
            <h3 className="text-lg font-bold text-white/40 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-500/15 flex items-center justify-center">
                <X size={16} className="text-red-400" />
              </div>
              Planning in group chats
            </h3>
            <ul className="space-y-4">
              {oldWay.map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-white/35 text-[15px]">
                  <span className="text-red-400/60 mt-0.5 font-bold text-sm shrink-0">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 rounded-3xl p-8 border border-orange-500/20 shadow-lg shadow-orange-500/5 hover:border-orange-500/30 transition-colors"
          >
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Check size={16} className="text-orange-400" />
              </div>
              Planning with SideQuest
            </h3>
            <ul className="space-y-4">
              {sidequestWay.map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-white/80 font-medium text-[15px]">
                  <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-orange-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
