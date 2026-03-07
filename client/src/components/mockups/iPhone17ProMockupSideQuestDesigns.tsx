import {
  Heart, X, Check, MapPin, DollarSign, Clock, Grip, Sparkles, Star,
  Users, Flame, ThumbsUp, HelpCircle, AlertCircle,
  Home as HomeIcon, Utensils, Plane, Ticket
} from "lucide-react";

const PHONE_W = 280;
const PHONE_H = 596;
const FRAME_RADIUS = 54;
const SCREEN_INSET = 6;
const SCREEN_RADIUS = 49;
const SCREEN_W = PHONE_W - SCREEN_INSET * 2;
const SCREEN_H = PHONE_H - SCREEN_INSET * 2;

export function IPhone17ProFrame({ children }: { children: React.ReactNode }) {
  const frameId = `f${Math.random().toString(36).slice(2, 8)}`;
  return (
    <div className="relative mx-auto select-none shrink-0" style={{ width: PHONE_W, height: PHONE_H }}>
      <div
        className="absolute overflow-hidden"
        style={{
          left: SCREEN_INSET, top: SCREEN_INSET,
          width: SCREEN_W, height: SCREEN_H,
          borderRadius: SCREEN_RADIUS,
          background: "#0c0c0e",
          zIndex: 1,
        }}
      >
        <div className="flex items-center justify-between px-6 pt-3.5 pb-0.5">
          <span className="text-white text-[12px] font-semibold tracking-tight" style={{ fontFeatureSettings: "'tnum'" }}>9:41</span>
          <div className="flex items-center gap-[5px]">
            <svg width="16" height="11" viewBox="0 0 16 11" fill="white">
              <rect x="0" y="4" width="3" height="7" rx=".8"/>
              <rect x="4.5" y="2.5" width="3" height="8.5" rx=".8"/>
              <rect x="9" y="1" width="3" height="10" rx=".8"/>
              <rect x="13.5" y="0" width="2.5" height="11" rx=".8" opacity=".3"/>
            </svg>
            <svg width="15" height="11" viewBox="0 0 15 11" fill="white">
              <circle cx="7.5" cy="9.5" r="1.5"/>
              <path d="M4 6.5A5 5 0 0111 6.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <path d="M1.5 4A8.5 8.5 0 0113.5 4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x=".5" y=".5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity=".35"/>
              <rect x="1.5" y="1.5" width="18" height="9" rx="2.5" fill="white"/>
              <path d="M23 4v4a2 2 0 000-4z" fill="white" opacity=".4"/>
            </svg>
          </div>
        </div>
        <div className="flex justify-center mb-1.5">
          <div style={{
            width: 96, height: 24, borderRadius: 14,
            background: "#000",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.05)",
          }} />
        </div>
        <div className="px-4 pb-4 overflow-hidden" style={{ height: SCREEN_H - 72 }}>
          {children}
        </div>
      </div>

      <svg
        width={PHONE_W} height={PHONE_H}
        viewBox={`0 0 ${PHONE_W} ${PHONE_H}`}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 10, pointerEvents: "none" }}
      >
        <defs>
          <linearGradient id={`${frameId}-g`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9a9a9f"/>
            <stop offset="18%" stopColor="#b8b8bc"/>
            <stop offset="40%" stopColor="#7c7c80"/>
            <stop offset="60%" stopColor="#a8a8ad"/>
            <stop offset="80%" stopColor="#68686c"/>
            <stop offset="100%" stopColor="#3a3a3c"/>
          </linearGradient>
          <linearGradient id={`${frameId}-h`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.22)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
          </linearGradient>
          <mask id={`${frameId}-m`}>
            <rect width={PHONE_W} height={PHONE_H} fill="white"/>
            <rect x={SCREEN_INSET} y={SCREEN_INSET} width={SCREEN_W} height={SCREEN_H} rx={SCREEN_RADIUS} fill="black"/>
          </mask>
        </defs>

        <rect width={PHONE_W} height={PHONE_H} rx={FRAME_RADIUS} fill={`url(#${frameId}-g)`} mask={`url(#${frameId}-m)`}/>
        <rect width={PHONE_W} height={PHONE_H} rx={FRAME_RADIUS} fill={`url(#${frameId}-h)`} mask={`url(#${frameId}-m)`}/>
        <rect width={PHONE_W} height={PHONE_H} rx={FRAME_RADIUS} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
        <rect x={SCREEN_INSET} y={SCREEN_INSET} width={SCREEN_W} height={SCREEN_H} rx={SCREEN_RADIUS} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>

        {/* Mute toggle */}
        <rect x="-2" y="105" width="4" height="16" rx="2" fill="#606064"/>
        {/* Volume up */}
        <rect x="-2" y="132" width="4" height="30" rx="2" fill="#606064"/>
        {/* Volume down */}
        <rect x="-2" y="172" width="4" height="30" rx="2" fill="#606064"/>
        {/* Power / side */}
        <rect x={PHONE_W - 2} y="168" width="4" height="76" rx="2" fill="#606064"/>
        {/* Camera Control (iPhone 16 Pro+) */}
        <rect x={PHONE_W - 2} y="280" width="4" height="22" rx="2" fill="#606064"/>
      </svg>

      <div className="absolute inset-0 pointer-events-none" style={{
        zIndex: 0, borderRadius: FRAME_RADIUS,
        boxShadow: "0 48px 120px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,0,0,0.4)",
      }}/>
    </div>
  );
}


function GlassRow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`px-3 py-2 rounded-xl ${className}`} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
      {children}
    </div>
  );
}

function OrangeBtn({ children, small = false }: { children: React.ReactNode; small?: boolean }) {
  return (
    <div
      className={`text-center font-bold text-white rounded-xl ${small ? "text-[11px] py-2 px-3" : "text-[13px] py-3"}`}
      style={{ background: "linear-gradient(to right, #f97316, #f59e0b)", boxShadow: "0 0 20px rgba(249,115,22,0.2)" }}
    >
      {children}
    </div>
  );
}

function GhostBtn({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center text-[12px] font-semibold text-white/40 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
      {children}
    </div>
  );
}

function BudgetSlider({ label, icon, value, max }: { label: string; icon: React.ReactNode; value: number; max: number }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">{icon}<span className="text-[10px] text-white/50">{label}</span></div>
        <span className="text-[11px] font-bold text-white tabular-nums">${value}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div className="h-full rounded-full" style={{ width: `${(value / max) * 100}%`, background: "linear-gradient(to right, #f97316, #f59e0b)" }} />
      </div>
    </div>
  );
}


export function SwipeVoteMockup() {
  return (
    <IPhone17ProFrame>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-white font-semibold text-[13px]">Vote on Spots</div>
          <div className="text-white/35 text-[11px]">Barcelona · 5 members</div>
        </div>
        <div className="text-white/30 text-xs font-semibold">4 of 8</div>
      </div>

      <div className="relative rounded-2xl overflow-hidden mb-3 border border-white/8" style={{ height: 260 }}>
        <img src="/images/hero-barcelona.jpg" loading="lazy" decoding="async" className="w-full h-full object-cover" alt="Barcelona"/>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 55%)" }} />
        <div className="absolute top-3 left-3 right-3">
          <div className="h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
            <div className="h-full rounded-full" style={{ width: "50%", background: "rgba(255,255,255,0.75)" }} />
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="text-white font-bold text-[15px] font-display leading-tight">Barceloneta Beach</div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1 text-[11px] text-white/55"><MapPin size={9}/><span>Beach</span></div>
            <span className="text-emerald-400 font-semibold text-[11px]">Free</span>
            <div className="flex items-center gap-0.5 ml-auto">
              {[...Array(5)].map((_, i) => <Star key={i} size={9} className={i < 4 ? "text-orange-400 fill-orange-400" : "text-white/20"}/>)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mb-3">
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)", border: "1.5px solid rgba(239,68,68,0.3)" }}>
          <X size={20} className="text-red-400" strokeWidth={2.5}/>
        </div>
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(249,115,22,0.12)", border: "2px solid rgba(249,115,22,0.35)", boxShadow: "0 0 24px rgba(249,115,22,0.18)" }}>
          <Heart size={26} className="text-orange-400" strokeWidth={2} style={{ fill: "rgba(249,115,22,0.25)" }}/>
        </div>
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)", border: "1.5px solid rgba(239,68,68,0.3)" }}>
          <X size={20} className="text-red-400" strokeWidth={2.5}/>
        </div>
      </div>

      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}>
        <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(52,211,153,0.2)" }}>
          <Check size={9} className="text-emerald-400" strokeWidth={3}/>
        </div>
        <span className="text-emerald-400 text-[11px] font-semibold">4 out of 5 agreed on this spot</span>
      </div>
    </IPhone17ProFrame>
  );
}

export function BudgetLockMockup() {
  const people = [
    { name: "You", emoji: "😎", budget: "$500" },
    { name: "Sarah", emoji: "👩", budget: "$400" },
    { name: "Mike", emoji: "🧑", budget: "$350" },
    { name: "Jess", emoji: "👧", budget: "$450" },
  ];
  return (
    <IPhone17ProFrame>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-white font-semibold text-[13px]">Budget Lock</div>
          <div className="text-white/35 text-[11px]">Barcelona · 4 members</div>
        </div>
      </div>

      <div className="rounded-2xl p-4 mb-3" style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(245,158,11,0.07))", border: "1px solid rgba(249,115,22,0.22)" }}>
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles size={10} className="text-orange-400"/>
          <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest">Group Sweet Spot</span>
        </div>
        <div className="flex items-end gap-2 mb-2">
          <div className="text-[32px] font-bold font-display text-white leading-none">$350</div>
          <div className="text-[11px] text-white/40 pb-0.5">/ person</div>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div className="h-full rounded-full" style={{ width: "70%", background: "linear-gradient(to right, #f97316, #f59e0b)" }} />
        </div>
      </div>

      <div className="space-y-1.5 mb-3">
        {people.map((p, i) => (
          <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="text-sm shrink-0">{p.emoji}</span>
            <span className="text-white text-[12px] font-medium flex-1">{p.name}</span>
            <span className="text-white/60 text-[12px] font-semibold tabular-nums">{p.budget}</span>
            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(52,211,153,0.15)" }}>
              <Check size={9} className="text-emerald-400" strokeWidth={3}/>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <DollarSign size={12} className="text-emerald-400 shrink-0"/>
        <span className="text-[11px] text-white/40 flex-1">Splits update in real-time</span>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
        <span className="text-[10px] font-bold text-emerald-400">Live</span>
      </div>
    </IPhone17ProFrame>
  );
}

export function SquadItineraryMockup() {
  const items = [
    { time: "9 AM", activity: "La Boqueria Market", icon: "🍊", addedBy: "Jess", color: "rgba(249,115,22,0.15)" },
    { time: "2 PM", activity: "Gothic Quarter Walk", icon: "🏛️", addedBy: "Marco", color: "rgba(139,92,246,0.15)" },
    { time: "7 PM", activity: "Sunset Viewpoint", icon: "🌅", addedBy: "Jess", color: "rgba(14,165,233,0.15)" },
  ];
  return (
    <IPhone17ProFrame>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-white font-semibold text-[13px]">Barcelona · Day 1</div>
          <div className="text-white/35 text-[11px]">Sat, Jun 14 · 3 activities</div>
        </div>
      </div>

      <div className="flex rounded-xl p-[3px] mb-4" style={{ background: "rgba(255,255,255,0.05)" }}>
        {["Day 1", "Day 2", "Day 3"].map((d, i) => (
          <div key={d} className="flex-1 text-center py-1.5 rounded-[9px] text-[11px] font-semibold"
            style={i === 0 ? { background: "rgba(249,115,22,0.2)", color: "#f97316", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" } : { color: "rgba(255,255,255,0.25)" }}>
            {d}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0" style={{ background: item.color }}>{item.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-[12px] font-semibold leading-tight truncate">{item.activity}</div>
              <div className="text-white/30 text-[10px] mt-0.5">by {item.addedBy}</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-orange-400 text-[11px] font-bold">{item.time}</div>
              <Grip size={10} className="text-white/15 mt-1 mx-auto"/>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-center">
        <span className="text-[10px] text-white/20">Drag to reorder · Tap to edit</span>
      </div>
    </IPhone17ProFrame>
  );
}


export function TripSparkCreate() {
  return (
    <IPhone17ProFrame>
      <div className="text-white font-bold text-[14px] mb-1">Start a Trip Spark</div>
      <div className="text-white/35 text-[11px] mb-4">Create an idea, share the link</div>

      <div className="space-y-2.5 mb-5">
        <GlassRow>
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-orange-400 shrink-0"/>
            <span className="text-white text-[12px]">Barcelona, Spain</span>
          </div>
        </GlassRow>
        <GlassRow>
          <div className="flex items-center gap-2">
            <Calendar size={13} className="text-orange-400 shrink-0"/>
            <span className="text-white/50 text-[12px]">Jul 10 – Jul 18</span>
          </div>
        </GlassRow>
        <GlassRow>
          <div className="flex items-center gap-2">
            <Clock size={13} className="text-orange-400 shrink-0"/>
            <div className="flex-1">
              <div className="text-white/50 text-[11px]">Deadline to respond</div>
              <div className="text-white text-[12px] font-semibold">72 hours</div>
            </div>
          </div>
        </GlassRow>
      </div>

      <OrangeBtn>Create Trip Spark ⚡</OrangeBtn>

      <div className="mt-5 text-center space-y-1">
        <div className="text-[10px] text-white/25">A shareable link will be generated</div>
        <div className="text-[10px] text-white/25">Drop it in your group chat</div>
      </div>
    </IPhone17ProFrame>
  );
}

export function TripSparkResponse() {
  const days = ["S","M","T","W","T","F","S"];
  const available = [10,11,12,13,14,15,16,17,18];
  return (
    <IPhone17ProFrame>
      <div className="flex items-center gap-2 mb-1">
        <div className="text-base">✈️</div>
        <div>
          <div className="text-white font-bold text-[13px]">Sarah wants to go to Barcelona!</div>
          <div className="flex items-center gap-1 mt-0.5">
            <Clock size={9} className="text-red-400"/>
            <span className="text-red-400 text-[10px] font-bold">47h 23m left to respond</span>
          </div>
        </div>
      </div>

      <div className="mt-3 mb-2">
        <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1.5">Your availability</div>
        <div className="grid grid-cols-7 gap-[3px] text-center mb-1">
          {days.map((d, i) => <div key={`${d}${i}`} className="text-[8px] text-white/25 font-bold">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-[3px]">
          {Array.from({ length: 21 }, (_, i) => {
            const day = i + 7;
            const isAvail = available.includes(day);
            return (
              <div key={i} className="aspect-square rounded-md flex items-center justify-center text-[9px] font-semibold"
                style={isAvail ? { background: "rgba(249,115,22,0.2)", color: "#f97316", border: "1px solid rgba(249,115,22,0.3)" } : { background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.25)" }}>
                {day}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-2 mb-3">
        <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1.5">Budget caps</div>
        <div className="space-y-2">
          <BudgetSlider label="Accommodation / night" icon={<HomeIcon size={9} className="text-orange-400"/>} value={120} max={300}/>
          <BudgetSlider label="Flights round-trip" icon={<Plane size={9} className="text-orange-400"/>} value={450} max={800}/>
          <BudgetSlider label="Food / day" icon={<Utensils size={9} className="text-orange-400"/>} value={40} max={100}/>
          <BudgetSlider label="Activities / day" icon={<Ticket size={9} className="text-orange-400"/>} value={30} max={100}/>
          <BudgetSlider label="Total trip max" icon={<DollarSign size={9} className="text-orange-400"/>} value={1200} max={2000}/>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1"><OrangeBtn small>I'm in ✓</OrangeBtn></div>
        <div className="flex-1"><GhostBtn>Maybe 🤷</GhostBtn></div>
      </div>
    </IPhone17ProFrame>
  );
}

export function TripSparkStatus() {
  const people = [
    { name: "You", status: "in", emoji: "😎" },
    { name: "Sarah", status: "in", emoji: "👩" },
    { name: "Mike", status: "maybe", emoji: "🧑" },
    { name: "Jess", status: "waiting", emoji: "👧" },
    { name: "Marcus", status: "holding", emoji: "🧔" },
  ];
  return (
    <IPhone17ProFrame>
      <div className="text-center mb-3">
        <div className="text-white font-bold text-[14px]">Barcelona Trip</div>
        <div className="flex items-center justify-center gap-1 mt-1">
          <Clock size={10} className="text-red-400"/>
          <span className="text-red-400 text-[11px] font-bold">11h 42m remaining</span>
        </div>
      </div>

      <div className="rounded-xl p-3 mb-3" style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}>
        <div className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mb-1">Overlap Preview</div>
        <div className="text-white text-[12px] font-semibold">Jul 14–18 works for 3/5</div>
        <div className="text-white/40 text-[10px] mt-0.5">Budget sweet spot: ~$1,100/person</div>
      </div>

      <div className="space-y-1.5">
        {people.map((p, i) => (
          <GlassRow key={i}>
            <div className="flex items-center gap-2">
              <span className="text-sm">{p.emoji}</span>
              <span className="text-white text-[12px] font-medium flex-1">{p.name}</span>
              {p.status === "in" && (
                <div className="flex items-center gap-1">
                  <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ background: "rgba(52,211,153,0.2)" }}>
                    <Check size={8} className="text-emerald-400" strokeWidth={3}/>
                  </div>
                  <span className="text-emerald-400 text-[10px] font-semibold">I'm in</span>
                </div>
              )}
              {p.status === "maybe" && <span className="text-amber-400 text-[10px] font-semibold">Maybe</span>}
              {p.status === "waiting" && <span className="text-white/30 text-[10px]">⏳ Waiting</span>}
              {p.status === "holding" && <span className="text-red-400 text-[10px] font-bold">🚨 Holding up group</span>}
            </div>
          </GlassRow>
        ))}
      </div>

      <div className="mt-3"><GhostBtn>View Results →</GhostBtn></div>
    </IPhone17ProFrame>
  );
}

export function TripSparkResults() {
  return (
    <IPhone17ProFrame>
      <div className="text-center mb-3">
        <div className="text-base mb-1">🎉</div>
        <div className="text-white font-bold text-[14px]">Your trip is viable!</div>
        <div className="text-white/40 text-[11px] mt-0.5">4 out of 5 are in</div>
      </div>

      <div className="rounded-xl p-3 mb-2.5" style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}>
        <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-1">Dates That Work</div>
        <div className="text-white text-[13px] font-bold">Jul 14 – Jul 18 (5 nights)</div>
        <div className="text-white/40 text-[10px] mt-0.5">4/5 members available</div>
      </div>

      <div className="rounded-xl p-3 mb-2.5" style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}>
        <div className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mb-2">Budget Sweet Spot</div>
        <div className="space-y-1.5">
          {[
            { label: "Accommodation", val: "$100/night", icon: <HomeIcon size={9} className="text-orange-400"/> },
            { label: "Flights", val: "$420 RT", icon: <Plane size={9} className="text-orange-400"/> },
            { label: "Food", val: "$35/day", icon: <Utensils size={9} className="text-orange-400"/> },
            { label: "Activities", val: "$25/day", icon: <Ticket size={9} className="text-orange-400"/> },
          ].map((b, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">{b.icon}<span className="text-white/50 text-[10px]">{b.label}</span></div>
              <span className="text-white text-[11px] font-semibold tabular-nums">{b.val}</span>
            </div>
          ))}
          <div className="h-px my-1" style={{ background: "rgba(255,255,255,0.08)" }}/>
          <div className="flex items-center justify-between">
            <span className="text-orange-400 text-[11px] font-bold">Total per person</span>
            <span className="text-white text-[14px] font-bold">~$1,120</span>
          </div>
        </div>
      </div>

      <div className="text-white/20 text-[10px] text-center mb-2">Marcus didn't respond — trip continues without</div>
      <OrangeBtn>Let's plan this trip! →</OrangeBtn>
    </IPhone17ProFrame>
  );
}


export function BlindMatchSwipe() {
  return (
    <IPhone17ProFrame>
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-white font-semibold text-[13px]">Barcelona Spots</div>
          <div className="text-white/35 text-[10px]">Swipe round · 48h deadline</div>
        </div>
        <div className="text-white/30 text-[11px] font-semibold">5 of 12</div>
      </div>

      <div className="relative rounded-2xl overflow-hidden mb-3" style={{ height: 240, border: "1px solid rgba(255,255,255,0.08)" }}>
        <img src="/images/hero-barcelona.jpg" loading="lazy" decoding="async" className="w-full h-full object-cover" alt="Activity"/>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)" }}/>
        <div className="absolute top-2.5 left-2.5">
          <div className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: "rgba(249,115,22,0.2)", color: "#f97316", border: "1px solid rgba(249,115,22,0.3)" }}>🗺 Weventr</div>
        </div>
        <div className="absolute top-2.5 right-2.5">
          <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(52,211,153,0.2)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/>
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="text-white font-bold text-[15px] font-display">El Born Food Tour</div>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex items-center gap-1 text-[10px] text-white/55"><MapPin size={8}/><span>El Born</span></div>
            <span className="text-white/25">·</span>
            <span className="text-white font-bold text-[11px]">$45/person</span>
            <span className="text-white/25">·</span>
            <span className="text-white/50 text-[10px]">3 hrs</span>
          </div>
          <div className="flex gap-1 mt-1.5">
            {["Food", "Walking", "Evening"].map(t => (
              <span key={t} className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 mb-2">
        <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)", border: "1.5px solid rgba(239,68,68,0.3)" }}>
          <X size={18} className="text-red-400" strokeWidth={2.5}/>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(251,191,36,0.1)", border: "1.5px solid rgba(251,191,36,0.3)" }}>
          <Star size={16} className="text-amber-400" strokeWidth={2}/>
        </div>
        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(249,115,22,0.12)", border: "2px solid rgba(249,115,22,0.35)", boxShadow: "0 0 24px rgba(249,115,22,0.18)" }}>
          <Heart size={24} className="text-orange-400" strokeWidth={2} style={{ fill: "rgba(249,115,22,0.25)" }}/>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1"><div className="text-[9px] text-white/20">← NOPE</div><div className="w-16"/><div className="text-[9px] text-white/20">LIKE →</div></div>
      <div className="text-center text-[9px] text-white/15 mt-0.5">↑ SUPER LIKE</div>
    </IPhone17ProFrame>
  );
}

export function BlindMatchReveal() {
  return (
    <IPhone17ProFrame>
      <div className="text-center mb-3">
        <div className="text-white font-bold text-[14px]">Your group's picks are in!</div>
        <div className="text-white/35 text-[11px] mt-0.5">5 members voted · 12 activities</div>
      </div>

      <div className="mb-3">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Flame size={11} className="text-orange-400"/>
          <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Squad Lock · 100%</span>
        </div>
        <div className="rounded-xl p-2.5 mb-1.5" style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center text-base shrink-0">🍊</div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-[12px] font-semibold truncate">La Boqueria Market</div>
              <div className="text-white/40 text-[10px]">$0/person · 2 hrs</div>
            </div>
            <div className="shrink-0"><OrangeBtn small>Book →</OrangeBtn></div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center gap-1.5 mb-1.5">
          <ThumbsUp size={10} className="text-emerald-400"/>
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Majority · 4/5</span>
        </div>
        {[
          { name: "Gothic Quarter Walk", icon: "🏛️", price: "Free" },
          { name: "Sunset Viewpoint Hike", icon: "🌅", price: "$0" },
        ].map((a, i) => (
          <div key={i} className="rounded-xl p-2.5 mb-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0" style={{ background: "rgba(52,211,153,0.12)" }}>{a.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-[11px] font-semibold truncate">{a.name}</div>
                <div className="text-white/35 text-[10px]">{a.price}/person</div>
              </div>
              <Check size={12} className="text-emerald-400 shrink-0"/>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-3">
        <div className="flex items-center gap-1.5 mb-1.5">
          <HelpCircle size={10} className="text-white/30"/>
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Split · 50/50</span>
        </div>
        <div className="rounded-xl p-2.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0" style={{ background: "rgba(255,255,255,0.06)" }}>🎭</div>
            <div className="flex-1 min-w-0">
              <div className="text-white/50 text-[11px] font-semibold truncate">Flamenco Show</div>
              <div className="text-white/25 text-[10px]">$35/person</div>
            </div>
            <div className="px-2 py-1 rounded-full text-[9px] font-bold" style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.25)" }}>AI Tiebreaker?</div>
          </div>
        </div>
      </div>

      <OrangeBtn small>Build itinerary with matches →</OrangeBtn>
    </IPhone17ProFrame>
  );
}


export function BudgetSetCaps() {
  return (
    <IPhone17ProFrame>
      <div className="text-white font-bold text-[14px] mb-1">Set Your Budget</div>
      <div className="text-white/35 text-[11px] mb-4">Barcelona · 5 nights · Jul 14-18</div>

      <div className="space-y-3 mb-4">
        <BudgetSlider label="Accommodation / night" icon={<HomeIcon size={9} className="text-orange-400"/>} value={120} max={300}/>
        <BudgetSlider label="Flights round-trip" icon={<Plane size={9} className="text-orange-400"/>} value={450} max={800}/>
        <BudgetSlider label="Food / day" icon={<Utensils size={9} className="text-orange-400"/>} value={40} max={100}/>
        <BudgetSlider label="Activities / day" icon={<Ticket size={9} className="text-orange-400"/>} value={30} max={100}/>
      </div>

      <div className="rounded-xl p-3 mb-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-white/50 text-[10px]">Your estimated total</span>
          <span className="text-white text-[16px] font-bold tabular-nums">$1,400</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/50 text-[10px]">Your total cap</span>
          <span className="text-orange-400 text-[13px] font-bold tabular-nums">$1,500</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden mt-2" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div className="h-full rounded-full" style={{ width: "93%", background: "linear-gradient(to right, #f97316, #ef4444)" }}/>
        </div>
        <div className="flex items-center gap-1 mt-1.5">
          <AlertCircle size={9} className="text-amber-400"/>
          <span className="text-amber-400 text-[9px] font-semibold">Close to your cap — $100 remaining</span>
        </div>
      </div>

      <OrangeBtn>Lock My Budget 🔒</OrangeBtn>
    </IPhone17ProFrame>
  );
}

export function BudgetGroupSweetSpot() {
  const people = [
    { name: "You", emoji: "😎", total: "$1,400" },
    { name: "Sarah", emoji: "👩", total: "$1,200" },
    { name: "Mike", emoji: "🧑", total: "$1,000" },
    { name: "Jess", emoji: "👧", total: "$1,350" },
  ];
  return (
    <IPhone17ProFrame>
      <div className="text-center mb-3">
        <div className="text-white font-bold text-[14px]">Group Sweet Spot</div>
        <div className="text-white/35 text-[11px] mt-0.5">Barcelona · 4 budgets locked</div>
      </div>

      <div className="rounded-2xl p-4 mb-3" style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.14), rgba(245,158,11,0.07))", border: "1px solid rgba(249,115,22,0.22)" }}>
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles size={10} className="text-orange-400"/>
          <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest">Everyone comfortable at</span>
        </div>
        <div className="flex items-end gap-2 mb-1">
          <div className="text-[32px] font-bold font-display text-white leading-none">$1,000</div>
          <div className="text-[11px] text-white/40 pb-0.5">/ person</div>
        </div>
        <div className="text-white/30 text-[10px]">$4,000 group total · 5 nights</div>
      </div>

      <div className="rounded-xl p-3 mb-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Per-category sweet spots</div>
        <div className="space-y-1.5">
          {[
            { label: "Accommodation", val: "$80/night", pct: 57 },
            { label: "Flights", val: "$380 RT", pct: 48 },
            { label: "Food", val: "$30/day", pct: 30 },
            { label: "Activities", val: "$20/day", pct: 20 },
          ].map((c, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-white/50 text-[10px]">{c.label}</span>
                <span className="text-white text-[11px] font-semibold tabular-nums">{c.val}</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: "linear-gradient(to right, #f97316, #f59e0b)" }}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        {people.map((p, i) => (
          <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
            <span className="text-sm">{p.emoji}</span>
            <span className="text-white/60 text-[11px] flex-1">{p.name}</span>
            <span className="text-white/40 text-[11px] tabular-nums">{p.total}</span>
            <div className="w-3 h-3 rounded-full flex items-center justify-center" style={{ background: "rgba(52,211,153,0.15)" }}>
              <Check size={7} className="text-emerald-400" strokeWidth={3}/>
            </div>
          </div>
        ))}
      </div>
    </IPhone17ProFrame>
  );
}


export function ItineraryDayPlan() {
  const items = [
    { time: "9 AM", activity: "La Boqueria Market", icon: "🍊", by: "Jess", color: "rgba(249,115,22,0.15)", budget: "Free", ok: true },
    { time: "1 PM", activity: "Gothic Quarter Walk", icon: "🏛️", by: "Marco", color: "rgba(139,92,246,0.15)", budget: "Free", ok: true },
    { time: "4 PM", activity: "El Born Food Tour", icon: "🍷", by: "Sarah", color: "rgba(14,165,233,0.15)", budget: "$45", ok: false },
    { time: "8 PM", activity: "Sunset Viewpoint", icon: "🌅", by: "You", color: "rgba(52,211,153,0.15)", budget: "Free", ok: true },
  ];
  return (
    <IPhone17ProFrame>
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-white font-semibold text-[13px]">Day 1 · Barcelona</div>
          <div className="text-white/35 text-[10px]">Sat, Jul 14 · 4 activities</div>
        </div>
        <Users size={14} className="text-white/20"/>
      </div>

      <div className="flex rounded-xl p-[3px] mb-3" style={{ background: "rgba(255,255,255,0.05)" }}>
        {["Day 1","Day 2","Day 3","Day 4","Day 5"].map((d,i) => (
          <div key={d} className="flex-1 text-center py-1 rounded-[9px] text-[10px] font-semibold"
            style={i===0 ? { background: "rgba(249,115,22,0.2)", color: "#f97316", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" } : { color: "rgba(255,255,255,0.2)" }}>
            {d}
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0" style={{ background: item.color }}>{item.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-[11px] font-semibold truncate">{item.activity}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-white/25 text-[9px]">by {item.by}</span>
                <span className="text-white/15">·</span>
                <span className={`text-[9px] font-semibold ${item.ok ? "text-emerald-400" : "text-amber-400"}`}>{item.budget}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-orange-400 text-[10px] font-bold">{item.time}</div>
              <Grip size={9} className="text-white/15 mt-0.5 mx-auto"/>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-center text-[9px] text-white/15">Drag to reorder · Tap to edit</div>
    </IPhone17ProFrame>
  );
}

export function TaskDelegation() {
  const tasks = [
    { task: "Research hostels under $80/night", to: "Sarah", due: "Jul 5", done: true },
    { task: "Book flights for group", to: "You", due: "Jul 8", done: false },
    { task: "Find restaurant for Day 2 dinner", to: "Jess", due: "Jul 10", done: false },
    { task: "Get travel insurance quotes", to: "Mike", due: "Jul 6", done: true },
  ];
  return (
    <IPhone17ProFrame>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-white font-semibold text-[13px]">Tasks</div>
          <div className="text-white/35 text-[10px]">Barcelona · 2 of 4 done</div>
        </div>
        <div className="px-2 py-1 rounded-full text-[9px] font-bold" style={{ background: "rgba(249,115,22,0.15)", color: "#f97316" }}>+ Add Task</div>
      </div>

      <div className="rounded-xl p-3 mb-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-2">Contribution</div>
        <div className="flex gap-2">
          {[
            { name: "Sarah", count: 3, emoji: "👩" },
            { name: "You", count: 2, emoji: "😎" },
            { name: "Jess", count: 1, emoji: "👧" },
            { name: "Mike", count: 1, emoji: "🧑" },
            { name: "Marcus", count: 0, emoji: "🧔" },
          ].map((p, i) => (
            <div key={i} className="flex-1 text-center">
              <div className="text-sm mb-0.5">{p.emoji}</div>
              <div className={`text-[9px] font-bold ${p.count === 0 ? "text-red-400" : "text-white/50"}`}>{p.count}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        {tasks.map((t, i) => (
          <GlassRow key={i}>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0" style={t.done ? { background: "rgba(52,211,153,0.2)" } : { background: "rgba(255,255,255,0.06)" }}>
                {t.done && <Check size={8} className="text-emerald-400" strokeWidth={3}/>}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-[11px] font-medium ${t.done ? "text-white/30 line-through" : "text-white"}`}>{t.task}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-white/25 text-[9px]">→ {t.to}</span>
                  <span className="text-white/15">·</span>
                  <span className="text-white/25 text-[9px]">Due {t.due}</span>
                </div>
              </div>
            </div>
          </GlassRow>
        ))}
      </div>
    </IPhone17ProFrame>
  );
}


