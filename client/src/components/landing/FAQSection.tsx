import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      q: "Why SideQuest? What makes it different?",
      a: "Most travel apps focus on booking flights and hotels. SideQuest focuses on the part nobody else solves — the messy group coordination that happens before you book anything. Budget debates, destination voting, splitting costs fairly. We turn chaotic group chats into an organized trip plan everyone agrees on."
    },
    {
      q: "Isn't this just another travel booking app?",
      a: "Not at all. SideQuest doesn't book anything for you. We help your group agree on where to go, set a realistic budget, vote on activities, and split expenses — all the planning chaos that happens in your group chat right now. Once your group is aligned, you book however you prefer."
    },
    {
      q: "Why not just use a spreadsheet or group chat?",
      a: "Because spreadsheets don't handle disagreements, and group chats bury decisions under 200 unread messages. SideQuest gives your group a structured way to vote on destinations, set budgets together, and track who owes what — without anyone having to play \"trip coordinator.\""
    },
    {
      q: "How does the AI actually help with planning?",
      a: "SideQuest's AI reads your group chat chaos and extracts the useful stuff — suggested destinations, budget preferences, date conflicts, activity ideas. It turns scattered opinions into organized options your group can actually vote on, so nobody has to manually sort through hundreds of messages."
    },
    {
      q: "Does everyone in the group need the app?",
      a: "Ideally, yes — so everyone can vote and contribute to the plan. But you can share a read-only view of the itinerary with anyone, so even friends who haven't downloaded it can stay in the loop."
    },
    {
      q: "Is SideQuest free?",
      a: "Joining the waitlist is completely free. When we open the beta, early supporters get exclusive founding pricing that locks in permanently. We'll share all the details with the waitlist before anyone else."
    },
    {
      q: "Who's building SideQuest?",
      a: "We're college students at the University of Michigan who got tired of watching amazing trip ideas die in our group chats. We built SideQuest because we needed it ourselves."
    },
    {
      q: "When is the beta launching?",
      a: "Very soon — we're opening spots in waves. Claim your spot now to secure your place in the first wave and help shape what SideQuest becomes."
    }
  ];

  return (
    <section id="faq" className="py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white" data-testid="text-faq-title">
            Questions? We've got answers.
          </h2>
        </motion.div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-white/10" data-testid={`faq-item-${idx}`}>
              <AccordionTrigger className="text-left font-semibold text-white hover:no-underline hover:text-orange-400 py-5 text-[15px]">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-white/50 leading-relaxed pb-5 text-[15px]">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
