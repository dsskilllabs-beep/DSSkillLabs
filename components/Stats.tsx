'use client';

import { useEffect, useRef } from 'react';
import { stats } from '@/data/content';

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const run = () => {
      if (reduce) { el.textContent = `${target}${suffix}`; return; }
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min((t - t0) / 1400, 1);
        el.textContent = `${Math.round(target * (1 - Math.pow(1 - p, 3)))}${suffix}`;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) { run(); io.disconnect(); }
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, suffix]);
  return <div ref={ref} className="text-[34px] font-extrabold leading-none tracking-tight sm:text-[clamp(34px,4vw,52px)]">0{suffix}</div>;
}

export default function Stats() {
  return (
    <section aria-labelledby="stats-title">
      <div className="wrap">
        <div className="grid border-y border-line lg:grid-cols-[1fr_3fr]">
          <h2 id="stats-title" className="max-w-[20ch] self-center pb-0 pt-7 text-xl font-bold leading-snug lg:py-9 lg:pr-8">
            Learn from skills that industry demands
          </h2>
          <ul className="m-0 grid list-none grid-cols-2 p-0 lg:grid-cols-4">
            {stats.map((s, i) => (
              <li key={s.label} className={`border-t border-line px-4 py-6 sm:px-6 sm:py-8 lg:border-l lg:border-t-0 ${i % 2 === 0 ? 'border-l-0 pl-0 lg:pl-6' : 'border-l'}`}>
                {s.n != null ? <Counter target={s.n} suffix={s.suffix ?? ''} /> : (
                  <div className="text-[34px] font-extrabold leading-none tracking-tight sm:text-[clamp(34px,4vw,52px)]">{s.text}</div>
                )}
                <div className="mt-2 text-[15px] text-ink-muted">{s.label}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
