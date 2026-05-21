import { useState, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import { universitiesAPI } from '@/lib/api';

const UniversitiesSection = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        // API response
        const response =
          await universitiesAPI.getAllPublic();

        console.log(
          'UNIVERSITIES RESPONSE:',
          response
        );

        // Handle backend response shape
        const universitiesData =
          Array.isArray(response?.data)
            ? response.data
            : Array.isArray(response)
            ? response
            : [];

        setUniversities(universitiesData);
      } catch (err) {
        console.error(
          'Universities load failed:',
          err
        );

        setUniversities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="section-padding text-center">
        Loading universities...
      </div>
    );
  }

  // ==============================
  // EMPTY STATE
  // ==============================

  if (
    !Array.isArray(universities) ||
    universities.length === 0
  ) {
    return (
      <section className="section-padding text-center">
        <div className="section-container">
          <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

          <h3 className="text-xl font-semibold mb-2">
            No Partner Universities
          </h3>

          <p className="text-muted-foreground max-w-md mx-auto">
            We're expanding our network
            of partner universities
            worldwide.
          </p>
        </div>
      </section>
    );
  }

  // ==============================
  // MAIN UI
  // ==============================

  return (
    <section
      className="section-padding data-scroll-reveal"
      data-animation="slide-up"
    >
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12 data-scroll-reveal animate-slide-up animation-delay-200">
          <p className="section-subtitle mb-2 animate-fade-in">
            Our Partners
          </p>

          <h2 className="section-title mb-4 animate-slide-up animation-delay-300">
            Partner Universities
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
            Top universities we are
            partnered with around the
            world.
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 data-scroll-reveal">
          {universities
            .slice(0, 12)
            .map((uni, index) => {
              const colIndex =
                index % 5;

              const slideAnimation =
                colIndex % 2 === 0
                  ? 'animate-slide-in-left'
                  : 'animate-slide-in-right';

              return (
                <div
                  key={
                    uni._id || index
                  }
                  className={`group bg-card border border-border rounded-xl p-6 text-center card-hover data-scroll-reveal ${slideAnimation} group-hover:shadow-2xl group-hover:border-primary/30`}
                  style={{
                    transitionDelay: `${index * 80}ms`,
                  }}
                >
                  {/* Logo/Image */}
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 overflow-hidden">
                    {uni.image ? (
                      <img
                        src={uni.image}
                        alt={uni.name}
                        className="w-full h-full object-cover"
                        onError={(
                          e
                        ) => {
                          e.currentTarget.style.display =
                            'none';
                        }}
                      />
                    ) : (
                      <GraduationCap className="h-8 w-8 text-primary" />
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="font-heading font-semibold text-foreground text-sm group-hover:text-primary transition-colors duration-300">
                    {uni.name}
                  </h3>

                  {/* Country */}
                  <p className="text-xs text-muted-foreground mt-1 group-hover:text-primary/80 transition-colors duration-300">
                    {uni.country}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default UniversitiesSection;