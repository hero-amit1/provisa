import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TeamPage from "./pages/TeamPage";
import FAQPage from "./pages/FAQPage";
import UniversitiesPage from "./pages/UniversitiesPage";
import BlogsPage from "./pages/BlogsPage";
import StudyAbroadPage from "./pages/StudyAbroadPage";
import StudyInEuropePage from "./pages/StudyInEuropePage";
import StudyAbroadCountryPage from "./pages/StudyAbroadCountryPage";

import AppointmentPage from "./pages/AppointmentPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminUniversities from "./pages/admin/AdminUniversities";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminServices from "./pages/admin/AdminServices";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";
import StudyInUSAPage from "./pages/StudyInUSAPage";
import StudyInAustraliaPage from "./pages/StudyInAustraliaPage";
import StudyInUKPage from "./pages/StudyInUKPage";
import StudyInJapanPage from "./pages/StudyInJapanPage";
import StudyInCanadaPage from "./pages/StudyInCanadaPage";
import StudyInIndiaPage from "./pages/StudyInIndiaPage";
import StudyInChinaPage from "./pages/StudyInChinaPage";
import StudyInSouthKoreaPage from "./pages/StudyInSouthKoreaPage";
import TestPrepPage from "./pages/TestPrepPage";

import ServicesPage from "./pages/ServicesPage";
import ResourcesPage from "./pages/ResourcesPage";
import BlogDetail from "./pages/BlogDetail";


import ProtectedRoute from "@/components/admin/ProtectedRoute";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/universities" element={<UniversitiesPage />} />

            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />
            <Route path="/study-abroad/usa" element={<StudyInUSAPage />} />
            <Route path="/study-abroad/australia" element={<StudyInAustraliaPage />} />
            <Route path="/study-abroad/uk" element={<StudyInUKPage />} />
            <Route path="/study-abroad/canada" element={<StudyInCanadaPage />} />
            <Route path="/study-abroad/japan" element={<StudyInJapanPage />} />
            <Route path="/study-abroad/india" element={<StudyInIndiaPage />} />
            <Route path="/study-abroad/china" element={<StudyInChinaPage />} />
            <Route path="/study-abroad/south-korea" element={<StudyInSouthKoreaPage />} />
            <Route path="/study-abroad/europe" element={<StudyInEuropePage />} />
            <Route path="/study-abroad/nepal" element={<StudyAbroadCountryPage />} />

            <Route path="/study-abroad" element={<StudyAbroadPage />} />
            <Route path="/test-prep/:test" element={<TestPrepPage />} />
            <Route path="/services/:service" element={<ServicesPage />} />
            <Route path="/resources/:resource" element={<ResourcesPage />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route index element={<AdminDashboard />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="universities" element={<AdminUniversities />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
