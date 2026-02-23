import { Compass } from "lucide-react";

export function Logo({ className = "", size = "text-2xl" }: { className?: string, size?: string }) {
  return (
    <div className={`font-display font-bold ${size} flex items-center tracking-tight ${className}`}>
      <span>Side</span>
      <div className="relative mx-[1px] flex items-center justify-center">
        <Compass className="w-[1.2em] h-[1.2em] text-sq-primary animate-[spin_10s_linear_infinite]" strokeWidth={2.5} />
      </div>
      <span>uest</span>
    </div>
  );
}
