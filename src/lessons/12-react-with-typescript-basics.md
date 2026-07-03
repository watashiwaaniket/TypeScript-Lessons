# 12. Using TypeScript with React

## What

The three main things to type in React:

- **Props** — values passed from a parent
- **State** — internal component state
- **Events** — clicks, input changes, etc.

React UIs are built on state and data flow — typing these spots improves safety and clarity.

## Why

Types help prevent common mistakes:

- Wrong or missing props
- `useState` type mismatches
- Incorrect values from event handlers

## How

### 1. Type your props

```tsx
type UserCardProps = {
  name: string;
  age: number;
  isActive?: boolean;
};

function UserCard({ name, age, isActive = false }: UserCardProps) {
  return (
    <section>
      <h2>{name}</h2>
      <p>{age} years old</p>
      <p>{isActive ? "Active" : "Inactive"}</p>
    </section>
  );
}
```

`isActive?: boolean` makes the prop optional.

This uses **destructuring** in the parameter list — a pattern you'll see everywhere in React.

### 2. Type `useState`

```tsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState<number>(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

Inference often works from the initial value, but unions and `null` benefit from an explicit type:

```tsx
const [selectedId, setSelectedId] = useState<number | null>(null);
```

### 3. Type events

```tsx
import type { ChangeEvent } from "react";

function SearchBox() {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return <input type="text" onChange={onChange} />;
}
```

React exports event types. Typing the handler makes `event.target` safe to use.

## Summary

- React + TypeScript basics: type Props, State, and Events
- Define prop types first — it stabilizes component design
- Explicit `useState` and event types catch bugs early
