import { motion } from "framer-motion";

const archetypes = [
  {
    emoji: "📋",
    name: "The Planner",
    description: "Creates the Google Doc. Sends the When2Meet. Does all the research. Gets zero credit. One more \"let me check with work\" away from going solo.",
    punchline: "Weventr takes this off your plate.",
    accent: "border-orange-500/20 bg-orange-500/5",
    punchlineColor: "text-orange-400",
  },
  {
    emoji: "👻",
    name: "The Flaker",
    description: "Responds with fire emojis but never books. Classic lines: \"Maybe,\" \"I'll see,\" \"I'm down if you are.\" Exciting energy. Zero follow-through.",
    punchline: "Weventr sets deadlines so there's nowhere to hide.",
    accent: "border-red-500/20 bg-red-500/5",
    punchlineColor: "text-red-400",
  },
  {
    emoji: "🏝️",
    name: "The Viber",
    description: "\"I'm down for whatever.\" \"You guys decide.\" Shows up at the airport with no idea what's happening. Fun to travel with. Impossible to plan with.",
    punchline: "Weventr lets them vote without having to organize anything.",
    accent: "border-blue-500/20 bg-blue-500/5",
    punchlineColor: "text-blue-400",
  },
  {
    emoji: "💸",
    name: "The Budget Ghost",
    description: "Goes suspiciously quiet when costs come up. Hasn't said no, but hasn't said yes either. Might be broke. Might just be avoiding the conversation.",
    punchline: "Weventr shows costs upfront so nobody has to guess.",
    accent: "border-emerald-500/20 bg-emerald-500/5",
    punchlineColor: "text-emerald-400",
  },
];

export function ArchetypesSection() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">Every group has them</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Which one are you?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {archetypes.map((a, idx) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`rounded-2xl border p-6 flex flex-col gap-4 ${a.accent} hover:border-white/20 transition-colors`}
              data-testid={`card-archetype-${idx}`}
            >
              <div className="text-4xl">{a.emoji}</div>
              <div>
                <div className="text-white font-display font-bold text-lg mb-2">{a.name}</div>
                <p className="text-white/50 text-sm leading-relaxed">{a.description}</p>
              </div>
              <div className={`mt-auto pt-4 border-t border-white/10 text-xs font-semibold ${a.punchlineColor}`}>
                {a.punchline}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors text-lg font-bold drop-shadow-[0_0_12px_rgba(249,115,22,0.5)] hover:drop-shadow-[0_0_20px_rgba(249,115,22,0.7)]"
            data-testid="link-archetype-waitlist"
          >
            Sign up for the waitlist to see how we actually do this 😉
          </a>
        </motion.div>
      </div>
    </section>
  );
}
