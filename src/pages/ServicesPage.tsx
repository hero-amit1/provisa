import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Users, Award, Calendar, GraduationCap, Shield, Plane } from "lucide-react";

const serviceData = {
  "study-in-nepal": {
    name: "Study in Nepal Consultation",
    icon: GraduationCap,
    desc: "Personalized guidance for students planning to study in Nepal, including program selection, profile review, and application strategy.",
  },
  "study-pathway": {
    name: "Study Pathway Consultation",
    icon: GraduationCap,
    desc: "Personalized study pathway planning and university selection based on your profile and goals.",
  },

  "interview-prep": {
    name: "Interview Preparation",
    icon: Users,
    desc: "Mock interviews and coaching for university admissions with expert feedback.",
  },
  "career-counseling": {
    name: "Career Counseling",
    icon: Award,
    desc: "Career guidance and job market insights to align your studies with future goals.",
  },
  "finance-scholarship": {
    name: "Finance & Scholarship",
    icon: Plane,
    desc: "Scholarship search, financial planning, and funding options guidance.",
  },
  "visa-guidance": {
    name: "Visa Guidance",
    icon: Shield,
    desc: "Complete visa application assistance with high success rate.",
  },
  "pre-departure": {
    name: "Pre-departure Briefing",
    icon: Calendar,
    desc: "Orientation and pre-departure support for smooth transition abroad.",
  },
  "test-preparation": {
    name: "Test Preparation",
    icon: Users,
    desc: "IELTS, TOEFL, SAT, PTE, Japanese Language coaching with expert tutors.",
  },
};

const ServicesPage = () => {
  const { service } = useParams<{ service: string }>();
  const data = serviceData[service || "study-pathway" as keyof typeof serviceData];

  const Icon = data?.icon || GraduationCap;

  return (
    <Layout>
      <section className="min-h-screen bg-gradient-to-br from-background via-muted to-card py-20">
        <div className="section-container max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-4 bg-primary/10 p-4 rounded-3xl mb-8">
              <div className="p-3 bg-primary rounded-2xl">
                <Icon className="h-8 w-8 text-primary" />
              </div>
              <span className="text-2xl font-bold text-primary">Our Service</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-orange-500 bg-clip-text text-transparent mb-6">
              {data?.name}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {data?.desc}
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border shadow-lg hover:shadow-2xl transition-all">
                <div className="p-2 bg-primary/10 rounded-xl mt-0.5">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Personalized Approach</h3>
                  <p className="text-muted-foreground">Tailored to your unique profile and goals.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border shadow-lg hover:shadow-2xl transition-all">
                <div className="p-2 bg-green-500/10 rounded-xl mt-0.5">
                  <Award className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Proven Success</h3>
                  <p className="text-muted-foreground">Thousands of students successfully placed abroad.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border shadow-lg hover:shadow-2xl transition-all">
                <div className="p-2 bg-orange-500/10 rounded-xl mt-0.5">
                  <Users className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Expert Team</h3>
                  <p className="text-muted-foreground">15+ years experience in education consultancy.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border shadow-lg hover:shadow-2xl transition-all">
                <div className="p-2 bg-blue-500/10 rounded-xl mt-0.5">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">End-to-End Support</h3>
                  <p className="text-muted-foreground">From consultation to visa approval.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-12 border-t border-border">
            <Link
              to="/appointment"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary to-orange-500 hover:from-primary hover:to-orange-600 text-white px-12 py-6 rounded-3xl text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
            >
              Book Free Consultation Now
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;

