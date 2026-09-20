'use client';

import { useEffect, useState } from 'react';
import Button from './Button';
import Icon from './Icon';
import { candidateSections, allFields, type Field } from '@/data/candidateForm';
import { validate, type Values } from '@/lib/candidate';

type State = { kind: 'idle' | 'sending' | 'ok' | 'error'; message?: string; detail?: string };

const labelCls = 'mb-[7px] block text-[14.5px] font-semibold text-[#CBD8F5]';

function initialValues(): Values {
  const v: Values = {};
  for (const f of allFields) v[f.key] = f.type === 'checkboxes' ? [] : f.defaultValue ?? '';
  return v;
}

function FieldView({ f, value, error, onChange }: { f: Field; value: string | string[]; error?: string; onChange: (v: string | string[]) => void }) {
  const describedBy = error ? `${f.key}-err` : f.hint ? `${f.key}-hint` : undefined;
  const common = { id: f.key, name: f.key, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy } as const;
  const str = Array.isArray(value) ? '' : value;

  let control: React.ReactNode;
  if (f.type === 'select') {
    control = (
      <select {...common} className="field" value={str} onChange={(e) => onChange(e.target.value)}>
        {!f.defaultValue && <option value="">Select</option>}
        {f.options?.map((o) => (<option key={o} value={o}>{o}</option>))}
      </select>
    );
  } else if (f.type === 'textarea') {
    control = <textarea {...common} className="field min-h-[110px] resize-y" value={str} onChange={(e) => onChange(e.target.value)} autoComplete={f.autoComplete} />;
  } else if (f.type === 'checkboxes') {
    const selected = Array.isArray(value) ? value : [];
    control = (
      <div id={f.key} tabIndex={-1} role="group" aria-labelledby={`${f.key}-label`} aria-describedby={describedBy} className="flex flex-wrap gap-2.5 outline-none">
        {f.options?.map((o) => {
          const on = selected.includes(o);
          return (
            <label
              key={o}
              className={`cursor-pointer rounded-xl border-[1.5px] px-4 py-2.5 text-[15px] font-semibold transition-colors focus-within:ring-2 focus-within:ring-brand-cyan ${on ? 'border-brand-cyan bg-brand-cyan/10 text-brand-cyan' : 'border-line-strong text-ink hover:border-brand-blue-2'}`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={on}
                onChange={() => onChange(on ? selected.filter((x) => x !== o) : [...selected, o])}
              />
              {o}
            </label>
          );
        })}
      </div>
    );
  } else if (f.type === 'consent') {
    return (
      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3.5 text-[16px]">
          <input
            {...common}
            type="checkbox"
            className="mt-1 h-5 w-5 flex-none accent-[#2E6BFF]"
            checked={str === 'Yes'}
            onChange={(e) => onChange(e.target.checked ? 'Yes' : '')}
          />
          <span>{f.label}</span>
        </label>
        {error && <p id={`${f.key}-err`} className="mt-2 text-sm font-semibold text-[#FFB4A2]">{error}</p>}
      </div>
    );
  } else {
    control = (
      <input
        {...common}
        className="field"
        type={f.type === 'number' ? 'number' : f.type}
        value={str}
        onChange={(e) => onChange(e.target.value)}
        placeholder={f.placeholder}
        autoComplete={f.autoComplete}
        inputMode={f.inputMode}
        min={f.type === 'number' && !f.scoreTypeKey ? f.min : undefined}
        max={f.type === 'number' && !f.scoreTypeKey ? f.max : undefined}
        step={f.step}
      />
    );
  }

  return (
    <div className={f.wide ? 'sm:col-span-2' : ''}>
      <label id={`${f.key}-label`} htmlFor={f.type === 'checkboxes' ? undefined : f.key} className={labelCls}>
        {f.label}{f.required && <span className="text-brand-cyan"> *</span>}
      </label>
      {control}
      {f.hint && !error && <p id={`${f.key}-hint`} className="mt-1.5 text-[13.5px] text-ink-muted">{f.hint}</p>}
      {error && <p id={`${f.key}-err`} className="mt-1.5 text-sm font-semibold text-[#FFB4A2]">{error}</p>}
    </div>
  );
}

export default function CandidateForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [source, setSource] = useState('');
  const [trap, setTrap] = useState('');
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [debug, setDebug] = useState(false);

  // A QR code or link can carry the college name: /candidate-registration?src=ABC%20College
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get('src');
    if (s) setSource(s.trim().slice(0, 120));
    setDebug(new URLSearchParams(window.location.search).has('debug'));
  }, []);

  const set = (key: string, v: string | string[]) => {
    setValues((p) => ({ ...p, [key]: v }));
    setErrors((p) => {
      if (!p[key]) return p;
      const n = { ...p };
      delete n[key];
      return n;
    });
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === 'sending') return;

    const errs = validate(values);
    setErrors(errs);
    const count = Object.keys(errs).length;
    if (count) {
      setState({ kind: 'error', message: `Please fix the ${count} highlighted field${count > 1 ? 's' : ''} and submit again.` });
      const first = allFields.find((f) => errs[f.key]);
      if (first) document.getElementById(first.key)?.focus();
      return;
    }

    setState({ kind: 'sending' });
    try {
      const res = await fetch('/api/candidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, source, website: trap }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (json.errors) setErrors(json.errors);
        setState({ kind: 'error', message: json.error || 'Something went wrong. Please try again.', detail: json.detail });
        return;
      }
      setState({ kind: 'ok' });
      window.scrollTo({ top: 0 });
    } catch (err) {
      setState({ kind: 'error', message: err instanceof Error ? err.message : 'Something went wrong.' });
    }
  }

  if (state.kind === 'ok') {
    return (
      <div className="rounded-[18px] border border-line-strong bg-navy-800 p-8 text-center sm:p-12">
        <span className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-brand-cyan/15 text-brand-cyan">
          <Icon name="check" className="h-7 w-7" strokeWidth={2.4} />
        </span>
        <h2 className="text-[28px] font-extrabold tracking-tight">Thank you, your details are saved.</h2>
        <p className="mx-auto mb-7 mt-3 max-w-[46ch] text-lg text-ink-muted">Our team will contact you about the training programs you chose.</p>
        <Button
          variant="ghost"
          onClick={() => {
            setValues(initialValues());
            setErrors({});
            setState({ kind: 'idle' });
          }}
        >
          Register another student
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      {source && (
        <p className="rounded-xl border border-line-strong bg-brand-blue/10 px-4 py-3 text-[15px] text-ink-muted">
          Registering through: <b className="text-ink">{source}</b>
        </p>
      )}

      {candidateSections.map((s, i) => (
        <section key={s.id} aria-labelledby={`${s.id}-title`} className="rounded-[18px] border border-line bg-navy-900 p-5 sm:p-7">
          <div className="mb-5 flex items-center gap-3.5">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-[10px] border border-line-strong bg-brand-blue/15 text-[15px] font-bold text-brand-cyan">{i + 1}</span>
            <div>
              <h2 id={`${s.id}-title`} className="text-[21px] font-bold leading-tight">{s.title}</h2>
              {s.description && <p className="mt-1 text-[14.5px] text-ink-muted">{s.description}</p>}
            </div>
          </div>
          <div className="grid gap-[18px] sm:grid-cols-2">
            {s.fields.map((f) => (
              <FieldView key={f.key} f={f} value={values[f.key]} error={errors[f.key]} onChange={(v) => set(f.key, v)} />
            ))}
          </div>
        </section>
      ))}

      {/* Spam trap: hidden from people, bots tend to fill it */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} /></label>
      </div>

      <div>
        <Button type="submit" className="w-full sm:w-auto sm:min-w-[260px]">{state.kind === 'sending' ? 'Submitting…' : 'Submit registration'}</Button>
        <div role="status" aria-live="polite" className={`mt-4 min-h-6 text-[15px] font-semibold ${state.kind === 'error' ? 'text-[#FFB4A2]' : 'text-brand-cyan'}`}>
          {state.kind === 'error' && state.message}
          {debug && state.kind === 'error' && state.detail && (
            <span className="mt-2 block break-words rounded-lg border border-line-strong bg-navy-800 p-3 text-[13.5px] font-medium text-ink-muted">
              Debug: {state.detail}
            </span>
          )}
        </div>
        <p className="mt-2 max-w-[70ch] text-[13.5px] text-ink-muted">
          Your details are used only by DS SkillLabs to contact you about training. Fields marked * are required.
        </p>
      </div>
    </form>
  );
}
