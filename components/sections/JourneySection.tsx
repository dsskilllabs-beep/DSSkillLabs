import SectionHeading from '../SectionHeading';
import Journey from '../Journey';

export default function JourneySection() {
  return (
    <section className="section" aria-labelledby="journey-title">
      <div className="wrap">
        <SectionHeading id="journey-title" title="Your learning journey" text="Every program follows the same six steps, from first lesson to first job search." />
        <Journey />
      </div>
    </section>
  );
}
