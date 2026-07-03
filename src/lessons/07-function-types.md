# 7. Function Types (args, return values, callbacks)

## What

A function type describes what arguments a function accepts and what it returns.

```ts
// This function has type (a: number, b: number) => number
function add(a: number, b: number): number {
  return a + b;
}
```

## Why

Functions are often exported and shared. Explicit types help callers understand the contract — how many arguments, what types, what comes back — which makes team development easier and reduces misuse.

## How

### 1. Annotate arguments and return values

```ts
function greet(name: string): string {
  return `Hello, ${name}`;
}
```

### 2. Optional and default arguments

```ts
function buildMessage(name: string, prefix = "Hi", suffix?: string): string {
  const base = `${prefix}, ${name}`;
  return suffix ? `${base} ${suffix}` : base;
}
```

- `suffix?: string` — optional (omitting it gives `undefined`)
- `prefix = "Hi"` — default value when not provided

### 3. Define types with function signatures

```ts
type Calculator = (a: number, b: number) => number;

function multiply(a: number, b: number): number {
  return a * b;
}

function someCalc(a: number, b: number, calc: Calculator): number {
  return calc(a, b); // calc is a function
}
```

Arrow syntax defines a function type — useful for callbacks:

```ts
type OnSuccess = (message: string) => void;

function runTask(onSuccess: OnSuccess): void {
  onSuccess("Done!");
}
```

## Summary

- Function types express a calling contract
- Typing arguments, return values, and callbacks improves safety
- Function signatures `(argTypes) => returnType` are especially important

## Exercises

### 1. Type a callback

Define `type FilterFn = (value: number) => boolean` and implement `filterNumbers(values: number[], fn: FilterFn): number[]` that returns only values where `fn` returns `true`.

### 2. Optional and default

Write `function createLabel(text: string, prefix?: string): string` that returns `prefix ? \`${prefix}: ${text}\` : text`. Call it with one argument and with two.

### 3. Match the signature

Which functions satisfy `type MathOp = (a: number, b: number) => number`?

```ts
const add = (a: number, b: number) => a + b;
const log = (a: number, b: number) => console.log(a + b);
const greet = (name: string) => `Hi, ${name}`;
```

<details>
<summary>Answers</summary>

**3.** Only `add`. `log` returns `void`, not `number`. `greet` has the wrong parameter type and return type.

</details>
