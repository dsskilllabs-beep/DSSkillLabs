'use client';

import { useEffect, useRef, useState } from 'react';
import { journey } from '@/data/content';

export default function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setGo(true); return; }
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) { setGo(true); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ol ref={ref} className={`journey m-0 grid list-none grid-cols-1 gap-y-0 p-0 min-[680px]:grid-cols-3 min-[680px]:gap-y-10 lg:grid-cols-6 ${go ? 'go' : ''}`}>
      {journey.map((j, i) => (
        <li key={j.t} style={{ '--i': i } as React.CSSProperties} className="pb-8 pl-10 min-[680px]:pb-0 min-[680px]:pl-0 min-[680px]:pr-5 min-[680px]:pt-11">
          <span className="dot absolute left-0 top-[3px] h-[18px] w-[18px] rounded-full border-2 border-line-strong bg-navy-950 min-[680px]:top-0" />
          <h3 className="mb-1.5 text-[19px] font-bold">{j.t}</h3>
          <p className="text-[15px] leading-normal text-ink-muted">{j.d}</p>
        </li>
      ))}
    </ol>
  );
}
