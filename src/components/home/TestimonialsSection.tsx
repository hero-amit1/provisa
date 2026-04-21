import { useState, useEffect } from 'react';
import { Quote } from "lucide-react";
import { testimonialsAPI } from '@/lib/api';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await testimonialsAPI.getAllPublic();
        setTestimonials(data);
      } catch (err) {
        console.error('Testimonials load failed');

        setTestimonials([
          {
            _id: '1',
            text: 'ProVisa team helped me get into my dream university!',
            name: 'John Doe',
            university: 'University of Toronto'
          },
          {
            _id: '2',
            text: 'Excellent visa guidance and interview prep!',
            name: 'Jane Smith',
            university: 'University of Sydney'
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Loading testimonials...
      </div>
    );
  }

  return (
    <section className="section-padding data-scroll-reveal">
      <div className="section-container">

        {/* HEADER */}
        <div className="text-center mb-12">
          <p className="section-subtitle mb-2">Testimonials</p>

          <h2 className="section-title mb-4">
            What our students say
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real stories from students who achieved their dream universities with our support.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {testimonials.map((t, index) => {
            const initials = t.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .toUpperCase();

            return (
              <div
                key={t._id}
                className="group relative bg-gradient-to-br from-background to-muted/30 border border-border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ '--order': index + 1 } as React.CSSProperties}
              >

                {/* TOP */}
                <div className="flex items-start justify-between mb-5">

                  {/* USER */}
                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                      {initials}
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground text-sm">
                        {t.name}
                      </h3>

                      <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {t.university}
                      </span>
                    </div>

                  </div>

                  {/* ICON */}
                  <Quote className="h-6 w-6 text-primary/20" />
                </div>

                {/* TEXT */}
                <div className="relative">
                  <span className="text-4xl text-primary/10 absolute -top-4 -left-1">
                    “
                  </span>

                  <p className="text-sm text-muted-foreground leading-relaxed pl-4 italic line-clamp-5">
                    {t.text}
                  </p>

                  <span className="text-4xl text-primary/10 absolute -bottom-6 right-0">
                    ”
                  </span>
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;