import { Logo } from "@/components/ui/logo";

export function Footer() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer aria-label="Site footer" className="py-16 px-4 border-t border-white/5 overflow-hidden relative">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-bold text-sm">S</div>
               <Logo size="text-xl" className="text-white" />
            </div>
            <p className="text-white/30 text-sm leading-relaxed mb-5">
              So the trip doesn't die in the groupchat.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-5">Product</h4>
            <ul className="space-y-3 text-sm text-white/30">
              <li><button onClick={() => scrollToSection("features")} className="hover:text-orange-400 transition-colors" data-testid="link-footer-features">Features</button></li>
              <li><button onClick={() => scrollToSection("demo")} className="hover:text-orange-400 transition-colors" data-testid="link-footer-demo">Demo</button></li>
              <li><button onClick={() => scrollToSection("cities")} className="hover:text-orange-400 transition-colors" data-testid="link-footer-cities">Launch Cities</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-5">Company</h4>
            <ul className="space-y-3 text-sm text-white/30">
              <li><span className="cursor-default" title="Coming soon" data-testid="link-footer-about">About</span></li>
              <li><span className="cursor-default" title="Coming soon" data-testid="link-footer-blog">Blog</span></li>
              <li><span className="cursor-default" title="Coming soon" data-testid="link-footer-contact">Contact</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-5">Legal</h4>
            <ul className="space-y-3 text-sm text-white/30">
              <li><span className="cursor-default" data-testid="link-footer-privacy">Privacy Policy</span></li>
              <li><span className="cursor-default" data-testid="link-footer-terms">Terms of Service</span></li>
            </ul>
          </div>

        </div>
        
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/35">
          <p>&copy; 2026 SideQuest Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
