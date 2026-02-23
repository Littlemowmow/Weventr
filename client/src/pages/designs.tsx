import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Check, ChevronRight, Apple, Star, User, Heart, X, MapPin, Share2, Copy, Settings, HelpCircle, LogOut, Trophy, CheckCircle, Bell, Shield, Grip, Wifi, Signal, BatteryFull } from "lucide-react";

function PhoneFrame({ children, label, glow }: { children: React.ReactNode; label: string; glow?: string }) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative group">
        {glow && <div className={`absolute -inset-4 rounded-[4rem] blur-2xl opacity-20 ${glow}`} />}
        <div className="relative rounded-[3rem] p-[10px] w-[320px] bg-gradient-to-b from-[#222] to-[#171717] border border-white/[0.06] shadow-2xl shadow-black/60">
          <div className="bg-[#0a0a0a] rounded-[2.2rem] overflow-hidden relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-[120px] bg-[#0a0a0a] rounded-b-3xl z-20 flex items-center justify-center pt-1">
              <div className="w-12 h-3 bg-[#1a1a1a] rounded-full" />
            </div>
            <div className="pt-10 pb-5 min-h-[590px] flex flex-col">
              {children}
            </div>
          </div>
        </div>
      </div>
      <div className="text-[11px] font-bold text-white/25 uppercase tracking-[0.2em] text-center">{label}</div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex justify-between items-center px-6 pb-2 text-[10px] font-semibold text-white/35">
      <span>9:41</span>
      <div className="flex gap-1.5 items-center">
        <Signal size={10} />
        <Wifi size={10} />
        <BatteryFull size={12} />
      </div>
    </div>
  );
}

function ScreenHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-7">
      <div className="text-orange-400/60 text-[10px] font-bold uppercase tracking-[0.25em] mb-2.5">{label}</div>
      <div className="text-white font-bold text-[22px] leading-tight">{title}</div>
      {subtitle && <div className="text-white/25 text-[13px] mt-1.5">{subtitle}</div>}
    </div>
  );
}

function PillRow({ emoji, text, sub, right, highlight }: { emoji: string; text: string; sub?: string; right?: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl px-5 py-4 flex items-center gap-4 transition-all ${highlight ? "bg-orange-500/[0.08] border border-orange-500/20" : "bg-white/[0.05] border border-white/[0.05]"}`}>
      <span className="text-[22px] shrink-0">{emoji}</span>
      <div className="flex-1 min-w-0">
        <span className="text-white font-semibold text-[15px]">{text}</span>
        {sub && <div className="text-white/20 text-[11px] mt-0.5">{sub}</div>}
      </div>
      {right}
    </div>
  );
}

function GreenCheck() {
  return <Check size={18} className="text-emerald-400" strokeWidth={2.5} />;
}

function ProgressDots({ step }: { step: number }) {
  return (
    <div className="flex gap-1.5 justify-center pt-1 mb-6">
      {[0,1,2,3,4,5,6,7].map(i => (
        <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "w-7 bg-orange-400" : "w-1.5 bg-white/[0.08]"}`} />
      ))}
    </div>
  );
}

function SignInScreen() {
  return (
    <PhoneFrame label="Sign In" glow="bg-orange-500">
      <StatusBar />
      <div className="px-6 flex-1 flex flex-col justify-center">
        <ScreenHeader label="Welcome Back" title="Sign In" />
        <div className="space-y-3 mb-5">
          <div className="bg-white/[0.05] border border-white/[0.05] rounded-2xl px-5 py-4">
            <span className="text-white/20 text-[14px]">Email address</span>
          </div>
          <div className="bg-white/[0.05] border border-white/[0.05] rounded-2xl px-5 py-4">
            <span className="text-white/20 text-[14px]">Password</span>
          </div>
        </div>
        <div className="text-right mb-6">
          <span className="text-orange-400/60 text-xs font-medium">Forgot password?</span>
        </div>
        <div className="bg-white rounded-2xl py-4 text-center mb-5">
          <span className="text-black font-bold text-[15px]">Sign In</span>
        </div>
        <div className="flex items-center gap-4 mb-5">
          <div className="flex-1 h-px bg-white/[0.05]" />
          <span className="text-white/12 text-[11px]">or</span>
          <div className="flex-1 h-px bg-white/[0.05]" />
        </div>
        <div className="flex gap-3 mb-8">
          <div className="flex-1 bg-white/[0.05] border border-white/[0.05] rounded-2xl py-3.5 flex items-center justify-center gap-2">
            <Apple size={18} className="text-white" />
            <span className="text-white/70 text-sm font-medium">Apple</span>
          </div>
          <div className="flex-1 bg-white/[0.05] border border-white/[0.05] rounded-2xl py-3.5 flex items-center justify-center gap-2">
            <span className="text-white font-bold text-sm">G</span>
            <span className="text-white/70 text-sm font-medium">Google</span>
          </div>
        </div>
        <div className="text-center">
          <span className="text-white/15 text-[13px]">Don't have an account? </span>
          <span className="text-orange-400 text-[13px] font-bold">Sign Up</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

function SignUpScreen() {
  return (
    <PhoneFrame label="Sign Up">
      <StatusBar />
      <div className="px-6 flex-1 flex flex-col justify-center">
        <ScreenHeader label="Get Started" title="Create Account" />
        <div className="space-y-3 mb-6">
          <div className="bg-white/[0.05] border border-white/[0.05] rounded-2xl px-5 py-4">
            <span className="text-white/20 text-[14px]">Email address</span>
          </div>
          <div className="bg-white/[0.05] border border-white/[0.05] rounded-2xl px-5 py-4">
            <span className="text-white/20 text-[14px]">Password</span>
          </div>
          <div className="bg-white/[0.05] border border-white/[0.05] rounded-2xl px-5 py-4">
            <span className="text-white/20 text-[14px]">Confirm password</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl py-4 text-center mb-5">
          <span className="text-black font-bold text-[15px]">Sign Up</span>
        </div>
        <div className="flex items-center gap-4 mb-5">
          <div className="flex-1 h-px bg-white/[0.05]" />
          <span className="text-white/12 text-[11px]">or</span>
          <div className="flex-1 h-px bg-white/[0.05]" />
        </div>
        <div className="flex gap-3 mb-8">
          <div className="flex-1 bg-white/[0.05] border border-white/[0.05] rounded-2xl py-3.5 flex items-center justify-center gap-2">
            <Apple size={18} className="text-white" />
            <span className="text-white/70 text-sm font-medium">Apple</span>
          </div>
          <div className="flex-1 bg-white/[0.05] border border-white/[0.05] rounded-2xl py-3.5 flex items-center justify-center gap-2">
            <span className="text-white font-bold text-sm">G</span>
            <span className="text-white/70 text-sm font-medium">Google</span>
          </div>
        </div>
        <div className="text-center">
          <span className="text-white/15 text-[13px]">Already have an account? </span>
          <span className="text-orange-400 text-[13px] font-bold">Sign In</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ResetPasswordScreen() {
  return (
    <PhoneFrame label="Reset Password">
      <StatusBar />
      <div className="px-6 flex-1 flex flex-col justify-center">
        <div className="text-4xl text-center mb-6">🔐</div>
        <ScreenHeader label="Forgot Password" title="Reset Password" subtitle="Enter your email to receive a reset link." />
        <div className="bg-white/[0.05] border border-white/[0.05] rounded-2xl px-5 py-4 mb-6">
          <span className="text-white/20 text-[14px]">Email address</span>
        </div>
        <div className="bg-white rounded-2xl py-4 text-center">
          <span className="text-black font-bold text-[15px]">Send Reset Link</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

function OnboardingWelcome() {
  return (
    <PhoneFrame label="Welcome" glow="bg-orange-500">
      <StatusBar />
      <div className="px-6 flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 rounded-[1.75rem] bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-bold text-4xl shadow-xl shadow-orange-500/25 mb-10">S</div>
        <div className="text-orange-400/50 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">Welcome to</div>
        <div className="text-white font-bold text-[26px] mb-4">SideQuest</div>
        <p className="text-white/25 text-[14px] leading-relaxed mb-12 px-1">Discover hidden gems, plan epic trips, and travel like a local — not a tourist.</p>
        <div className="w-full bg-white rounded-2xl py-4 text-center">
          <span className="text-black font-bold text-[15px]">Let's Go</span>
        </div>
        <ProgressDots step={0} />
      </div>
    </PhoneFrame>
  );
}

function OnboardingTripIntent() {
  return (
    <PhoneFrame label="Trip Intent">
      <StatusBar />
      <div className="px-6 flex-1 flex flex-col">
        <ProgressDots step={1} />
        <ScreenHeader label="Step 2" title="What brings you here?" />
        <div className="space-y-3 flex-1">
          <PillRow emoji="🗺️" text="Planning a specific trip" right={<GreenCheck />} highlight />
          <PillRow emoji="💡" text="Exploring ideas" />
          <PillRow emoji="👥" text="Finding travel buddies" />
          <PillRow emoji="🌍" text="Building a bucket list" />
        </div>
        <div className="bg-white rounded-2xl py-4 text-center mt-6">
          <span className="text-black font-bold text-[15px]">Continue</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

function OnboardingTravelStyle() {
  const styles = [
    { icon: "⛰️", label: "Adventure", sel: true },
    { icon: "🏛️", label: "Culture", sel: true },
    { icon: "🍜", label: "Foodie", sel: false },
    { icon: "🧘", label: "Relaxation", sel: false },
    { icon: "🎉", label: "Nightlife", sel: true },
    { icon: "🌿", label: "Nature", sel: false },
  ];
  return (
    <PhoneFrame label="Travel Style">
      <StatusBar />
      <div className="px-6 flex-1 flex flex-col">
        <ProgressDots step={2} />
        <ScreenHeader label="Step 3" title="Travel Style" subtitle="Pick all that apply." />
        <div className="grid grid-cols-2 gap-3 flex-1">
          {styles.map((s, i) => (
            <div key={i} className={`rounded-2xl p-4 flex flex-col items-center gap-2.5 border ${s.sel ? "border-orange-500/25 bg-orange-500/[0.06]" : "border-white/[0.05] bg-white/[0.03]"}`}>
              <span className="text-3xl">{s.icon}</span>
              <span className="text-white/80 text-[14px] font-medium">{s.label}</span>
              {s.sel && <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center"><Check size={11} className="text-white" strokeWidth={3} /></div>}
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl py-4 text-center mt-6">
          <span className="text-black font-bold text-[15px]">Continue</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

function OnboardingInterests() {
  const interests = ["Hiking", "Museums", "Street Food", "Surfing", "Photography", "Markets", "Diving", "Wine", "Architecture", "Festivals", "Yoga", "Nightlife"];
  const sel = [0, 2, 4, 7, 9];
  return (
    <PhoneFrame label="Interests">
      <StatusBar />
      <div className="px-6 flex-1 flex flex-col">
        <ProgressDots step={3} />
        <ScreenHeader label="Step 4" title="Interests" subtitle="Select at least 3." />
        <div className="flex flex-wrap gap-2.5 flex-1 content-start">
          {interests.map((tag, i) => (
            <div key={i} className={`px-4 py-2.5 rounded-full text-[13px] font-medium border ${sel.includes(i) ? "border-orange-500/25 bg-orange-500/[0.08] text-orange-400" : "border-white/[0.05] bg-white/[0.03] text-white/25"}`}>
              {tag}
            </div>
          ))}
        </div>
        <div className="text-center text-[12px] text-white/15 mb-3">{sel.length} selected</div>
        <div className="bg-white rounded-2xl py-4 text-center">
          <span className="text-black font-bold text-[15px]">Continue</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

function OnboardingBudget() {
  return (
    <PhoneFrame label="Budget">
      <StatusBar />
      <div className="px-6 flex-1 flex flex-col">
        <ProgressDots step={4} />
        <ScreenHeader label="Step 5" title="Budget Style" />
        <div className="flex-1 flex flex-col items-center justify-center -mt-4">
          <div className="text-5xl mb-5">⚖️</div>
          <div className="text-white font-bold text-[24px] mb-1.5">Balanced</div>
          <div className="text-white/25 text-[14px] mb-12">Mix of budget-friendly and splurges</div>
          <div className="w-full px-1 mb-4">
            <div className="w-full h-2.5 bg-white/[0.06] rounded-full relative">
              <div className="absolute left-0 top-0 h-full w-[60%] bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" />
              <div className="absolute top-1/2 -translate-y-1/2 left-[60%] -translate-x-1/2 w-6 h-6 rounded-full bg-white shadow-lg shadow-orange-500/30 border-2 border-orange-500" />
            </div>
          </div>
          <div className="flex justify-between w-full px-1 text-[10px] text-white/15 font-medium uppercase tracking-wider">
            <span>Backpacker</span>
            <span>Luxury</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl py-4 text-center mt-6">
          <span className="text-black font-bold text-[15px]">Continue</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

function OnboardingPace() {
  return (
    <PhoneFrame label="Pace">
      <StatusBar />
      <div className="px-6 flex-1 flex flex-col">
        <ProgressDots step={5} />
        <ScreenHeader label="Step 6" title="Travel Pace" />
        <div className="flex-1 flex flex-col items-center justify-center -mt-4">
          <div className="text-5xl mb-5">🚶</div>
          <div className="text-white font-bold text-[24px] mb-1.5">Super Chill</div>
          <div className="text-white/25 text-[14px] mb-12">1-2 activities per day</div>
          <div className="w-full px-1 mb-4">
            <div className="w-full h-2.5 bg-white/[0.06] rounded-full relative">
              <div className="absolute left-0 top-0 h-full w-[25%] bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
              <div className="absolute top-1/2 -translate-y-1/2 left-[25%] -translate-x-1/2 w-6 h-6 rounded-full bg-white shadow-lg shadow-blue-400/30 border-2 border-blue-400" />
            </div>
          </div>
          <div className="flex justify-between w-full px-1 text-[10px] text-white/15 font-medium uppercase tracking-wider">
            <span>Super Chill</span>
            <span>Go Go Go!</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl py-4 text-center mt-6">
          <span className="text-black font-bold text-[15px]">Continue</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

function OnboardingNotifications() {
  return (
    <PhoneFrame label="Notifications">
      <StatusBar />
      <div className="px-6 flex-1 flex flex-col items-center justify-center text-center">
        <div className="text-5xl mb-8">🔔</div>
        <div className="text-orange-400/50 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">Stay in the Loop</div>
        <div className="text-white font-bold text-[22px] mb-3">Enable Notifications</div>
        <p className="text-white/25 text-[14px] leading-relaxed mb-12 px-1">Get notified when your crew votes, plans change, or it's time to pack.</p>
        <div className="w-full bg-white rounded-2xl py-4 text-center mb-4">
          <span className="text-black font-bold text-[15px]">Enable Notifications</span>
        </div>
        <button className="text-white/15 text-[14px] font-medium">Maybe Later</button>
        <div className="mt-10"><ProgressDots step={6} /></div>
      </div>
    </PhoneFrame>
  );
}

function OnboardingAllSet() {
  return (
    <PhoneFrame label="All Set" glow="bg-emerald-500">
      <StatusBar />
      <div className="px-6 flex-1 flex flex-col items-center justify-center text-center">
        <div className="text-5xl mb-6">✅</div>
        <div className="text-emerald-400/60 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">You're Ready</div>
        <div className="text-white font-bold text-[22px] mb-7">All Set!</div>
        <div className="w-full space-y-3 mb-8">
          <PillRow emoji="⛰️" text="Adventure, Culture, Nightlife" right={<GreenCheck />} />
          <PillRow emoji="⚖️" text="Balanced budget" right={<GreenCheck />} />
          <PillRow emoji="🚶" text="Super Chill pace" right={<GreenCheck />} />
        </div>
        <div className="w-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl py-4 text-center shadow-lg shadow-orange-500/20">
          <span className="text-white font-bold text-[15px]">Start Exploring</span>
        </div>
        <div className="mt-8"><ProgressDots step={7} /></div>
      </div>
    </PhoneFrame>
  );
}

function SwipeToVote() {
  return (
    <PhoneFrame label="Swipe to Vote" glow="bg-emerald-500">
      <StatusBar />
      <div className="px-5 flex-1 flex flex-col">
        <ScreenHeader label="Swipe to Vote" title="Barcelona Trip" subtitle="5 members" />
        <div className="flex-1 flex flex-col items-center justify-center -mt-2">
          <div className="w-full rounded-3xl overflow-hidden relative border border-white/[0.06] mb-7 shadow-xl shadow-black/40">
            <div className="h-56 bg-gradient-to-br from-emerald-700/40 via-teal-600/25 to-cyan-500/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="text-white font-bold text-[22px] mb-1.5 leading-tight">Barceloneta Beach</div>
              <div className="text-white/35 text-[14px] flex items-center gap-1.5">
                <MapPin size={13} /> Beach &middot; Free
              </div>
            </div>
          </div>
          <div className="flex gap-8 mb-7">
            <div className="w-[60px] h-[60px] rounded-full border-2 border-red-500/25 bg-red-500/[0.05] flex items-center justify-center">
              <X size={26} className="text-red-400/80" />
            </div>
            <div className="w-[60px] h-[60px] rounded-full border-2 border-emerald-500/25 bg-emerald-500/[0.05] flex items-center justify-center">
              <Heart size={26} className="text-emerald-400/80" />
            </div>
          </div>
          <div className="w-full bg-emerald-500/[0.08] border border-emerald-500/15 rounded-2xl py-3.5 text-center">
            <span className="text-emerald-400 font-bold text-[14px] flex items-center justify-center gap-2"><Check size={16} strokeWidth={2.5} /> Group Match: 4/5 agreed</span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function BudgetLock() {
  return (
    <PhoneFrame label="Budget Lock" glow="bg-orange-500">
      <StatusBar />
      <div className="px-5 flex-1 flex flex-col">
        <ScreenHeader label="Budget" title="Set Your Budget" subtitle="Barcelona Trip &middot; 4 members" />
        <div className="space-y-3 mb-5">
          <PillRow emoji="😎" text="You" sub="submitted budget" right={<><span className="text-white font-bold text-[18px] mr-2">$500</span><GreenCheck /></>} />
          <PillRow emoji="👩" text="Sarah" sub="submitted budget" right={<><span className="text-white font-bold text-[18px] mr-2">$400</span><GreenCheck /></>} />
          <PillRow emoji="🧑" text="Mike" sub="submitted budget" right={<><span className="text-white font-bold text-[18px] mr-2">$350</span><GreenCheck /></>} />
          <PillRow emoji="👩‍🦰" text="Jess" sub="submitted budget" right={<><span className="text-white font-bold text-[18px] mr-2">$450</span><GreenCheck /></>} />
        </div>
        <div className="bg-orange-500/[0.08] border border-orange-500/20 rounded-2xl p-5 mb-4">
          <div className="text-orange-400/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5 flex items-center gap-1.5">✨ Group Alignment</div>
          <div className="flex items-baseline gap-3 mb-0.5">
            <span className="text-white font-bold text-[32px]">$350</span>
            <span className="text-orange-400/60 text-[13px] font-medium">$1,400 total</span>
          </div>
          <div className="text-white/25 text-[13px] mb-3">per person target</div>
          <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" />
          </div>
        </div>
        <div className="text-white/15 text-[10px] font-bold uppercase tracking-wider mb-2">Suggested Breakdown</div>
        <div className="space-y-2">
          {[
            { dot: "bg-orange-400", label: "Stays", amount: "$560" },
            { dot: "bg-orange-400", label: "Food", amount: "$350" },
            { dot: "bg-emerald-400", label: "Activities", amount: "$280" },
            { dot: "bg-blue-400", label: "Transport", amount: "$210" },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2.5 text-[13px]">
              <div className={`w-2 h-2 rounded-full ${item.dot}`} />
              <span className="text-white/30 flex-1">{item.label}</span>
              <span className="text-white/50 font-medium">{item.amount}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 text-white/10 text-[10px] font-bold uppercase tracking-wider mb-1.5">Settlements</div>
        <div className="space-y-1">
          <div className="flex items-center text-[13px]"><span className="text-white/30 flex-1">You owe Sarah</span><span className="text-red-400/70 font-medium">$45</span></div>
          <div className="flex items-center text-[13px]"><span className="text-white/30 flex-1">Jess owes Mike</span><span className="text-emerald-400/70 font-medium">$20</span></div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function SquadItinerary() {
  return (
    <PhoneFrame label="Squad Itinerary">
      <StatusBar />
      <div className="px-5 flex-1 flex flex-col">
        <ScreenHeader label="Squad Itinerary" title="Barcelona Trip" subtitle="Day 1" />
        <div className="flex gap-2.5 mb-7">
          {["Day 1", "Day 2", "Day 3"].map((d, i) => (
            <div key={d} className={`px-5 py-2.5 rounded-xl text-[13px] font-bold ${i === 0 ? "bg-orange-500/12 text-orange-400 border border-orange-500/20" : "bg-white/[0.03] text-white/20 border border-white/[0.03]"}`}>{d}</div>
          ))}
        </div>
        <div className="space-y-4 flex-1">
          {[
            { emoji: "🍊", period: "Morning", periodColor: "text-orange-400/60", name: "La Boqueria Ma...", by: "Jess", bg: "bg-amber-500/[0.06]" },
            { emoji: "🏛️", period: "Afternoon", periodColor: "text-amber-400/60", name: "Gothic Quarter ...", by: "Marco", bg: "bg-white/[0.03]" },
            { emoji: "🍸", period: "Evening", periodColor: "text-red-400/60", name: "Hidden Rooftop ...", by: "Jess", bg: "bg-purple-500/[0.04]" },
          ].map((item, i) => (
            <div key={i} className={`${item.bg} border border-white/[0.05] rounded-2xl p-4 flex items-center gap-4`}>
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center text-[22px]">{item.emoji}</div>
              <div className="flex-1">
                <div className={`${item.periodColor} text-[10px] font-bold uppercase tracking-[0.15em]`}>{item.period}</div>
                <div className="text-white font-bold text-[15px] mt-0.5">{item.name}</div>
                <div className="text-white/20 text-[12px] mt-0.5">Added by {item.by}</div>
              </div>
              <Grip size={16} className="text-white/10" />
            </div>
          ))}
        </div>
        <div className="text-center text-white/10 text-[12px] mt-5">Drag to reorder &middot; Tap to edit</div>
      </div>
    </PhoneFrame>
  );
}

function TripSetup() {
  return (
    <PhoneFrame label="Trip Setup" glow="bg-emerald-500">
      <StatusBar />
      <div className="px-5 flex-1 flex flex-col">
        <ScreenHeader label="New Trip" title="Trip Setup" />
        <div className="space-y-4 flex-1">
          <PillRow emoji="📍" text="Barcelona, Spain" right={<GreenCheck />} />
          <PillRow emoji="👥" text="4 people" right={<GreenCheck />} />
          <PillRow emoji="📅" text="5 days &middot; June 12-16" right={<GreenCheck />} />
          <PillRow emoji="💰" text="$$ &middot; ~$1,700 budget" right={<GreenCheck />} />
        </div>
        <div className="bg-emerald-500/[0.08] border border-emerald-500/15 rounded-2xl py-4 text-center mt-6">
          <span className="text-emerald-400 font-bold text-[15px] flex items-center justify-center gap-2"><Check size={16} strokeWidth={2.5} /> Trip Created!</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

function GroupVoteResults() {
  const results = [
    { name: "Hidden Speakeasy", votes: "4/4", pct: 100, color: "bg-emerald-400", badge: "Must Do", badgeColor: "text-emerald-400", badgeIcon: "✓" },
    { name: "Rooftop Yoga", votes: "3/4", pct: 75, color: "bg-blue-400", badge: "Group Pick", badgeColor: "text-blue-400", badgeIcon: "★" },
    { name: "Flamenco Show", votes: "2/4", pct: 50, color: "bg-orange-400", badge: null, badgeColor: "", badgeIcon: "" },
    { name: "Tapas Tour", votes: "2/4", pct: 50, color: "bg-amber-400", badge: null, badgeColor: "", badgeIcon: "" },
  ];
  return (
    <PhoneFrame label="Vote Results">
      <StatusBar />
      <div className="px-5 flex-1 flex flex-col">
        <ScreenHeader label="Group Vote" title="Results" />
        <div className="space-y-6 flex-1">
          {results.map((r, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold text-[15px]">{r.name}</span>
                <span className="text-white/30 text-[14px] font-medium">{r.votes}</span>
              </div>
              <div className="w-full h-2.5 bg-white/[0.05] rounded-full overflow-hidden mb-1.5">
                <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.pct}%` }} />
              </div>
              {r.badge && <span className={`text-[12px] font-bold ${r.badgeColor}`}>{r.badgeIcon} {r.badge}</span>}
            </div>
          ))}
        </div>
        <div className="bg-orange-500/[0.08] border border-orange-500/20 rounded-2xl p-5 text-center mt-4">
          <div className="text-orange-400 font-bold text-[14px] mb-1.5">⚡ Tiebreaker!</div>
          <div className="text-white/30 text-[14px]">Flamenco Show vs Tapas Tour</div>
          <div className="text-white font-bold text-[14px] mt-1.5">👑 Tapas Tour wins!</div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function SmartSchedule() {
  return (
    <PhoneFrame label="Smart Schedule" glow="bg-emerald-500">
      <StatusBar />
      <div className="px-5 flex-1 flex flex-col">
        <ScreenHeader label="Smart Schedule" title="Optimizing..." />
        <div className="space-y-3 mb-7">
          <PillRow emoji="☀️" text="Beach day → Wednesday (sunny)" />
          <PillRow emoji="🏛️" text="Sagrada Familia at 9am (shorter lines)" />
          <PillRow emoji="✈️" text="Mike lands at 2pm (free afternoon first)" />
        </div>
        <div className="bg-emerald-500/[0.08] border border-emerald-500/15 rounded-2xl p-5">
          <div className="text-emerald-400 font-bold text-[14px] mb-4 flex items-center gap-2"><Check size={15} strokeWidth={2.5} /> Optimized Schedule Ready</div>
          <div className="space-y-3">
            {[
              { time: "9:00", name: "Sagrada Familia", icon: "☀️" },
              { time: "12:30", name: "La Boqueria Market", icon: "☀️" },
              { time: "2:00", name: "Pick up Mike ✈️", icon: "⛅" },
              { time: "4:00", name: "Gothic Quarter", icon: "☀️" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3.5 text-[13px]">
                <span className="text-emerald-400/50 font-mono text-[12px] w-11">{item.time}</span>
                <span className="text-white/60 flex-1">{item.name}</span>
                <span className="text-[14px]">{item.icon}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function JoinTripScreen() {
  return (
    <PhoneFrame label="Join Trip">
      <StatusBar />
      <div className="px-6 flex-1 flex flex-col items-center justify-center text-center">
        <div className="text-5xl mb-8">🎟️</div>
        <ScreenHeader label="Join a Trip" title="Enter Invite Code" subtitle="Enter the code your friend shared." />
        <div className="flex gap-2.5 mb-8">
          {["A", "B", "3", "X", "7", "K"].map((c, i) => (
            <div key={i} className="w-11 h-13 bg-white/[0.05] border border-white/[0.05] rounded-xl flex items-center justify-center py-3">
              <span className="text-white font-mono font-bold text-[20px]">{c}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl py-4 text-center mb-3 shadow-lg shadow-orange-500/15">
          <span className="text-white font-bold text-[15px]">Join Trip</span>
        </div>
        <p className="text-white/12 text-[12px]">Codes are case-insensitive</p>
      </div>
    </PhoneFrame>
  );
}

function MembersInvite() {
  return (
    <PhoneFrame label="Members & Invite">
      <StatusBar />
      <div className="px-5 flex-1 flex flex-col">
        <ScreenHeader label="Barcelona Trip" title="Members" subtitle="5 members" />
        <div className="bg-white/[0.04] border border-white/[0.04] rounded-2xl p-5 mb-6 text-center">
          <div className="text-white/20 text-[12px] mb-3">Share this code to invite friends</div>
          <div className="font-mono text-white font-bold text-[26px] tracking-[0.35em] mb-5">AB3X7K</div>
          <div className="flex gap-3">
            <div className="flex-1 bg-white/[0.05] border border-white/[0.05] rounded-xl py-3 text-center">
              <span className="text-white/60 text-[13px] font-medium flex items-center justify-center gap-1.5"><Copy size={14} /> Copy</span>
            </div>
            <div className="flex-1 bg-orange-500/10 border border-orange-500/20 rounded-xl py-3 text-center">
              <span className="text-orange-400 text-[13px] font-medium flex items-center justify-center gap-1.5"><Share2 size={14} /> Share</span>
            </div>
          </div>
        </div>
        <div className="space-y-0.5">
          {[
            { name: "Alex (You)", role: "Owner", online: true },
            { name: "Sarah", role: null, online: true },
            { name: "Mike", role: null, online: false },
            { name: "Jess", role: null, online: true },
            { name: "Marco", role: null, online: false },
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-3.5 py-3.5 border-b border-white/[0.03] last:border-0">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/[0.05]" />
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0a0a0a] ${m.online ? "bg-emerald-400" : "bg-white/12"}`} />
              </div>
              <span className="text-white/80 text-[14px] font-medium flex-1">{m.name}</span>
              {m.role && <span className="text-[10px] bg-orange-500/10 text-orange-400 px-2.5 py-1 rounded-full font-bold">{m.role}</span>}
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function ProfileScreen() {
  return (
    <PhoneFrame label="Profile">
      <StatusBar />
      <div className="px-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <div className="text-orange-400/50 text-[10px] font-bold uppercase tracking-[0.25em]">Profile</div>
          <Settings size={18} className="text-white/15" />
        </div>
        <div className="flex flex-col items-center mb-5">
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-full bg-white/[0.05] border-[2.5px] border-orange-500/35" />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25">
              <Trophy size={12} className="text-white" />
            </div>
          </div>
          <div className="text-white font-bold text-[18px]">Alex Chen</div>
          <div className="text-white/20 text-[14px]">@alexplores</div>
        </div>
        <div className="bg-orange-500/[0.08] border border-orange-500/20 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[20px]">🏆</span>
              <span className="text-white font-bold text-[14px]">Gold</span>
              <span className="text-white/20 text-[12px]">5,240 XP</span>
            </div>
            <div className="flex items-center gap-1 text-white/15 text-[12px]">
              Roadmap <ChevronRight size={12} />
            </div>
          </div>
          <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full w-[52%] bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" />
          </div>
          <div className="text-white/12 text-[10px] mt-1.5">4,760 XP to Diamond &middot; 52%</div>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { val: "23", label: "Done", icon: "✓" },
            { val: "7", label: "Countries", icon: "🌍" },
            { val: "5", label: "Trips", icon: "✈️" },
            { val: "142", label: "Followers", icon: "👥" },
          ].map((s, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/[0.03] rounded-xl p-2.5 text-center">
              <div className="text-[14px] mb-1">{s.icon}</div>
              <div className="text-white font-bold text-[18px] leading-tight">{s.val}</div>
              <div className="text-white/12 text-[9px] font-medium mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[14px]">🏅</span>
          <span className="text-white/70 text-[12px] font-bold">Achievements</span>
          <span className="text-white/12 text-[12px] ml-auto">5/9</span>
        </div>
        <div className="flex gap-2.5">
          {["🥾", "⚡", "🧭", "🏔️", "🌟"].map((b, i) => (
            <div key={i} className="w-9 h-9 rounded-full bg-orange-500/[0.08] border border-orange-500/15 flex items-center justify-center text-[16px]">{b}</div>
          ))}
          {["🔒", "🔒", "🔒", "🔒"].map((_, i) => (
            <div key={`l${i}`} className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/[0.02] flex items-center justify-center text-[16px] opacity-20">🔒</div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function RankRoadmap() {
  const ranks = [
    { name: "Iron", xp: "0 XP", color: "text-white/25", bg: "bg-white/[0.03]", border: "border-white/[0.03]", unlocked: true },
    { name: "Bronze", xp: "1,000 XP", color: "text-amber-600", bg: "bg-amber-900/[0.06]", border: "border-amber-800/15", unlocked: true },
    { name: "Silver", xp: "2,500 XP", color: "text-gray-300", bg: "bg-gray-500/[0.06]", border: "border-gray-500/15", unlocked: true },
    { name: "Gold", xp: "5,000 XP", color: "text-amber-400", bg: "bg-amber-500/[0.06]", border: "border-amber-500/15", current: true, unlocked: true },
    { name: "Diamond", xp: "10,000 XP", color: "text-cyan-400", bg: "bg-cyan-500/[0.06]", border: "border-cyan-500/10", unlocked: false },
    { name: "Obsidian", xp: "25,000 XP", color: "text-purple-400", bg: "bg-purple-500/[0.06]", border: "border-purple-500/10", unlocked: false },
  ];
  return (
    <PhoneFrame label="Rank Roadmap" glow="bg-amber-500">
      <StatusBar />
      <div className="px-5 flex-1 flex flex-col">
        <ScreenHeader label="Rank System" title="Roadmap" />
        <div className="space-y-3 flex-1">
          {ranks.map((r, i) => (
            <div key={i} className={`${r.bg} border ${r.border} rounded-2xl p-3.5 flex items-center gap-3.5 ${!r.unlocked ? "opacity-35" : ""}`}>
              <div className={`w-11 h-11 rounded-full ${r.bg} flex items-center justify-center`}>
                <span className="text-[18px]">{r.unlocked ? "🏆" : "🔒"}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-[14px] ${r.color}`}>{r.name}</span>
                  {r.current && <span className="text-[8px] bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full font-bold tracking-wider">CURRENT</span>}
                </div>
                <div className="text-white/12 text-[12px] mt-0.5">{r.xp}</div>
                {r.current && (
                  <div className="w-full h-1.5 bg-white/[0.06] rounded-full mt-2 overflow-hidden">
                    <div className="h-full w-[52%] bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function SettingsScreen() {
  return (
    <PhoneFrame label="Settings">
      <StatusBar />
      <div className="px-5 flex-1 flex flex-col">
        <ScreenHeader label="Settings" title="Preferences" />
        <div className="text-white/12 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Account</div>
        {[
          { icon: <User size={16} />, label: "Edit Profile" },
          { icon: <Star size={16} />, label: "Preferences" },
          { icon: <Bell size={16} />, label: "Notifications" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-4 py-4 border-b border-white/[0.03]">
            <div className="text-white/15">{item.icon}</div>
            <span className="text-white/70 text-[14px] font-medium flex-1">{item.label}</span>
            <ChevronRight size={14} className="text-white/8" />
          </div>
        ))}
        <div className="text-white/12 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 mt-7">Support</div>
        {[
          { icon: <HelpCircle size={16} />, label: "Help Center" },
          { icon: <Shield size={16} />, label: "Privacy Policy" },
          { icon: <CheckCircle size={16} />, label: "Terms of Service" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-4 py-4 border-b border-white/[0.03]">
            <div className="text-white/15">{item.icon}</div>
            <span className="text-white/70 text-[14px] font-medium flex-1">{item.label}</span>
            <ChevronRight size={14} className="text-white/8" />
          </div>
        ))}
        <div className="mt-auto mb-3">
          <div className="flex items-center gap-4 py-4 text-red-400/70">
            <LogOut size={16} />
            <span className="text-[14px] font-bold">Sign Out</span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

const sections = [
  { id: "auth", label: "Auth" },
  { id: "onboarding", label: "Onboarding" },
  { id: "features", label: "Features" },
  { id: "trips", label: "Trips" },
  { id: "profile", label: "Profile" },
];

export default function DesignsPage() {
  const [activeSection, setActiveSection] = useState("features");

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3.5 bg-[#050505]/90 backdrop-blur-xl border-b border-white/[0.03]">
        <div className="container mx-auto max-w-7xl flex items-center gap-5">
          <Link href="/">
            <span className="flex items-center gap-2 text-white/25 hover:text-white/50 transition-colors cursor-pointer text-[13px]">
              <ArrowLeft size={16} /> Back
            </span>
          </Link>
          <div className="text-white font-bold text-[17px]">iOS App Screens</div>
          <div className="ml-auto flex gap-1.5 overflow-x-auto">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`px-4 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap transition-all ${activeSection === s.id ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" : "text-white/15 hover:text-white/30"}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-28 pb-28 px-4">
        <div className="container mx-auto max-w-[1500px]">

          {activeSection === "auth" && (
            <div>
              <div className="mb-12 text-center">
                <div className="text-orange-400/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-3">Authentication</div>
                <h2 className="text-[32px] font-bold text-white">Sign In / Sign Up / Reset</h2>
              </div>
              <div className="flex flex-wrap gap-12 justify-center">
                <SignInScreen />
                <SignUpScreen />
                <ResetPasswordScreen />
              </div>
            </div>
          )}

          {activeSection === "onboarding" && (
            <div>
              <div className="mb-12 text-center">
                <div className="text-orange-400/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-3">Onboarding</div>
                <h2 className="text-[32px] font-bold text-white">8-Step First Launch</h2>
              </div>
              <div className="flex flex-wrap gap-12 justify-center">
                <OnboardingWelcome />
                <OnboardingTripIntent />
                <OnboardingTravelStyle />
                <OnboardingInterests />
                <OnboardingBudget />
                <OnboardingPace />
                <OnboardingNotifications />
                <OnboardingAllSet />
              </div>
            </div>
          )}

          {activeSection === "features" && (
            <div>
              <div className="mb-12 text-center">
                <div className="text-orange-400/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-3">Core Features</div>
                <h2 className="text-[32px] font-bold text-white">Voting, Budget & Scheduling</h2>
              </div>
              <div className="flex flex-wrap gap-12 justify-center">
                <SwipeToVote />
                <GroupVoteResults />
                <BudgetLock />
                <SmartSchedule />
              </div>
            </div>
          )}

          {activeSection === "trips" && (
            <div>
              <div className="mb-12 text-center">
                <div className="text-orange-400/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-3">Trip Management</div>
                <h2 className="text-[32px] font-bold text-white">Create, Join & Organize</h2>
              </div>
              <div className="flex flex-wrap gap-12 justify-center">
                <TripSetup />
                <JoinTripScreen />
                <SquadItinerary />
                <MembersInvite />
              </div>
            </div>
          )}

          {activeSection === "profile" && (
            <div>
              <div className="mb-12 text-center">
                <div className="text-orange-400/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-3">Profile & Gamification</div>
                <h2 className="text-[32px] font-bold text-white">Profile, Rank & Settings</h2>
              </div>
              <div className="flex flex-wrap gap-12 justify-center">
                <ProfileScreen />
                <RankRoadmap />
                <SettingsScreen />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
