import type { Metadata } from 'next';
import CoursesSection from '@/components/sections/CoursesSection';
import WhySection from '@/components/sections/WhySection';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Data Analytics, Data Science, Data Engineering, Full Stack Development, AI & Machine Learning and Cloud & DevOps programs at DS SkillLabs.',
};

export default function CoursesPage() {
  return (
    <>
      <CoursesSection h1 title="Our programs" text="Pick the path that fits where you are and where you want to go." />
      <WhySection />
      <div className="pt-24"><CTA /></div>
    </>
  );
}
