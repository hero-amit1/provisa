import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroStudents from "@/assets/hero-students.jpg";
import heroCounseling from "@/assets/hero-counseling.jpg";

const slides = [
  {
    image: heroStudents,
    title: "50% Off on IELTS and PTE Coaching",
    description:
      "Achieve your language proficiency goals with our specialized coaching programs. Benefit from expert guidance and tailored strategies to excel in IELTS and PTE exams.",
  },
  {
    image: heroCounseling,
    title: "Empowering Your Education and Visa Journey",
    description:
      "Our collaborative approach is designed to support you every step of the way. We work closely with you to navigate the complexities of the education and visa process.",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-foreground/50" />
        </div>
      ))}

      <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
        <div className="max-w-3xl">
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight">
            {slides[current].title}
          </h1>
          <p className="text-background/80 text-sm md:text-base lg:text-lg mb-8 max-w-2xl mx-auto">
            {slides[current].description}
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Visit us for counselling
          </Link>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/20 hover:bg-background/40 text-background p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/20 hover:bg-background/40 text-background p-2 rounded-full transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === current ? "bg-primary" : "bg-background/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
