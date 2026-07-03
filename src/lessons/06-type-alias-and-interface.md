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
