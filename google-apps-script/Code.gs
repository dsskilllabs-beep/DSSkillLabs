/**
 * DS SkillLabs: saves website enquiries and registrations into the "Candidate Enroll Details" Google Sheet.
 *
 * Setup (about 3 minutes):
 * 1. Open the sheet > Extensions > Apps Script. Delete any starter code and paste this file. Save.
 * 2. Deploy > New deployment > gear icon > Web app.
 *      Execute as: Me
 *      Who has access: Anyone
 *    Click Deploy, allow the permissions, and copy the Web app URL (ends with /exec).
 * 3. Put that URL in your website's ENQUIRY_WEBHOOK_URL setting (see README).
 * 4. Editing this code later? Deploy > Manage deployments > edit > New version, or the change won't go live.
 *
 * To test the sheet connection from this editor: choose testWrite in the function dropdown at the top, click Run,
 * then check the sheet for a "Test" row. The Execution log at the bottom shows {"ok":true} or the error.
 */

const SHEET_ID = '1k7H2ailPA-J4xWYFKZrUgdJwlGGk6kwyrHrky1z2oto';
const TAB_GID = 1802604087; // the number after gid= in the sheet's address

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
    if (!clean(d.name) || !clean(d.email)) return reply({ ok: false, error: 'Name and email are required' });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
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
        Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss'),
        d.type === 'register' ? 'Registration' : 'Enquiry',
        clean(d.name), clean(d.phone), clean(d.email),
        clean(d.course), clean(d.background), clean(d.message),
      ]);
    } finally {
      lock.releaseLock();
    }
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

// Handy for checking the deployment in a browser: it should show {"ok":true,"service":"DS SkillLabs enquiries"}
function doGet() {
  return reply({ ok: true, service: 'DS SkillLabs enquiries' });
}

function clean(v) {
  return String(v == null ? '' : v).trim().slice(0, 2000);
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Run this from the editor to check that the script can write to your sheet.
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
