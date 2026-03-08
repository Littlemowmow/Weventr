import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDown } from "lucide-react";

const CHAT_MESSAGES = [
  { text: "ok so are we actually doing Barcelona or not", sender: "Sarah", isMe: false },
  { text: "I'm so down. When tho??", sender: "Mike", isMe: false },
  { text: "June? But idk about budget", sender: "Jess", isMe: false },
  { text: "let's just figure it out lol", sender: "You", isMe: true },
  { text: "we say that every time 😭", sender: "Sarah", isMe: false },
  { text: "ok someone just make a plan", sender: "Mike", isMe: false },
  { text: "...", sender: "", isMe: true },
];

function AutoPlayChat() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleMessages(i);
      if (i >= CHAT_MESSAGES.length) {
        clearInterval(interval);
        setTimeout(() => setShowSolution(true), 7000);
      }
    }, 550);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div ref={ref} className="h-full flex flex-col bg-[#0a0a0a]">
      <div className="bg-white/5 border-b border-white/10 px-4 pt-8 pb-3 flex items-center gap-2">
        <div className="text-white font-bold text-sm">Summer Plans 🌴</div>
        <div className="ml-auto text-white/20 text-[10px]">4 people</div>
      </div>

      <div className="flex-1 overflow-hidden px-3 py-3 space-y-1.5">
        {CHAT_MESSAGES.slice(0, visibleMessages).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
          >
            <div className={`py-1.5 px-3 rounded-2xl text-[11px] max-w-[80%] ${msg.isMe ? "bg-[#007AFF] text-white rounded-br-sm" : "bg-white/10 text-white/70 rounded-bl-sm"}`}>
              {!msg.isMe && msg.sender && <div className="text-[8px] font-bold text-white/30 mb-0.5">{msg.sender}</div>}
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>

      {showSolution && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.3 }}
          className="px-3 pb-4"
        >
          <div className="bg-gradient-to-r from-orange-500/15 to-amber-500/10 border border-orange-500/25 rounded-2xl p-3 text-center">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-500/30 mx-auto mb-2"
            >
              W
            </motion.div>
            <div className="text-white text-[11px] font-bold mb-0.5">Open Weventr</div>
            <div className="text-white/30 text-[9px]">Plan it for real this time</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function ChatBubble({ text, isMe }: { text: string; isMe?: boolean }) {
  return (
    <div className={`py-2 px-3 rounded-2xl text-xs max-w-[90%] mb-1.5 ${isMe ? "bg-blue-500 text-white rounded-br-sm ml-auto" : "bg-white/10 text-white/70 rounded-bl-sm mr-auto"}`}>
      {text}
    </div>
  );
}

export function ProblemSection() {
  return (
    <section id="demo" className="py-24 px-4 overflow-hidden">
      <div className="container mx-auto max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px 0px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">The Problem</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4" data-testid="text-problem-title">
            Don't let the trip die in the <br/>
            <span className="text-gradient">Group Chat.</span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto mb-16">
            Sound familiar? See how Weventr fixes it.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto flex justify-center items-center min-h-[520px] lg:min-h-[600px]">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px 0px" }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="glass-card rounded-[2.5rem] p-2.5 relative z-10 w-full max-w-[320px] mx-auto border border-white/10"
            data-testid="demo-phone-frame"
          >
            <div className="bg-black rounded-[2rem] overflow-hidden h-[520px] flex flex-col relative">
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 h-5 w-16 bg-black rounded-full z-20 pointer-events-none border border-white/10" />
              <AutoPlayChat />
            </div>
          </motion.div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-orange-500/10 to-rose-500/10 rounded-full blur-[80px] -z-10 pointer-events-none" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px 0px" }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/15 text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 text-base group"
            data-testid="button-sound-familiar"
          >
            Sound familiar? There's a better way
            <ArrowDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
