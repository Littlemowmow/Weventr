import { motion } from "framer-motion";

const cities = [
  { name: "Barcelona", flag: "🇪🇸", image: "/images/city-barcelona.jpg" },
  { name: "London", flag: "🇬🇧", image: "/images/city-london.jpg" },
  { name: "Paris", flag: "🇫🇷", image: "/images/city-paris.jpg" },
  { name: "Rome", flag: "🇮🇹", image: "/images/city-rome-new.jpg" },
  { name: "Tokyo", flag: "🇯🇵", image: "/images/city-tokyo.png" },
  { name: "Ann Arbor", flag: "🇺🇸", image: "/images/city-annarbor.jpg", tag: "HQ" },
];

export function ContentSection() {
  return (
    <section id="cities" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-500/20">Launching First</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4" data-testid="text-cities-title">
            Where we're starting
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            We're curating hidden gems in these cities first. More coming based on where you're headed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {cities.map((city, idx) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-default hover-lift hover:shadow-xl hover:shadow-orange-500/10 border border-white/5 hover:border-white/15 transition-all duration-300"
              data-testid={`card-city-${idx}`}
            >
              <img
                src={city.image}
                alt={city.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="text-white text-lg md:text-xl font-display font-bold">{city.name}</div>
                  <div className="text-white/60 text-sm">{city.flag}</div>
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
