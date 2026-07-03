# 4. Union and Literal Types

## What

A **Union type** means "one of several types." You write it with `|` (pipe):

```ts
let id: string | number;
id = "user-1"; // string is fine
id = 1001; // number is fine too
```

A **Literal type** treats a specific value as the type itself:

```ts
type Theme = "light" | "dark";
let theme: Theme = "light";
theme = "dark";
theme = "rainbow"; // not allowed!
```

Combining literals and unions lets you guarantee "only these values are valid."

## Why

In real projects, many values are limited to a fixed set:

- Status: `"idle" | "loading" | "success" | "error"`
- Role: `"admin" | "editor" | "viewer"`
- API mode: `"json" | "text"`

A plain `string` is too permissive — typos slip through. Literal types restrict candidates so mistakes are caught at compile time:

```ts
type Status = "idle" | "loading" | "success" | "error";

const status: Status = "loading";
const badStatus: Status = "lodading"; // typo caught!
```

## How

### 1. Start with a Union type

```ts
function printId(id: string | number): void {
  console.log(id);
}
```

Both `printId("abc")` and `printId(123)` work.

### 2. Restrict values with literal types

```ts
type Difficulty = "beginner" | "intermediate" | "advanced";

type Lesson = {
  title: string;
  difficulty: Difficulty;
};
```

### 3. Model object state

```ts
type FetchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };
```

`idle` and `loading` only have `status`, but `success` also has `data` and `error` also has `message`. This design pairs perfectly with **Narrowing** in lesson 5 — one of TypeScript's most powerful patterns.

## Notes

- `string | number` means one or the other, not both
- Without literal types, you lose the constraint on allowed values
- Name complex unions with `type` to keep things manageable

## Summary

- Union types represent multiple possible types
- Literal types lock a type to specific values
- Great for status, modes, roles, and any data with a fixed set of choices
