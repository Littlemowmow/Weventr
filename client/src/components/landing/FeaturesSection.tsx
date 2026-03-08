import { motion } from "framer-motion";
import { ArrowRight, Vote, Wallet, Map } from "lucide-react";
import { Link } from "wouter";

export function FeaturesSection() {
  const features = [
    {
      id: "swipe-vote",
      label: "Swipe & Vote",
      title: "Swipe & Vote",
      icon: <Vote size={24} />,
      description: "Everyone swipes on destinations and activities on their own — no awkward standoffs, no \"I'm down for whatever\" from the friend who never decides. Weventr surfaces what your group actually agrees on.",
    },
    {
      id: "budget-lock",
      label: "Budget Lock",
      title: "Budget Lock",
      icon: <Wallet size={24} />,
      description: "Everyone sees real costs before anyone commits — no sticker shock, no one going quiet when prices come up. Set a budget your whole group is comfortable with, and automatic splits mean nobody's chasing passive-aggressive Venmo requests three months later.",
    },
    {
      id: "squad-itinerary",
      label: "Squad Itinerary",
      title: "Squad Itinerary",
      icon: <Map size={24} />,
      description: "One shared plan everyone can see, edit, and actually contribute to. No more one person sending 47 unanswered messages while everyone else is just \"vibing.\" If you added it, your name's on it.",
    },
  ];

  return (
    <section id="features" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05, margin: "-100px 0px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors"
              data-testid={`card-feature-${idx}`}
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center text-orange-400 mb-5">
                {feature.icon}
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">
                {feature.label}
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed text-[15px]">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px 0px" }}
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
