# 18. `satisfies`, `keyof`, and Runtime Validation

## What

Three modern tools that bridge TypeScript's compile-time types and real-world data:

- **`satisfies`** — validate a value matches a type without widening literals
- **`keyof`** — get a union of an object's property names
- **Runtime validation** (e.g. Zod) — confirm external data actually matches your types

```ts
const palette = {
  primary: "#6FBEB2",
  background: "#0B0909",
} as const satisfies Record<string, string>;
```

## Why

Lesson 10 showed `as const` and assertions. Lesson 13 showed manual type guards. In production codebases you'll often see:

- `satisfies` for config objects and theme tokens
- `keyof` for type-safe property access
- Zod (or similar) when API shapes are complex or evolve often

Together they reduce "types say one thing, runtime does another" drift.

## How

### 1. `satisfies` vs annotation

```ts
type Route = "/" | "/lessons" | "/about";

// Widens to string — loses literal precision
const bad: Route = "/";

// Keeps literal "/lessons", still checked against Route
const good = "/lessons" satisfies Route;
```

For objects:

```ts
type Theme = Record<"primary" | "accent", string>;

const theme = {
  primary: "#6FBEB2",
  accent: "#A5E9DD",
} satisfies Theme;

// theme.primary stays string (not widened to string from a fresh annotation)
// but missing/extra keys are caught
```

### 2. `keyof` and indexed access

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

type UserKey = keyof User;
// "id" | "name" | "email"

function getField(user: User, key: UserKey): User[UserKey] {
  return user[key];
}
```

`User[UserKey]` is a union of all property value types: `number | string`.

Practical use — type-safe sort keys:

```ts
type SortKey = keyof Pick<User, "name" | "email">;

function sortUsers(users: User[], key: SortKey): User[] {
  return [...users].sort((a, b) => a[key].localeCompare(b[key]));
}
```

### 3. Enums vs `as const` objects

```ts
// TypeScript enum — generates runtime JS
enum Status {
  Idle = "idle",
  Loading = "loading",
}

// Preferred in many codebases — no extra runtime code
const Status = {
  Idle: "idle",
  Loading: "loading",
} as const;

type Status = (typeof Status)[keyof typeof Status];
// "idle" | "loading"
```

For new React projects, `as const` objects + union types are usually simpler than enums.

### 4. Zod for API validation (intro)

```ts
import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

type User = z.infer<typeof UserSchema>;

async function fetchUser(): Promise<User> {
  const raw: unknown = await fetch("/api/user").then((r) => r.json());
  return UserSchema.parse(raw); // throws if shape is wrong
}
```

`z.infer` derives the TypeScript type from the schema — single source of truth for runtime and compile time.

When to use what:

| Approach | Best for |
|---|---|
| Manual type guard | Small shapes, no extra dependency |
| Zod / Valibot | APIs, forms, config with many fields |
| `satisfies` | Local constants you want checked but not widened |

## Summary

- `satisfies` checks shape without losing literal types
- `keyof` and indexed access enable type-safe property lookups
- Prefer `as const` objects over enums in most modern TS/React code
- Runtime validators like Zod complement — not replace — TypeScript types

## Exercises

### 1. Theme with `satisfies`

Define `type ThemeColors = { primary: string; accent: string; background: string }` and a `theme` object that uses `satisfies ThemeColors`. Try adding an extra key — what error appears?

### 2. Type-safe `pluck`

Write `function pluck<T, K extends keyof T>(obj: T, key: K): T[K]` and call it on a `User` with `"name"` and `"id"`.

### 3. Zod or manual?

For a 2-field API response (`id`, `name`), would you reach for Zod or a manual type guard? For a 20-field nested response? Explain your choice in one sentence each.

<details>
<summary>Answers</summary>

**1.** Extra keys error under `satisfies ThemeColors` (excess property checking).

**3.** Sample: 2 fields → manual guard is fine; 20 nested fields → Zod saves time and stays maintainable.

</details>
