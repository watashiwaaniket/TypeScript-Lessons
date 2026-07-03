const lessonModules = import.meta.glob<string>("./*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export function loadLessonMarkdown(filename: string): string | null {
  const path = `./${filename}`;
  return lessonModules[path] ?? null;
}
