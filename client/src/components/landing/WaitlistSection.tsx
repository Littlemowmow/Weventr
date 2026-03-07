import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useCallback } from "react";
import { Loader2, MessageSquare, Phone, Users } from "lucide-react";

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
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [referralCode, setReferralCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setReferredBy(ref);
      const url = new URL(window.location.href);
      url.searchParams.delete("ref");
      window.history.replaceState({}, "", url.pathname + url.search);
    }

    sessionStorage.setItem("sq_attribution", JSON.stringify(captureAttribution()));

    fetch("/api/waitlist/count")
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.count === "number") setWaitlistCount(data.count);
      })
      .catch(() => {});
  }, []);

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

    const attribution = JSON.parse(sessionStorage.getItem("sq_attribution") || "{}");

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
          ...attribution,
        }),
      });

      const data = await res.json();

      if (res.status === 409) {
        setReferralCode(data.referralCode);
        setStatus("success");
        pushDataLayer({ event: "generate_lead", method: "waitlist_signup", email_provided: true });
        return;
      }

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }

      setReferralCode(data.referralCode);
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
    <section id="waitlist" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-gradient-to-b from-white/8 to-white/3 border border-white/10 rounded-[2rem] p-8 md:p-14 text-center relative overflow-hidden max-w-3xl mx-auto hover:border-white/15 transition-colors">

           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[120px] pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-500/15 rounded-full blur-[120px] pointer-events-none" />

           <div className="relative z-10">
             <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4" data-testid="text-waitlist-title">
               Don't let another trip die in the chat.
             </h2>
             <p className="text-white/60 text-lg mb-3 max-w-xl mx-auto">
               Join the waitlist. Then send it to the group chat — you're gonna need them on here anyway.
             </p>

             {waitlistCount !== null && (
               <div className="flex items-center justify-center gap-1.5 text-white/40 text-sm font-medium mb-6" data-testid="text-waitlist-count">
                 <Users size={14} className="text-orange-400/60" />
                 <span>Join <span className="text-white/60 font-semibold">hundreds</span> already signed up</span>
               </div>
             )}

             <div aria-live="polite">
               {status === "success" ? (
                  <div className="bg-white/10 backdrop-blur border border-white/20 text-white p-8 rounded-3xl inline-block shadow-xl max-w-lg text-left" data-testid="status-waitlist-success">
                     <div className="text-center mb-6">
                        <div className="text-4xl mb-3" aria-hidden="true">🎉</div>
                        <div className="text-2xl font-bold mb-1">You're on the waitlist!</div>
                        <p className="text-white/50 text-sm">We'll email you as soon as the TestFlight beta opens.</p>
                     </div>

                     <div className="bg-gradient-to-br from-orange-500/15 to-amber-500/10 border border-orange-500/25 p-5 rounded-2xl mb-6">
                        <div className="text-center mb-4">
                          <div className="text-white font-bold text-base mb-1">Want earlier access? Invite friends.</div>
                          <p className="text-white/50 text-xs">Send this to friends who love traveling with groups.</p>
                        </div>
                        <div className="flex gap-2 mb-3">
                          <div className="bg-black/30 flex-1 py-3 px-4 rounded-xl font-mono text-sm text-white/80 truncate border border-white/10" data-testid="text-referral-code">
                            {window.location.origin}?ref={referralCode}
                          </div>
                          <Button
                            className={`font-bold min-w-[100px] rounded-xl transition-colors ${copied ? "bg-emerald-500 hover:bg-emerald-500 text-white" : "bg-white text-black hover:bg-white/90"}`}
                            data-testid="button-copy-referral"
                            onClick={handleCopy}
                          >
                            {copied ? "Copied!" : "Copy link"}
                          </Button>
                        </div>
                        <Button
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl h-12"
                          data-testid="button-share-referral"
                          onClick={() => {
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
                          }}
                        >
                          Share with your group chat
                        </Button>
                        <div className="text-[11px] text-orange-200/70 mt-3 font-medium text-center">
                          Friends who sign up with your link move you both up the list
                        </div>
                     </div>

                     <div className="space-y-4 bg-black/20 p-5 rounded-2xl border border-white/5 mb-5">
                        <div className="font-bold text-white/90 mb-2 text-sm">Here's what happens next:</div>
                        <ol className="list-decimal list-inside space-y-2.5 text-white/70 text-sm leading-relaxed">
                          <li><span className="text-white font-medium">Check your inbox</span> — confirmation is on the way.</li>
                          <li><span className="text-white font-medium">Share your link</span> — you need friends on here anyway.</li>
                          <li><span className="text-white font-medium">We'll notify you</span> when the TestFlight beta opens.</li>
                        </ol>
                     </div>

                     <div className="text-center text-white/40 text-sm font-medium mb-4">
                       Spring break plans are dying in group chats right now. Don't let yours be next.
                     </div>

                     <div className="flex items-center justify-center gap-2 text-white/30 text-xs font-medium">
                       <span>Built by founders at the University of Michigan</span>
                       <span className="text-orange-400/40">|</span>
                       <span>Early testers from UMich, travel creators, and student orgs</span>
                     </div>
                  </div>
               ) : (
                  <form onSubmit={handleSubmit} aria-label="Join waitlist" className="flex flex-col gap-4 max-w-lg mx-auto bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
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
                          className="h-14 bg-white/10 border-white/10 text-white placeholder:text-white/40 rounded-2xl px-12 text-lg focus-visible:ring-orange-500"
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
                          className="h-14 bg-white/10 border-white/10 text-white placeholder:text-white/40 rounded-2xl px-12 text-lg focus-visible:ring-orange-500"
                          autoComplete="tel"
                          data-testid="input-phone"
                        />
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} aria-hidden="true" />
                      </div>

                      <div className="relative">
                        <textarea
                          placeholder="Questions or feedback? (optional)"
                          aria-label="Questions or feedback"
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          className="w-full min-h-[100px] bg-white/10 border border-white/10 text-white placeholder:text-white/40 rounded-2xl pl-12 pr-4 py-4 text-base leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 resize-none"
                          data-testid="input-feedback"
                        />
                        <MessageSquare className="absolute left-4 top-[18px] text-white/40" size={18} aria-hidden="true" />
                      </div>
                    </fieldset>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      aria-busy={isLoading}
                      className="h-16 rounded-2xl bg-white hover:bg-gray-100 text-black font-bold px-10 text-lg transition-all mt-2 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02]"
                      data-testid="button-submit-waitlist"
                    >
                      {isLoading ? <Loader2 className="animate-spin" /> : "Claim Your Spot"}
                    </Button>
                  </form>
               )}
             </div>

             <div className="mt-8 flex items-center justify-center gap-4 text-white/40 text-sm font-medium">
               <span>Launching Spring 2026 on iOS</span>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
