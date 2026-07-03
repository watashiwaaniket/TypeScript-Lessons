export interface Lesson {
  number: number;
  slug: string;
  title: string;
  filename: string;
}

export const lessons: Lesson[] = [
  { number: 1, slug: "01-what-is-typescript", title: "What is TypeScript?", filename: "01-what-is-typescript.md" },
  { number: 2, slug: "02-type-annotations-and-inference", title: "Type Annotations and Inference", filename: "02-type-annotations-and-inference.md" },
  { number: 3, slug: "03-basic-types", title: "Basic Types (primitive / array / object)", filename: "03-basic-types.md" },
  { number: 4, slug: "04-union-and-literal-types", title: "Union and Literal Types", filename: "04-union-and-literal-types.md" },
  { number: 5, slug: "05-narrowing", title: "Narrowing", filename: "05-narrowing.md" },
  { number: 6, slug: "06-type-alias-and-interface", title: "Type Aliases and Interfaces", filename: "06-type-alias-and-interface.md" },
  { number: 7, slug: "07-function-types", title: "Function Types (args, return values, callbacks)", filename: "07-function-types.md" },
  { number: 8, slug: "08-generics-basics", title: "Generics Basics", filename: "08-generics-basics.md" },
  { number: 9, slug: "09-special-types", title: "unknown / any / never / void", filename: "09-special-types.md" },
  { number: 10, slug: "10-type-assertion-and-as-const", title: "Type Assertions and as const", filename: "10-type-assertion-and-as-const.md" },
  { number: 11, slug: "11-class-and-access-modifiers", title: "Classes and Access Modifiers", filename: "11-class-and-access-modifiers.md" },
  { number: 12, slug: "12-react-with-typescript-basics", title: "Using TypeScript with React", filename: "12-react-with-typescript-basics.md" },
  { number: 13, slug: "13-safe-api-data-handling", title: "Handling API Data Safely", filename: "13-safe-api-data-handling.md" },
  { number: 14, slug: "14-tsconfig-important-options", title: "Important tsconfig Options", filename: "14-tsconfig-important-options.md" },
];

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getAdjacentLessons(slug: string): {
  prev: Lesson | undefined;
  next: Lesson | undefined;
} {
  const index = lessons.findIndex((lesson) => lesson.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };

  return {
    prev: index > 0 ? lessons[index - 1] : undefined,
    next: index < lessons.length - 1 ? lessons[index + 1] : undefined,
  };
}
