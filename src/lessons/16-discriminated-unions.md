# 16. Discriminated Unions in Depth

## What

A **discriminated union** (also called a **tagged union**) is a union of object types that share a common literal field — the **discriminant** — used to tell variants apart.

```ts
type Result =
  | { status: "ok"; data: string }
  | { status: "error"; message: string };
```

Switching on `status` tells TypeScript which other fields exist.

## Why

Lesson 5 introduced narrowing with discriminated unions. In real apps they show up everywhere:

- Fetch/async state (`idle` | `loading` | `success` | `error`)
- Form validation (field-level errors)
- Payment flows, modals, wizards

The payoff: **impossible states become type errors**. You can't read `data` while `status` is `"error"` — TypeScript won't let you.

## How

### 1. Design the discriminant

Pick one field with literal values — usually `status`, `type`, or `kind`:

```ts
type ModalState =
  | { type: "closed" }
  | { type: "confirm"; message: string; onConfirm: () => void }
  | { type: "alert"; message: string };
```

### 2. Narrow with `switch`

```ts
function renderModal(state: ModalState): string {
  switch (state.type) {
    case "closed":
      return "";
    case "confirm":
      return `Confirm: ${state.message}`;
    case "alert":
      return `Alert: ${state.message}`;
  }
}
```

Inside each `case`, only the fields for that variant are available.

### 3. Exhaustiveness checking

Add a `default` branch that assigns to `never` to catch missing cases:

```ts
function renderModal(state: ModalState): string {
  switch (state.type) {
    case "closed":
      return "";
    case "confirm":
      return `Confirm: ${state.message}`;
    case "alert":
      return `Alert: ${state.message}`;
    default: {
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
}
```

If you add a new variant to `ModalState` but forget a `case`, TypeScript errors on `const _exhaustive: never = state`.

### 4. React example

```tsx
type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

function DataView({ state }: { state: AsyncState<string[]> }) {
  switch (state.status) {
    case "idle":
      return <p>Press load to start</p>;
    case "loading":
      return <p>Loading…</p>;
    case "success":
      return <ul>{state.data.map((item) => <li key={item}>{item}</li>)}</ul>;
    case "error":
      return <p role="alert">{state.error}</p>;
  }
}
```

No optional chaining on `data` or `error` — the discriminant guarantees they exist in the right branch.

## Summary

- Share a literal discriminant field across all variants
- Use `switch` for clear, exhaustive handling
- The `never` exhaustiveness trick catches forgotten cases at compile time
- Prefer discriminated unions over boolean flags like `isLoading` + `error` + `data` separately

## Exercises

### 1. Payment state machine

Model `PaymentState` with variants: `idle`, `processing`, `succeeded` (with `receiptId: string`), and `failed` (with `reason: string`). Write a `describePayment(state: PaymentState): string` function.

### 2. Find the bug

Why is this unsafe even with a union?

```ts
type State =
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };

function getCount(state: State): number {
  if (state.status === "success") return state.data.length;
  return state.message.length;
}
```

What happens if someone later adds a third variant and forgets to update this function?

### 3. Add exhaustiveness

Take your `describePayment` function and add a `default` branch with `never`. Add a new variant to `PaymentState` and confirm TypeScript flags the missing `case`.

<details>
<summary>Answers</summary>

**2.** It works today, but without exhaustiveness checking a new variant would fall through silently. The `never` default pattern turns that into a compile error.

</details>
