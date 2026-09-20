import SectionHeading from '../SectionHeading';
import { IconBox } from '../Icon';
import { why } from '@/data/content';

export default function WhySection() {
  return (
    <section className="section border-y border-line bg-navy-900" aria-labelledby="why-title">
      <div className="wrap">
        <SectionHeading id="why-title" title="Why learn with DS SkillLabs?" />
        <ul className="m-0 grid list-none gap-x-16 p-0 md:grid-cols-2">
          {why.map((w) => (
            <li key={w.title} className="grid grid-cols-[44px_1fr] gap-[18px] border-t border-line py-7">
              <IconBox name={w.icon} size="sm" />
              <div>
                <h3 className="mb-1.5 text-xl font-bold">{w.title}</h3>
                <p className="text-base text-ink-muted">{w.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
