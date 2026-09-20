import type { Metadata } from 'next';
import AboutSection from '@/components/sections/AboutSection';
import WhySection from '@/components/sections/WhySection';
import JourneySection from '@/components/sections/JourneySection';
import CTA from '@/components/CTA';

export const metadata: Metadata = { title: 'About', description: 'DS SkillLabs is a technology education platform focused on practical, career-oriented skills.' };

export default function AboutPage() {
  return (<><AboutSection h1 /><WhySection /><JourneySection /><CTA /></>);
}
