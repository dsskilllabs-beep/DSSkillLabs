import Button from '@/components/Button';

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap">
        <h1 className="mb-4 text-4xl font-extrabold">Page not found</h1>
        <p className="mb-8 text-lg text-ink-muted">That page doesn&apos;t exist. Try our programs instead.</p>
        <Button href="/courses">Explore courses</Button>
      </div>
    </section>
  );
}
