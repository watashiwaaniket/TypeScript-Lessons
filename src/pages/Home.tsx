import { Link } from "react-router-dom";
import { getLessonsByPart } from "../lessons/lessons";

function LessonList({ part, title }: { part: 1 | 2; title: string }) {
  const partLessons = getLessonsByPart(part);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-white">{title}</h2>
      {part === 2 && (
        <p className="text-[#A5E9DD]/80 text-sm leading-relaxed">
          Practical patterns for real React codebases — utility types, state
          machines, advanced hooks, and modern validation.
        </p>
      )}
      <ol className="flex flex-col gap-2">
        {partLessons.map((lesson) => (
          <li key={lesson.slug}>
            <Link
              to={`/lessons/${lesson.slug}`}
              className="group flex gap-2 text-[#A5E9DD]/90 hover:text-white transition-colors"
            >
              <span className="text-[#6FBEB2] group-hover:text-white shrink-0">
                {lesson.number}.
              </span>
              <span className="underline-offset-2 group-hover:underline">
                {lesson.title}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-3">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          About this site
        </h2>
        <p className="text-[#A5E9DD]/90 leading-relaxed">
          A beginner-friendly guide to TypeScript fundamentals, ported from{" "}
          <a
            href="https://akane-typescript-lesson.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="text-[#6FBEB2] underline underline-offset-2 hover:text-white transition-colors"
          >
            Akane&apos;s original lessons
          </a>{" "}
          and rewritten in English with a fresh design. Each lesson is stored as
          a markdown file and rendered on the fly.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">Goal</h2>
        <p className="text-[#A5E9DD]/90 leading-relaxed">
          Help beginners understand TypeScript basics so they can confidently
          use it in frontend development with React. Part 2 goes deeper into
          patterns you&apos;ll see in production codebases.
        </p>
      </section>

      <LessonList part={1} title="Part 1 — Fundamentals" />
      <LessonList part={2} title="Part 2 — Going Further" />
    </div>
  );
}
