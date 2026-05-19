import { Link } from "react-router-dom";

const AboutPreview = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title mb-6">
            Empowering Your Education and Visa Journey.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Our collaborative approach is designed to support you every step of the way. 
            We work closely with you to navigate the complexities of the education and visa process, 
            ensuring a smooth and successful experience. Whether you need assistance with university 
            applications, visa paperwork, or understanding international requirements, our expert team 
            is here to help.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Professional Visa and Education Services Pvt. Ltd. (Pro-Visa) is a professional visa 
            and educational consultancy authorized by the Ministry of Education (MOE) and offering 
            free education to students interested in studying abroad. We have offices in Kathmandu 
            and Nepalgunj with a Learning Center fully equipped with ultra-modern facilities.
          </p>
          <Link
            to="/about"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
