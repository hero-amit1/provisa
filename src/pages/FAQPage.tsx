import { useState } from "react";
import Layout from "@/components/Layout";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What services does ProVisa offer?", a: "ProVisa offers study pathway consultation, interview preparation, career counseling, finance & scholarship guidance, visa guidance, and pre-departure briefing services." },
  { q: "How long has ProVisa been operating?", a: "ProVisa has been operating since 2009, with over 15 years of experience in education consultancy." },
  { q: "Which countries can I study in through ProVisa?", a: "We facilitate study abroad programs in Australia, USA, UK, Canada, Japan, South Korea, New Zealand, Europe, China, Bangladesh, and Dubai." },
  { q: "Is the consultation free?", a: "Yes, ProVisa provides free education consultation to students interested in studying abroad." },
  { q: "Where is ProVisa located?", a: "Our main office is at Laxmi Plaza, Putalisadak, Padmodaya Mode, Kathmandu, Nepal. We also have an office in Nepalgunj." },
  { q: "Do you offer test preparation classes?", a: "Yes, we offer IELTS and PTE coaching with experienced tutors and currently have a 50% discount on coaching programs." },
  { q: "What is the visa success rate?", a: "We have a very high visa success rate with over 3,000 visas approved and 5,000+ students placed internationally." },
  { q: "How do I book an appointment?", a: "You can book an appointment through our website or by calling us at +9779851101782 or 01-45318190." },
];

const FAQPage = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Layout>
      <section className="section-padding">
        <div className="section-container max-w-3xl">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-2">FAQ</p>
            <h1 className="section-title mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground">
              Find answers to common questions about our services and processes.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex items-center justify-between w-full px-6 py-4 text-left font-medium text-foreground hover:bg-muted/50 transition-colors"
                >
                  {faq.q}
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform shrink-0 ml-4 ${
                      open === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {open === i && (
                  <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQPage;
