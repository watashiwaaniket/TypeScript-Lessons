# 15. Utility Types

## What

**Utility types** are built-in type helpers that transform existing types. You don't import them — they're part of TypeScript itself.

The most common ones in React and API work:

- `Partial<T>` — every property becomes optional
- `Pick<T, Keys>` — keep only selected properties
- `Omit<T, Keys>` — remove selected properties
- `Record<Keys, Value>` — an object type with known keys

```ts
type User = { id: number; name: string; email: string };

type UserPatch = Partial<User>;
// { id?: number; name?: string; email?: string }

type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string }
```

## Why

You'll constantly need variations of the same shape:

- Update forms send **partial** data
- List views show **subset** fields
- Public APIs **hide** internal fields

Utility types keep these in sync with the source type — change `User` once and the derived types update automatically.

## How

### 1. `Partial` for updates

```ts
type User = { id: number; name: string; email: string };

function updateUser(id: number, patch: Partial<User>): void {
  // patch may include any subset of User fields
}

updateUser(1, { name: "Akane" }); // fine
updateUser(1, { id: 1, email: "a@example.com" }); // fine
```

### 2. `Pick` and `Omit`

```ts
type User = { id: number; name: string; email: string; passwordHash: string };

type PublicUser = Omit<User, "passwordHash">;
// { id: number; name: string; email: string }

type UserLabel = Pick<User, "id" | "name">;
// { id: number; name: string }
```

`Omit` is especially handy when extending types for display:

```ts
type UserForm = Omit<User, "id">;
```

### 3. `Record` for lookup tables

```ts
type Role = "admin" | "editor" | "viewer";

const permissions: Record<Role, string[]> = {
  admin: ["read", "write", "delete"],
  editor: ["read", "write"],
  viewer: ["read"],
};
```

`Record<Role, string[]>` means "an object where every `Role` key maps to `string[]`."

### 4. Combine utilities

```ts
type User = { id: number; name: string; email: string; createdAt: string };

type CreateUserInput = Omit<User, "id" | "createdAt">;
type UpdateUserInput = Partial<CreateUserInput>;
```

This pattern mirrors real CRUD APIs: create omits server-generated fields; update allows any subset.

## Summary

- Utility types transform existing types without duplication
- `Partial`, `Pick`, `Omit`, and `Record` cover most day-to-day React/API needs
- Compose them to model create/update/read variants of the same entity

## Exercises

### 1. Model a PATCH endpoint

Given `type Article = { id: number; title: string; body: string; published: boolean }`, define `UpdateArticleInput` so callers can send any subset of fields except `id`.

### 2. Public profile

Use `Pick` to create `type UserAvatar = { id: number; name: string }` from a larger `User` type with at least 4 fields.

### 3. Permission map

Define `type Plan = "free" | "pro" | "team"` and a `Record<Plan, number>` called `maxProjects` with a limit per plan.

<details>
<summary>Answers</summary>

**1.** `type UpdateArticleInput = Partial<Omit<Article, "id">>;`

**2.** `type UserAvatar = Pick<User, "id" | "name">;`

**3.** Example: `const maxProjects: Record<Plan, number> = { free: 1, pro: 10, team: 50 };`

</details>
