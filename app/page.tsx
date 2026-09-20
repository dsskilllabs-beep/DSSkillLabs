import Hero from '@/components/sections/Hero';
import Stats from '@/components/Stats';
import CoursesSection from '@/components/sections/CoursesSection';
import WhySection from '@/components/sections/WhySection';
import JourneySection from '@/components/sections/JourneySection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import TechSection from '@/components/sections/TechSection';
import CareerSection from '@/components/sections/CareerSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import AboutSection from '@/components/sections/AboutSection';
import FaqSection from '@/components/sections/FaqSection';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <CoursesSection />
      <WhySection />
      <JourneySection />
      <ProjectsSection />
      <TechSection />
      <CareerSection />
      <TestimonialsSection />
      <AboutSection />
      <FaqSection />
      <CTA />
    </>
  );
}
