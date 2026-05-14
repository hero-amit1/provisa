import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Download, FileText, BookOpen, GraduationCap } from "lucide-react";

const resourceData = {
  "interview-prep": { name: "Interview Preparation Guide", desc: "Complete guide for university admission interviews.", icon: BookOpen },
  "biodata": { name: "Student Biodata Template", desc: "Professional biodata format for applications.", icon: FileText },
  "sop": { name: "Statement of Purpose Guide", desc: "How to write winning SOP for study abroad.", icon: GraduationCap },
  "course-selection": { name: "Course Selection Guide", desc: "How to choose the right course and university.", icon: BookOpen },
  "letter-of-recommendation": {
    name: "Letter of Recommendation Guide",
    desc: "Understand what makes a strong recommendation letter and how to request one.",
    icon: FileText,
  },
  "motivation-letter": {
    name: "Motivation Letter Guide",
    desc: "Learn how to write a compelling motivation letter for your study abroad application.",
    icon: GraduationCap,
  },
};

const ResourcesPage = () => {
  const { resource } = useParams<{ resource: string }>();
  const data = resourceData[resource || "interview-prep" as keyof typeof resourceData];

  const Icon = data?.icon || FileText;

  return (
    <Layout>
      <section className="min-h-screen py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="section-container max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-20">
            <div className="inline-block p-4 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-3xl border border-green-200/50 mb-8">
              <Icon className="h-12 w-12 mx-auto mb-4 opacity-80" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-green-600 bg-clip-text text-transparent mb-6">
              {data?.name}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {data?.desc}
            </p>
          </div>

          {/* Content */}
          <div className="bg-card rounded-3xl border shadow-2xl p-12 mb-16">
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
              <p className="text-foreground font-semibold text-xl mb-8">Download your free guide:</p>

              <div className="bg-gradient-to-r from-green-500/5 to-blue-500/5 border border-dashed border-green-200 p-8 rounded-2xl text-center mb-12">
                <Download className="h-16 w-16 mx-auto mb-6 text-green-500" />
                <h3 className="text-2xl font-bold mb-4">Ready to Download</h3>
                <p className="text-lg text-muted-foreground mb-8">Click below to get your personalized guide</p>
                <Link
                  to="/appointment"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                >
                  Get Your Guide
                  <span className="group-hover:translate-x-1 transition-all">→</span>
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-xl mb-4 text-foreground">What You'll Get:</h4>
                  <ul className="space-y-3 text-lg">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      Step-by-step preparation guide
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      Sample questions & answers
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      Pro tips from experts
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-4 text-foreground">Why Choose Us:</h4>
                  <ul className="space-y-3 text-lg">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      Free resources for all students
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      Updated for 2024 requirements
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      Trusted by 5,000+ students
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-5 rounded-3xl text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]"
            >
              Book Free Consultation
              <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center rotate-45 group-hover:rotate-0 transition-all">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResourcesPage;

