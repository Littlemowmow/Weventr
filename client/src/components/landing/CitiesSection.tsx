import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const cities = [
  { name: "Barcelona", flag: "🇪🇸", img: "/images/hero-friends.png" }, // reusing for mockup
  { name: "London", flag: "🇬🇧", img: "/images/card-discover.png" },
  { name: "Paris", flag: "🇫🇷", img: "/images/card-local.png" },
  { name: "Rome", flag: "🇮🇹", img: "/images/city-rome.png" },
  { name: "Tokyo", flag: "🇯🇵", img: "/images/city-tokyo.png" },
  { name: "Sydney", flag: "🇦🇺", img: "/images/card-tourist.png" },
];

export function CitiesSection() {
  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-sq-green font-medium tracking-wide uppercase text-sm">Destinations</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">Coming first to...</h2>
          </div>
          <Button variant="link" className="text-sq-green p-0 h-auto font-semibold group">
            More cities coming soon <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cities.map((city) => (
            <div key={city.name} className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer">
              <img 
                src={city.img} 
                alt={city.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-2xl block mb-1">{city.flag}</span>
                <span className="font-bold text-lg tracking-wide">{city.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
