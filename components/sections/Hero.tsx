import Button from '../Button';
import HeroVisual from '../HeroVisual';

export default function Hero() {
  return (
    <section className="bg-[radial-gradient(700px_420px_at_82%_30%,rgba(46,107,255,0.22),transparent_70%),radial-gradient(500px_300px_at_10%_0%,rgba(39,212,240,0.09),transparent_70%)] pb-10 pt-12 sm:pb-14 sm:pt-[72px]" aria-labelledby="hero-title">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <h1 id="hero-title" className="max-w-[11ch] text-[clamp(40px,6vw,72px)] font-extrabold leading-[1.1] tracking-[-0.035em] max-lg:max-w-[14ch]">
            Build skills that build your career.
          </h1>
          <p className="mt-[22px] max-w-[46ch] text-lg text-ink-muted sm:text-xl">
            Master Data, AI, Engineering and Full Stack Development through practical, project-based learning.
          </p>
          <div className="mt-[34px] flex flex-col gap-3.5 sm:flex-row">
            {/* <Button href="/candidate-registration" variant="ghost">Candidate registration</Button> */}
            <Button href="/courses">Explore courses</Button>
            <Button href="/contact" variant="ghost">Talk to an expert</Button>
          </div>
          <p className="mt-[30px] flex items-center gap-2.5 text-[15px] font-semibold text-ink-muted">
            <span>Learn</span><i className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
            <span>Build</span><i className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
            <span>Grow</span>
          </p>
        </div>
        <div className="w-full max-w-[560px] justify-self-center lg:justify-self-end">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
