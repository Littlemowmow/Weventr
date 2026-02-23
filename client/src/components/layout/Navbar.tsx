import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Logo } from "@/components/ui/logo";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  const scrollToSection = useCallback((id: string) => {
    const wasMenuOpen = isMobileMenuOpen;
    setIsMobileMenuOpen(false);
    if (wasMenuOpen) {
      document.body.style.overflow = "";
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isMobileMenuOpen]);

  const links = [
    { label: "Demo", id: "demo" },
    { label: "Features", id: "features" },
    { label: "Cities", id: "cities" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen ? "bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-sm" : "bg-transparent"
        }`}
        data-testid="navbar"
      >
        <div className="container mx-auto max-w-7xl flex justify-between items-center">
          <button
            className="cursor-pointer bg-transparent border-none p-0"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
          >
            <Logo className="text-white" />
          </button>

          <div className="hidden md:flex items-center gap-1 font-medium text-sm text-white/40">
            {links.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-4 py-2 rounded-full hover:text-white hover:bg-white/10 transition-all"
                data-testid={`link-nav-${link.id}`}
              >
                {link.label}
              </button>
            ))}
            <Button 
              onClick={() => scrollToSection("waitlist")}
              className="rounded-full bg-white hover:bg-white/90 text-black font-semibold px-6 ml-2 shadow-md hover:shadow-lg transition-all h-9 text-sm"
              data-testid="button-nav-cta"
            >
              Get Early Access
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-sq-primary origin-left"
          style={{ scaleX, opacity: isScrolled && !isMobileMenuOpen ? 1 : 0 }}
        />
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-20 px-6 md:hidden flex flex-col overscroll-contain touch-none"
          >
            <div className="flex flex-col gap-1 text-lg font-semibold text-white">
              {links.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left py-4 px-2 border-b border-white/10 flex justify-between items-center group hover:text-orange-400 transition-colors"
                >
                  {link.label}
                  <span className="text-white/20 group-hover:text-orange-400 transition-colors text-sm">→</span>
                </motion.button>
              ))}
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-8"
              >
                <Button 
                  onClick={() => scrollToSection("waitlist")}
                  className="rounded-2xl bg-white hover:bg-white/90 text-black font-bold py-7 text-lg w-full shadow-xl"
                >
                  Claim Your Spot
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
