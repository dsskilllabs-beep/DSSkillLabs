import type { Metadata } from 'next';
import CandidateForm from '@/components/CandidateForm';

// Shared through QR codes and links at college visits, so it is kept out of search results.
export const metadata: Metadata = {
  title: 'Candidate Registration',
  description: 'Register for DS SkillLabs training programs.',
  robots: { index: false, follow: false },
};

export default function CandidateRegistrationPage() {
  return (
    <section className="section">
      <div className="wrap max-w-[860px]">
        <h1 className="text-[clamp(32px,4.6vw,48px)] font-extrabold leading-[1.1] tracking-tight">Candidate registration</h1>
        <p className="mb-9 mt-3.5 max-w-[60ch] text-lg text-ink-muted">
          Fill in your details for DS SkillLabs training programs. It takes about 5 minutes. Keep your marks memos handy.
        </p>
        <CandidateForm />
      </div>
    </section>
  );
}
