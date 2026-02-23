import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useCallback } from "react";
import { Loader2, MapPin, GraduationCap, ChevronDown } from "lucide-react";

const TIMELINE_OPTIONS = [
  { value: "", label: "When are you traveling? (optional)" },
  { value: "this_month", label: "This month" },
  { value: "next_3_months", label: "Next 3 months" },
  { value: "next_6_months", label: "Next 6 months" },
  { value: "next_year", label: "Next year" },
  { value: "just_exploring", label: "Just exploring" },
];

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [university, setUniversity] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [referralCode, setReferralCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setReferredBy(ref);
      const url = new URL(window.location.href);
      url.searchParams.delete("ref");
      window.history.replaceState({}, "", url.pathname + url.search);
    }
  }, []);

  const handleCopy = useCallback(() => {
    const link = `${window.location.origin}?ref=${referralCode}`;
    navigator.clipboard.writeText(link)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
          destination: destination || null,
          travelDate: travelDate || null,
          travelType: "group",
          university: university || null,
          referredBy: referredBy || null,
        }),
      });

      const data = await res.json();

      if (res.status === 409) {
        setReferralCode(data.referralCode);
        setStatus("success");
        return;
      }

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }

      setReferralCode(data.referralCode);
      setStatus("success");
      setEmail("");
      setDestination("");
      setTravelDate("");
      setUniversity("");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("idle");
    }
  }, [email, destination, travelDate, university, referredBy]);

  const isLoading = status === "loading";

  return (
    <section id="waitlist" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-gradient-to-b from-white/8 to-white/3 border border-white/10 rounded-[2rem] p-8 md:p-14 text-center relative overflow-hidden max-w-3xl mx-auto hover:border-white/15 transition-colors">

           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[120px] pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-500/15 rounded-full blur-[120px] pointer-events-none" />

           <div className="relative z-10">
             <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4" data-testid="text-waitlist-title">
               Get Early Beta Access
             </h2>
             <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
               Join the waitlist — tell us a bit about your next trip to prioritize your spot.
             </p>

             <div aria-live="polite">
               {status === "success" ? (
                  <div className="bg-white/10 backdrop-blur border border-white/20 text-white p-8 rounded-3xl inline-block shadow-xl max-w-lg text-left" data-testid="status-waitlist-success">
                     <div className="text-center mb-6">
                        <div className="text-4xl mb-4" aria-hidden="true">🚀</div>
                        <div className="text-2xl font-bold">You're on the list!</div>
                     </div>

                     <div className="space-y-4 mb-8 bg-black/20 p-6 rounded-2xl border border-white/5">
                        <div className="font-bold text-white/90 mb-3">Here's what happens next:</div>
                        <ol className="list-decimal list-inside space-y-3 text-white/70 text-sm leading-relaxed">
                          <li><span className="text-white font-medium">We'll email you a confirmation shortly.</span></li>
                          <li><span className="text-white font-medium">Share your link with your travel crew</span> — you need friends on here anyway.</li>
                          <li><span className="text-white font-medium">When we open beta access, you'll be first to know.</span></li>
                        </ol>
                     </div>

                     <div className="bg-orange-500/20 border border-orange-500/30 p-4 rounded-xl text-center">
                        <div className="text-xs font-bold text-orange-200 uppercase tracking-wider mb-2">Your Unique Share Link</div>
                        <div className="flex gap-2">
                          <div className="bg-black/30 flex-1 py-3 px-4 rounded-lg font-mono text-sm text-white/80 truncate border border-white/10" data-testid="text-referral-code">
                            {window.location.origin}?ref={referralCode}
                          </div>
                          <Button
                            className={`font-bold min-w-[80px] transition-colors ${copied ? "bg-emerald-500 hover:bg-emerald-500 text-white" : "bg-white text-black hover:bg-white/90"}`}
                            data-testid="button-copy-referral"
                            onClick={handleCopy}
                          >
                            {copied ? "Copied!" : "Copy"}
                          </Button>
                        </div>
                        <div className="text-[10px] text-orange-200 mt-2 font-medium">
                          Friends who sign up with your link move you both up the list
                        </div>
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
                          type="text"
                          placeholder="Your university (optional)"
                          aria-label="Your university"
                          value={university}
                          onChange={(e) => setUniversity(e.target.value)}
                          className="h-14 bg-white/10 border-white/10 text-white placeholder:text-white/40 rounded-2xl px-12 text-lg focus-visible:ring-orange-500"
                          autoComplete="organization"
                          data-testid="input-university"
                        />
                        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} aria-hidden="true" />
                      </div>

                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Where are you going? (optional)"
                          aria-label="Travel destination"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          className="h-14 bg-white/10 border-white/10 text-white placeholder:text-white/40 rounded-2xl px-12 text-lg focus-visible:ring-orange-500"
                          data-testid="input-destination"
                        />
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} aria-hidden="true" />
                      </div>

                      <div className="relative">
                        <select
                          value={travelDate}
                          onChange={(e) => setTravelDate(e.target.value)}
                          aria-label="Travel timeline"
                          className={`h-14 w-full bg-white/10 border border-white/10 rounded-2xl px-12 text-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-0 appearance-none ${travelDate ? "text-white" : "text-white/40"}`}
                          data-testid="select-travel-date"
                        >
                          {TIMELINE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-gray-900 text-white">
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={18} aria-hidden="true" />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-lg" aria-hidden="true">📅</div>
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
