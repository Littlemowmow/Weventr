import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/layout/Navbar";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { ArchetypesSection } from "@/components/landing/ArchetypesSection";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
import { WaitlistSection } from "@/components/landing/WaitlistSection";
import { FAQSection } from "@/components/landing/FAQSection";

import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-sq-primary selection:text-white">
      <Navbar />

      <main>
        <Hero />
        <SocialProofSection />
        <div className="section-divider max-w-4xl mx-auto" />
        <ProblemSection />
        <div className="section-divider max-w-4xl mx-auto" />
        <ArchetypesSection />
        <div className="section-divider max-w-4xl mx-auto" />
        <FAQSection />
        <div className="section-divider max-w-4xl mx-auto" />
        <WaitlistSection />
      </main>
      
      <Footer />
    </div>
  );
}
