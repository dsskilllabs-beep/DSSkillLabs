'use client';

import { useState } from 'react';
import Button from './Button';
import { courses } from '@/data/courses';
import { site } from '@/data/site';

type Props = { variant?: 'enquiry' | 'register'; defaultCourse?: string };
type State = { kind: 'idle' | 'sending' | 'ok' | 'error'; message?: string };

const label = 'mb-[7px] block text-[14.5px] font-semibold text-[#CBD8F5]';

export default function EnquiryForm({ variant = 'enquiry', defaultCourse = '' }: Props) {
  const [state, setState] = useState<State>({ kind: 'idle' });
  const isRegister = variant === 'register';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (!data.name?.trim() || !/^\S+@\S+\.\S+$/.test(data.email ?? '')) {
      setState({ kind: 'error', message: 'Enter your name and a valid email address.' });
      return;
    }
    setState({ kind: 'sending' });
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: variant }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.');
      form.reset();
      setState({ kind: 'ok', message: 'Thanks! We received your details and will contact you soon.' });
    } catch (err) {
      setState({ kind: 'error', message: err instanceof Error ? err.message : 'Something went wrong.' });
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-[18px]">
      <div className="grid gap-[18px] sm:grid-cols-2">
        <div><label className={label} htmlFor="name">Name</label><input className="field" id="name" name="name" autoComplete="name" required placeholder="Your full name" /></div>
        <div><label className={label} htmlFor="phone">Phone</label><input className="field" id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 00000 00000" /></div>
      </div>
      <div><label className={label} htmlFor="email">Email</label><input className="field" id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></div>
      <div>
        <label className={label} htmlFor="course">{isRegister ? 'Program' : 'Course interested in'}</label>
        <select className="field" id="course" name="course" defaultValue={defaultCourse}>
          <option value="">Select a program</option>
          {courses.map((c) => (<option key={c.slug} value={c.title}>{c.title}</option>))}
        </select>
      </div>
      {isRegister && (
        <div><label className={label} htmlFor="background">Current education or occupation</label><input className="field" id="background" name="background" placeholder="e.g. B.Tech graduate, Marketing executive" /></div>
      )}
      <div><label className={label} htmlFor="message">Message{isRegister ? ' (optional)' : ''}</label><textarea className="field min-h-[130px] resize-y" id="message" name="message" placeholder="Tell us about your background and goals" /></div>
      <Button type="submit">{state.kind === 'sending' ? 'Sending…' : isRegister ? 'Submit registration' : 'Submit enquiry'}</Button>
      <div role="status" aria-live="polite" className={`min-h-6 text-[15px] font-semibold ${state.kind === 'error' ? 'text-[#FFB4A2]' : 'text-brand-cyan'}`}>
        {state.message}
        {state.kind === 'error' && (
          <span className="mt-1 block font-medium text-ink-muted">
            Prefer email? Write to <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.
          </span>
        )}
      </div>
    </form>
  );
}
