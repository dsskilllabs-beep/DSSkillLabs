import { NextResponse } from 'next/server';
import { normalize, validate, toAnswers } from '@/lib/candidate';

// Receives the candidate registration form, checks it again on the server, and forwards it to the Google Apps Script
// web app in ENQUIRY_WEBHOOK_URL. The script saves it as one row in the "Candidate Registrations" tab.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Spam trap: real people never see or fill this hidden field.
  if (typeof body.website === 'string' && body.website.trim()) return NextResponse.json({ ok: true });

  const values = normalize(body);
  const errors = validate(values);
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: 'Please check the highlighted fields.', errors }, { status: 400 });
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: 'The form is not connected yet, so your details were not sent.' }, { status: 503 });
  }

  const source = typeof body.source === 'string' ? body.source.trim().slice(0, 120) : '';

  let detail: string;
  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'candidate',
        token: process.env.ENQUIRY_WEBHOOK_TOKEN ?? '',
        answers: toAnswers(values, source),
      }),
    });
    const text = await res.text();
    let result: { ok?: boolean; error?: string } | null = null;
    try {
      result = JSON.parse(text);
    } catch {
      result = null;
    }
    if (res.ok && result?.ok) return NextResponse.json({ ok: true });

    // Short, secret-free reason. It is shown on the form only when the page address has ?debug=1.
    detail = result
      ? `The Google script answered: "${result.error ?? 'no message'}" (HTTP ${res.status}). Old script code, or the wrong sheet or tab.`
      : `Google did not return JSON (HTTP ${res.status}). The web app is probably not set to "Anyone", or ENQUIRY_WEBHOOK_URL is not the /exec link. Response began: ${text.replace(/\s+/g, ' ').slice(0, 80)}`;
  } catch (err) {
    detail = `Could not reach Google: ${err instanceof Error ? err.message : 'unknown error'}`;
  }
  console.error('[candidate] webhook failed:', detail);
  return NextResponse.json({ error: 'We could not send your details. Please try again.', detail }, { status: 502 });
}
