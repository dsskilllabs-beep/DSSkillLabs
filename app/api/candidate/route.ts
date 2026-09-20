import { NextResponse } from 'next/server';
import { normalize, validate, toAnswers } from '@/lib/candidate';
import { postToWebhook, explainFailure } from '@/lib/webhook';

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
    const result = await postToWebhook(webhook, {
      type: 'candidate',
      token: process.env.ENQUIRY_WEBHOOK_TOKEN ?? '',
      answers: toAnswers(values, source),
    });
    if (result.ok && result.json?.ok) return NextResponse.json({ ok: true });
    detail = explainFailure(webhook, result);
  } catch (err) {
    detail = `Could not reach Google: ${err instanceof Error ? err.message : 'unknown error'}`;
  }
  console.error('[candidate] webhook failed:', detail);
  return NextResponse.json({ error: 'We could not send your details. Please try again.', detail }, { status: 502 });
}
