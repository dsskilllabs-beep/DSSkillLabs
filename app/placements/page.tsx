import type { Metadata } from 'next';
import CareerSection from '@/components/sections/CareerSection';
import JourneySection from '@/components/sections/JourneySection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTA from '@/components/CTA';

export const metadata: Metadata = { title: 'Placements & Career Support', description: 'Resume building, mock interviews, portfolio development and career mentoring at DS SkillLabs.' };

export default function PlacementsPage() {
  return (<><CareerSection h1 /><JourneySection /><TestimonialsSection /><CTA /></>);
}
