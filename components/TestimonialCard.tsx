type T = { name: string; course: string; rating: number; text: string };

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" aria-hidden="true">
      <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21.1 7 14.2 2 9.3l6.9-1z" />
    </svg>
  );
}

export default function TestimonialCard({ t }: { t: T }) {
  return (
    <figure className="m-0 flex flex-col rounded-[18px] border border-line bg-navy-800 p-7">
      <div className="mb-4 flex gap-[3px] text-brand-amber" role="img" aria-label={`${t.rating} out of 5`}>
        {Array.from({ length: t.rating }).map((_, i) => (<Star key={i} />))}
      </div>
      <blockquote className="m-0 flex-1 text-[17px]">{t.text}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3.5">
        {/* Swap the initial for a student photo (next/image) when you have real ones */}
        <span aria-hidden="true" className="grid h-[46px] w-[46px] place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan font-extrabold text-[#04123a]">
          {t.name.trim()[0]}
        </span>
        <div>
          <b className="block text-base">{t.name}</b>
          <span className="text-sm text-ink-muted">{t.course}</span>
        </div>
      </figcaption>
    </figure>
  );
}
