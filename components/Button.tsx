import Link from 'next/link';

type Props = {
  href?: string;
  variant?: 'primary' | 'ghost';
  size?: 'md' | 'sm';
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit';
  external?: boolean;
  onClick?: () => void;
};

export default function Button({ href, variant = 'primary', size = 'md', className = '', children, type = 'button', external, onClick }: Props) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl border-[1.5px] font-bold leading-none transition-colors duration-200';
  const sizes = size === 'md' ? 'min-h-[50px] px-6 text-base' : 'min-h-[42px] px-[18px] text-[15px] rounded-[10px]';
  const variants =
    variant === 'primary'
      ? 'border-transparent bg-brand-blue text-white shadow-[0_10px_30px_-10px_rgba(46,107,255,0.8)] hover:bg-[#4A80FF]'
      : 'border-line-strong bg-transparent text-ink hover:border-brand-cyan hover:text-brand-cyan';
  const cls = `${base} ${sizes} ${variants} ${className}`;

  if (href) {
    return external ? (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{children}</a>
    ) : (
      <Link href={href} className={cls}>{children}</Link>
    );
  }
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
}
