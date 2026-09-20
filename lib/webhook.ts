// Sends a form submission to the Google Apps Script web app.
// Apps Script answers a POST with a redirect to a one-time result link, and that link must be opened with GET.
// Following the redirect by hand makes this work the same everywhere.

export type WebhookResult = {
  ok: boolean;
  status: number;
  json: { ok?: boolean; error?: string } | null;
  text: string;
};

export async function postToWebhook(url: string, payload: unknown): Promise<WebhookResult> {
  let res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    redirect: 'manual',
    cache: 'no-store',
  });

  for (let i = 0; i < 4 && res.status >= 300 && res.status < 400; i++) {
    const next = res.headers.get('location');
    if (!next) break;
    res = await fetch(new URL(next, url).toString(), { method: 'GET', redirect: 'manual', cache: 'no-store' });
  }

  const text = await res.text();
  let json: WebhookResult['json'] = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }
  return { ok: res.ok, status: res.status, json, text };
}

/** A short, secret-free reason, shown on the candidate form only when the page address has ?debug=1. */
export function explainFailure(url: string, r: WebhookResult): string {
  if (url.includes('googleusercontent.com')) {
    return 'ENQUIRY_WEBHOOK_URL is a temporary googleusercontent.com link. Use the permanent link that starts with https://script.google.com/macros/s/ and ends with /exec.';
  }
  if (/\/dev(\?|$)/.test(url)) {
    return 'ENQUIRY_WEBHOOK_URL ends with /dev, which is the private test link. Use the link that ends with /exec.';
  }
  if (!/\/exec(\?|$)/.test(url)) {
    return 'ENQUIRY_WEBHOOK_URL does not end with /exec. Copy the Web app URL from Deploy > Manage deployments.';
  }
  if (r.json) {
    return `The Google script answered: "${r.json.error ?? 'no message'}" (HTTP ${r.status}). Old script code, or the wrong sheet or tab.`;
  }
  return `Google did not return JSON (HTTP ${r.status}). The web app is probably not set to "Anyone". Response began: ${r.text.replace(/\s+/g, ' ').slice(0, 80)}`;
}
