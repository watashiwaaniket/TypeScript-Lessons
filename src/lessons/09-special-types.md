# 9. unknown / any / never / void

## What

Four special types you'll run into often in TypeScript:

- **`unknown`:** type is unknown — you must verify before using it safely
- **`any`:** disables type checking (sometimes handy, generally avoid)
- **`never`:** a value that can never occur / code that never returns
- **`void`:** a function that doesn't return a meaningful value

They mean very different things — learn to tell them apart.

## Why

You'll encounter these regularly. Understanding the differences early saves confusion later.

## How

### 1. `unknown` — check before you use

```ts
function printLength(value: unknown): void {
  if (typeof value === "string") {
    console.log(value.length);
    return;
  }
  console.log("Not a string");
}
```

`unknown` is the safe choice. Until you narrow it, you can't access properties or call methods. Compare with `any` below — `any` lets you do anything, which is exactly the problem.

### 2. `any` — last resort only

```ts
let value: any = "hello";
value = 123;
value.notExistingMethod(); // no compile-time error
```

`any` is convenient but throws away TypeScript's benefits. Prefer `unknown` in learning and production. JavaScript was essentially an `any` world — scary in hindsight, right?

### 3. `void` — functions with no useful return value

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

`void` signals "this function doesn't return anything meaningful."

### 4. `never` — unreachable code

```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

Functions that always throw or loop forever have return type `never` — they never come back to the caller.

## Summary

- `unknown` — safely handle values of uncertain type
- `any` — disables checking; use sparingly
- `void` — no return value
- `never` — unreachable / never returns

## Exercises

### 1. `unknown` vs `any`

Why does `value.toUpperCase()` fail on `unknown` but not on `any`? Rewrite this safely using a `typeof` check:

```ts
function safeUpper(value: unknown): string {
  // narrow, then return uppercased string or "N/A"
}
```

### 2. Pick the return type

What return type fits each function?

```ts
function log(msg: string) { console.log(msg); }
function fail(msg: string) { throw new Error(msg); }
function loop(): never { while (true) {} }
```

### 3. Refactor away from `any`

```ts
function parseJson(raw: string): any {
  return JSON.parse(raw);
}
```

Change the return type to something safer. What trade-off do you accept?

<details>
<summary>Answers</summary>

**1.** `unknown` requires narrowing before use; `any` opts out of checking. Example: `if (typeof value === "string") return value.toUpperCase(); return "N/A";`

**2.** `log` → `void`, `fail` → `never`, `loop` → `never`.

**3.** `unknown` is the safer return type — callers must validate before using the parsed value.

</details>
