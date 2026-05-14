import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import logo from "@/assets/logo.png";
import ContactTopInfo from "@/components/ContactTopInfo";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <img
              src={logo}
              alt="ProVisa"
              className="h-16 mb-4 bg-background rounded-lg p-2 hover:scale-105 transition duration-300"
            />
            <p className="text-sm text-white/80 leading-relaxed hover:text-orange-400 transition-colors duration-300 cursor-pointer">
             "Think Globally, Learn Globally, Grow Globally"
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-white hover:text-orange-400 transition cursor-pointer">
              Company
            </h4>
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
                    className="group flex items-center gap-1 text-sm text-white/80 hover:text-orange-400 transition-all duration-300"
                  >
                    <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-white hover:text-orange-400 transition cursor-pointer">
              Quick Links
            </h4>
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
                    className="group flex items-center gap-1 text-sm text-white/80 hover:text-orange-400 transition-all duration-300"
                  >
                    <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-white hover:text-orange-400 transition cursor-pointer">
              Contact Us
            </h4>
            <ContactTopInfo />


          </div>


        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/20">
        <div className="section-container py-4 text-center text-sm text-white/60 hover:text-orange-400 transition cursor-pointer">
          © provisanepal {new Date().getFullYear()}, All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;