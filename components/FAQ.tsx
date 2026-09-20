export default function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="max-w-[820px]">
      {items.map((f, i) => (
        <details key={f.q} className={`border-t border-line ${i === items.length - 1 ? 'border-b' : ''}`}>
          <summary className="chev flex cursor-pointer items-center justify-between gap-5 py-[22px] text-[19px] font-bold">{f.q}</summary>
          <p className="max-w-[64ch] pb-6 pr-10 text-ink-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
