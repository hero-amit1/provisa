import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { BookOpen, Clock, Target, Award, Calendar } from "lucide-react";

const testData = {
  ielts: { name: "IELTS", score: "6.5+", desc: "International English Language Testing System for study abroad." },
  toefl: { name: "TOEFL", score: "90+", desc: "Test of English as a Foreign Language for universities." },
  sat: { name: "SAT", score: "1200+", desc: "Scholastic Assessment Test for undergraduate admissions." },
  pte: { name: "PTE", score: "58+", desc: "Pearson Test of English - fast results for visas/study." },
  japanese: {
    name: "Japanese Language",
    score: "JLPT N1/N2 / JLCT / J-TEST",
    desc: "Japanese language training covering JLPT, JLCT, and J-TEST/J-Cert preparation for Japan study and work programs.",
  },
};

const testPrepDetails: Record<keyof typeof testData, { syllabus: string[]; whoItsFor: string[]; }> = {
  ielts: {
    syllabus: [
      "Listening, Reading & Writing strategies",
      "Speaking practice with real interview style questions",
      "Weekly mock tests + detailed feedback",
      "Band-score improvement plan",
    ],
    whoItsFor: [
      "Students aiming for IELTS 6.5+",
      "Those struggling with Writing & Speaking",
      "Fast-track learners with limited time",
    ],
  },
  toefl: {
    syllabus: [
      "Integrated & Independent Writing approach",
      "Reading comprehension techniques",
      "Listening note-taking & question solving",
      "Timed mock tests to build accuracy",
    ],
    whoItsFor: [
      "Students targeting TOEFL 90+",
      "Applicants needing university-ready English",
      "Candidates improving from mid-scores",
    ],
  },
  sat: {
    syllabus: [
      "Reading & Writing foundations",
      "Math concepts + problem-solving drills",
      "Answer elimination methods",
      "Full-length SAT practice tests",
    ],
    whoItsFor: [
      "Undergraduate aspirants targeting 1200+",
      "Students who need structured math practice",
      "Learners who want confidence in timed sections",
    ],
  },
  pte: {
    syllabus: [
      "Speaking & Writing templates for quick scoring",
      "Grammar + pronunciation drills",
      "Repeatable answer patterns for multiple question types",
      "Regular mocks for consistency",
    ],
    whoItsFor: [
      "Students targeting PTE 58+",
      "Those who want fast results",
      "Learners focusing on spoken English performance",
    ],
  },
  japanese: {
    syllabus: [
      "JLPT N2 grammar & vocabulary coverage",
      "Reading comprehension practice",
      "Listening drills with exam-style questions",
      "Monthly progress tests",
      "JLCT exam preparation",
      "J-TEST / J-Cert practice modules",
    ],
    whoItsFor: [
      "Students aiming for JLPT N2/N1",
      "Applicants for Japan study programs",
      "Learners building real proficiency for exams",
      "Students preparing for JLCT certification",
      "Candidates targeting J-TEST / J-Cert exams",
    ],
  },
};

const TestPrepPage = () => {
  const { test } = useParams<{ test: string }>();
  const data = testData[test || "ielts" as keyof typeof testData];

  return (
    <Layout>
      <section className="min-h-screen bg-gradient-to-b from-background to-muted py-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-6">
              {data?.name} Preparation
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ace your {data?.name} with our expert coaching. Achieve your target score fast!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <div className="bg-card rounded-3xl p-8 border shadow-2xl mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-2xl">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-1">Target Score</h3>
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                      {data?.score}
                    </div>
                  </div>
                </div>

                <ul className="space-y-4 text-lg">
                  <li className="flex items-start gap-3">
                    <BookOpen className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <span>Expert faculty with 10+ years experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <span>Flexible batch timings + doubt clearing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Award className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <span>Proven success rate 95%+</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-primary/5 to-orange-500/5 border border-primary/20 rounded-3xl p-12">
                <div className="text-6xl mb-6">{data?.name}</div>
                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto leading-relaxed">
                  {data?.desc}
                </p>

                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="bg-card/70 border border-border rounded-2xl p-4">
                    <div className="text-sm font-semibold text-foreground">Syllabus Focus</div>
                    <div className="text-muted-foreground text-sm mt-1">{test ? test.toUpperCase() : "IELTS"}</div>
                  </div>
                  <div className="bg-card/70 border border-border rounded-2xl p-4">
                    <div className="text-sm font-semibold text-foreground">Mock Tests</div>
                    <div className="text-muted-foreground text-sm mt-1">Weekly practice</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Added content blocks per test */}
          <div className="grid lg:grid-cols-2 gap-10 mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">Course Syllabus</h2>
              <div className="space-y-4">
                {testPrepDetails[(test || "ielts") as keyof typeof testPrepDetails].syllabus.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 p-5 bg-card border border-border rounded-2xl shadow-sm"
                  >
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">✓</span>
                    <p className="text-muted-foreground text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Who Should Join?</h2>
              <div className="space-y-4">
                {testPrepDetails[(test || "ielts") as keyof typeof testPrepDetails].whoItsFor.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 p-5 bg-card border border-border rounded-2xl shadow-sm"
                  >
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">✓</span>
                    <p className="text-muted-foreground text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-orange-500 text-white px-10 py-5 rounded-3xl text-xl font-bold hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
            >
              Book {data?.name} Coaching Now
              <Calendar className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TestPrepPage;

