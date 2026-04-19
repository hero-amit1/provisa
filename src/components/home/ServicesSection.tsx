import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { BookOpen, Users, Briefcase, DollarSign, Stamp, Plane } from "lucide-react";
import { servicesAPI } from '@/lib/api';

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesAPI.getAllPublic();
        setServices(data);
      } catch (err) {
        console.error('Services load failed, using fallback');
        setServices([
          { _id: '1', title: 'Study Pathway Consultation', description: 'Personalized study pathway planning and university selection.' },
          { _id: '2', title: 'Interview Preparation', description: 'Mock interviews and coaching for university admissions.' },
          { _id: '3', title: 'Career Counseling', description: 'Career guidance and job market insights.' },
          { _id: '4', title: 'Finance & Scholarship', description: 'Scholarship search and financial planning.' },
          { _id: '5', title: 'Visa Guidance', description: 'Complete visa application assistance.' },
          { _id: '6', title: 'Pre-departure Briefing', description: 'Orientation and pre-departure support.' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const getIcon = (title) => {
    if (title.includes('Study')) return BookOpen;
    if (title.includes('Interview')) return Users;
    if (title.includes('Career')) return Briefcase;
    if (title.includes('Finance')) return DollarSign;
    if (title.includes('Visa')) return Stamp;
    return Plane;
  };

  if (loading) return <div>Loading services...</div>;

  return (
    <section className="section-padding data-scroll-reveal" data-animation="slide-up">
      <div className="section-container">
        <div className="text-center mb-12 data-scroll-reveal animate-slide-up">
          <p className="section-subtitle mb-2 animate-fade-in animation-delay-100">Services</p>
          <h2 className="section-title mb-4 animate-slide-up animation-delay-200">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
            We provide the best services to our customers. We are always here to help you.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 data-scroll-reveal">
          {services.map((service, index) => {
            const Icon = getIcon(service.title);
            return (
                <Link
                key={service._id}
                to={`/services`}
                className="group bg-card border border-border rounded-xl p-6 card-hover data-scroll-reveal animate-scale-in"
                style={{ '--order': index + 1 } as React.CSSProperties}
              >
                <Icon className="h-12 w-12 text-primary mb-4 animate-rotate-in animation-delay-100 group-hover:animate-spin-slow" />
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors animate-fade-in-up">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed animate-fade-in">
                  {service.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
