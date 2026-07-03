import { Link } from "react-router-dom";
import type { Lesson } from "../lessons/lessons";

interface LessonNavProps {
  prev?: Lesson;
  next?: Lesson;
}

export default function LessonNav({ prev, next }: LessonNavProps) {
  return (
    <nav className="mt-12 pt-6 border-t border-[#6FBEB2]/40 flex flex-col sm:flex-row justify-between gap-4 text-sm">
      {prev ? (
        <Link
          to={`/lessons/${prev.slug}`}
          className="group flex flex-col gap-1 hover:text-white transition-colors"
        >
          <span className="text-[#A5E9DD]/60">Previous</span>
          <span className="text-[#6FBEB2] group-hover:text-white">
            ← {prev.number}. {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          to={`/lessons/${next.slug}`}
          className="group flex flex-col gap-1 sm:items-end hover:text-white transition-colors"
        >
          <span className="text-[#A5E9DD]/60">Next</span>
          <span className="text-[#6FBEB2] group-hover:text-white">
            {next.number}. {next.title} →
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
