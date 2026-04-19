import Layout from "@/components/Layout";
import HeroSlider from "@/components/home/HeroSlider";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import AbroadStudySection from "@/components/home/AbroadStudySection";
import AboutPreview from "@/components/home/AboutPreview";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import UniversitiesSection from "@/components/home/UniversitiesSection";

const Index = () => {
  return (
    <Layout>
      <HeroSlider />
      <StatsSection />
      <ServicesSection />
      <AbroadStudySection />
      <AboutPreview />
      <TestimonialsSection />
      <UniversitiesSection />
    </Layout>
  );
};

export default Index;
