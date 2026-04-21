import { Link } from "react-router-dom";
import australiaImg from "@/assets/australia.jpg";
import japanImg from "@/assets/japan.jpg";
import canadaImg from "@/assets/canada.jpg";
import europeImg from "@/assets/europe.jpg";
import usaImg from "@/assets/usa.jpg";
import southkoreaImg from "@/assets/southkorea.jpg";

const countries = [
  { name: "Australia", image: australiaImg, path: "/study-abroad/australia", desc: "Top-ranked universities and global opportunities." },
  { name: "Japan", image: japanImg, path: "/study-abroad/japan", desc: "Advanced education with innovation and culture." },
  { name: "Canada", image: canadaImg, path: "/study-abroad/canada", desc: "Affordable education with PR opportunities." },
  { name: "Europe", image: europeImg, path: "/study-abroad/europe", desc: "Diverse programs across top EU universities." },
  { name: "USA", image: usaImg, path: "/study-abroad/usa", desc: "World-leading universities and research hubs." },
  { name: "South Korea", image: southkoreaImg, path: "/study-abroad/south-korea", desc: "Modern education with tech-driven learning." },
];

const AbroadStudySection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-muted/50 to-background">
      <div className="section-container">

        {/* HEADER */}
        <div className="text-center mb-12">
          <p className="section-subtitle mb-2">Study Abroad</p>

          <h2 className="section-title mb-4">
            Choose your dream destination
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore top countries offering world-class education and career opportunities.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {countries.map((country, index) => (
            <Link
              to={country.path}
              key={country.name}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >

              {/* IMAGE */}
              <div className="relative h-52 overflow-hidden">

                <img
                  src={country.image}
                  alt={country.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* HOVER ORANGE GLOW */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-orange-500/10" />
              </div>

              {/* CONTENT */}
              <div className="p-5 relative">

                <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-orange-500 transition-colors">
                  STUDY IN {country.name.toUpperCase()}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {country.desc}
                </p>

                <div className="flex items-center text-sm font-semibold text-primary group-hover:text-orange-500 transition-colors">
                  Learn More
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>

                {/* ORANGE BORDER ANIMATION */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 group-hover:w-full transition-all duration-300" />

              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
};

export default AbroadStudySection;