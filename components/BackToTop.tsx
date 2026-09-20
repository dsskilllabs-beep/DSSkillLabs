'use client';

import { useEffect, useState } from 'react';
import Icon from './Icon';

export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
      className={`fixed bottom-24 right-5 z-40 grid h-[50px] w-[50px] place-items-center rounded-full border border-line-strong bg-navy-700 text-ink transition-opacity md:bottom-5 ${show ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
    >
      <Icon name="up" className="h-5 w-5" strokeWidth={2.4} />
    </button>
  );
}
