import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Users,
  Award,
  Calendar,
  GraduationCap,
  Shield,
  Plane,
  LucideIcon,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// =========================
// IMPORT LOCAL IMAGES
// =========================

import medicalImg from "@/assets/medical.jpg";
import agricultureImg from "@/assets/agriculture.jpg";
import forestryImg from "@/assets/forestry.jpg";
import engineeringImg from "@/assets/engineering.jpg";
import tourismImg from "@/assets/tourism.jpg";
import businessImg from "@/assets/business.jpg";
import languageImg from "@/assets/language.jpg";
import cultureImg from "@/assets/culture.jpg";
import visaImg from "@/assets/visa.jpg";
import hostelImg from "@/assets/hostel.jpg";

type ServiceItem = {
  name: string;
  icon: LucideIcon;
  desc: string;
  image?: string;
};

const serviceData: Record<string, ServiceItem> = {
  "study-in-nepal": {
    name: "Study in Nepal",
    icon: GraduationCap,
    desc:
      "We support international students who want to study in Nepal including Medical, Agriculture, Forestry, Engineering, Tourism, Business, Nepali language studies, and many more programs.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
  },

  "study-abroad": {
    name: "Study Abroad Consultation",
    icon: Plane,
    desc:
      "Guidance for students planning their study abroad journey, including destination selection, document checklist, and application strategy.",
    image:
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1600&auto=format&fit=crop",
  },

  "study-pathway": {
    name: "Study Pathway Consultation",
    icon: GraduationCap,
    desc:
      "Personalized study pathway planning and university selection based on your profile and goals.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop",
  },

  "interview-prep": {
    name: "Interview Preparation",
    icon: Users,
    desc:
      "Mock interviews and coaching for university admissions with expert feedback.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
  },

  "career-counseling": {
    name: "Career Counseling",
    icon: Award,
    desc:
      "Career guidance and job market insights to align your studies with future goals.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop",
  },

  "finance-scholarship": {
    name: "Finance & Scholarship",
    icon: Plane,
    desc:
      "Scholarship search, financial planning, and funding options guidance.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600&auto=format&fit=crop",
  },

  "visa-guidance": {
    name: "Visa Guidance",
    icon: Shield,
    desc:
      "Complete visa application assistance with high success rate.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop",
  },

  "pre-departure": {
    name: "Pre-departure Briefing",
    icon: Calendar,
    desc:
      "Orientation and pre-departure support for smooth transition abroad.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop",
  },

  "test-preparation": {
    name: "Test Preparation",
    icon: Users,
    desc:
      "IELTS, TOEFL, SAT, PTE, Japanese Language coaching with expert tutors.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
  },
};

const ServicesPage = () => {
  const { service } = useParams<{ service: string }>();

  const data =
    serviceData[
    (service || "study-pathway") as keyof typeof serviceData
    ];

  const Icon = data?.icon || GraduationCap;

  return (
    <Layout>
      <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black py-20 overflow-hidden relative">
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-500/20 blur-3xl rounded-full animate-pulse" />

        <div className="section-container max-w-6xl mx-auto relative z-10">

          {/* HERO */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">

            {/* LEFT */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 px-5 py-2 rounded-full mb-6 backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-primary font-semibold">
                  Premium Education Consultancy
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-3xl bg-gradient-to-br from-primary to-orange-500 shadow-2xl">
                  <Icon className="h-10 w-10 text-white" />
                </div>

                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-white via-primary to-orange-400 bg-clip-text text-transparent">
                  {data?.name}
                </h1>
              </div>

              <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8">
                {data?.desc}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/appointment"
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary to-orange-500 hover:scale-105 transition-all duration-300 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl"
                >
                  Book Consultation
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/contact"
                  className="border border-white/20 hover:border-primary text-white hover:bg-primary/10 transition-all duration-300 px-8 py-4 rounded-2xl font-semibold backdrop-blur-md"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-500 rounded-[2rem] blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-500" />

              <img
                src={data?.image}
                alt={data?.name}
                className="relative w-full h-[500px] object-cover rounded-[2rem] shadow-2xl border border-white/10 group-hover:scale-[1.02] transition-all duration-700"
              />
            </div>
          </div>

          {/* FEATURES */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-24">
            {[
              {
                title: "Personalized Approach",
                desc: "Tailored guidance for every student's unique academic journey.",
                icon: Calendar,
                color: "text-primary",
              },
              {
                title: "Proven Success",
                desc: "Thousands of successful student placements worldwide.",
                icon: Award,
                color: "text-green-400",
              },
              {
                title: "Expert Team",
                desc: "Experienced education consultants and advisors.",
                icon: Users,
                color: "text-orange-400",
              },
              {
                title: "End-to-End Support",
                desc: "From counseling to visa approval and beyond.",
                icon: Shield,
                color: "text-blue-400",
              },
            ].map((item, index) => {
              const FeatureIcon = item.icon;

              return (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:-translate-y-2 hover:border-primary/40 transition-all duration-500 shadow-2xl"
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                      <FeatureIcon className={`h-8 w-8 ${item.color}`} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {item.title}
                  </h3>

                  <p className="text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* STUDY IN NEPAL SPECIAL */}
          {service === "study-in-nepal" && (
            <div className="mb-24">

              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Opportunities in Nepal
                </h2>

                <p className="text-slate-300 text-lg max-w-3xl mx-auto">
                  Explore world-class education opportunities in Nepal with complete
                  support for admission, visa, accommodation, and career guidance.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Medical Colleges",
                    img: medicalImg,
                  },
                  {
                    title: "Agriculture Universities",
                    img: agricultureImg,
                  },
                  {
                    title: "Forestry Programs",
                    img: forestryImg,
                  },
                  {
                    title: "Engineering & Technology",
                    img: engineeringImg,
                  },
                  {
                    title: "Tourism & Hospitality",
                    img: tourismImg,
                  },
                  {
                    title: "Business & Management",
                    img: businessImg,
                  },
                  {
                    title: "Nepali Language Courses",
                    img: languageImg,
                  },
                  {
                    title: "Culture & Social Studies",
                    img: cultureImg,
                  },
                  {
                    title: "International Student Visa Support",
                    img: visaImg,
                  },
                  {
                    title: "Hostel & Accommodation Assistance",
                    img: hostelImg,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-primary/40 hover:-translate-y-2 transition-all duration-500 backdrop-blur-xl"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-8">
                      <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                        <GraduationCap className="h-7 w-7 text-primary" />
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3">
                        {item.title}
                      </h3>

                      <p className="text-slate-300">
                        Professional support and guidance for students interested in{" "}
                        {item.title.toLowerCase()}.
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* CTA */}
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-primary via-orange-500 to-primary p-16 text-center shadow-2xl">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                Start Your Journey Today
              </h2>

              <p className="text-white/90 text-xl max-w-2xl mx-auto mb-10">
                Get expert guidance and personalized consultation for your
                academic future.
              </p>

              <Link
                to="/appointment"
                className="group inline-flex items-center gap-3 bg-white text-primary hover:bg-slate-100 px-10 py-5 rounded-2xl text-xl font-bold shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Book Free Consultation
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;