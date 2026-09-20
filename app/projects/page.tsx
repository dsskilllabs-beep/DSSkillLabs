import type { Metadata } from 'next';
import ProjectsSection from '@/components/sections/ProjectsSection';
import TechSection from '@/components/sections/TechSection';
import CTA from '@/components/CTA';

export const metadata: Metadata = { title: 'Projects', description: 'Real-world projects you build at DS SkillLabs, from dashboards to data pipelines and full stack apps.' };

export default function ProjectsPage() {
  return (<div className="pt-12"><ProjectsSection h1 /><TechSection /><div className="pt-24"><CTA /></div></div>);
}
