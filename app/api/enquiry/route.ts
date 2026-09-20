import { NextResponse } from 'next/server';
import { postToWebhook, explainFailure } from '@/lib/webhook';

// Receives enquiry and registration submissions and forwards them to the Google Apps Script web app in
// ENQUIRY_WEBHOOK_URL, which adds a row to the "Candidate Enroll Details" sheet (see google-apps-script/Code.gs).
// Until that URL is set, the form tells the visitor it isn't connected.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Enter your name and a valid email address.' }, { status: 400 });
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: 'The form is not connected yet, so your details were not sent.' }, { status: 503 });
  }

  try {
    const result = await postToWebhook(webhook, {
      type: String(body.type ?? 'enquiry'),
      name,
      email,
      phone: String(body.phone ?? ''),
      course: String(body.course ?? ''),
      background: String(body.background ?? ''),
      message: String(body.message ?? ''),
      token: process.env.ENQUIRY_WEBHOOK_TOKEN ?? '',
    });
    if (result.ok && result.json?.ok) return NextResponse.json({ ok: true });
    console.error('[enquiry] webhook failed:', explainFailure(webhook, result));
  } catch (err) {
    console.error('[enquiry] webhook failed:', err instanceof Error ? err.message : err);
  }
  return NextResponse.json({ error: 'We could not send your details. Please try again.' }, { status: 502 });
}
