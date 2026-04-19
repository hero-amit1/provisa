import { useState, useEffect } from 'react';
import { Quote } from "lucide-react";
import { testimonialsAPI } from '@/lib/api';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await testimonialsAPI.getAllPublic();
        setTestimonials(data);
      } catch (err) {
        console.error('Testimonials load failed');
        setTestimonials([
          { _id: '1', text: 'ProVisa team helped me get into my dream university!', name: 'John Doe', university: 'University of Toronto' },
          { _id: '2', text: 'Excellent visa guidance and interview prep!', name: 'Jane Smith', university: 'University of Sydney' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) return <div>Loading testimonials...</div>;

  return (
    <section className="section-padding data-scroll-reveal" data-animation="slide-up">
      <div className="section-container">
        <div className="text-center mb-12 data-scroll-reveal animate-slide-up">
          <p className="section-subtitle mb-2 animate-fade-in animation-delay-100">Testimonials</p>
          <h2 className="section-title mb-4 animate-slide-up animation-delay-200">Student's Testimonials</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
            Here are some testimonials from our students who have successfully completed their journey with us.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 data-scroll-reveal">
          {testimonials.map((t, index) => (
            <div key={t._id} className="bg-card border border-border rounded-xl p-6 card-hover data-scroll-reveal animate-bounce-in" style={{ '--order': index + 1 } as React.CSSProperties}>
              <Quote className="h-8 w-8 text-primary/30 mb-4 animate-rotate-in animation-delay-100" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div>
                <div className="font-heading font-semibold text-foreground">{t.name}</div>
                <div className="text-xs text-primary">{t.university}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
