import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import europeImg from "@/assets/europe.jpg";
import {
  MapPin,
  GraduationCap,
  Users,
  DollarSign,
  BookOpen,
  Users2,
  Briefcase,
  Globe,
  Award,
  Shield,
  Calendar,
  FileText,
} from "lucide-react";

const StudyInEuropePage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <img src={europeImg} alt="Study in Europe" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
          <div className="section-container">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-2xl">
              Study in Europe 🌍
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl opacity-95 leading-relaxed">
              World-class education, international experiences, and career pathways across Europe.
            </p>
          </div>
        </div>
      </section>

      <div className="section-container py-20">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-10 bg-card/80 backdrop-blur-sm rounded-3xl border shadow-2xl hover:shadow-3xl transition-all">
            <GraduationCap className="h-16 w-16 text-primary mx-auto mb-6" />
            <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">2,000+</div>
            <div className="text-muted-foreground text-lg">Universities</div>
          </div>
          <div className="text-center p-10 bg-card/80 backdrop-blur-sm rounded-3xl border shadow-2xl hover:shadow-3xl transition-all">
            <Users className="h-16 w-16 text-primary mx-auto mb-6" />
            <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">1.2M+</div>
            <div className="text-muted-foreground text-lg">International Students</div>
          </div>
          <div className="text-center p-10 bg-card/80 backdrop-blur-sm rounded-3xl border shadow-2xl hover:shadow-3xl transition-all">
            <DollarSign className="h-16 w-16 text-primary mx-auto mb-6" />
            <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">€15K</div>
            <div className="text-muted-foreground text-lg">Avg Tuition/Year</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-24">
          <Link
            to="/appointment"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-orange-500 text-primary-foreground px-10 py-6 rounded-3xl text-xl font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          >
            Start Your Europe Journey
            <MapPin className="h-6 w-6" />
          </Link>
        </div>

        <div className="space-y-16">
          <section className="mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              1. Why Study in Europe?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group p-8 bg-card rounded-3xl border hover:shadow-2xl transition-all hover:-translate-y-2">
                <BookOpen className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-4">World-Class Universities</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Globally recognized degrees and strong academic reputations.
                </p>
              </div>
              <div className="group p-8 bg-card rounded-3xl border hover:shadow-2xl transition-all hover:-translate-y-2">
                <Users2 className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-4">Cultural Diversity</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Experience different languages, traditions, and student communities in one region.
                </p>
              </div>
              <div className="group p-8 bg-card rounded-3xl border hover:shadow-2xl transition-all hover:-translate-y-2">
                <Briefcase className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-4">Career Growth</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Practical exposure, internships, and industry connections vary by destination and program.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">2. Top Universities & Programs</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Award className="h-8 w-8 text-primary" />
                  Featured Universities
                </h3>
                <ul className="space-y-2 text-lg">
                  <li>• University of Oxford</li>
                  <li>• University of Cambridge</li>
                  <li>• ETH Zurich</li>
                  <li>• KU Leuven</li>
                  <li>• TU Munich</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-primary" />
                  Popular Programs
                </h3>
                <ul className="space-y-2 text-lg">
                  <li>• Business & Management</li>
                  <li>• Engineering & Technology</li>
                  <li>• Computer Science</li>
                  <li>• Data Science & AI</li>
                  <li>• Public Health</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">3. Application Process</h2>
              <div className="space-y-4 text-lg">
                <div>• Choose a program and destination country based on your goals</div>
                <div>• Check academic requirements and language requirements</div>
                <div>• Prepare transcripts, recommendations, and SOP/essay</div>
                <div>• Submit applications before deadlines</div>
                <div>• Receive admission details for visa planning</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-emerald-500/10 p-8 md:p-12 rounded-3xl border">
              <FileText className="h-20 w-20 text-primary mx-auto mb-6 opacity-75" />
              <p className="text-center text-2xl font-bold text-foreground mb-4">Simplified Study Pathway</p>
              <p className="text-center text-muted-foreground">
                We help you shortlist universities, plan documents, and stay on track.
              </p>
            </div>
          </section>

          <section className="bg-gradient-to-r from-muted/50 to-background/50 p-12 rounded-4xl -mx-6 md:-mx-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">4. Visa & Entry Guidance</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-card rounded-2xl border-l-4 border-primary">
                  <Calendar className="h-6 w-6 mt-1 flex-shrink-0 text-primary" />
                  <div>Plan timeline based on intake and destination requirements</div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-card rounded-2xl border-l-4 border-primary">
                  <DollarSign className="h-6 w-6 mt-1 flex-shrink-0 text-primary" />
                  <div>Prepare proof of funds and living-cost documentation (as required)</div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-card rounded-2xl border-l-4 border-primary">
                  <Globe className="h-6 w-6 mt-1 flex-shrink-0 text-primary" />
                  <div>Get a destination-specific checklist for admission & visa submission</div>
                </div>
              </div>
              <div className="text-center">
                <Shield className="h-24 w-24 text-primary mx-auto mb-6" />
                <p className="text-xl font-bold mb-2">Guidance for a Smooth Process</p>
                <p className="text-muted-foreground">We help you prepare the right documents for your destination.</p>
              </div>
            </div>
          </section>

          <section className="py-16 bg-gradient-to-r from-emerald-50 via-sky-50 to-indigo-50 rounded-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Cultural & Social Life</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Student communities, events, travel, and diverse learning experiences.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-8 rounded-3xl bg-white/70 backdrop-blur-sm shadow-lg">
                <Globe className="h-14 w-14 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Regional Diversity</h3>
                <p className="text-muted-foreground">Festivals, cuisines, and local traditions.</p>
              </div>
              <div className="p-8 rounded-3xl bg-white/70 backdrop-blur-sm shadow-lg">
                <Users2 className="h-14 w-14 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Student Support</h3>
                <p className="text-muted-foreground">Orientation, advising, and academic guidance.</p>
              </div>
              <div className="p-8 rounded-3xl bg-white/70 backdrop-blur-sm shadow-lg">
                <Award className="h-14 w-14 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Activities</h3>
                <p className="text-muted-foreground">Sports, arts, and student clubs.</p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">5. Scholarships & Financial Aid</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-8 bg-gradient-to-r from-emerald-500/5 to-green-500/5 rounded-3xl border border-emerald-200">
                <Award className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-center">Merit-Based Scholarships</h3>
                <p className="text-center text-lg text-muted-foreground mb-6">
                  Available depending on your program and university.
                </p>
                <ul className="text-lg space-y-1">
                  <li>• Admission scholarships</li>
                  <li>• Department awards</li>
                  <li>• External funding options</li>
                </ul>
              </div>
              <div className="p-8 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-3xl border border-blue-200 text-center">
                <DollarSign className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                <p className="text-3xl font-bold mb-4">Plan Your Budget</p>
                <p className="text-xl font-bold mb-2">Tuition + Living Costs</p>
                <p className="text-muted-foreground">We help you estimate expenses for your destination.</p>
              </div>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-500 bg-clip-text text-transparent">
              6. Tips for Success
            </h2>
            <div className="max-w-4xl mx-auto space-y-6 text-xl">
              <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-3xl border border-emerald-200">
                <Calendar className="h-8 w-8 text-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <strong>Plan Ahead:</strong> Start early for document readiness and deadlines.
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl border border-blue-200">
                <FileText className="h-8 w-8 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <strong>Stay Organized:</strong> Track requirements for your chosen country.
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl border border-orange-200">
                <Users2 className="h-8 w-8 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <strong>Engage Early:</strong> Connect with student communities and support services.
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-3xl border border-purple-200">
                <Award className="h-8 w-8 text-purple-500 mt-1 flex-shrink-0" />
                <div>
                  <strong>Get Support:</strong> Use counseling for SOP, applications, and visa planning.
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-24 pt-20 border-t border-border">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-orange-500 to-red-500 bg-clip-text text-transparent">
            Ready to Study in Europe?
          </h2>
          <Link
            to="/appointment"
            className="inline-flex items-center gap-4 bg-gradient-to-r from-primary via-orange-500 to-red-500 text-primary-foreground px-12 py-6 rounded-3xl text-2xl font-bold shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group"
          >
            Book Free Consultation Now
            <MapPin className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default StudyInEuropePage;

