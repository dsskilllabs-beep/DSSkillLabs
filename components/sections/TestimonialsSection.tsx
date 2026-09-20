import SectionHeading from '../SectionHeading';
import TestimonialCard from '../TestimonialCard';
import { testimonials } from '@/data/content';

export default function TestimonialsSection() {
  return (
    <section className="section pt-0 sm:pt-0" aria-labelledby="quotes-title">
      <div className="wrap">
        <SectionHeading id="quotes-title" title="What our students say" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (<TestimonialCard key={i} t={t} />))}
        </div>
        <p className="mt-[22px] text-sm text-ink-muted">Sample testimonials. Replace them with real student feedback (data/content.ts) before launch.</p>
      </div>
    </section>
  );
}
