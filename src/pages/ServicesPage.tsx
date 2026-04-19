import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { servicesAPI } from '@/lib/api';
import { Briefcase } from "lucide-react";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesAPI.getAllPublic();
        setServices(data);
      } catch (err) {
        console.error('Services load failed');
        setServices([
          { _id: '1', title: 'Study Pathway Consultation', description: 'Personalized study pathway planning and university selection.', slug: 'study-pathway' },
          { _id: '2', title: 'Interview Preparation', description: 'Mock interviews and coaching for university admissions.', slug: 'interview-prep' },
          { _id: '3', title: 'Career Counseling', description: 'Career guidance and job market insights.', slug: 'career-counseling' },
          { _id: '4', title: 'Finance & Scholarship', description: 'Scholarship search and financial planning.', slug: 'finance-scholarship' },
          { _id: '5', title: 'Visa Guidance', description: 'Complete visa application assistance.', slug: 'visa-guidance' },
          { _id: '6', title: 'Pre-departure Briefing', description: 'Orientation and pre-departure support.', slug: 'pre-departure' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading services...</div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-12 data-scroll-reveal animate-slide-up">
            <p className="section-subtitle mb-2">Services</p>
            <h1 className="section-title mb-4 animate-slide-up animation-delay-200">Our Comprehensive Services</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in-up">
              Complete support for your study abroad journey from consultation to departure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 data-scroll-reveal">
            {services.map((service, index) => (
              <div
                key={service._id}
                className="group bg-card border border-border rounded-xl p-8 card-hover data-scroll-reveal animate-scale-in cursor-pointer hover:shadow-2xl"
                style={{ '--order': index + 1 } as React.CSSProperties}
              >
                <Briefcase className="h-16 w-16 text-primary mb-6 animate-rotate-in group-hover:animate-spin-slow" />
                <h3 className="font-heading font-semibold text-2xl text-foreground mb-4 group-hover:text-primary transition-colors animate-slide-up">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors animate-fade-in-up">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;

