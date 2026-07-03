import { Link, useParams } from "react-router-dom";
import LessonNav from "../components/LessonNav";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { loadLessonMarkdown } from "../lessons/loadLesson";
import {
  getAdjacentLessons,
  getLessonBySlug,
} from "../lessons/lessons";

export default function Lesson() {
  const { slug } = useParams<{ slug: string }>();
  const lesson = slug ? getLessonBySlug(slug) : undefined;
  const { prev, next } = slug
    ? getAdjacentLessons(slug)
    : { prev: undefined, next: undefined };

  if (!lesson) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-white">Lesson not found</h2>
        <p className="text-[#A5E9DD]/80">
          That lesson doesn&apos;t exist. Head back to the{" "}
          <Link to="/" className="text-[#6FBEB2] hover:text-white underline">
            home page
          </Link>
          .
        </p>
      </div>
    );
  }

  const content = loadLessonMarkdown(lesson.filename);

  if (!content) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-white">{lesson.title}</h2>
        <p className="text-[#A5E9DD]/80">Could not load this lesson.</p>
        <Link to="/" className="text-[#6FBEB2] hover:text-white underline w-fit">
          ← Back to home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/"
        className="inline-block mb-6 text-sm text-[#A5E9DD]/60 hover:text-white transition-colors"
      >
        ← All lessons
      </Link>

      <MarkdownRenderer content={content} />
      <LessonNav prev={prev} next={next} />
    </div>
  );
}
