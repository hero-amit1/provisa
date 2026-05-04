import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { BookOpen, Clock, Target, Award, Calendar } from "lucide-react";

const testData = {
  ielts: { name: "IELTS", score: "6.5+", desc: "International English Language Testing System for study abroad." },
  toefl: { name: "TOEFL", score: "90+", desc: "Test of English as a Foreign Language for universities." },
  sat: { name: "SAT", score: "1200+", desc: "Scholastic Assessment Test for undergraduate admissions." },
  pte: { name: "PTE", score: "58+", desc: "Pearson Test of English - fast results for visas/study." },
  japanese: { name: "Japanese Language", score: "JLPT N2", desc: "Japanese Language Proficiency Test for Japan studies." },
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

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
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
              </div>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <BookOpen className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <span>Expert faculty with 10+ years experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <span>Flexible batch timings</span>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <span>Proven success rate 95%+</span>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-primary/5 to-orange-500/5 border border-primary/20 rounded-3xl p-12">
                <div className="text-6xl mb-6">{data?.name}</div>
                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto leading-relaxed">
                  {data?.desc}
                </p>
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

