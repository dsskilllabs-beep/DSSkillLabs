import SectionHeading from '../SectionHeading';
import FAQ from '../FAQ';
import { faq } from '@/data/content';

export default function FaqSection() {
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="wrap">
        <SectionHeading id="faq-title" title="Frequently asked questions" />
        <FAQ items={faq} />
      </div>
    </section>
  );
}
