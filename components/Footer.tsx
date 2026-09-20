import Link from 'next/link';
import Logo from './Logo';
import { site } from '@/data/site';
import { courses } from '@/data/courses';

const linkCls = 'text-[15.5px] text-ink-muted transition-colors hover:text-brand-cyan';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-[#050D24] pb-28 pt-16 md:pb-8">
      <div className="wrap">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
          <div>
            <Logo />
            <p className="my-3.5 mb-5 font-semibold text-ink-muted">{site.tagline}</p>
            <div className="flex flex-wrap gap-x-[18px] gap-y-2.5">
              {site.social.map((s) => (
                <a key={s.name} href={s.href} className={linkCls} rel="noopener noreferrer">{s.name}</a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3.5 text-[15px] font-bold text-[#CBD8F5]">Quick links</h3>
            <ul className="grid gap-2">
              {site.nav.map((l) => (<li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3.5 text-[15px] font-bold text-[#CBD8F5]">Programs</h3>
            <ul className="grid gap-2">
              {courses.map((c) => (<li key={c.slug}><Link href={`/courses/${c.slug}`} className={linkCls}>{c.title}</Link></li>))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3.5 text-[15px] font-bold text-[#CBD8F5]">Contact</h3>
            <ul className="grid gap-2">
              <li><a href={`mailto:${site.email}`} className={linkCls}>{site.email}</a></li>
              <li><a href={`tel:${site.phone.replace(/\s/g, '')}`} className={linkCls}>{site.phone}</a></li>
              <li><span className="text-[15.5px] text-ink-muted">{site.location}</span></li>
            </ul>
          </div>
        </div>
        <p className="mt-12 border-t border-line pt-6 text-sm text-ink-muted">© 2026 DS SkillLabs. All rights reserved.</p>
      </div>
    </footer>
  );
}
