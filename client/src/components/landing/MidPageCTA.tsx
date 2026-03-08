import { ArrowDown } from "lucide-react";
import { useFadeIn } from "@/hooks/use-fade-in";

export function MidPageCTA() {
  const { ref, isVisible } = useFadeIn();

  return (
    <div className="py-10 sm:py-14 px-4">
      <div
        ref={ref}
        className={`fade-in${isVisible ? " visible" : ""} max-w-2xl mx-auto text-center`}
      >
        <a
          href="#waitlist"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group inline-flex flex-col items-center gap-3 cursor-pointer"
          data-testid="link-mid-cta"
        >
          <span className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-orange-400 transition-colors">
            Sound like your kind of trip?
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-white/90 text-black font-semibold px-8 py-3 text-sm sm:text-base shadow-lg shadow-orange-500/15 group-hover:shadow-orange-500/30 transition-all">
            Claim Your Spot
            <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
          </span>
        </a>
      </div>
    </div>
  );
}
