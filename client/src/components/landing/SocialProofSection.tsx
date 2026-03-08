const trips = [
  { label: "Spring Break", emoji: "🌴" },
  { label: "Euro Summer", emoji: "🇪🇺" },
  { label: "Tokyo Food Tour", emoji: "🍜" },
  { label: "Girls Trip", emoji: "👯‍♀️" },
  { label: "Ski Week", emoji: "⛷️" },
  { label: "Island Hopping", emoji: "🏝️" },
  { label: "Study Abroad Weekend", emoji: "🎓" },
  { label: "Road Trip", emoji: "🚗" },
  { label: "3-Day Micro-Trip", emoji: "🏔️" },
  { label: "Destination Dupe", emoji: "💎" },
  { label: "Surf Trip", emoji: "🏄‍♂️" },
  { label: "City Break", emoji: "🎭" },
];

export function SocialProofSection() {
  return (
    <section className="py-8 sm:py-10 overflow-hidden" data-testid="section-social-proof">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee will-change-transform">
          <div className="flex gap-3 sm:gap-4 shrink-0 pr-3 sm:pr-4">
            {trips.map((t, i) => (
              <div key={i} className="inline-flex items-center gap-2 sm:gap-2.5 bg-white/[0.04] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/[0.08] cursor-default select-none whitespace-nowrap hover:bg-white/[0.07] transition-colors" data-testid={`text-trip-${i}`}>
                <span className="text-sm sm:text-base">{t.emoji}</span>
                <span className="font-medium text-xs sm:text-sm text-white/50">{t.label}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 sm:gap-4 shrink-0 pr-3 sm:pr-4" aria-hidden="true">
            {trips.map((t, i) => (
              <div key={i} className="inline-flex items-center gap-2 sm:gap-2.5 bg-white/[0.04] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/[0.08] cursor-default select-none whitespace-nowrap hover:bg-white/[0.07] transition-colors">
                <span className="text-sm sm:text-base">{t.emoji}</span>
                <span className="font-medium text-xs sm:text-sm text-white/50">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
