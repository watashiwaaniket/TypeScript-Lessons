# 13. Handling API Data Safely

## What

Data from an API is **external input**. TypeScript types alone don't guarantee the runtime shape matches.

The safe pattern:

1. Treat incoming data as `unknown`
2. Validate the shape with a type guard
3. Only then use it in your app logic

## Why

API data is a fragile boundary:

- Server schema changes
- Temporary malformed responses
- Unexpected `null` or missing fields

Trusting types without validation leads to runtime crashes. In production, use **type definitions + runtime validation**.

## How

### 1. Receive as `unknown`

```ts
type User = {
  id: number;
  name: string;
};

async function fetchRaw(): Promise<unknown> {
  const response = await fetch("/api/user");
  return response.json();
}
```

### 2. Write a type guard

```ts
function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) return false;
  const maybeUser = value as Record<string, unknown>;
  return typeof maybeUser.id === "number" && typeof maybeUser.name === "string";
}
```

The return type `value is User` is a **type predicate**. At runtime it's just `boolean`, but TypeScript uses it for narrowing when the function returns `true`.

### 3. Use only after validation

```ts
async function fetchUser(): Promise<User> {
  const raw = await fetchRaw();
  if (!isUser(raw)) {
    throw new Error("Invalid user data shape");
  }
  return raw; // narrowed to User
}
```

Callers can now treat the result as a safe `User`.

### 4. Validate array responses

```ts
function isUserArray(value: unknown): value is User[] {
  return Array.isArray(value) && value.every(isUser);
}
```

## Summary

- Receive API data as `unknown` first
- Validate with type guards before passing to business logic
- Default stance: **never trust external input**

## Exercises

### 1. Type guard for `Post`

```ts
type Post = { id: number; title: string; published: boolean };
```

Write `isPost(value: unknown): value is Post` that checks all three fields.

### 2. Invalid data

Which values should `isPost` reject?

```ts
{ id: 1, title: "Hello" }                    // missing published
{ id: "1", title: "Hello", published: true } // wrong id type
null
[]
```

### 3. Safe fetch wrapper

Sketch `async function fetchPost(): Promise<Post>` that:

1. Calls `fetch("/api/post")` and parses JSON as `unknown`
2. Validates with `isPost`
3. Throws if invalid, otherwise returns the `Post`

<details>
<summary>Answers</summary>

**2.** All four should be rejected.

**1 & 3.** Example guard:

```ts
function isPost(value: unknown): value is Post {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "number" &&
    typeof v.title === "string" &&
    typeof v.published === "boolean"
  );
}
```

</details>
