'use client';

import { useEffect, useRef } from 'react';

const IN = [
  'M58 68 C160 68 170 200 246 214',
  'M58 210 C150 210 190 220 246 220',
  'M58 360 C160 360 170 240 246 226',
];
const OUT = [
  'M334 210 C400 200 410 68 466 68',
  'M334 220 C390 220 420 220 466 220',
  'M334 230 C400 240 410 360 466 360',
];

function Particles({ paths, color, r, durs, n }: { paths: string[]; color: string; r: number; durs: number[]; n: number }) {
  return (
    <>
      {paths.flatMap((d, pi) =>
        Array.from({ length: n }).map((_, i) => (
          <circle key={`${pi}-${i}`} r={r} fill={color}>
            <animateMotion dur={`${durs[pi]}s`} begin={`-${((durs[pi] / n) * i).toFixed(2)}s`} repeatCount="indefinite" path={d} />
          </circle>
        )),
      )}
    </>
  );
}

export default function HeroVisual() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) ref.current?.pauseAnimations();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 560 430"
      className="block h-auto w-full"
      role="img"
      aria-label="Raw data from CSV, SQL and API sources flows through the DS SkillLabs hub and comes out as a dashboard, a model and an app."
    >
      <defs>
        <linearGradient id="g1" x1="0" x2="1"><stop offset="0" stopColor="#2E6BFF" /><stop offset="1" stopColor="#27D4F0" /></linearGradient>
        <radialGradient id="glow"><stop offset="0" stopColor="#2E6BFF" stopOpacity=".5" /><stop offset="1" stopColor="#2E6BFF" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="290" cy="220" r="170" fill="url(#glow)" />
      <g fill="none" stroke="rgba(130,170,255,.38)" strokeWidth="1.6">
        {[...IN, ...OUT].map((d) => (<path key={d} d={d} />))}
      </g>
      <g fontFamily="Manrope,Inter,sans-serif" fontWeight="700" fontSize="16" textAnchor="middle" fill="#CFE0FF">
        {[['CSV', 50, 73], ['SQL', 192, 215], ['API', 342, 365]].map(([label, y, ty]) => (
          <g key={label as string}>
            <rect x="6" y={y as number} width="52" height="36" rx="9" fill="#0A1A3F" stroke="rgba(130,170,255,.4)" />
            <text x="32" y={ty as number}>{label}</text>
          </g>
        ))}
      </g>
      <rect x="246" y="178" width="88" height="84" rx="24" fill="#0A1A3F" stroke="url(#g1)" strokeWidth="2.5" />
      <path d="M278 200 L306 220 L278 240 Z" fill="#FFA51F" />
      <g fill="#0A1A3F" stroke="rgba(130,170,255,.4)">
        <rect x="466" y="34" width="80" height="68" rx="12" />
        <rect x="466" y="186" width="80" height="68" rx="12" />
        <rect x="466" y="326" width="80" height="68" rx="12" />
      </g>
      <g fill="#5B8DFF">
        <rect x="482" y="78" width="10" height="14" rx="2" />
        <rect x="497" y="64" width="10" height="28" rx="2" fill="#27D4F0" />
        <rect x="512" y="72" width="10" height="20" rx="2" />
        <rect x="527" y="52" width="10" height="40" rx="2" fill="#27D4F0" />
      </g>
      <path d="M488 220L508 204M488 220L508 236M508 204L528 220M508 236L528 220" stroke="#5B8DFF" strokeWidth="1.6" fill="none" />
      <g fill="#27D4F0"><circle cx="488" cy="220" r="5" /><circle cx="508" cy="204" r="5" /><circle cx="508" cy="236" r="5" /><circle cx="528" cy="220" r="5" /></g>
      <text x="506" y="368" textAnchor="middle" fontFamily="Manrope,Inter,sans-serif" fontWeight="800" fontSize="24" fill="#27D4F0">&lt;/&gt;</text>
      <g fontFamily="Manrope,Inter,sans-serif" fontWeight="600" fontSize="15" textAnchor="middle" fill="#9BABD1">
        <text x="506" y="124">Dashboard</text><text x="506" y="276">Model</text><text x="506" y="416">App</text>
      </g>
      <Particles paths={IN} color="#27D4F0" r={3.4} durs={[3.8, 3.2, 4.2]} n={3} />
      <Particles paths={OUT} color="#FFFFFF" r={2.8} durs={[3.4, 3, 3.6]} n={2} />
    </svg>
  );
}
