import SectionHeading from '../SectionHeading';
import { tech } from '@/data/content';

export default function TechSection() {
  return (
    <section className="section border-y border-line bg-navy-900" aria-labelledby="tech-title">
      <div className="wrap">
        <SectionHeading id="tech-title" title="Technologies you'll work with" />
        <div>
          {tech.map((r) => (
            <div key={r.group} className="grid items-baseline gap-2.5 border-t border-line py-[22px] sm:grid-cols-[200px_1fr] sm:gap-5">
              <h3 className="text-[15px] font-semibold text-ink-muted">{r.group}</h3>
              <ul className="m-0 flex list-none flex-wrap gap-x-7 gap-y-2.5 p-0">
                {r.items.map((i) => (
                  <li key={i} className="cursor-default text-[19px] font-bold tracking-tight text-[#DCE6FF] transition-colors hover:text-brand-blue-2 sm:text-[22px]">{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
