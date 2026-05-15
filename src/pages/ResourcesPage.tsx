import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Download, FileText, BookOpen, GraduationCap } from "lucide-react";








import resume1Pdf from "@/assets/Resume 1.pdf";
import resume2Pdf from "@/assets/Resume 2.pdf";
import lor1Pdf from "@/assets/LOR 1.pdf";
import lor2Pdf from "@/assets/LOR 2.pdf";
import medium1Pdf from "@/assets/Medium of Instruction.pdf";
import medium2Pdf from "@/assets/Medium of Instruction 2.pdf";
import motivationLetterPdf from "@/assets/Motivation Letter.pdf";
import australiaSop1Pdf from "@/assets/Australia SOP 1.pdf";
import australiaSop2Pdf from "@/assets/Australia SOP 2.pdf";





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
  "medium-of-instruction": {
    name: "Medium of Instruction Guide",
    desc: "Understand what Medium of Instruction is and how to request the correct documents.",
    icon: BookOpen,
  },
};

const ResourcesPage = () => {
  const { resource } = useParams<{ resource: string }>();
  const data = resourceData[resource || "interview-prep" as keyof typeof resourceData];

  const Icon = data?.icon || FileText;

  // selectedPdfUrl removed: was unused and caused eslint errors.


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

                {resource === "biodata" ? (



                  <div className="flex flex-col gap-4">
                    <div className="text-muted-foreground text-lg mb-2">Download or view the resume templates below</div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <div className="flex-1">
                        <a
                          href={resume1Pdf}
                          download
                          className="inline-flex w-full items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                        >
                          Download Resume 1
                          <span className="group-hover:translate-x-1 transition-all">→</span>
                        </a>
                        <div className="mt-3">
                          <a
                            href={resume1Pdf}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full items-center justify-center gap-3 bg-muted text-foreground px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                          >
                            View Resume 1
                            <span className="group-hover:translate-x-1 transition-all">→</span>
                          </a>
                        </div>
                      </div>

                      <div className="flex-1">
                        <a
                          href={resume2Pdf}
                          download
                          className="inline-flex w-full items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                        >
                          Download Resume 2
                          <span className="group-hover:translate-x-1 transition-all">→</span>
                        </a>
                        <div className="mt-3">
                          <a
                            href={resume2Pdf}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full items-center justify-center gap-3 bg-muted text-foreground px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                          >
                            View Resume 2
                            <span className="group-hover:translate-x-1 transition-all">→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : resource === "motivation-letter" ? (

                  <div className="flex flex-col gap-4">
                    <div className="text-muted-foreground text-lg mb-2">Download or view the Motivation Letter template below</div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <div className="flex-1">
                        <a
                          href={motivationLetterPdf}
                          download
                          className="inline-flex w-full items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                        >
                          Download Motivation Letter
                          <span className="group-hover:translate-x-1 transition-all">→</span>
                        </a>
                        <div className="mt-3">
                          <a
                            href={motivationLetterPdf}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full items-center justify-center gap-3 bg-muted text-foreground px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                          >
                            View Motivation Letter
                            <span className="group-hover:translate-x-1 transition-all">→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : resource === "medium-of-instruction" ? (
                  <div className="flex flex-col gap-4">
                    <div className="text-muted-foreground text-lg mb-2">Download or view Medium of Instruction guides below</div>


                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <div className="flex-1">
                        <a
                          href={medium1Pdf}
                          download
                          className="inline-flex w-full items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                        >
                          Download Medium of Instruction 1
                          <span className="group-hover:translate-x-1 transition-all">→</span>
                        </a>
                        <div className="mt-3">
                          <a
                            href={medium1Pdf}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full items-center justify-center gap-3 bg-muted text-foreground px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                          >
                            View Medium of Instruction 1
                            <span className="group-hover:translate-x-1 transition-all">→</span>
                          </a>
                        </div>
                      </div>


                      <div className="flex-1">
                        <a
                          href={medium2Pdf}
                          download
                          className="inline-flex w-full items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                        >
                          Download Medium of Instruction 2
                          <span className="group-hover:translate-x-1 transition-all">→</span>
                        </a>
                        <div className="mt-3">
                          <a
                            href={medium2Pdf}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full items-center justify-center gap-3 bg-muted text-foreground px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                          >
                            View Medium of Instruction 2
                            <span className="group-hover:translate-x-1 transition-all">→</span>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                ) : resource === "letter-of-recommendation" ? (
                  <div className="flex flex-col gap-4">
                    <div className="text-muted-foreground text-lg mb-2">Download or view the LOR templates below</div>


                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <div className="flex-1">
                        <a
                          href={resume1Pdf}
                          download
                          className="inline-flex w-full items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                        >
                          Download Resume 1
                          <span className="group-hover:translate-x-1 transition-all">→</span>
                        </a>
                        <div className="mt-3">
                          <a
                            href={resume1Pdf}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full items-center justify-center gap-3 bg-muted text-foreground px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                          >
                            View Resume 1
                            <span className="group-hover:translate-x-1 transition-all">→</span>
                          </a>
                        </div>
                      </div>

                      <div className="flex-1">
                        <a
                          href={resume2Pdf}
                          download
                          className="inline-flex w-full items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                        >
                          Download Resume 2
                          <span className="group-hover:translate-x-1 transition-all">→</span>
                        </a>
                        <div className="mt-3">
                          <a
                            href={resume2Pdf}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full items-center justify-center gap-3 bg-muted text-foreground px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                          >
                            View Resume 2
                            <span className="group-hover:translate-x-1 transition-all">→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : resource === "letter-of-recommendation" ? (
                  <div className="flex flex-col gap-4">
                    <div className="text-muted-foreground text-lg mb-2">Download or view the LOR templates below</div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <div className="flex-1">
                        <a
                          href={lor1Pdf}
                          download
                          className="inline-flex w-full items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                        >
                          Download LOR 1
                          <span className="group-hover:translate-x-1 transition-all">→</span>
                        </a>
                        <div className="mt-3">
                          <a
                            href={lor1Pdf}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full items-center justify-center gap-3 bg-muted text-foreground px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                          >
                            View LOR 1
                            <span className="group-hover:translate-x-1 transition-all">→</span>
                          </a>
                        </div>
                      </div>

                      <div className="flex-1">
                        <a
                          href={lor2Pdf}
                          download
                          className="inline-flex w-full items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                        >
                          Download LOR 2
                          <span className="group-hover:translate-x-1 transition-all">→</span>
                        </a>
                        <div className="mt-3">
                          <a
                            href={lor2Pdf}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full items-center justify-center gap-3 bg-muted text-foreground px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                          >
                            View LOR 2
                            <span className="group-hover:translate-x-1 transition-all">→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : resource === "sop" ? (
                  <div className="flex flex-col gap-4">
                    <div className="text-muted-foreground text-lg mb-2">Download or view Australia SOP templates below</div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <div className="flex-1">
                        <a
                          href={australiaSop1Pdf}
                          download
                          className="inline-flex w-full items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                        >
                          Download Australia SOP 1
                          <span className="group-hover:translate-x-1 transition-all">→</span>
                        </a>
                        <div className="mt-3">
                          <a
                            href={australiaSop1Pdf}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full items-center justify-center gap-3 bg-muted text-foreground px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                          >
                            View Australia SOP 1
                            <span className="group-hover:translate-x-1 transition-all">→</span>
                          </a>
                        </div>
                      </div>

                      <div className="flex-1">
                        <a
                          href={australiaSop2Pdf}
                          download
                          className="inline-flex w-full items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                        >
                          Download Australia SOP 2
                          <span className="group-hover:translate-x-1 transition-all">→</span>
                        </a>
                        <div className="mt-3">
                          <a
                            href={australiaSop2Pdf}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full items-center justify-center gap-3 bg-muted text-foreground px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                          >
                            View Australia SOP 2
                            <span className="group-hover:translate-x-1 transition-all">→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/appointment"

                    className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all group"
                  >
                    Get Your Guide
                    <span className="group-hover:translate-x-1 transition-all">→</span>
                  </Link>
                )}
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

