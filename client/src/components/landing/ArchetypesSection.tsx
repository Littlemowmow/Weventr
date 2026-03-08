import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useFadeIn } from "@/hooks/use-fade-in";

const archetypes = [
  {
    key: "The Planner",
    emoji: "📋",
    name: "The Planner",
    description: "Creates the Google Doc. Sends the When2Meet. Does all the research. Gets zero credit. One more \"let me check with work\" away from going solo.",
    punchline: "Weventr takes this off your plate.",
    accent: "border-orange-500/20 bg-orange-500/5",
    accentSelected: "border-orange-500/60 bg-orange-500/15",
    punchlineColor: "text-orange-400",
    checkColor: "bg-orange-500",
  },
  {
    key: "The Flaker",
    emoji: "👻",
    name: "The Flaker",
    description: "Responds with fire emojis but never books. Classic lines: \"Maybe,\" \"I'll see,\" \"I'm down if you are.\" Exciting energy. Zero follow-through.",
    punchline: "Weventr sets deadlines so there's nowhere to hide.",
    accent: "border-red-500/20 bg-red-500/5",
    accentSelected: "border-red-500/60 bg-red-500/15",
    punchlineColor: "text-red-400",
    checkColor: "bg-red-500",
  },
  {
    key: "The Viber",
    emoji: "🏝️",
    name: "The Viber",
    description: "\"I'm down for whatever.\" \"You guys decide.\" Shows up at the airport with no idea what's happening. Fun to travel with. Impossible to plan with.",
    punchline: "Weventr lets them vote without having to organize anything.",
    accent: "border-blue-500/20 bg-blue-500/5",
    accentSelected: "border-blue-500/60 bg-blue-500/15",
    punchlineColor: "text-blue-400",
    checkColor: "bg-blue-500",
  },
  {
    key: "The Budget Ghost",
    emoji: "💸",
    name: "The Budget Ghost",
    description: "Goes suspiciously quiet when costs come up. Hasn't said no, but hasn't said yes either. Might be broke. Might just be avoiding the conversation.",
    punchline: "Weventr shows costs upfront so nobody has to guess.",
    accent: "border-emerald-500/20 bg-emerald-500/5",
    accentSelected: "border-emerald-500/60 bg-emerald-500/15",
    punchlineColor: "text-emerald-400",
    checkColor: "bg-emerald-500",
  },
];

function ArchetypeCard({ a, idx, selected, submitted, totalVotes, counts, onToggle }: {
  a: typeof archetypes[0];
  idx: number;
  selected: Set<string>;
  submitted: boolean;
  totalVotes: number;
  counts: Record<string, number>;
  onToggle: (key: string) => void;
}) {
  const { ref, isVisible } = useFadeIn(idx * 0.08);
  const isSelected = selected.has(a.key);
  const voteCount = counts[a.key] || 0;
  const pct = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;

  return (
    <div
      ref={ref}
      onClick={() => onToggle(a.key)}
      className={`fade-in${isVisible ? " visible" : ""} rounded-2xl border p-5 sm:p-6 flex flex-col gap-3 sm:gap-4 transition-all duration-300 ${
        !submitted ? "cursor-pointer hover:translate-y-[-2px]" : ""
      } ${isSelected ? a.accentSelected : a.accent} ${
        !submitted ? "hover:border-white/25" : ""
      }`}
      style={{ transitionDelay: `${idx * 0.08}s` }}
      data-testid={`card-archetype-${idx}`}
    >
      <div className="flex items-start justify-between">
        <div className="text-4xl">{a.emoji}</div>
        {!submitted && (
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              isSelected
                ? `${a.checkColor} border-transparent`
                : "border-white/20 bg-transparent"
            }`}
            data-testid={`checkbox-archetype-${idx}`}
          >
            {isSelected && <Check size={14} className="text-white" />}
          </div>
        )}
      </div>
      <div>
        <div className="text-white font-display font-bold text-lg mb-2">{a.name}</div>
        <p className="text-white/50 text-sm leading-relaxed">{a.description}</p>
      </div>
      <div className={`mt-auto pt-4 border-t border-white/10 text-xs font-semibold ${a.punchlineColor}`}>
        {a.punchline}
      </div>

      {totalVotes > 0 && (
        <div>
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`absolute inset-y-0 left-0 rounded-full ${a.checkColor}`}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] text-white/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
            <span className="text-[11px] text-white/40">{pct}%</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function ArchetypesSection() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [hasVotedBefore, setHasVotedBefore] = useState(false);
  const heading = useFadeIn();
  const submitArea = useFadeIn(0.3);
  const ctaArea = useFadeIn(0.4);

  useEffect(() => {
    const voted = localStorage.getItem("archetype_voted");
    if (voted) {
      setHasVotedBefore(true);
      setSubmitted(true);
    }

    const fetchCounts = () => {
      fetch("/api/archetypes/votes")
        .then((r) => r.json())
        .then((data) => { if (data.counts) setCounts(data.counts); })
        .catch(() => {});
    };

    fetchCounts();
    const interval = setInterval(fetchCounts, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggle = (key: string) => {
    if (submitted) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleSubmit = async () => {
    if (selected.size === 0 || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/archetypes/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ archetypes: Array.from(selected) }),
      });
      const data = await res.json();
      if (data.counts) setCounts(data.counts);
      setSubmitted(true);
      localStorage.setItem("archetype_voted", "true");
    } catch {
    } finally {
      setSubmitting(false);
    }
  };

  const totalVotes = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div
          ref={heading.ref}
          className={`fade-in${heading.isVisible ? " visible" : ""} text-center mb-14`}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">Every group has them</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Which one are you?
          </h2>
          {!submitted && (
            <p className="text-white/40 text-sm">Tap to select — you can pick more than one.</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {archetypes.map((a, idx) => (
            <ArchetypeCard
              key={a.key}
              a={a}
              idx={idx}
              selected={selected}
              submitted={submitted}
              totalVotes={totalVotes}
              counts={counts}
              onToggle={toggle}
            />
          ))}
        </div>

        {!submitted && (
          <div
            ref={submitArea.ref}
            className={`fade-in${submitArea.isVisible ? " visible" : ""} text-center mt-8`}
          >
            <Button
              onClick={handleSubmit}
              disabled={selected.size === 0 || submitting}
              className="rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 h-12 text-base shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              data-testid="button-submit-archetype"
            >
              {submitting ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
              {submitting ? "Submitting..." : `That's me${selected.size > 1 ? " (x" + selected.size + ")" : ""}`}
            </Button>
          </div>
        )}

        {submitted && (
          <div className="text-center mt-6 text-white/40 text-sm">
            {hasVotedBefore ? "You already voted — here are the results so far." : "Thanks for voting! Here's how everyone stacks up."}
          </div>
        )}

        <div
          ref={ctaArea.ref}
          className={`fade-in${ctaArea.isVisible ? " visible" : ""} text-center mt-10`}
        >
          <motion.a
            href="#waitlist"
            className="inline-flex items-center gap-2 animate-glow-text text-lg font-bold drop-shadow-[0_0_12px_rgba(249,115,22,0.4)] hover:drop-shadow-[0_0_20px_rgba(249,115,22,0.7)]"
            data-testid="link-archetype-waitlist"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.08 }}
          >
            Sign up for the waitlist to see how we actually do this 😉
          </motion.a>
        </div>
      </div>
    </section>
  );
}
