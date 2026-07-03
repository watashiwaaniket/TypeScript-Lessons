# 5. Narrowing

## What

**Narrowing** is how TypeScript makes a type more specific inside a conditional branch. It's essential when working with Union types.

For example, `string | number` doesn't let you safely use string-only or number-only operations until you narrow. You branch with `typeof` or similar checks, then TypeScript knows the exact type in each branch.

## Why

Unions are convenient but widen the type, which reduces safety. Narrowing brings it back down. Try hovering over variables in your editor inside and outside `if` blocks — you'll see the type change.

## How

### 1. Narrow with `typeof`

For non-literal unions like `string | number`, use `typeof` to check at runtime:

```ts
function formatValue(value: string | number): string {
  if (typeof value === "string") {
    // value is string here
    return value.toUpperCase(); // "akane" -> "AKANE"
  }
  // value is number here
  return value.toFixed(2); // 12.3 -> "12.30"
}
```

Inside the `if` block, `value` is `string`. After it, `value` is `number`. Hover in your editor to confirm — that's narrowing in action.

### 2. Narrow with `in`

The `in` operator checks whether an object has a given property key:

```ts
type Bird = { fly: () => void };
type Fish = { swim: () => void };

function move(animal: Bird | Fish): void {
  if ("fly" in animal) {
    // animal is Bird here
    animal.fly();
    return;
  }
  // animal is Fish here
  animal.swim();
}
```

Checking for a property also triggers narrowing.

### 3. Use discriminated unions

```ts
type FetchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };

function renderMessage(state: FetchState): string {
  switch (state.status) {
    case "idle":
      return "Waiting to start";
    case "loading":
      return "Loading...";
    case "success":
      return `Count: ${state.data.length}`; // data is available
    case "error":
      return `Error: ${state.message}`; // message is available
  }
}
```

Switching on `state.status` narrows the type. In the `success` case you get `data`; in `error` you get `message`. Autocomplete works. This pattern is especially handy in React state management.

### 4. Handle null / undefined (most important)

```ts
type Message = { content: string };

function logMessage(message: Message | null): void {
  if (message === null) return; // guard against null

  // message is Message here — null is ruled out
  console.log(message.content);
}
```

After the guard, `message` is no longer `null`. Hover to verify.

## Summary

- Narrowing is key to using Union types safely
- Start with `typeof`, `in`, and discriminated unions
- Especially powerful for React conditional rendering and API response handling
