import Link from 'next/link';
import { IconBox } from './Icon';
import Button from './Button';
import type { Course } from '@/data/courses';

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="flex flex-col rounded-[18px] border border-line bg-gradient-to-b from-navy-800 to-navy-900 p-[26px] transition-colors hover:border-brand-blue-2">
      <div className="mb-[22px] flex items-center justify-between">
        <IconBox name={course.icon} />
        <span className="flex items-center gap-[5px] text-[13px] font-semibold text-ink-muted" aria-label={`Level: ${course.levelName}`}>
          {[1, 2, 3].map((n) => (
            <i key={n} className={`h-[5px] w-4 rounded-[3px] ${n <= course.level ? 'bg-brand-cyan' : 'bg-line-strong'}`} />
          ))}
          <span className="ml-[5px]">{course.levelName}</span>
        </span>
      </div>
      <h3 className="mb-2.5 text-[22px] font-bold leading-tight">
        <Link href={`/courses/${course.slug}`} className="hover:text-brand-cyan">{course.title}</Link>
      </h3>
      <p className="flex-1 text-base text-ink-muted">{course.short}</p>
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-5">
        <div className="text-[15px] font-bold">
          <small className="block text-xs font-medium text-ink-muted">Duration</small>
          {course.duration}
        </div>
        <Button href={`/courses/${course.slug}`} variant="ghost" size="sm">View program</Button>
      </div>
    </article>
  );
}
