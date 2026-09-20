import type { Metadata } from 'next';
import EnquiryForm from '@/components/EnquiryForm';

export const metadata: Metadata = { title: 'Student Registration', description: 'Register your interest in a DS SkillLabs program.' };

export default function RegisterPage({ searchParams }: { searchParams: { course?: string } }) {
  return (
    <section className="section">
      <div className="wrap grid items-start gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
        <div>
          <h1 className="mb-3.5 text-[clamp(30px,4vw,44px)] font-extrabold leading-tight tracking-tight">Student registration</h1>
          <p className="max-w-[40ch] text-lg text-ink-muted">Share your details and our team will contact you with batch dates, the fee structure and next steps.</p>
        </div>
        <EnquiryForm variant="register" defaultCourse={searchParams.course ?? ''} />
      </div>
    </section>
  );
}
