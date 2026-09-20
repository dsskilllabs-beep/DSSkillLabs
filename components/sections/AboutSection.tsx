import { LogoMark } from '../Logo';

export default function AboutSection({ h1 }: { h1?: boolean }) {
  const Tag = h1 ? 'h1' : 'h2';
  return (
    <section className="section border-y border-line bg-navy-900" aria-labelledby="about-title">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
        <div>
          <Tag id="about-title" className="mb-[22px] text-[clamp(30px,4.2vw,46px)] font-extrabold leading-[1.12] tracking-tight">About DS SkillLabs</Tag>
          <p className="max-w-[56ch] text-lg text-ink-muted">
            DS SkillLabs is a technology education platform focused on helping students and professionals build practical skills for the modern digital economy.
          </p>
          <p className="mt-4 max-w-[56ch] text-lg text-ink-muted">
            Our learning approach combines structured curriculum, hands-on projects, mentorship and career preparation.
          </p>
        </div>
        <div aria-hidden="true" className="grid max-w-[420px] place-items-center rounded-3xl border border-line bg-[radial-gradient(circle_at_50%_40%,rgba(46,107,255,0.28),transparent_70%)] p-10">
          <LogoMark className="h-auto w-[70%]" />
        </div>
      </div>
    </section>
  );
}
