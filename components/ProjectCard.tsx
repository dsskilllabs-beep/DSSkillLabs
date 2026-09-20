import { projectArt } from '@/data/art';

type Project = { art: string; title: string; desc: string; stack: string[]; build: string[] };

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[18px] border border-line bg-navy-900">
      {/* projectArt holds static, trusted SVG strings */}
      <div
        className="border-b border-line bg-gradient-to-br from-[#0E2A66] to-navy-900 p-[18px] [&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: projectArt[project.art] ?? '' }}
      />
      <div className="flex flex-1 flex-col px-6 pb-6 pt-[22px]">
        <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
        <p className="text-[15.5px] text-ink-muted">{project.desc}</p>
        <ul className="mb-[18px] mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li key={s} className="rounded-md border border-line-strong px-[9px] py-[3px] text-[12.5px] font-semibold text-brand-cyan">{s}</li>
          ))}
        </ul>
        <details className="group mt-auto">
          <summary className="inline-flex min-h-[42px] cursor-pointer items-center rounded-[10px] border-[1.5px] border-line-strong px-[18px] text-[15px] font-bold transition-colors hover:border-brand-cyan hover:text-brand-cyan group-open:border-brand-cyan group-open:text-brand-cyan">
            View project
          </summary>
          <ul className="mt-3.5 list-disc pl-[18px] text-[15px] text-ink-muted">
            {project.build.map((b) => (<li key={b} className="mb-1">{b}</li>))}
          </ul>
        </details>
      </div>
    </article>
  );
}
