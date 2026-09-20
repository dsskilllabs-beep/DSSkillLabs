import { allFields, type Field } from '@/data/candidateForm';

export type Values = Record<string, string | string[]>;

const MAX_LEN = 500;

/** Keep only known fields, trimmed and length-limited. Used by the server before anything is stored. */
export function normalize(raw: Record<string, unknown>): Values {
  const out: Values = {};
  for (const f of allFields) {
    const v = raw[f.key];
    if (f.type === 'checkboxes') {
      const arr = Array.isArray(v) ? v : [];
      out[f.key] = arr.map(String).filter((x) => f.options?.includes(x));
    } else if (typeof v === 'string') {
      out[f.key] = v.trim().slice(0, MAX_LEN);
    } else if (typeof v === 'number') {
      out[f.key] = String(v);
    } else {
      out[f.key] = f.defaultValue ?? '';
    }
  }
  return out;
}

export function cleanPhone(input: string): string {
  let d = input.replace(/\D/g, '');
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return d;
}

const isEmpty = (v: string | string[] | undefined) => (Array.isArray(v) ? v.length === 0 : !v || !v.trim());

function checkField(f: Field, values: Values): string | null {
  const v = values[f.key];
  if (isEmpty(v)) {
    if (!f.required) return null;
    return f.type === 'consent' ? 'Please tick this box to continue.' : 'This field is required.';
  }
  const s = Array.isArray(v) ? '' : (v as string);

  switch (f.type) {
    case 'email':
      return /^\S+@\S+\.\S+$/.test(s) ? null : 'Enter a valid email address.';
    case 'tel':
      return /^[6-9]\d{9}$/.test(cleanPhone(s)) ? null : 'Enter a valid 10-digit mobile number.';
    case 'date': {
      const d = new Date(s);
      if (Number.isNaN(d.getTime())) return 'Enter a valid date.';
      if (d > new Date() || d.getFullYear() < 1960) return 'Check the date of birth.';
      return null;
    }
    case 'number': {
      const n = Number(s);
      if (!Number.isFinite(n)) return 'Enter a number.';
      if (f.scoreTypeKey) {
        const type = (values[f.scoreTypeKey] as string) || 'Percentage';
        const limit = type.startsWith('CGPA') ? 10 : 100;
        if (n < 0 || n > limit) return type.startsWith('CGPA') ? 'CGPA must be between 0 and 10.' : 'Percentage must be between 0 and 100.';
        return null;
      }
      if (f.step === '1' && !Number.isInteger(n)) return 'Enter a whole number.';
      if (f.min != null && n < f.min) return `Enter ${f.min} or more.`;
      if (f.max != null && n > f.max) return `Enter ${f.max} or less.`;
      return null;
    }
    case 'select':
      return f.options?.includes(s) ? null : 'Choose one of the options.';
    default:
      if (f.pattern && !f.pattern.test(s)) return f.patternMessage ?? 'Check this value.';
      return null;
  }
}

/** Returns an error message per field key. Empty object means the form is valid. */
export function validate(values: Values): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const f of allFields) {
    const msg = checkField(f, values);
    if (msg) errors[f.key] = msg;
  }
  return errors;
}

/** Ordered label/value pairs, one per field, exactly as they will appear in the sheet. */
export function toAnswers(values: Values, source: string): { label: string; value: string }[] {
  const answers = [{ label: 'Registration source', value: source || 'Website' }];
  for (const f of allFields) {
    const v = values[f.key];
    let value = Array.isArray(v) ? v.join(', ') : v ?? '';
    if (f.type === 'tel' && value) value = cleanPhone(value);
    if (f.type === 'consent') value = value ? 'Yes' : 'No';
    // "Percentage / CGPA" is only recorded when a score was entered next to it.
    const scoreField = allFields.find((x) => x.scoreTypeKey === f.key);
    if (scoreField) value = values[scoreField.key] ? value || 'Percentage' : '';
    answers.push({ label: f.sheetLabel ?? f.label, value });
  }
  return answers;
}
