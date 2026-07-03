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
