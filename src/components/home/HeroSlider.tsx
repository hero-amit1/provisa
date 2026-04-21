import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroStudents from "@/assets/hero-students.jpg";
import heroCounseling from "@/assets/hero-counseling.jpg";

const slides = [
  {
    image: heroStudents,
    title: "50% Off on IELTS & PTE Coaching",
    description:
      "Master your English exams with expert-led coaching designed for real success.",
  },
  {
    image: heroCounseling,
    title: "Your Education & Visa Journey Starts Here",
    description:
      "We guide you step-by-step from university selection to visa approval.",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 1.5));
    }, 80);

    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [current]);

  return (
    <section className="relative h-[550px] md:h-[700px] lg:h-[800px] overflow-hidden">

      {/* BACKGROUND SLIDES */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            index === current
              ? "opacity-100 scale-105"
              : "opacity-0 scale-110"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
      ))}

      {/* CONTENT */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">

        <div
          key={current}
          className="max-w-3xl text-center animate-fade-in-up"
        >

          {/* GLASS CARD */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              {slides[current].title}
            </h1>

            <p className="text-white/80 text-sm md:text-base lg:text-lg mb-8">
              {slides[current].description}
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-3 rounded-xl bg-primary text-white font-semibold transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:scale-105"
            >
              Visit for counselling
            </Link>

          </div>
        </div>
      </div>

      {/* DOTS ONLY (NO ARROWS = CLEAN UI) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">

        {/* PROGRESS BAR */}
        <div className="w-44 h-[3px] bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* DOTS */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                i === current
                  ? "bg-primary scale-125"
                  : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;