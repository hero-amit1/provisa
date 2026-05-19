import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import usaImg from "@/assets/usa.jpg";
import europeImg from "@/assets/europe.jpg";

import indiaImg from "@/assets/India.jpg";
import chinaImg from "@/assets/china.jpg";
import ukImg from "@/assets/uk.jpg";

import japanImg from "@/assets/japan.jpg";
import canadaImg from "@/assets/canada.jpg";
import australiaImg from "@/assets/australia.jpg";
import {
  MapPin, GraduationCap, Users, DollarSign,
  BookOpen, Users2, Briefcase, Globe, Award, Shield, Calendar, FileText
} from "lucide-react";

const countryData = {
  usa: {
    name: "USA",
    flag: "🇺🇸",
    stats: { unis: "5,000+", intlStudents: "1M+", avgTuition: "$35K" },
    hasFullContent: true as const,
  },
  uk: { name: "UK", flag: "🇬🇧", stats: { unis: "130+", intlStudents: "600K+", avgTuition: "£20K" } },
  japan: { name: "Japan", flag: "🇯🇵", stats: { unis: "800+", intlStudents: "300K+", avgTuition: "¥1M" } },
  canada: { name: "Canada", flag: "🇨🇦", stats: { unis: "100+", intlStudents: "800K+", avgTuition: "CAD25K" } },
  australia: { name: "Australia", flag: "🇦🇺", stats: { unis: "40+", intlStudents: "500K+", avgTuition: "AUD35K" } },
  europe: {
    name: "Europe",
    flag: "🌍",
    stats: { unis: "2,000+", intlStudents: "1.2M+", avgTuition: "€15K" },
    hasFullContent: false as const,
  },
  india: {
    name: "India",
    flag: "🇮🇳",
    stats: { unis: "1,000+", intlStudents: "150K+", avgTuition: "₹48K" },
  },
  china: {
    name: "China",
    flag: "🇨🇳",
    stats: { unis: "1,200+", intlStudents: "250K+", avgTuition: "¥60K" },
  },
  nepal: {
    name: "Nepal",
    flag: "🇳🇵",
    stats: { unis: "200+", intlStudents: "20K+", avgTuition: "$2K-$6K" },
  },
};

type CountryKey = keyof typeof countryData;

const StudyAbroadCountryPage = () => {
  const { country } = useParams<{ country: string }>();
  const key = (country || "usa") as CountryKey;
  const data = countryData[key];

  const isUSA = key === "usa";
  const heroByKey: Partial<Record<string, string>> = {
    usa: usaImg,
    uk: ukImg,
    india: indiaImg,
    china: chinaImg,
    japan: japanImg,
    canada: canadaImg,
    australia: australiaImg,
    europe: europeImg,
  };


  const heroImg = heroByKey[key] ?? usaImg;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <img
          src={heroImg}
          alt={`Study Abroad in ${data?.name ?? ""}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
          <div className="section-container">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-2xl">
              Study in {data?.name} {data?.flag}
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl opacity-95 leading-relaxed">
              World-class education, diverse culture, endless opportunities
            </p>
          </div>
        </div>
      </section>

      <div className="section-container py-20">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-10 bg-card/80 backdrop-blur-sm rounded-3xl border shadow-2xl hover:shadow-3xl transition-all">
            <GraduationCap className="h-16 w-16 text-primary mx-auto mb-6" />
            <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">{data?.stats.unis}</div>
            <div className="text-muted-foreground text-lg">Universities</div>
          </div>
          <div className="text-center p-10 bg-card/80 backdrop-blur-sm rounded-3xl border shadow-2xl hover:shadow-3xl transition-all">
            <Users className="h-16 w-16 text-primary mx-auto mb-6" />
            <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">{data?.stats.intlStudents}</div>
            <div className="text-muted-foreground text-lg">International Students</div>
          </div>
          <div className="text-center p-10 bg-card/80 backdrop-blur-sm rounded-3xl border shadow-2xl hover:shadow-3xl transition-all">
            <DollarSign className="h-16 w-16 text-primary mx-auto mb-6" />
            <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">{data?.stats.avgTuition}</div>
            <div className="text-muted-foreground text-lg">Avg Tuition/Year</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-24">
          <Link
            to="/appointment"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-orange-500 text-primary-foreground px-10 py-6 rounded-3xl text-xl font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          >
            Start Your {data?.name ?? ""} Journey
            <MapPin className="h-6 w-6" />
          </Link>
        </div>

        {isUSA && (
          <>
            {/* 1. Why Study in USA */}
            <section className="mb-24">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                1. Why Study in the USA?
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="group p-8 bg-card rounded-3xl border hover:shadow-2xl transition-all hover:-translate-y-2">
                  <BookOpen className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-4">Quality Education</h3>
                  <p className="text-muted-foreground leading-relaxed">Home to world's top universities with globally recognized programs.</p>
                </div>
                <div className="group p-8 bg-card rounded-3xl border hover:shadow-2xl transition-all hover:-translate-y-2">
                  <Users2 className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-4">Diverse Culture</h3>
                  <p className="text-muted-foreground leading-relaxed">Melting pot of cultures providing rich, inclusive environment.</p>
                </div>
                <div className="group p-8 bg-card rounded-3xl border hover:shadow-2xl transition-all hover:-translate-y-2">
                  <Briefcase className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-4">Career Opportunities</h3>
                  <p className="text-muted-foreground leading-relaxed">Internships, practical training, employment after graduation.</p>
                </div>
              </div>
            </section>

            {/* 2. Popular Universities & Programs */}
            <section className="mb-24">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">2. Top Universities & Programs</h2>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Award className="h-8 w-8 text-primary" />
                    Top Universities
                  </h3>
                  <ul className="space-y-2 text-lg">
                    <li>• Harvard University</li>
                    <li>• Stanford University</li>
                    <li>• MIT</li>
                    <li>• Caltech</li>
                    <li>• University of Chicago</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <BookOpen className="h-8 w-8 text-primary" />
                    Popular Programs
                  </h3>
                  <ul className="space-y-2 text-lg">
                    <li>• Business & Management</li>
                    <li>• Engineering & Tech</li>
                    <li>• Computer Science</li>
                    <li>• Health Sciences</li>
                    <li>• Social Sciences</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Process Sections (3-11) - Using alternating cards */}
            <div className="space-y-16">
              <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">3. Application Process</h2>
                  <div className="space-y-4 text-lg">
                    <div>• Choose program & institution matching your goals</div>
                    <div>• Check requirements: academics, TOEFL/IELTS, SAT/GRE</div>
                    <div>• Prepare transcripts, recommendations, personal statement</div>
                    <div>• Apply online before deadlines</div>
                    <div>• Receive acceptance letter for visa</div>
                  </div>
                </div>
                <div className="order-1 md:order-2 bg-gradient-to-br from-primary/5 to-orange-500/5 p-8 md:p-12 rounded-3xl border">
                  <FileText className="h-20 w-20 text-primary mx-auto mb-6 opacity-75" />
                  <p className="text-center text-2xl font-bold text-foreground mb-4">Simplified 5-Step Process</p>
                </div>
              </section>

              <section className="bg-gradient-to-r from-muted/50 to-background/50 p-12 rounded-4xl -mx-6 md:-mx-12">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">4. Student Visa (F-1/M-1)</h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 bg-card rounded-2xl border-l-4 border-primary">
                      <Calendar className="h-6 w-6 mt-1 flex-shrink-0 text-primary" />
                      <div>I-20 form, passport, DS-160, fee receipt</div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-card rounded-2xl border-l-4 border-primary">
                      <DollarSign className="h-6 w-6 mt-1 flex-shrink-0 text-primary" />
                      <div>Proof of funds for tuition & living expenses</div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-card rounded-2xl border-l-4 border-primary">
                      <Globe className="h-6 w-6 mt-1 flex-shrink-0 text-primary" />
                      <div>Proof of ties to home country, interview</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <Shield className="h-24 w-24 text-primary mx-auto mb-6" />
                    <p className="text-xl font-bold mb-2">Attend Visa Interview</p>
                    <p className="text-muted-foreground">At US embassy/consulate in your country</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">5. Cost of Living</h2>
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="p-8 bg-gradient-to-b from-orange-50 to-red-50 rounded-3xl border text-center">
                    <DollarSign className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                    <div className="text-4xl font-bold mb-2">$20K-$50K</div>
                    <div className="text-lg font-bold mb-1">Tuition/Year</div>
                    <div className="text-muted-foreground">Undergraduate programs</div>
                  </div>
                  <div className="p-8 bg-gradient-to-b from-blue-50 to-indigo-50 rounded-3xl border text-center">
                    <DollarSign className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                    <div className="text-3xl font-bold mb-2">$1K-$2K</div>
                    <div className="text-lg font-bold mb-1">Monthly Living</div>
                    <div className="text-muted-foreground">Accommodation, food, transport</div>
                  </div>
                  <div className="p-8 bg-gradient-to-b from-green-50 to-emerald-50 rounded-3xl border text-center">
                    <Shield className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                    <div className="text-xl font-bold mb-2">Health Insurance</div>
                    <div className="text-muted-foreground">Mandatory - University or private plans</div>
                  </div>
                </div>
              </section>

              <section className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">6. Working While Studying</h2>
                  <div className="space-y-4 text-lg">
                    <div>• On-campus: 20 hrs/week (full-time holidays)</div>
                    <div>• Off-campus: CPT/OPT after 1st year</div>
                    <div>• Internships & practical training included</div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 p-8 rounded-3xl border border-emerald-200">
                  <Briefcase className="h-20 w-20 text-emerald-500 mx-auto mb-6" />
                  <p className="text-center text-2xl font-bold mb-4 text-foreground">F-1 Visa Work Rights</p>
                  <p className="text-muted-foreground text-center">Valuable work experience in your field</p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">7. Post-Graduation Opportunities</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="group p-8 text-center rounded-3xl bg-gradient-to-b from-blue-50 to-indigo-50 border hover:shadow-xl">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-blue-500 group-hover:rotate-12 transition-transform" />
                    <h3 className="text-2xl font-bold mb-3">OPT (1-3 years)</h3>
                    <p className="text-muted-foreground">Work authorization post-graduation</p>
                  </div>
                  <div className="group p-8 text-center rounded-3xl bg-gradient-to-b from-purple-50 to-violet-50 border hover:shadow-xl">
                    <Briefcase className="h-16 w-16 mx-auto mb-4 text-purple-500 group-hover:rotate-12 transition-transform" />
                    <h3 className="text-2xl font-bold mb-3">H-1B Visa</h3>
                    <p className="text-muted-foreground">Specialty occupation employment</p>
                  </div>
                  <div className="group p-8 text-center rounded-3xl bg-gradient-to-b from-green-50 to-emerald-50 border hover:shadow-xl">
                    <Globe className="h-16 w-16 mx-auto mb-4 text-emerald-500 group-hover:rotate-12 transition-transform" />
                    <h3 className="text-2xl font-bold mb-3">Permanent Residency</h3>
                    <p className="text-muted-foreground">Multiple pathways available</p>
                  </div>
                </div>
              </section>

              <section className="py-16 bg-gradient-to-r from-orange-50 via-yellow-50 to-red-50 rounded-4xl">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">Cultural & Social Life</h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Vibrant cities, student support, endless recreational activities</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <div className="p-8 rounded-3xl bg-white/70 backdrop-blur-sm shadow-lg">
                    <Globe className="h-14 w-14 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-3">Cultural Diversity</h3>
                    <p className="text-muted-foreground">Cuisines, traditions, festivals</p>
                  </div>
                  <div className="p-8 rounded-3xl bg-white/70 backdrop-blur-sm shadow-lg">
                    <Users2 className="h-14 w-14 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-3">Student Support</h3>
                    <p className="text-muted-foreground">Orientation, advising, counseling</p>
                  </div>
                  <div className="p-8 rounded-3xl bg-white/70 backdrop-blur-sm shadow-lg">
                    <Award className="h-14 w-14 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-3">Activities</h3>
                    <p className="text-muted-foreground">Sports, arts, national parks</p>
                  </div>
                </div>
              </section>

              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">9. Scholarships & Financial Aid</h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div className="p-8 bg-gradient-to-r from-emerald-500/5 to-green-500/5 rounded-3xl border border-emerald-200">
                    <Award className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-4 text-center">Fulbright Program</h3>
                    <p className="text-center text-lg text-muted-foreground mb-6">Government-funded for international students</p>
                    <ul className="text-lg space-y-1">
                      <li>• University-specific awards</li>
                      <li>• Private scholarships</li>
                      <li>• Financial aid packages</li>
                    </ul>
                  </div>
                  <div className="p-8 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-3xl border border-blue-200 text-center">
                    <DollarSign className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                    <p className="text-3xl font-bold mb-4">$100K+</p>
                    <p className="text-xl font-bold mb-2">Available Yearly</p>
                    <p className="text-muted-foreground">Manage tuition & living expenses</p>
                  </div>
                </div>
              </section>

              <section className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">10. Health & Safety</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="p-8 text-center rounded-3xl bg-gradient-to-b from-green-50 to-emerald-50 border">
                    <Shield className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Campus Health Centers</h3>
                    <p className="text-muted-foreground">Medical services on-site</p>
                  </div>
                  <div className="p-8 text-center rounded-3xl bg-gradient-to-b from-blue-50 to-sky-50 border">
                    <Shield className="h-16 w-16 text-sky-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">24/7 Security</h3>
                    <p className="text-muted-foreground">Safety protocols & emergency services</p>
                  </div>
                  <div className="p-8 text-center rounded-3xl bg-gradient-to-b from-purple-50 to-violet-50 border">
                    <Award className="h-16 w-16 text-violet-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Insurance Required</h3>
                    <p className="text-muted-foreground">University or private plans</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-500 bg-clip-text text-transparent">
                  11. Tips for Success
                </h2>
                <div className="max-w-4xl mx-auto space-y-6 text-xl">
                  <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-3xl border border-emerald-200">
                    <Calendar className="h-8 w-8 text-emerald-500 mt-1 flex-shrink-0" />
                    <div><strong>Plan Ahead:</strong> Start applications early for deadlines</div>
                  </div>
                  <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl border border-blue-200">
                    <FileText className="h-8 w-8 text-blue-500 mt-1 flex-shrink-0" />
                    <div><strong>Stay Informed:</strong> Follow visa & university requirements</div>
                  </div>
                  <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl border border-orange-200">
                    <Users2 className="h-8 w-8 text-orange-500 mt-1 flex-shrink-0" />
                    <div><strong>Get Involved:</strong> Join clubs, build network, enhance experience</div>
                  </div>
                  <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-3xl border border-purple-200">
                    <Award className="h-8 w-8 text-purple-500 mt-1 flex-shrink-0" />
                    <div><strong>Seek Support:</strong> Use academic, career, personal counseling</div>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}

        {/* Europe content */}
        {key === "europe" && (
          <div className="space-y-16">
            <section className="mb-24">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                1. Why Study in Europe?
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="group p-8 bg-card rounded-3xl border hover:shadow-2xl transition-all hover:-translate-y-2">
                  <BookOpen className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-4">World-Class Universities</h3>
                  <p className="text-muted-foreground leading-relaxed">Recognized degrees and strong academic reputation across countries.</p>
                </div>
                <div className="group p-8 bg-card rounded-3xl border hover:shadow-2xl transition-all hover:-translate-y-2">
                  <Users2 className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-4">Cultural Diversity</h3>
                  <p className="text-muted-foreground leading-relaxed">Experience different cultures, languages, and traditions in one region.</p>
                </div>
                <div className="group p-8 bg-card rounded-3xl border hover:shadow-2xl transition-all hover:-translate-y-2">
                  <Briefcase className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-4">Career Growth</h3>
                  <p className="text-muted-foreground leading-relaxed">Industry connections and practical exposure vary by destination and program.</p>
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
                  <div>• Choose program & destination country that matches your goals</div>
                  <div>• Check requirements: academics, language tests, documents</div>
                  <div>• Prepare transcripts, recommendations, SOP/essay</div>
                  <div>• Apply before deadlines</div>
                  <div>• Receive admission/letter for visa planning</div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-emerald-500/10 p-8 md:p-12 rounded-3xl border">
                <FileText className="h-20 w-20 text-primary mx-auto mb-6 opacity-75" />
                <p className="text-center text-2xl font-bold text-foreground mb-4">Simplified Study Pathway</p>
              </div>
            </section>

            <section className="bg-gradient-to-r from-muted/50 to-background/50 p-12 rounded-4xl -mx-6 md:-mx-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">4. Visa & Entry Guidance</h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-card rounded-2xl border-l-4 border-primary">
                    <Calendar className="h-6 w-6 mt-1 flex-shrink-0 text-primary" />
                    <div>Timeline planning based on your intake & destination country</div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-card rounded-2xl border-l-4 border-primary">
                    <DollarSign className="h-6 w-6 mt-1 flex-shrink-0 text-primary" />
                    <div>Fund proof and living-cost documentation (as required)</div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-card rounded-2xl border-l-4 border-primary">
                    <Globe className="h-6 w-6 mt-1 flex-shrink-0 text-primary" />
                    <div>Country-specific checklist for admission and visa submission</div>
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
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Student communities, events, travel, and diverse learning experiences.</p>
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
                  <p className="text-center text-lg text-muted-foreground mb-6">Available depending on your program and university.</p>
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

            <section>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-500 bg-clip-text text-transparent">
                6. Tips for Success
              </h2>
              <div className="max-w-4xl mx-auto space-y-6 text-xl">
                <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-3xl border border-emerald-200">
                  <Calendar className="h-8 w-8 text-emerald-500 mt-1 flex-shrink-0" />
                  <div><strong>Plan Ahead:</strong> Start early for document readiness and deadlines</div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl border border-blue-200">
                  <FileText className="h-8 w-8 text-blue-500 mt-1 flex-shrink-0" />
                  <div><strong>Stay Organized:</strong> Track requirements for your chosen country</div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl border border-orange-200">
                  <Users2 className="h-8 w-8 text-orange-500 mt-1 flex-shrink-0" />
                  <div><strong>Engage Early:</strong> Connect with student communities and support services</div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-3xl border border-purple-200">
                  <Award className="h-8 w-8 text-purple-500 mt-1 flex-shrink-0" />
                  <div><strong>Get Support:</strong> Use counseling for SOP, applications, and visa planning</div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Final CTA */}
        <div className="text-center mt-24 pt-20 border-t border-border">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-orange-500 to-red-500 bg-clip-text text-transparent">
            Ready to Study in {data?.name}?
          </h2>
          <Link to="/appointment" className="inline-flex items-center gap-4 bg-gradient-to-r from-primary via-orange-500 to-red-500 text-primary-foreground px-12 py-6 rounded-3xl text-2xl font-bold shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 group">
            Book Free Consultation Now
            <MapPin className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default StudyAbroadCountryPage;
