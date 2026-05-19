import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  Briefcase,
  DollarSign,
  Stamp,
  Plane,
  GraduationCap,
} from "lucide-react";

const services = [
  {
    _id: "study-in-nepal",
    title: "Study in Nepal",
    description:
      "Complete guidance for international students including universities, courses, visa support, and accommodation.",
  },
  {
    _id: "study-pathway",
    title: "Study Pathway Consultation",
    description:
      "Personalized study pathway planning and university selection.",
  },
  {
    _id: "interview-prep",
    title: "Interview Preparation",
    description:
      "Mock interviews and coaching for university admissions.",
  },
  {
    _id: "career-counseling",
    title: "Career Counseling",
    description:
      "Career guidance and job market insights.",
  },
  {
    _id: "finance-scholarship",
    title: "Finance & Scholarship",
    description:
      "Scholarship search and financial planning.",
  },
  {
    _id: "visa-guidance",
    title: "Visa Guidance",
    description:
      "Complete visa application assistance.",
  },
  {
    _id: "pre-departure",
    title: "Pre-departure Briefing",
    description:
      "Orientation and pre-departure support.",
  },
];

const ServicesSection = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case "study-in-nepal":
        return GraduationCap;
      case "study-pathway":
        return BookOpen;
      case "interview-prep":
        return Users;
      case "career-counseling":
        return Briefcase;
      case "finance-scholarship":
        return DollarSign;
      case "visa-guidance":
        return Stamp;
      case "pre-departure":
        return Plane;
      default:
        return BookOpen;
    }
  };

  return (
    <section className="section-padding">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-primary font-semibold tracking-wide uppercase">
            Services in Nepal
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Our Expert Consultation Services
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide complete guidance for students planning their education journey in Nepal and abroad.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = getIcon(service._id);

            return (
              <Link
                key={service._id}
                to={`/services/${service._id}`}
                className="group relative bg-card border border-border rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:scale-[1.02]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* glow background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                <div className="relative z-10">
                  <div className="mb-5">
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                      <Icon
                        className="h-7 w-7 text-primary transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110 ease-out"
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-5 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2">
                    Explore More →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;