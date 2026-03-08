import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer aria-label="Site footer" className="py-10 sm:py-12 px-4 border-t border-white/[0.05] overflow-hidden relative">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-bold text-xs">W</div>
            <Logo size="text-lg" className="text-white" />
            <span className="text-white/20 mx-2 hidden sm:inline">|</span>
            <p className="text-white/25 text-sm hidden sm:block">
              So the trip doesn't die in the group chat.
            </p>
          </div>

          <a href="#waitlist" onClick={(e) => { e.preventDefault(); const el = document.querySelector('[data-testid="input-feedback"]') as HTMLElement; el?.scrollIntoView({ behavior: "smooth", block: "center" }); setTimeout(() => { el?.focus(); }, 800); setTimeout(() => { el?.focus(); }, 1200); }} className="text-sm text-white/30 hover:text-orange-400 transition-colors cursor-pointer" data-testid="link-footer-contact">Contact</a>

        </div>
      </div>
    </footer>
  );
}
