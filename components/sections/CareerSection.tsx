import Button from '../Button';
import Icon from '../Icon';
import { career } from '@/data/content';

export default function CareerSection({ h1 }: { h1?: boolean }) {
  const Tag = h1 ? 'h1' : 'h2';
  return (
    <section className="section" aria-labelledby="career-title">
      <div className="wrap grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Tag id="career-title" className="text-[clamp(30px,4.2vw,46px)] font-extrabold leading-[1.12] tracking-tight">From learning to career</Tag>
          <p className="mb-[30px] mt-4 max-w-[46ch] text-lg text-ink-muted">
            Job-ready skills need more than lessons. We help you present your work and practise for the interview room.
          </p>
          <Button href="/contact">Start your career journey</Button>
          <p className="mt-[18px] max-w-[46ch] text-sm text-ink-muted">
            We don&apos;t promise placements or salaries. We give you the preparation, the portfolio and the guidance to compete for roles.
          </p>
        </div>
        <ul className="m-0 list-none border-t border-line p-0">
          {career.map((c) => (
            <li key={c} className="flex items-center gap-3.5 border-b border-line py-4 text-lg font-semibold">
              <Icon name="check" className="h-[22px] w-[22px] flex-none text-brand-cyan" strokeWidth={2.4} />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
