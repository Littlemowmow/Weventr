import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useFadeIn } from "@/hooks/use-fade-in";

export function FAQSection() {
  const faqs = [
    {
      q: "How do you say Weventr?",
      a: "We + Venture = Weventr. Every group trip is an adventure worth taking."
    },
    {
      q: "Why Weventr? What makes it different?",
      a: "Most travel apps focus on booking flights and hotels. Weventr focuses on the part nobody else solves — the messy group coordination that happens before you book anything. Budget debates, destination voting, splitting costs fairly. We turn chaotic group chats into an organized trip plan everyone agrees on. And unlike a booking app, we don't care where you book — we just make sure your group actually agrees before you do."
    },
    {
      q: "Why not just use a spreadsheet or group chat?",
      a: "Because spreadsheets don't handle disagreements, and group chats bury decisions under 200 unread messages. Weventr gives your group a structured way to vote on destinations, set budgets together, and track who owes what — without anyone having to play \"trip coordinator.\" Plus, be honest — when's the last time everyone actually opened the Google Doc?"
    },
    {
      q: "How does it find recommendations?",
      a: "Weventr learns what your group is into based on what you swipe on, then surfaces hidden gems and local spots you won't find on the first page of Google. Think of it as a local friend who knows every city."
    },
    {
      q: "Does everyone in the group need the app?",
      a: "Ideally, yes — so everyone can vote and contribute to the plan. But you can share a read-only view of the itinerary with anyone, so even friends who haven't downloaded it can stay in the loop."
    },
    {
      q: "What if my friends always flake?",
      a: "That's literally why we built this. Weventr has voting deadlines, budget locks, and shared itineraries that make it harder for anyone to quietly back out. When everyone can see who's voted, who's committed, and what it costs — the 'let me check with work' excuse loses its power. We can't fix your flaky friend, but we can make it really obvious when they're flaking."
    },
    {
      q: "Why not just go solo?",
      a: "Solo travel is amazing — seriously. But if you've got a group of friends you actually want to travel with, the problem isn't the people. It's that group chats are terrible planning tools. Weventr doesn't replace solo travel — it makes group travel actually possible so you don't have to choose."
    },
    {
      q: "When is the beta launching?",
      a: "Very soon — we're opening spots in waves. Claim your spot now to secure your place in the first wave and help shape what Weventr becomes."
    },
    {
      q: "Who's building Weventr?",
      a: "We're a team of students from the University of Michigan, who got tired of watching amazing trip ideas die in our group chats. We built Weventr because we needed it ourselves."
    }
  ];

  const heading = useFadeIn();

  return (
    <section id="faq" className="py-16 sm:py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <div
          ref={heading.ref}
          className={`fade-in${heading.isVisible ? " visible" : ""} text-center mb-12`}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2" data-testid="text-faq-title">
            Questions? We've got answers.
          </h2>
          <p className="text-white/30 text-sm">Everything you need to know about Weventr.</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-white/[0.07]" data-testid={`faq-item-${idx}`}>
              <AccordionTrigger className="text-left font-semibold text-white hover:no-underline hover:text-orange-400 py-5 text-sm sm:text-[15px] transition-colors">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-white/45 leading-relaxed pb-5 text-sm sm:text-[15px]">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
