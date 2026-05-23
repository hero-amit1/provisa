import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Calendar } from "lucide-react";
import logo from "@/assets/logo.png";




const abroadStudyLinks = [
  { label: "Australia", path: "/study-abroad/australia" },
  { label: "Canada", path: "/study-abroad/canada" },
  { label: "China", path: "/study-abroad/china" },
  { label: "Europe", path: "/study-abroad/europe" },
  { label: "India", path: "/study-abroad/india" },
  { label: "Japan", path: "/study-abroad/japan" },
  { label: "South Korea", path: "/study-abroad/south-korea" },
  { label: "UK", path: "/study-abroad/uk" },
  { label: "USA", path: "/study-abroad/usa" },
];




const serviceLinks = [
  { label: "Study in Nepal Consultation", path: "/services/study-in-nepal" },
  { label: "Study Abroad Consultation", path: "/services/study-abroad" },
  { label: "Interview Preparation", path: "/services/interview-prep" },
  { label: "Career Counseling", path: "/services/career-counseling" },
  { label: "Finance & Scholarship", path: "/services/finance-scholarship" },
  { label: "Visa Guidance", path: "/services/visa-guidance" },
  { label: "Pre-departure Briefing", path: "/services/pre-departure" },
  { label: "Test Preparation", path: "/services/test-preparation" },
];


const testPrepLinks = [
  { label: "IELTS", path: "/test-prep/ielts" },
  { label: "TOEFL", path: "/test-prep/toefl" },
  { label: "SAT", path: "/test-prep/sat" },
  { label: "PTE", path: "/test-prep/pte" },
  { label: "Japanese Language", path: "/test-prep/japanese" },
];

const resourcesLinks = [
  { label: "Interview Preparation", path: "/resources/interview-prep" },
  { label: "Bio-Data", path: "/resources/biodata" },
  { label: "Statement of Purpose", path: "/resources/sop" },
  { label: "Course Selection", path: "/resources/course-selection" },
  { label: "Letter of Recommendation", path: "/resources/letter-of-recommendation" },
  { label: "Motivation Letter", path: "/resources/motivation-letter" },
  { label: "Medium of Instruction", path: "/resources/medium-of-instruction" },
];

const navItems = [
  { label: "Abroad Study", dropdown: abroadStudyLinks },
  { label: "Test Preparation", dropdown: testPrepLinks },
  { label: "Services", dropdown: serviceLinks },
  { label: "Blogs", path: "/blogs" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Team", path: "/team" },
  { label: "FAQ", path: "/faq" },
  { label: "Universities", path: "/universities" },
  { label: "Resources", dropdown: resourcesLinks },

];


const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  return (
    <nav className="bg-background shadow-sm sticky top-0 z-50 animate-slide-down data-scroll-reveal">
      <div className="section-container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 animation-delay-100">
          <img src={logo} alt="ProVisa" className="h-10 md:h-12 animate-fade-in" />

        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1 animation-delay-200">
          {navItems.map((item, index) =>
            item.dropdown ? (

              <div


                key={item.label}
                className="relative group data-scroll-reveal"
                style={{ '--order': 1 } as React.CSSProperties}
                onMouseEnter={() => setTimeout(() => setOpenDropdown(item.label), 150)}

                onMouseLeave={() => setTimeout(() => setOpenDropdown(null), 200)}

              >
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors animate-fade-in-up">
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {openDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-background border border-border rounded-lg shadow-lg py-2 min-w-[220px] animate-fade-in-up transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible delay-150">
                    {item.dropdown.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.path!}
                className={`px-3 py-2 text-sm font-medium transition-colors data-scroll-reveal animate-fade-in-up animation-delay-300 ${location.pathname === item.path
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
                  }`}
                style={{ '--order': index + 1 } as React.CSSProperties}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        <Link
          to="/appointment"
          className="hidden lg:flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity animate-bounce-in animation-delay-400 data-scroll-reveal"
        >
          <Calendar className="h-4 w-4" />
          Book an Appointment
        </Link>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-foreground animate-fade-in animation-delay-100"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-slide-up">
          <div className="section-container py-4 space-y-2">
            {navItems.map((item) =>

              item.dropdown ? (

                <div key={item.label} className="data-scroll-reveal">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.label ? null : item.label)
                    }
                    className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-foreground"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {openDropdown === item.label && (
                    <div className="pl-6 space-y-1">
                      {item.dropdown.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="block px-3 py-1.5 text-sm text-muted-foreground hover:text-primary"
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.path!}
                  className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary data-scroll-reveal animate-slide-up"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              to="/appointment"
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold mt-4 animate-bounce-in"
              onClick={() => setMobileOpen(false)}
            >
              <Calendar className="h-4 w-4" />
              Book an Appointment
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
