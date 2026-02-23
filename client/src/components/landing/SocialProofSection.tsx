const trips = [
  { label: "Girls Trip to Tulum", emoji: "🌴" },
  { label: "Spring Break in Miami", emoji: "🌴" },
  { label: "Ski Week in the Alps", emoji: "❄️" },
  { label: "Food Tour in Tokyo", emoji: "🍜" },
  { label: "Euro Summer 2026", emoji: "🇪🇺" },
  { label: "Study Abroad in Barcelona", emoji: "🇪🇸" },
  { label: "Road Trip to Big Sur", emoji: "🚗" },
  { label: "Surfing in Bali", emoji: "🏄‍♂️" },
  { label: "Hiking in Patagonia", emoji: "🏔️" },
  { label: "Island Hopping in Greece", emoji: "🏝️" },
];

export function SocialProofSection() {
  return (
    <section className="py-10 overflow-hidden" data-testid="section-social-proof">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee will-change-transform">
          <div className="flex gap-4 shrink-0 pr-4">
            {trips.map((t, i) => (
              <div key={i} className="inline-flex items-center gap-2.5 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 cursor-default select-none whitespace-nowrap" data-testid={`text-trip-${i}`}>
                <span className="text-base">{t.emoji}</span>
                <span className="font-semibold text-sm text-white/60">{t.label}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 shrink-0 pr-4" aria-hidden="true">
            {trips.map((t, i) => (
              <div key={i} className="inline-flex items-center gap-2.5 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 cursor-default select-none whitespace-nowrap">
                <span className="text-base">{t.emoji}</span>
                <span className="font-semibold text-sm text-white/60">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
