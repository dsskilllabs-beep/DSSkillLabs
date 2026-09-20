import type { Metadata } from 'next';
import EnquiryForm from '@/components/EnquiryForm';
import { site } from '@/data/site';

export const metadata: Metadata = { title: 'Contact', description: 'Talk to a DS SkillLabs expert about the right program for you.' };

export default function ContactPage() {
  const rows = [['Phone', site.phone], ['Email', site.email], ['Location', site.location], ['Business hours', site.hours]];
  return (
    <section className="section">
      <div className="wrap grid gap-14 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <h1 className="mb-[26px] text-[clamp(32px,4.4vw,48px)] font-extrabold leading-tight tracking-tight">Talk to an expert</h1>
          <EnquiryForm />
        </div>
        <div>
          <h2 className="mb-[26px] text-[clamp(24px,3vw,32px)] font-extrabold leading-tight">Visit or call us</h2>
          <ul className="m-0 list-none p-0">
            {rows.map(([k, v], i) => (
              <li key={k} className={`border-t border-line py-5 ${i === rows.length - 1 ? 'border-b' : ''}`}>
                <span className="block text-sm font-semibold text-ink-muted">{k}</span>
                <b className="text-[19px] font-bold">{v}</b>
              </li>
            ))}
          </ul>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 grid h-[190px] place-items-center rounded-2xl border-[1.5px] border-dashed border-line-strong p-4 text-center text-[17px] font-bold transition-colors hover:border-brand-cyan hover:text-brand-cyan"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
