import Button from './Button';

type Props = {
  title?: string;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export default function CTA({
  title = 'Ready to build your future?',
  text = 'Start learning the skills that can transform your career.',
  primary = { label: 'Explore courses', href: '/courses' },
  secondary = { label: 'Contact us', href: '/contact' },
}: Props) {
  return (
    <div className="pb-24">
      <div className="wrap">
        <div className="rounded-[28px] border border-line-strong bg-[radial-gradient(600px_260px_at_50%_0%,rgba(39,212,240,0.22),transparent_70%),linear-gradient(160deg,#0E2A6E,#071433)] px-6 py-14 text-center sm:px-10 sm:py-[72px]">
          <h2 className="text-[clamp(32px,5vw,56px)] font-extrabold leading-[1.1] tracking-tight">{title}</h2>
          <p className="mx-auto mb-8 mt-4 max-w-[44ch] text-[19px] text-[#B9C8EA]">{text}</p>
          <div className="flex flex-col justify-center gap-3.5 sm:flex-row">
            <Button href={primary.href}>{primary.label}</Button>
            <Button href={secondary.href} variant="ghost">{secondary.label}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
