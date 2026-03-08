import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useCallback } from "react";
import { Loader2, MessageSquare, Phone, Users } from "lucide-react";
import { useFadeIn } from "@/hooks/use-fade-in";

function ShareReferralBlock({ referralCode, copied, onCopy, onShare, testIdSuffix = "" }: {
  referralCode: string;
  copied: boolean;
  onCopy: () => void;
  onShare: () => void;
  testIdSuffix?: string;
}) {
  return (
    <div className="bg-gradient-to-br from-orange-500/15 to-amber-500/10 border border-orange-500/25 p-4 sm:p-5 rounded-2xl">
      <div className="text-center mb-4">
        <div className="text-white font-bold text-sm sm:text-base mb-1">Get your friends on here too.</div>
        <p className="text-white/50 text-xs">Friends who sign up with your link move you both up the list.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <div className="bg-black/30 flex-1 py-3 px-4 rounded-xl font-mono text-xs sm:text-sm text-white/80 truncate border border-white/10" data-testid={`text-referral-code${testIdSuffix}`}>
          {window.location.origin}?ref={referralCode}
        </div>
        <Button
          className={`font-bold w-full sm:w-auto sm:min-w-[100px] rounded-xl transition-colors ${copied ? "bg-emerald-500 hover:bg-emerald-500 text-white" : "bg-white text-black hover:bg-white/90"}`}
          data-testid={`button-copy-referral${testIdSuffix}`}
          onClick={onCopy}
        >
          {copied ? "Copied!" : "Copy link"}
        </Button>
      </div>
      <Button
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl h-12"
        data-testid={`button-share-referral${testIdSuffix}`}
        onClick={onShare}
      >
        Share with your group chat
      </Button>
    </div>
  );
}

function ChatBubble({ text, isMe }: { text: string; isMe?: boolean }) {
  return (
    <div className={`py-1.5 px-2.5 rounded-xl text-[11px] max-w-[90%] mb-1 leading-relaxed ${isMe ? "bg-blue-500/80 text-white rounded-br-sm ml-auto" : "bg-white/[0.08] text-white/60 rounded-bl-sm mr-auto"}`}>
      {text}
    </div>
  );
}

function ChatDecoration({ direction, delay, className, children }: {
  direction: "left" | "right";
  delay: number;
  className: string;
  children: React.ReactNode;
}) {
  const ref = useFadeIn(delay);
  const fadeClass = direction === "left" ? "fade-in-left" : "fade-in-right";
  return (
    <div ref={ref} className={`${fadeClass} ${className}`}>
      {children}
    </div>
  );
}

function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
    gclid: params.get("gclid") || "",
    fbclid: params.get("fbclid") || "",
    ttclid: params.get("ttclid") || "",
    msclkid: params.get("msclkid") || "",
  };
}

function pushDataLayer(event: Record<string, unknown>) {
  (window as unknown as Record<string, unknown[]>).dataLayer =
    ((window as unknown as Record<string, unknown[]>).dataLayer) || [];
  ((window as unknown as Record<string, unknown[]>).dataLayer).push(event);
}

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already_registered">("idle");
  const [referralCode, setReferralCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [position, setPosition] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [referralSignups, setReferralSignups] = useState<number>(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setReferredBy(ref);
      const url = new URL(window.location.href);
      url.searchParams.delete("ref");
      window.history.replaceState({}, "", url.pathname + url.search);

      const fp = [
        navigator.userAgent,
        navigator.language,
        screen.width + "x" + screen.height,
        Intl.DateTimeFormat().resolvedOptions().timeZone,
      ].join("|");
      crypto.subtle.digest("SHA-256", new TextEncoder().encode(fp)).then((buf) => {
        const hash = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
        fetch("/api/referral/click", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ referralCode: ref, fingerprint: hash }),
        }).catch(() => {});
      }).catch(() => {});
    }

    sessionStorage.setItem("sq_attribution", JSON.stringify(captureAttribution()));

    fetch("/api/waitlist/count")
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.count === "number") setWaitlistCount(data.count);
      })
      .catch(() => {});
  }, []);

  const handleShare = useCallback(() => {
    const url = `${window.location.origin}?ref=${referralCode}`;
    const text = "Join me on Weventr — finally a way to plan group trips without the chaos.";
    if (navigator.share) {
      navigator.share({ title: "Weventr", text, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text} ${url}`).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
  }, [referralCode]);

  const handleCopy = useCallback(() => {
    const link = `${window.location.origin}?ref=${referralCode}`;
    navigator.clipboard.writeText(link)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        pushDataLayer({ event: "share", method: "referral_link_copy" });
      })
      .catch(() => {});
  }, [referralCode]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone: phone || null,
          feedback: feedback || null,
          travelType: "group",
          referredBy: referredBy || null,
        }),
      });

      const data = await res.json();

      if (res.status === 409) {
        if (data.referralCode) setReferralCode(data.referralCode);
        if (data.position != null) setPosition(data.position);
        if (data.totalCount != null) setTotalCount(data.totalCount);
        if (data.referralSignups != null) setReferralSignups(data.referralSignups);
        setStatus("already_registered");
        return;
      }

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }

      setReferralCode(data.referralCode);
      if (data.position != null) setPosition(data.position);
      if (data.totalCount != null) setTotalCount(data.totalCount);
      setStatus("success");
      setWaitlistCount((c) => (c !== null ? c + 1 : c));
      pushDataLayer({ event: "generate_lead", method: "waitlist_signup", email_provided: true });
      setEmail("");
      setPhone("");
      setFeedback("");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("idle");
    }
  }, [email, phone, feedback, referredBy]);

  const isLoading = status === "loading";

  return (
    <section id="waitlist" className="py-14 sm:py-20 px-3 sm:px-4 overflow-hidden">
      <div className="mx-auto max-w-7xl relative">

        <ChatDecoration direction="left" delay={0} className="absolute left-0 xl:-left-16 top-12 hidden lg:block w-56 z-20">
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-red-500/20 -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300">
            <div className="text-[10px] font-bold text-red-400 mb-2 uppercase tracking-widest">🔥 Budget Fight</div>
            <ChatBubble text="Wait… I thought we were splitting this?" />
            <ChatBubble text="Bro the Airbnb is $200/NIGHT??" isMe />
            <ChatBubble text="Nobody told me about the boat 💀" />
          </div>
        </ChatDecoration>

        <ChatDecoration direction="right" delay={0.1} className="absolute right-0 xl:-right-16 top-24 hidden lg:block w-56 z-20">
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-orange-500/20 rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300">
            <div className="text-[10px] font-bold text-orange-400 mb-2 uppercase tracking-widest">📅 Date Clash</div>
            <ChatBubble text="June works for me!" isMe />
            <ChatBubble text="Let me check with work" />
            <ChatBubble text="..." isMe />
            <ChatBubble text="...so is this still happening?" />
          </div>
        </ChatDecoration>

        <ChatDecoration direction="left" delay={0.2} className="absolute left-4 xl:-left-8 bottom-32 hidden lg:block w-52 z-20">
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300">
            <div className="text-[10px] font-bold text-white/40 mb-2 uppercase tracking-widest">🤷‍♂️ Indecision</div>
            <ChatBubble text="I'm down for whatever" />
            <ChatBubble text="Same, you guys decide" isMe />
            <ChatBubble text="..." />
            <ChatBubble text="So no one's deciding??" isMe />
          </div>
        </ChatDecoration>

        <ChatDecoration direction="right" delay={0.3} className="absolute right-0 xl:-right-12 bottom-24 hidden lg:block w-52 z-20">
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-red-500/20 -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300">
            <div className="text-[10px] font-bold text-red-400 mb-2 uppercase tracking-widest">💀 Logistics Fail</div>
            <ChatBubble text="Did anyone book the train?" isMe />
            <ChatBubble text="..." />
            <ChatBubble text="I thought Mike was doing it 💀" />
          </div>
        </ChatDecoration>

        <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.03] border border-white/10 rounded-2xl sm:rounded-[2rem] p-4 sm:p-8 md:p-14 text-center relative overflow-hidden max-w-3xl mx-auto hover:border-white/15 transition-colors">

           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[120px] pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-500/15 rounded-full blur-[120px] pointer-events-none" />

           <div className="relative z-10">
             <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-3 sm:mb-4" data-testid="text-waitlist-title">
               Don't let another trip die in the chat.
             </h2>
             <p className="text-white/60 text-sm sm:text-lg mb-2 max-w-xl mx-auto">
               Join the waitlist. Then send it to the group chat — you're gonna need them on here anyway.
             </p>

             <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-4" data-testid="text-beta-incentive">
               <span className="text-orange-400 text-sm">✦</span>
               <span className="text-orange-300/90 text-xs sm:text-sm font-medium">Early waitlist members get a chance at lifetime access to exclusive perks</span>
             </div>

             {waitlistCount !== null && (
               <div className="flex items-center justify-center gap-1.5 text-white/40 text-sm font-medium mb-6" data-testid="text-waitlist-count">
                 <Users size={14} className="text-orange-400/60" />
                 <span>Join <span className="text-white/60 font-semibold">hundreds</span> already signed up</span>
               </div>
             )}

             <div aria-live="polite">
               {status === "already_registered" ? (
                  <div className="bg-white/10 backdrop-blur border border-white/20 text-white p-5 sm:p-8 rounded-3xl inline-block shadow-xl max-w-lg text-left w-full" data-testid="status-waitlist-already">
                     <div className="text-center mb-6">
                       <div className="text-4xl mb-3" aria-hidden="true">👋</div>
                       <div className="text-xl sm:text-2xl font-bold mb-1">You're already on the list!</div>
                       <p className="text-white/50 text-sm">Share with the world so we can make this an experience to last.</p>
                     </div>

                     <div className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.08] rounded-2xl p-5 mb-5 text-center" data-testid="position-card-already">
                       <div className="text-3xl mb-2" aria-hidden="true">🚀</div>
                       <div className="text-lg font-display font-bold text-orange-400" data-testid="text-position-already">You're climbing the ranks!</div>
                       <div className="text-xs text-white/40 mt-2">Share with friends to move up even faster</div>
                       {referralSignups > 0 && (
                         <div className="text-xs text-emerald-400/70 mt-3 font-medium bg-emerald-500/10 inline-block px-3 py-1 rounded-full">{referralSignups} friend{referralSignups > 1 ? "s" : ""} signed up through your link</div>
                       )}
                     </div>

                     {referralCode && (
                       <div className="mb-6">
                         <ShareReferralBlock
                           referralCode={referralCode}
                           copied={copied}
                           onCopy={handleCopy}
                           onShare={handleShare}
                         />
                       </div>
                     )}

                     <div className="text-center text-white/40 text-sm font-medium">67% of summer trip plans fall off. Don't be part of that percentage.</div>
                  </div>
               ) : status === "success" ? (
                  <div className="bg-white/10 backdrop-blur border border-white/20 text-white p-5 sm:p-8 rounded-3xl inline-block shadow-xl max-w-lg text-left w-full" data-testid="status-waitlist-success">
                     <div className="text-center mb-6">
                        <div className="text-4xl mb-3" aria-hidden="true">🙌</div>
                        <div className="text-xl sm:text-2xl font-bold mb-1">Thank You!</div>
                        <p className="text-white/50 text-sm">You're officially on the list. Here's what to do next.</p>
                     </div>

                     <div className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.08] rounded-2xl p-5 mb-5 text-center" data-testid="position-card-success">
                       <div className="text-3xl mb-2" aria-hidden="true">🚀</div>
                       <div className="text-lg font-display font-bold text-orange-400" data-testid="text-position-success">You're climbing the ranks!</div>
                       <div className="text-xs text-white/40 mt-2">Share with friends to move up even faster</div>
                     </div>

                     <div className="space-y-4 bg-black/20 p-5 rounded-2xl border border-white/5 mb-5">
                        <div className="font-bold text-white/90 mb-2 text-sm">Next Steps</div>
                        <ol className="list-decimal list-inside space-y-3 text-white/70 text-sm leading-relaxed">
                          <li><span className="text-white font-medium">Look out for your email & messages</span> — we'll reach out to you regarding beta access and testing.</li>
                          <li><span className="text-white font-medium">Share this with the world</span> — the more people who join, the faster we can bring you Weventr!</li>
                        </ol>
                     </div>

                     <div className="mb-6">
                        <ShareReferralBlock
                          referralCode={referralCode}
                          copied={copied}
                          onCopy={handleCopy}
                          onShare={handleShare}
                        />
                     </div>

                     <div className="text-center text-white/40 text-sm font-medium mb-4">
                       67% of summer trip plans never make it past the group chat. Don't be part of that percentage.
                     </div>

                     <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-white/30 text-xs font-medium text-center">
                       <span>Built by founders at the University of Michigan</span>
                       <span className="text-orange-400/40 hidden sm:inline">|</span>
                       <span>Early testers from UMich, travel creators, and student orgs</span>
                     </div>
                  </div>
               ) : (
                  <form onSubmit={handleSubmit} aria-label="Join waitlist" className="flex flex-col gap-3 sm:gap-4 max-w-lg mx-auto bg-white/5 p-4 sm:p-6 rounded-3xl border border-white/10 backdrop-blur-sm w-full">
                    {errorMsg && (
                      <div role="alert" className="bg-red-500/20 border border-red-500/30 text-red-200 text-sm p-3 rounded-xl text-center" data-testid="status-waitlist-error">
                        {errorMsg}
                      </div>
                    )}

                    <fieldset disabled={isLoading} className="flex flex-col gap-4">
                      <div className="relative">
                        <Input
                          type="email"
                          placeholder="Email address"
                          aria-label="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-12 sm:h-14 bg-white/10 border-white/10 text-white placeholder:text-white/40 rounded-2xl px-12 text-sm sm:text-base focus-visible:ring-orange-500"
                          required
                          autoComplete="email"
                          data-testid="input-email"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" aria-hidden="true">@</div>
                      </div>

                      <div className="relative">
                        <Input
                          type="tel"
                          placeholder="Phone number (optional)"
                          aria-label="Phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="h-12 sm:h-14 bg-white/10 border-white/10 text-white placeholder:text-white/40 rounded-2xl px-12 text-sm sm:text-base focus-visible:ring-orange-500"
                          autoComplete="tel"
                          data-testid="input-phone"
                        />
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} aria-hidden="true" />
                      </div>

                      <div className="relative">
                        <textarea
                          placeholder="Send us a message! (optional)"
                          aria-label="Send us a message"
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          className="w-full min-h-[100px] bg-white/10 border border-white/10 text-white placeholder:text-white/40 rounded-2xl pl-12 pr-4 py-4 text-sm sm:text-base leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 resize-none"
                          data-testid="input-feedback"
                        />
                        <MessageSquare className="absolute left-4 top-[18px] text-white/40" size={18} aria-hidden="true" />
                      </div>
                    </fieldset>

                    <p className="text-white/30 text-xs text-center leading-relaxed px-2" data-testid="text-privacy-note">
                      We'll only use your email and phone to reach out about beta access and testing — nothing else.
                    </p>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      aria-busy={isLoading}
                      className="h-14 sm:h-16 rounded-2xl bg-white hover:bg-gray-100 text-black font-bold px-10 text-base sm:text-lg transition-all mt-2 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02]"
                      data-testid="button-submit-waitlist"
                    >
                      {isLoading ? <Loader2 className="animate-spin" /> : "Claim Your Spot"}
                    </Button>
                  </form>
               )}
             </div>

             <div className="mt-8 flex items-center justify-center gap-2 text-white/25 text-xs font-medium uppercase tracking-wider">
               <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50"></span>
               <span>Launching Summer 2026 on iOS</span>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
