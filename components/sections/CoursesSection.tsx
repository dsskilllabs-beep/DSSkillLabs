import SectionHeading from '../SectionHeading';
import CourseCard from '../CourseCard';
import { courses } from '@/data/courses';

export default function CoursesSection({ title = 'Choose your career path', text = 'Six programs, each built around the tools and projects that hiring teams ask about.', h1 }: { title?: string; text?: string; h1?: boolean }) {
  return (
    <section className="section" aria-labelledby="courses-title">
      <div className="wrap">
        <SectionHeading id="courses-title" title={title} text={text} h1={h1} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (<CourseCard key={c.slug} course={c} />))}
        </div>
      </div>
    </section>
  );
}
