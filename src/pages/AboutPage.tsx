import Layout from "@/components/Layout";
import { Target, Eye, Award } from "lucide-react";
import MdImage from "@/assets/Md.jpg";
import { motion } from "framer-motion";

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
      "Our mission is to make students choose the best education destination for them to help them become professional experts in the future...",
  },
  {
    icon: Award,
    title: "Our Vision",
    content:
      "Our vision is to be the most trusted and reliable education consultancy in Nepal...",
  },
];

// animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const AboutPage = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="section-container">

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-title mb-4"
          >
            Get to know about us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-3xl mb-16"
          >
            We are a team of professionals dedicated to providing the best education consultancy services in Nepal.
          </motion.p>

          {/* ✅ M.D Section */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-20 flex flex-col md:flex-row items-center gap-10 bg-muted/30 p-6 rounded-xl"
          >
            <div className="md:w-1/3 flex justify-center">
              <img
                src={MdImage}
                alt="Managing Director"
                className="w-64 h-64 object-cover rounded-full shadow-lg border"
              />
            </div>

            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-primary mb-3">
                Message from Managing Director
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Pro-Visa... we are committed to guiding students toward success.
              </p>
            </div>
          </motion.div>

          {/* About Sections */}
          <div className="space-y-16">
            {aboutSections.map((section, index) => (
              <motion.div
                key={section.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;