import Link from 'next/link';

/** Render once in the root layout so <Logo /> can reference the shared mark. */
export function LogoDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="lgD" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1747B8" /><stop offset="1" stopColor="#2E7BFF" /></linearGradient>
        <linearGradient id="lgS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2E6BFF" /><stop offset="1" stopColor="#27D4F0" /></linearGradient>
        <g id="ds-mark">
          <rect x="0" y="14" width="7" height="7" fill="#FFA51F" />
          <rect x="7" y="7" width="7" height="7" fill="#2E6BFF" />
          <rect x="14" y="14" width="7" height="7" fill="#2E6BFF" />
          <rect x="7" y="21" width="7" height="7" fill="#1E63E0" />
          <g transform="translate(10,14)">
            <path fill="url(#lgD)" fillRule="evenodd" d="M0 0H20C38 0 50 11 50 24C50 37 38 48 20 48H0Z M11 11V37H20C30 37 38 31 38 24C38 17 30 11 20 11Z" />
            <path fill="#FFA51F" d="M17 17L31 24L17 31Z" />
          </g>
          <path d="M76 24C66 17 54 22 56 30C58 38 78 36 80 45C82 55 66 58 56 52" transform="translate(6,0)" fill="none" stroke="url(#lgS)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
          <g transform="translate(2,0)">
            <path d="M66 12V17C66 21 86 21 86 17V12" fill="#0B1F52" stroke="#27D4F0" strokeWidth="1.5" />
            <path d="M76 3L97 9L76 15L55 9Z" fill="#0B1F52" stroke="#27D4F0" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M95 9V17" stroke="#27D4F0" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </g>
      </defs>
    </svg>
  );
}

export function LogoMark({ className = 'h-9 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 104 64" aria-hidden="true" className={className}>
      <use href="#ds-mark" />
    </svg>
  );
}

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" aria-label="DS SkillLabs home" className={`flex items-center gap-2.5 text-2xl font-extrabold tracking-[-0.03em] ${className}`}>
      <LogoMark />
      <span>Skill<b className="font-extrabold text-brand-blue-2">Labs</b></span>
    </Link>
  );
}
