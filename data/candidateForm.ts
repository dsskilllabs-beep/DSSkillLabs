// Candidate registration form (used at college visits). Edit questions here: add, remove or reword fields.
// The page, validation and the Google Sheet columns all follow this list. New questions become new sheet columns automatically.
import { courses } from './courses';

const thisYear = new Date().getFullYear();

export type FieldType = 'text' | 'tel' | 'email' | 'date' | 'number' | 'select' | 'checkboxes' | 'textarea' | 'consent';

export type Field = {
  key: string; // internal name, must be unique
  label: string; // shown on the form AND used as the Google Sheet column heading
  sheetLabel?: string; // optional shorter column heading for the sheet
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  hint?: string;
  wide?: boolean; // full width row
  min?: number;
  max?: number;
  step?: string;
  defaultValue?: string;
  scoreTypeKey?: string; // for score fields: the field that says Percentage or CGPA
  pattern?: RegExp;
  patternMessage?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'numeric' | 'decimal' | 'tel' | 'email';
};

export type Section = { id: string; title: string; description?: string; fields: Field[] };

const BOARDS = ['State Board', 'CBSE', 'ICSE', 'Other'];
const SCORE_TYPES = ['Percentage', 'CGPA (out of 10)'];

const score = (prefix: string, label: string, required = false): Field[] => [
  {
    key: `${prefix}Score`, label: `${label}: marks`, type: 'number', required, min: 0, step: '0.01',
    inputMode: 'decimal', scoreTypeKey: `${prefix}ScoreType`, placeholder: 'e.g. 82.5',
  },
  {
    key: `${prefix}ScoreType`, label: `${label}: marks type`, type: 'select', required,
    options: SCORE_TYPES, defaultValue: 'Percentage',
  },
];

export const candidateSections: Section[] = [
  {
    id: 'personal',
    title: 'Personal details',
    description: 'Write your name exactly as it appears on your certificates. We use it on letters.',
    fields: [
      { key: 'fullName', label: 'Full name (as on certificates)', type: 'text', required: true, wide: true, autoComplete: 'name' },
      { key: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other', 'Prefer not to say'] },
      { key: 'dob', label: 'Date of birth', type: 'date', required: true, autoComplete: 'bday' },
      { key: 'phone', label: 'Mobile number', type: 'tel', required: true, inputMode: 'tel', autoComplete: 'tel', placeholder: '10-digit number' },
      { key: 'whatsapp', label: 'WhatsApp number (if different)', type: 'tel', inputMode: 'tel', placeholder: '10-digit number' },
      { key: 'email', label: 'Email address', type: 'email', required: true, autoComplete: 'email', wide: true },
      { key: 'guardianName', label: "Father's / guardian's name", type: 'text', wide: true },
      { key: 'city', label: 'City / town', type: 'text', required: true, autoComplete: 'address-level2' },
      { key: 'state', label: 'State', type: 'text', required: true, autoComplete: 'address-level1' },
      {
        key: 'pincode', label: 'PIN code', type: 'text', inputMode: 'numeric', autoComplete: 'postal-code',
        pattern: /^\d{6}$/, patternMessage: 'Enter a 6-digit PIN code.',
      },
      { key: 'address', label: 'Full address (optional)', type: 'textarea', wide: true },
    ],
  },
  {
    id: 'tenth',
    title: '10th (SSC)',
    fields: [
      { key: 'tenthSchool', label: '10th: school name', type: 'text', required: true, wide: true },
      { key: 'tenthBoard', label: '10th: board', type: 'select', required: true, options: BOARDS },
      { key: 'tenthYear', label: '10th: year of passing', type: 'number', required: true, min: 1995, max: thisYear, step: '1', inputMode: 'numeric', placeholder: 'e.g. 2019' },
      ...score('tenth', '10th', true),
    ],
  },
  {
    id: 'inter',
    title: '12th / Intermediate / Diploma',
    fields: [
      { key: 'interType', label: '12th / diploma: course', type: 'select', required: true, options: ['Intermediate / 12th', 'Diploma', 'Other'] },
      { key: 'interCollege', label: '12th / diploma: college name', type: 'text', required: true, wide: true },
      { key: 'interBoard', label: '12th / diploma: board', type: 'select', required: true, options: [...BOARDS, 'Diploma board'] },
      { key: 'interGroup', label: '12th / diploma: group or branch', type: 'text', placeholder: 'MPC, BiPC, Commerce, Mechanical...' },
      { key: 'interYear', label: '12th / diploma: year of passing', type: 'number', required: true, min: 1995, max: thisYear, step: '1', inputMode: 'numeric', placeholder: 'e.g. 2021' },
      ...score('inter', '12th / diploma', true),
    ],
  },
  {
    id: 'graduation',
    title: 'Graduation',
    description: 'Fill in your current degree if you are still studying.',
    fields: [
      { key: 'gradStatus', label: 'Graduation: status', type: 'select', required: true, options: ['Completed', 'Pursuing: final year', 'Pursuing: other year'] },
      {
        key: 'gradDegree', label: 'Graduation: degree', type: 'select', required: true,
        options: ['B.Tech / B.E', 'B.Sc', 'BCA', 'B.Com', 'BBA', 'BA', 'B.Pharm', 'Diploma', 'Other'],
      },
      { key: 'gradBranch', label: 'Graduation: branch or specialization', type: 'text', required: true, placeholder: 'CSE, Mathematics, Commerce...' },
      { key: 'gradCollege', label: 'Graduation: college name', type: 'text', required: true, wide: true },
      { key: 'gradUniversity', label: 'Graduation: university', type: 'text', required: true },
      { key: 'gradYear', label: 'Graduation: year of passing (or expected)', type: 'number', required: true, min: 1995, max: thisYear + 6, step: '1', inputMode: 'numeric', placeholder: 'e.g. 2026' },
      ...score('grad', 'Graduation (so far)', true),
      { key: 'gradBacklogs', label: 'Graduation: current backlogs', type: 'number', min: 0, max: 50, step: '1', inputMode: 'numeric', hint: 'Enter 0 if none.' },
    ],
  },
  {
    id: 'pg',
    title: 'Post-graduation (only if applicable)',
    fields: [
      { key: 'pgDegree', label: 'Post-graduation: degree', type: 'select', options: ['None', 'M.Tech / M.E', 'M.Sc', 'MCA', 'MBA', 'M.Com', 'MA', 'Other'] },
      { key: 'pgSpecialization', label: 'Post-graduation: specialization', type: 'text' },
      { key: 'pgCollege', label: 'Post-graduation: college name', type: 'text', wide: true },
      { key: 'pgUniversity', label: 'Post-graduation: university', type: 'text' },
      { key: 'pgYear', label: 'Post-graduation: year of passing (or expected)', type: 'number', min: 1995, max: thisYear + 6, step: '1', inputMode: 'numeric' },
      ...score('pg', 'Post-graduation', false),
    ],
  },
  {
    id: 'training',
    title: 'Training interest and skills',
    fields: [
      {
        key: 'programs', label: 'Programs you are interested in', type: 'checkboxes', required: true, wide: true,
        options: [...courses.map((c) => c.title), 'Not sure yet'],
      },
      {
        key: 'skills', label: 'Skills you already have', type: 'checkboxes', wide: true,
        options: ['Excel', 'SQL', 'Python', 'Java', 'C / C++', 'HTML / CSS / JavaScript', 'Power BI / Tableau', 'Machine learning basics', 'None yet'],
      },
      { key: 'experience', label: 'Your experience level', type: 'select', required: true, options: ['Complete beginner', 'Know the basics', 'Have built small projects', 'Working professional'] },
      { key: 'mode', label: 'Preferred mode of training', type: 'select', options: ['Online', 'Offline (classroom)', 'Hybrid', 'No preference'] },
      { key: 'laptop', label: 'Do you have a laptop?', type: 'select', options: ['Yes', 'No', 'Can arrange'] },
      { key: 'goal', label: 'What do you want from the training?', type: 'select', options: ['Get a job', 'Higher studies', 'Freelancing or own projects', 'Upgrade skills for current work'] },
      { key: 'message', label: 'Anything else you would like to tell us? (optional)', type: 'textarea', wide: true },
    ],
  },
  {
    id: 'consent',
    title: 'Confirm',
    fields: [
      {
        key: 'consent', label: 'I confirm my details are correct. I agree that DS SkillLabs may store them and contact me about training programs.',
        sheetLabel: 'Consent given', type: 'consent', required: true, wide: true,
      },
    ],
  },
];

export const allFields: Field[] = candidateSections.flatMap((s) => s.fields);
