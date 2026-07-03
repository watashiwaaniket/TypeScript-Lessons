# 6. Type Aliases and Interfaces

## What

- **`type`:** a type alias — gives an existing type a new name
- **`interface`:** defines the shape of an object type

They look similar:

```ts
type UserType = {
  id: number;
  name: string;
};

interface UserInterface {
  id: number;
  name: string;
}
```

## Why

Naming types lets you reuse the same shape safely across your codebase:

- Keep function argument and return types consistent
- Share React prop types across files

Like extracting values into variables or logic into functions, pulling types into named definitions makes code easier to maintain.

## How

### 1. Either works for basic object shapes

```ts
type Lesson1 = {
  title: string;
  level: "beginner" | "intermediate" | "advanced";
};

interface Lesson2 {
  title: string;
  level: "beginner" | "intermediate" | "advanced";
}
```

### 2. `interface` extends naturally

```ts
interface Person {
  name: string;
}

interface Student extends Person {
  studentId: string;
}
```

`extends` inherits properties from the parent interface.

### 3. `type` shines with unions and intersections

```ts
type ApiStatus = "idle" | "loading" | "success" | "error";

type User = {
  id: number;
  name: string;
};

type UserWithMeta = User & { updatedAt: string };
```

Intersection (`&`) merges both sets of properties into one type.

## Summary

- Both `type` and `interface` help you reuse type definitions
- For most cases, either is fine
- There are subtle differences — search "type vs interface TypeScript" if you're curious

## Exercises

### 1. Extend with `interface`

Define `interface Named { name: string }` and `interface Employee extends Named { employeeId: string; department: string }`. Create a sample `employee` object.

### 2. Intersect with `type`

Define `type Timestamped = { createdAt: string; updatedAt: string }` and `type BlogPost = { title: string; body: string } & Timestamped`.

### 3. Union with `type` only

Try rewriting this as an `interface` — why doesn't it work?

```ts
type Result = { ok: true; value: number } | { ok: false; error: string };
```

<details>
<summary>Answers</summary>

**3.** Interfaces describe a single object shape. A union of two different shapes (`ok: true` vs `ok: false` with different fields) requires `type`, not `interface`.

</details>
