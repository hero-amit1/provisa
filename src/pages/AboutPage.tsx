import Layout from "@/components/Layout";
import { Target, Eye, Award } from "lucide-react";

const aboutSections = [
  {
    icon: Target,
    title: "Who We are",
    content: `Professional Visa and Education Services Pvt. Ltd. (Pro-Visa) is the Best #1 Education Consultancy in Nepal, authorized from ministry of education (MOE) and free education providing proper guidance to students planning for international study. We are running gracefully since 2009; facilitating students by providing students actual information with the full support in documentation process and language skills.

We counsel students by analyzing their academic profile and advising them the best suitable option best matched to their own career aspiration. Currently, PRO-VISA is recruiting students from Nepal to Australia, USA, UK, China, Japan, South Korea, New Zealand, Germany, France, Hungary, Finland, India, and Bangladesh for higher study.`,
  },
  {
    icon: Eye,
    title: "Our Mission",
    content:
      "Our mission is to make students choose the best education destination for them to help them become professional experts in the future. Many students from Nepal are in search of an ideal education provider abroad. PRO-VISA is here to guide them honest, up to date and right information to help students walk on right track for their bright future of success.",
  },
  {
    icon: Award,
    title: "Our Vision",
    content:
      "Our vision is to be the most trusted and reliable education consultancy in Nepal, providing world-class guidance and support to students aspiring to study abroad. We aim to create a global network of successful alumni who contribute positively to society.",
  },
];

const AboutPage = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="section-container">
          <h1 className="section-title mb-4">Get to know about us</h1>
          <p className="text-muted-foreground max-w-3xl mb-16">
            We are a team of professionals dedicated to providing the best education
            consultancy services in Nepal. We are here to help you make the right
            decision for your future.
          </p>

          <div className="space-y-16">
            {aboutSections.map((section, index) => (
              <div
                key={section.title}
                className={`flex flex-col md:flex-row gap-8 items-start ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="md:w-1/3">
                  <div className="flex items-center gap-3 mb-4">
                    <section.icon className="h-6 w-6 text-primary" />
                    <h2 className="font-heading font-bold text-xl text-primary">
                      {section.title}
                    </h2>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
