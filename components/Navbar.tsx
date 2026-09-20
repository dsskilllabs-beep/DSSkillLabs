'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import Button from './Button';
import Icon from './Icon';
import { site } from '@/data/site';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-navy-950/85 backdrop-blur-[14px]">
      <div className="wrap flex h-[72px] items-center gap-6">
        <Logo className="mr-auto" />
        <nav
          id="main-nav"
          aria-label="Main"
          className={`${open ? 'block' : 'hidden'} absolute left-0 right-0 top-full border-b border-line bg-navy-950 px-5 pb-5 pt-2 md:static md:block md:border-0 md:bg-transparent md:p-0`}
        >
          <ul className="flex flex-col md:flex-row md:gap-1.5">
            {site.nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line px-1 py-4 text-lg font-semibold text-ink-muted transition-colors hover:text-ink md:rounded-lg md:border-0 md:px-3 md:py-2.5 md:text-[15px]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button href="/register" className="mt-[18px] w-full md:hidden">Enroll now</Button>
        </nav>
        <Button href="/register" size="sm" className="hidden md:inline-flex">Enroll now</Button>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="grid h-12 w-12 place-items-center rounded-xl border border-line-strong text-ink md:hidden"
        >
          <Icon name={open ? 'close' : 'menu'} className="h-[22px] w-[22px]" strokeWidth={2.2} />
        </button>
      </div>
    </header>
  );
}
