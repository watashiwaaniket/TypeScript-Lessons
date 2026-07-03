# 3. Basic Types (primitive / array / object)

## What

The foundation of TypeScript is defining the **shape** of your data. Start with these types:

- `string` (text)
- `number` (numeric values)
- `boolean` (true/false)
- Arrays (`T[]`)
- Object types (`{ ... }`)
- `null` / `undefined` (these are types too)

Object types, `null`, and `undefined` can look like their runtime values, but they're different things. For example, the `null` type only accepts the value `null`. Your editor usually colors them differently — pay attention to that.

## Why

These basic types matter because later concepts like `interface` and Union types are built from combinations of them.

Making types explicit (or letting them be inferred) clarifies what variables and functions can hold. Once that's clear, TypeScript can catch when you use the wrong operation on a value.

## How

### 1. Use primitive types

```ts
const lessonTitle: string = "TypeScript Lesson";
const pageCount: number = 3;
const isPublished: boolean = true;
```

### 2. Use array types

```ts
const tags: string[] = ["typescript", "beginner", "react"];
const userIds: number[] = [1, 2, 3, 4, 5];
```

`string[]` means "an array that only holds strings." `number[]` means numbers only.

In JavaScript you rarely mixed strings and numbers in one array — but nothing actually guaranteed that. TypeScript can.

### 3. Define object types

```ts
// This is a type (doesn't exist at runtime)
type User = {
  id: number;
  name: string;
  isActive: boolean;
  tags: string[];
};

// This is a value (exists at runtime)
const user: User = {
  id: 1,
  name: "Akane",
  isActive: true,
  tags: ["beginner", "typescript"],
};
```

`type User` defines the shape. Because `user` is typed as `User`, you and your editor know it has a `number` field called `id`.

### 4. Use object types in functions

```ts
type Lesson = {
  title: string;
  difficulty: "beginner" | "intermediate"; // Union type
};

function printLesson(lesson: Lesson): void {
  console.log(`${lesson.title} (${lesson.difficulty})`);
}
```

Annotating the argument as `Lesson` enforces a consistent data structure. `printLesson` only accepts `Lesson`-shaped data.

## Try using `type`

- Use `type` to give data structures a name
- Start by defining types for objects you use often
- Once defined, use them in type annotations

## Summary

- TypeScript basics are about **shape**, not just values
- Primitives, arrays, and object types cover most everyday code
- Naming types with `type` improves readability and safety
