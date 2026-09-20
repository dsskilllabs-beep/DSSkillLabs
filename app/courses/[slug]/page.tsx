import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { courses, getCourse } from '@/data/courses';
import Button from '@/components/Button';
import FAQ from '@/components/FAQ';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const c = getCourse(params.slug);
  if (!c) return {};
  return { title: `${c.title} Course`, description: c.lede };
}

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-[22px] text-[clamp(26px,3vw,34px)] font-extrabold leading-tight tracking-tight">{children}</h2>
);
const Block = ({ children, first }: { children: React.ReactNode; first?: boolean }) => (
  <section className={`py-[52px] ${first ? '' : 'border-t border-line'}`}>{children}</section>
);

export default function CoursePage({ params }: Params) {
  const c = getCourse(params.slug);
  if (!c) notFound();

  const enroll = `/register?course=${encodeURIComponent(c.title)}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: c.title,
    description: c.lede,
    provider: { '@type': 'EducationalOrganization', name: 'DS SkillLabs' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-[radial-gradient(700px_360px_at_85%_0%,rgba(46,107,255,0.22),transparent_70%)] pb-11 pt-14">
        <div className="wrap">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[14.5px] font-semibold text-ink-muted">
            <Link href="/courses" className="hover:text-brand-cyan">Courses</Link><span aria-hidden="true">/</span><span>{c.title}</span>
          </nav>
          <h1 className="mb-[18px] mt-4 max-w-[16ch] text-[clamp(36px,5.4vw,64px)] font-extrabold leading-[1.1] tracking-[-0.035em]">{c.title}</h1>
          <p className="max-w-[58ch] text-lg text-ink-muted sm:text-xl">{c.lede}</p>
          <ul className="mt-[34px] flex list-none flex-wrap border-y border-line p-0">
            {[['Duration', c.duration], ['Level', c.levelName], ['Modules', c.modules.length], ['Projects', c.projects.length]].map(([k, v]) => (
              <li key={k as string} className="mr-5 py-4 pr-5 sm:mr-9 sm:pr-9">
                <small className="block text-[13px] font-semibold text-ink-muted">{k}</small>
                <b className="text-xl font-bold">{v}</b>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap grid items-start gap-16 pb-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <Block first><H2>Course overview</H2><p className="max-w-[64ch] text-lg text-ink-muted">{c.overview}</p></Block>

          <Block>
            <div className="grid gap-10 sm:grid-cols-2">
              <div><h3 className="mb-2.5 text-[19px] font-bold">Who should join</h3><ul className="dots m-0 list-none p-0">{c.who.map((w) => (<li key={w}>{w}</li>))}</ul></div>
              <div><h3 className="mb-2.5 text-[19px] font-bold">Prerequisites</h3><ul className="dots m-0 list-none p-0">{c.prerequisites.map((w) => (<li key={w}>{w}</li>))}</ul></div>
            </div>
          </Block>

          <Block>
            <H2>Curriculum</H2>
            <div>
              {c.modules.map((m, i) => (
                <details key={m.title} open={i === 0} className={`border-t border-line ${i === c.modules.length - 1 ? 'border-b' : ''}`}>
                  <summary className="chev grid cursor-pointer grid-cols-[36px_1fr_16px] items-center gap-3.5 py-5 text-[17.5px] font-bold sm:grid-cols-[44px_1fr_16px] sm:text-[19px]">
                    <span className="grid h-9 w-9 place-items-center rounded-[10px] border border-line-strong bg-brand-blue/15 text-[15px] text-brand-cyan">{i + 1}</span>
                    <span>{m.title}</span>
                  </summary>
                  <ul className="m-0 flex list-none flex-wrap gap-2 p-0 pb-[22px] sm:pl-[58px]">
                    {m.topics.map((t) => (<li key={t} className="rounded-lg border border-line-strong px-3 py-[5px] text-[14.5px] font-semibold text-[#CFE0FF]">{t}</li>))}
                  </ul>
                </details>
              ))}
            </div>
          </Block>

          <Block>
            <H2>Tools and technologies</H2>
            <ul className="m-0 flex list-none flex-wrap gap-x-[30px] gap-y-2.5 p-0">
              {c.tools.map((t) => (<li key={t} className="cursor-default text-[22px] font-bold text-[#DCE6FF] transition-colors hover:text-brand-blue-2">{t}</li>))}
            </ul>
          </Block>

          <Block>
            <H2>Projects you&apos;ll build</H2>
            <div>
              {c.projects.map((p, i) => (
                <div key={p.title} className={`grid gap-1.5 border-t border-line py-5 sm:grid-cols-[.9fr_1.4fr] sm:gap-6 ${i === c.projects.length - 1 ? 'border-b' : ''}`}>
                  <h3 className="text-[19px] font-bold">{p.title}</h3>
                  <p className="text-base text-ink-muted">{p.description}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block><H2>Learning outcomes</H2><ul className="dots m-0 list-none p-0">{c.outcomes.map((o) => (<li key={o}>{o}</li>))}</ul></Block>

          <Block>
            <H2>Career opportunities</H2>
            <ul className="m-0 mb-4 flex list-none flex-wrap gap-2.5 p-0">
              {c.careers.map((r) => (<li key={r} className="rounded-xl border-[1.5px] border-line-strong px-4 py-2.5 text-base font-bold">{r}</li>))}
            </ul>
            <p className="max-w-[60ch] text-sm text-ink-muted">These are example roles graduates can pursue. We don&apos;t guarantee placement or salary.</p>
          </Block>

          <Block>
            <H2>Frequently asked questions</H2>
            <FAQ items={[...c.faqs,
              { q: 'Do you provide interview preparation?', a: 'Yes. We run mock interviews, technical practice, resume reviews and LinkedIn guidance.' },
              { q: 'How do I enroll?', a: 'Use the Enroll now button and submit your details. Our team will contact you with batch dates and next steps.' }]} />
          </Block>
        </div>

        {/* desktop: sticky enrollment card */}
        <aside aria-label="Enrollment" className="sticky top-[92px] mt-[52px] hidden rounded-[20px] border border-line-strong bg-gradient-to-b from-navy-800 to-navy-900 p-7 lg:block">
          <small className="block text-sm font-semibold text-ink-muted">Course fee</small>
          <div className="my-1 text-[40px] font-extrabold leading-[1.1] tracking-tight">{c.fee}</div>
          <div className="mb-[22px]" />
          <Button href={enroll} className="w-full">Enroll now</Button>
          <Button href="/contact" variant="ghost" className="mt-2.5 w-full">Talk to an expert</Button>
          <ul className="m-0 mt-[22px] grid list-none gap-2.5 border-t border-line p-0 pt-[18px] text-[15px] text-ink-muted">
            <li><b className="text-ink">{c.duration}</b> of guided learning</li>
            <li><b className="text-ink">{c.levelName}</b> level</li>
            <li><b className="text-ink">{c.projects.length}</b> portfolio projects</li>
            <li><b className="text-ink">Mentor</b> reviews and interview prep</li>
          </ul>
        </aside>
      </div>

      {/* mobile and tablet: sticky enroll bar */}
      <div className="fixed inset-x-0 bottom-0 z-[45] flex items-center justify-between gap-3.5 border-t border-line-strong bg-navy-950/95 px-5 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur-[12px] lg:hidden">
        <div><small className="block text-[12.5px] font-semibold leading-tight text-ink-muted">Course fee</small><b className="text-[22px] font-extrabold">{c.fee}</b></div>
        <Button href={enroll} className="max-w-[220px] flex-1">Enroll now</Button>
      </div>
    </>
  );
}
