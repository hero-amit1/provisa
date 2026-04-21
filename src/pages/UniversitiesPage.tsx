import { useState, useEffect } from 'react';
import Layout from "@/components/Layout";
import { GraduationCap } from "lucide-react";
import { universitiesAPI } from '@/lib/api';

const UniversitiesPage = () => {
  const [universities, setUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const data = await universitiesAPI.getAllPublic();
        setUniversities(data);
      } catch (err) {
        setError('Failed to load universities');
      } finally {
        setLoading(false);
      }
    };
    fetchUniversities();
  }, []);

  if (loading) return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading universities...</div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <section className="section-padding data-scroll-reveal" data-scroll-reveal-animation="slide-up">
        <div className="section-container">

          <div className="text-center mb-12 data-scroll-reveal animate-slide-up">
            <p className="section-subtitle mb-2 animate-fade-in animation-delay-100">
              Universities
            </p>

            <h1 className="section-title mb-4 animate-slide-up animation-delay-200">
              Top universities we are partnered with
            </h1>

            <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
              We are partnered with top universities around the world to provide you with the best education.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 data-scroll-reveal">

            {universities.map((uni, index) => (
              <div
                key={uni._id}
                className="bg-card border border-border rounded-xl p-6 text-center card-hover data-scroll-reveal animate-scale-in"
                style={{ '--order': index + 1 } as React.CSSProperties}
              >

                {/* IMAGE OR ICON */}
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center overflow-hidden rounded-full bg-muted animate-rotate-in animation-delay-100">

                  {uni.image ? (
                    <img
                      src={uni.image}
                      alt={uni.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <GraduationCap className="h-10 w-10 text-primary" />
                  )}

                </div>

                {/* NAME */}
                <h3 className="font-heading font-semibold text-foreground text-sm">
                  {uni.name}
                </h3>

                {/* COUNTRY */}
                <p className="text-xs text-primary mt-1">
                  {uni.country}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UniversitiesPage;