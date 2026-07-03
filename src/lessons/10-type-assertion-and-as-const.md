# 10. Type Assertions and `as const`

## What

A **type assertion** tells TypeScript "treat this value as this type." You write it with `as`:

```ts
const value = "hello" as string;
```

**`as const`** is a special assertion that locks a value to its most specific literal form:

```ts
let status = "loading" as const; // type is "loading", not string
```

## Why

Sometimes inference doesn't capture your intent:

```ts
const arr = ["a"];

function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const a = first(arr); // string | undefined
const str = a as string; // you know it's string, so assert it
```

Assertions can bypass type checking, so don't overuse them.

## How

### 1. Use assertions sparingly

```ts
const maybeInput = document.getElementById("name") as HTMLInputElement | null;

if (maybeInput) {
  console.log(maybeInput.value);
}
```

`getElementById` returns `HTMLElement | null`. When you know the element is an input, asserting to `HTMLInputElement` is practical.

### 2. Lock objects with `as const`

```ts
const lessons = {
  beginner: "TypeScript Basics",
  advanced: "Advanced Type System",
} as const;
```

With `as const`:

- Properties become `readonly`
- Values stay as literal types

### 3. Use `as const` on arrays

```ts
const levels = ["beginner", "intermediate", "advanced"] as const;
type Level = (typeof levels)[number];
```

This derives a Union type from the array values safely.

## Summary

- Type assertions help when inference falls short
- `as const` locks values as literals
- Prefer type guards first; reach for assertions only when necessary

## Exercises

### 1. Derive a union from `as const`

```ts
const sizes = ["sm", "md", "lg"] as const;
type Size = (typeof sizes)[number];
```

What is the type of `Size`? Try assigning `const s: Size = "xl"` — what error do you get?

### 2. DOM assertion

Type this safely with an assertion and a null check:

```ts
const input = document.querySelector("#email");
// access input.value only when input exists
```

### 3. Assertion vs type guard

When would you prefer a type guard over `value as User`? Give one concrete example (e.g. API data).

<details>
<summary>Answers</summary>

**1.** `Size` is `"sm" | "md" | "lg"`. `"xl"` is not assignable.

**2.** Example: `const input = document.querySelector("#email") as HTMLInputElement | null; if (input) console.log(input.value);`

**3.** API responses — assertions don't validate runtime shape; type guards do.

</details>
