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
