import { motion } from "framer-motion";

const cities = [
  { name: "Barcelona", flag: "🇪🇸", image: "/images/city-barcelona.jpg", teaser: "Beyond La Rambla" },
  { name: "London", flag: "🇬🇧", image: "/images/city-london.jpg", teaser: "Beyond Big Ben" },
  { name: "Paris", flag: "🇫🇷", image: "/images/city-paris.jpg", teaser: "Beyond the Eiffel Tower" },
  { name: "Rome", flag: "🇮🇹", image: "/images/city-rome-new.jpg", teaser: "Beyond the Colosseum" },
  { name: "Tokyo", flag: "🇯🇵", image: "/images/city-tokyo.png", teaser: "Beyond Shibuya Crossing" },
  { name: "Ann Arbor", flag: "🇺🇸", image: "/images/city-annarbor.jpg", tag: "HQ", teaser: "Home Base 🏠" },
];

export function ContentSection() {
  return (
    <section id="cities" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {cities.map((city, idx) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px 0px" }}
              transition={{ delay: idx * 0.08 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-default hover-lift hover:shadow-xl hover:shadow-orange-500/10 border border-white/5 hover:border-white/15 transition-all duration-300"
              data-testid={`card-city-${idx}`}
            >
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="text-white text-lg md:text-xl font-display font-bold">{city.name}</div>
                  <div className="text-white/50 text-xs mt-0.5">{city.teaser}</div>
                </div>
                {city.tag && (
                  <div className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                    {city.tag}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
