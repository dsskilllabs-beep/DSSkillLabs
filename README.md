# DS SkillLabs website (Next.js + Tailwind)

Next.js 14 (App Router), TypeScript and Tailwind CSS. Dark navy, electric blue and cyan theme, with the amber accent from the DS SkillLabs logo.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Edit your content

| What | Where |
| --- | --- |
| Name, tagline, phone, email, address, hours, social links, nav | `data/site.ts` |
| Programs: descriptions, duration, level, fee, curriculum, projects, careers, FAQs | `data/courses.ts` |
| Stats, "why us", journey, projects, tech stack, career list, testimonials, home FAQ | `data/content.ts` |
| Colors and fonts | `tailwind.config.ts` |

Adding a program to `data/courses.ts` creates its page at `/courses/<slug>` automatically.

## Before launch

- Replace the remaining placeholders: stats, levels, durations for Data Analytics, AI & ML and Cloud & DevOps, business hours, and the LinkedIn, YouTube and Facebook links.
- Replace the sample testimonials with real student feedback.
- Confirm the FAQ answers (for example online vs offline classes).
- Set `url` in `data/site.ts` to your real domain (used for SEO metadata).
- Add a favicon and an Open Graph image (`app/icon.png`, `app/opengraph-image.png`).
- Optional: replace the "Open in Google Maps" link on `/contact` with a Google Maps embed.

## Saving enquiries to your Google Sheet

Enquiry and registration forms post to `app/api/enquiry/route.ts`, which forwards each submission to a Google Apps Script
web app that adds a row to the **Candidate Enroll Details** sheet.

1. Open the sheet, then Extensions > Apps Script. Paste `google-apps-script/Code.gs` and save.
2. Deploy > New deployment > Web app. Execute as **Me**, access **Anyone**. Copy the Web app URL.
3. Copy `.env.example` to `.env.local` and set `ENQUIRY_WEBHOOK_URL` to that URL. On your host (for example Vercel),
   add the same value under Environment Variables.
4. Optional: set `SECRET` in `Code.gs` and the same value as `ENQUIRY_WEBHOOK_TOKEN`, so only your site can add rows.
5. Submit a test enquiry. A row appears with time (IST), type, name, phone, email, program, background and message.

Until step 3 is done, the form tells visitors it isn't connected, so nothing is silently lost.

## Structure

```
app/                  routes: /, /courses, /courses/[slug], /about, /projects, /placements, /contact, /register
components/           Navbar, Footer, Button, SectionHeading, CourseCard, ProjectCard, TestimonialCard, FAQ, CTA, ...
components/sections/  page sections composed by the routes
data/                 all editable content
```

Not built yet: Blog.
