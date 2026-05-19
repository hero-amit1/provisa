import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Download,
  Eye,
  FileText,
  BookOpen,
  GraduationCap,
  CheckCircle,
  Info,
} from "lucide-react";

import resume1Pdf from "@/assets/Resume 1.pdf";
import resume2Pdf from "@/assets/Resume 2.pdf";
import lor1Pdf from "@/assets/LOR1.pdf";
import lor2Pdf from "@/assets/LOR2.pdf";
import medium1Pdf from "@/assets/Medium of Instruction.pdf";
import medium2Pdf from "@/assets/Medium of Instruction 2.pdf";
import motivationLetterPdf from "@/assets/Motivation Letter.pdf";
import australiaSop1Pdf from "@/assets/Australia SOP 1.pdf";
import australiaSop2Pdf from "@/assets/Australia SOP 2.pdf";

const resourceData = {
  "interview-prep": {
    name: "Interview Preparation Guide",
    desc: "Master your university interview with confidence using structured answers and proven techniques.",
    icon: BookOpen,
    tips: [
      "Prepare your self-introduction (1–2 min)",
      "Research your university & course",
      "Practice common interview questions",
      "Be confident & natural",
    ],
  },
  biodata: {
    name: "Professional Biodata Templates",
    desc: "Modern CV formats designed for international university applications.",
    icon: FileText,
    tips: [
      "Keep CV clean and short",
      "Use professional formatting",
      "Highlight achievements",
      "Avoid unnecessary graphics",
    ],
  },
  sop: {
    name: "Statement of Purpose Guide",
    desc: "Write a powerful SOP that increases your admission chances.",
    icon: GraduationCap,
    tips: [
      "Start with a strong story",
      "Show clear career goals",
      "Explain why this university",
      "Keep it authentic",
    ],
  },
  "letter-of-recommendation": {
    name: "Letter of Recommendation (LOR)",
    desc: "Strong LOR samples for university applications.",
    icon: FileText,
    tips: [
      "Request early from professor",
      "Provide achievements",
      "Use formal tone",
      "Must be on letterhead",
    ],
  },
  "motivation-letter": {
    name: "Motivation Letter Guide",
    desc: "Write a compelling motivation letter that highlights your goals.",
    icon: GraduationCap,
    tips: [
      "Be personal and honest",
      "Show passion clearly",
      "Explain future goals",
      "Avoid copying templates",
    ],
  },
  "medium-of-instruction": {
    name: "Medium of Instruction (MOI)",
    desc: "Official documents used for university verification.",
    icon: BookOpen,
    tips: [
      "Get from your college",
      "Must include stamp",
      "Use official letterhead",
      "Confirm course language",
    ],
  },
};

const ResourcesPage = () => {
  const { resource } = useParams<{ resource: string }>();

  const data =
    (resource && resourceData[resource as keyof typeof resourceData]) ||
    resourceData["interview-prep"];

  const Icon = data.icon;

  const getFiles = () => {
    switch (resource) {
      case "biodata":
        return [
          { name: "Resume Template 1", file: resume1Pdf },
          { name: "Resume Template 2", file: resume2Pdf },
        ];
      case "letter-of-recommendation":
        return [
          { name: "LOR Sample 1", file: lor1Pdf },
          { name: "LOR Sample 2", file: lor2Pdf },
        ];
      case "medium-of-instruction":
        return [
          { name: "MOI Format 1", file: medium1Pdf },
          { name: "MOI Format 2", file: medium2Pdf },
        ];
      case "motivation-letter":
        return [{ name: "Motivation Letter Sample", file: motivationLetterPdf }];
      case "sop":
        return [
          { name: "SOP Sample 1", file: australiaSop1Pdf },
          { name: "SOP Sample 2", file: australiaSop2Pdf },
        ];
      default:
        return [];
    }
  };

  const files = getFiles();

  return (
    <Layout>
      <section className="min-h-screen py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-6xl mx-auto px-6">

          {/* HEADER */}
          <div className="text-center mb-12">
            <div className="inline-flex p-5 rounded-3xl bg-orange-100 mb-6">
              <Icon className="h-10 w-10 text-orange-600" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {data.name}
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {data.desc}
            </p>
          </div>

          {/* INFO BOX */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 mb-10 flex gap-3">
            <Info className="text-orange-600 mt-1" />
            <p className="text-sm text-orange-800">
              These are real admission documents and templates. Use them as guidance to improve your application quality.
            </p>
          </div>

          {/* CONTENT */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* LEFT FILES */}
            <div className="md:col-span-2 space-y-5">

              {files.length > 0 ? (
                files.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                  >
                    <h3 className="font-semibold text-lg mb-4 text-gray-800">
                      {item.name}
                    </h3>

                    {/* CLEAN BUTTON VIEW (NO PDF EDITOR/IFRAME) */}
                    <div className="flex gap-3">
                      <a
                        href={item.file}
                        download
                        className="flex-1 flex items-center justify-center gap-2 bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700"
                      >
                        <Download size={18} />
                        Download
                      </a>

                      <a
                        href={item.file}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-200"
                      >
                        <Eye size={18} />
                        View PDF
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white border rounded-2xl p-10 text-center text-gray-500">
                  No files available for this section.
                </div>
              )}
            </div>

            {/* RIGHT TIPS */}
            <div className="bg-white border rounded-2xl p-6 h-fit sticky top-24">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2 text-orange-600">
                <CheckCircle />
                Pro Tips
              </h2>

              <ul className="space-y-3 text-sm text-gray-700">
                {data.tips.map((tip, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-orange-500">•</span>
                    {tip}
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 bg-orange-50 rounded-xl text-sm text-orange-800">
                💡 Always customize templates instead of copying directly.
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-14">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-3xl text-lg font-bold transition"
            >
              Book Free Consultation
            </Link>
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default ResourcesPage;