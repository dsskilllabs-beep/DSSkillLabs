export default function SectionHeading({ title, text, id, h1 }: { title: string; text?: string; id?: string; h1?: boolean }) {
  const Tag = h1 ? 'h1' : 'h2';
  return (
    <div className="mb-12 max-w-[680px]">
      <Tag id={id} className="text-[clamp(30px,4.2vw,46px)] font-extrabold leading-[1.12] tracking-tight">{title}</Tag>
      {text && <p className="mt-3.5 max-w-[58ch] text-lg text-ink-muted">{text}</p>}
    </div>
  );
}
