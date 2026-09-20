/**
 * DS SkillLabs: saves website submissions into your Google Sheet.
 *   - Enquiry and registration forms  -> first tab (or the tab set by TAB_GID)
 *   - Candidate registration form     -> a tab called "Candidate Registrations" (created automatically)
 *
 * Setup:
 * 1. Open your sheet > Extensions > Apps Script. Delete any starter code and paste this file. Save.
 * 2. Deploy > New deployment > gear icon > Web app.
 *      Execute as: Me
 *      Who has access: Anyone
 *    Click Deploy, allow the permissions, and copy the Web app URL (ends with /exec).
 * 3. Put that URL in your website's ENQUIRY_WEBHOOK_URL setting.
 * 4. Editing this code later? Deploy > Manage deployments > pencil > Version: New version > Deploy,
 *    or the change won't go live. The URL stays the same.
 *
 * To test from this editor: choose testWrite or testCandidate in the function dropdown at the top and click Run.
 * The Execution log at the bottom shows {"ok":true} or the error.
 */

const SHEET_ID = '1k7H2ailPA-J4xWYFKZrUgdJwlGGk6kwyrHrky1z2oto';
const TAB_GID = 1802604087; // tab for enquiries: the number after gid= in the sheet's address
const CANDIDATE_TAB = 'Candidate Registrations';

// Optional: set any long random text here AND the same value as ENQUIRY_WEBHOOK_TOKEN on the website.
// Requests without it are rejected, so strangers who find the URL can't add rows.
const SECRET = '';

const HEADERS = [
  'Submitted at (IST)', 'Type', 'Name', 'Phone', 'Email',
  'Program', 'Current education / occupation', 'Message',
];

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (SECRET && d.token !== SECRET) return reply({ ok: false, error: 'Unauthorized' });

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      if (d.type === 'candidate') {
        saveCandidate(d);
      } else {
        saveEnquiry(d);
      }
    } finally {
      lock.releaseLock();
    }
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function saveEnquiry(d) {
  if (!clean(d.name) || !clean(d.email)) throw new Error('Name and email are required');

  const tabs = SpreadsheetApp.openById(SHEET_ID).getSheets();
  const sheet = tabs.find(function (t) { return t.getSheetId() === TAB_GID; }) || tabs[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    // Plain-text columns keep phone numbers intact and stop anything typed in the form from acting as a formula.
    sheet.getRange(1, 1, sheet.getMaxRows(), HEADERS.length).setNumberFormat('@');
  }
  sheet.appendRow([
    now(),
    d.type === 'register' ? 'Registration' : 'Enquiry',
    clean(d.name), clean(d.phone), clean(d.email),
    clean(d.course), clean(d.background), clean(d.message),
  ]);
}

// Candidate answers arrive as [{label, value}, ...]. Labels become column headings, in that order.
// If the form gets a new question later, its column is added at the end automatically.
function saveCandidate(d) {
  if (!Array.isArray(d.answers) || d.answers.length === 0) throw new Error('No answers received');

  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(CANDIDATE_TAB) || ss.insertSheet(CANDIDATE_TAB);
  const answers = [{ label: 'Submitted at (IST)', value: now() }].concat(d.answers);

  const headers = sheet.getLastColumn() > 0
    ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String)
    : [];
  const oldCount = headers.length;
  answers.forEach(function (a) {
    const label = clean(a.label);
    if (label && headers.indexOf(label) === -1) headers.push(label);
  });
  if (sheet.getLastRow() === 0 || headers.length > oldCount) {
    sheet.getRange(1, 1, 1, headers.length).setNumberFormat('@').setValues([headers]).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  const row = headers.map(function () { return ''; });
  answers.forEach(function (a) {
    const i = headers.indexOf(clean(a.label));
    if (i >= 0) row[i] = clean(a.value);
  });
  // Text format keeps phone numbers and marks exactly as typed.
  sheet.getRange(sheet.getLastRow() + 1, 1, 1, headers.length).setNumberFormat('@').setValues([row]);
}

// Handy for checking the deployment in a browser: it should show {"ok":true,"service":"DS SkillLabs enquiries"}
function doGet() {
  return reply({ ok: true, service: 'DS SkillLabs enquiries' });
}

function now() {
  return Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss');
}

function clean(v) {
  return String(v == null ? '' : v).trim().slice(0, 2000);
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Run from the editor to check the enquiry tab.
function testWrite() {
  const out = doPost({
    postData: {
      contents: JSON.stringify({
        type: 'enquiry', name: 'Test', email: 'test@example.com',
        phone: '0000000000', course: 'Test', message: 'Test row from the editor',
      }),
    },
  });
  Logger.log(out.getContent());
}

// Run from the editor to check the candidate tab.
function testCandidate() {
  const out = doPost({
    postData: {
      contents: JSON.stringify({
        type: 'candidate',
        answers: [
          { label: 'Registration source', value: 'Editor test' },
          { label: 'Full name (as on certificates)', value: 'Test Student' },
          { label: 'Mobile number', value: '9000000000' },
          { label: '10th: marks', value: '85.5' },
        ],
      }),
    },
  });
  Logger.log(out.getContent());
}
