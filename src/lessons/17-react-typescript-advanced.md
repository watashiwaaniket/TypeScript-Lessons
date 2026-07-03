# 17. React + TypeScript Beyond the Basics

## What

Lesson 12 covered props, `useState`, and events. Real components also need:

- **`useRef`** — DOM nodes and mutable values that don't trigger re-renders
- **Custom hooks** — reusable stateful logic with typed return values
- **`children`** — typing slot content passed between components
- **Generic components** — one component, multiple data shapes

## Why

As components grow, typing gaps show up in hooks and composition — not just props. Getting these right prevents subtle bugs:

- Reading `.current` on the wrong ref type
- Untyped hook returns that drift from usage
- `children` accepted as `any` by accident

## How

### 1. `useRef` for DOM elements

```tsx
import { useRef } from "react";

function FocusableInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focus = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button type="button" onClick={focus}>Focus</button>
    </>
  );
}
```

`useRef<HTMLInputElement>(null)` — the ref's `.current` is `HTMLInputElement | null`. Use optional chaining when accessing it.

### 2. `useRef` for mutable values

```tsx
import { useRef, useEffect } from "react";

function useInterval(callback: () => void, delayMs: number) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const id = window.setInterval(() => callbackRef.current(), delayMs);
    return () => window.clearInterval(id);
  }, [delayMs]);
}
```

Here the ref holds a function, not a DOM node. The type is `useRef<() => void>(callback)`.

### 3. Typing `children`

```tsx
type CardProps = {
  title: string;
  children: React.ReactNode;
};

function Card({ title, children }: CardProps) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```

`React.ReactNode` accepts elements, strings, numbers, fragments, and `null`.

For stricter slots, narrow further:

```tsx
type LayoutProps = {
  sidebar: React.ReactElement;
  children: React.ReactNode;
};
```

### 4. Custom hooks with explicit return types

```tsx
import { useState, useCallback } from "react";

type Toggle = {
  on: boolean;
  toggle: () => void;
  setOn: (value: boolean) => void;
};

function useToggle(initial = false): Toggle {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn((v) => !v), []);
  return { on, toggle, setOn };
}
```

Naming the return type (`Toggle`) documents the hook contract and catches mistakes inside the hook.

### 5. Generic list component (intro)

```tsx
type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
};

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage — T is inferred as { id: number; name: string }
<List
  items={[{ id: 1, name: "Akane" }]}
  keyExtractor={(user) => String(user.id)}
  renderItem={(user) => user.name}
/>
```

`<T>` on the function makes the component generic. TypeScript infers `T` from `items`.

## Summary

- `useRef<ElementType>(null)` for DOM; other types for mutable non-render state
- `React.ReactNode` for flexible `children`
- Custom hooks benefit from explicit return types
- Generic components reuse markup while preserving item-level type safety

## Exercises

### 1. Autofocus on mount

Write a component with a text input that focuses itself on mount using `useRef` and `useEffect`.

### 2. `useCounter` hook

Implement `useCounter(initial?: number)` returning `{ count, increment, decrement, reset }` with a named return type.

### 3. Generic `Select`

Create `Select<T>` with props `options: T[]`, `getLabel: (item: T) => string`, and `onSelect: (item: T) => void`. Use it with `string[]` and with `{ id: number; title: string }[]`.

<details>
<summary>Answers</summary>

No single solution — verify refs are typed, hook return type is explicit, and `T` flows through `Select` without `any`.

</details>
