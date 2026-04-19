import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ChevronRight } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img src={logo} alt="ProVisa" className="h-16 mb-4 bg-background rounded-lg p-2" />
            <p className="text-sm opacity-80 leading-relaxed">
              Don't just take our word for it, come see us and let us show you
              that you've come to the right place.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", path: "/about" },
                { label: "Our Team", path: "/team" },
                { label: "Contact Us", path: "/contact" },
                { label: "FAQs", path: "/faq" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-1 text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Universities", path: "/universities" },
                { label: "Study Abroad", path: "/study-abroad/australia" },
                { label: "Blogs", path: "/blogs" },
                { label: "Services", path: "/services/study-pathway" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-1 text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm opacity-80">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                Laxmi Plaza, Putalisadak, Padmodaya Mode, Kathmandu, Nepal
              </li>
              <li className="flex items-center gap-2 text-sm opacity-80">
                <Phone className="h-4 w-4 shrink-0" />
                +9779851101782, 01-4531819
              </li>
              <li className="flex items-center gap-2 text-sm opacity-80">
                <Mail className="h-4 w-4 shrink-0" />
                admin@provisa.com.np
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/20">
        <div className="section-container py-4 text-center text-sm opacity-60">
          © provisanepal {new Date().getFullYear()}, All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
