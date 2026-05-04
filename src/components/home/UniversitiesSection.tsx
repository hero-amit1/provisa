import { useState, useEffect } from 'react';
import { GraduationCap } from "lucide-react";
import { universitiesAPI } from '@/lib/api';

const UniversitiesSection = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const data = await universitiesAPI.getAllPublic();
        setUniversities(data);
      } catch (err) {
        console.error('Universities load failed');
        setUniversities([
          { _id: '1', name: 'University of Toronto', country: 'Canada' },
          { _id: '2', name: 'University of Sydney', country: 'Australia' },
          { _id: '3', name: 'University of Tokyo', country: 'Japan' },
          { _id: '4', name: 'University of Amsterdam', country: 'Europe' },
          { _id: '5', name: 'Harvard University', country: 'USA' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchUniversities();
  }, []);

  if (loading) return <div className="section-padding text-center">Loading universities...</div>;

  return (
    <section className="section-padding data-scroll-reveal" data-animation="slide-up">
      <div className="section-container">
        <div className="text-center mb-12 data-scroll-reveal animate-slide-up animation-delay-200">
          <p className="section-subtitle mb-2 animate-fade-in">Our Partners</p>
          <h2 className="section-title mb-4 animate-slide-up animation-delay-300">Partner Universities</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
            Top universities we are partnered with around the world.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 data-scroll-reveal">
          {universities.slice(0, 12).map((uni, index) => {
            // Alternating slide animation based on column position
            const colIndex = index % 5;
            const slideAnimation = colIndex % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right';

            return (
              <div
                key={uni._id}
                className={`group bg-card border border-border rounded-xl p-6 text-center card-hover data-scroll-reveal ${slideAnimation} group-hover:shadow-2xl group-hover:border-primary/30`}
                style={{
                  '--order': index + 1,
                  transitionDelay: `${index * 80}ms`
                } as React.CSSProperties}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 overflow-hidden">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-sm group-hover:text-primary transition-colors duration-300">{uni.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 group-hover:text-primary/80 transition-colors duration-300">{uni.country}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UniversitiesSection;

