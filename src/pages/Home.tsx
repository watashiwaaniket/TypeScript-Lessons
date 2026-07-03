import { Link } from "react-router-dom";
import { lessons } from "../lessons/lessons";

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
          use it in frontend development with React.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          Table of contents
        </h2>
        <ol className="flex flex-col gap-2">
          {lessons.map((lesson) => (
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
    </div>
  );
}
