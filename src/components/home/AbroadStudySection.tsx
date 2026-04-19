import { Link } from "react-router-dom";
import australiaImg from "@/assets/australia.jpg";
import japanImg from "@/assets/japan.jpg";
import canadaImg from "@/assets/canada.jpg";
import europeImg from "@/assets/europe.jpg";
import usaImg from "@/assets/usa.jpg";
import southkoreaImg from "@/assets/southkorea.jpg";

const countries = [
  { name: "Australia", image: australiaImg, path: "/study-abroad/australia", desc: "Australia has one of the best institutions and universities..." },
  { name: "Japan", image: japanImg, path: "/study-abroad/japan", desc: "Education System in Japan provides world-class opportunities..." },
  { name: "Canada", image: canadaImg, path: "/study-abroad/canada", desc: "Canada offers two major intakes with excellent programs..." },
  { name: "Europe", image: europeImg, path: "/study-abroad/europe", desc: "It's common knowledge that studying in Europe is rewarding..." },
  { name: "USA", image: usaImg, path: "/study-abroad/usa", desc: "The USA offers two major intakes with diverse programs..." },
  { name: "South Korea", image: southkoreaImg, path: "/study-abroad/south-korea", desc: "South Korea offers innovative education and vibrant culture..." },
];

const AbroadStudySection = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="section-subtitle mb-2">Abroad Study</p>
          <h2 className="section-title mb-4">Abroad Study</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover opportunities to study abroad in top educational destinations worldwide.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <div key={country.name} className="bg-card rounded-xl overflow-hidden border border-border card-hover">
              <div className="h-48 overflow-hidden">
                <img
                  src={country.image}
                  alt={`Study in ${country.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  width={768}
                  height={512}
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  STUDY IN {country.name.toUpperCase()}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {country.desc}
                </p>
                <Link
                  to={country.path}
                  className="text-primary text-sm font-semibold hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AbroadStudySection;
