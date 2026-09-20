import SectionHeading from '../SectionHeading';
import ProjectCard from '../ProjectCard';
import { projects } from '@/data/content';

export default function ProjectsSection({ h1 }: { h1?: boolean }) {
  return (
    <section className="section pt-0 sm:pt-0" aria-labelledby="projects-title">
      <div className="wrap">
        <SectionHeading id="projects-title" title="Build real-world projects" text="You finish with a portfolio, not just certificates." h1={h1} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (<ProjectCard key={p.title} project={p} />))}
        </div>
      </div>
    </section>
  );
}
