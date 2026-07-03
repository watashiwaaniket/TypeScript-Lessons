# 2. Type Annotations and Inference

## What

In TypeScript, there are two main ways to work with types:

- **Type annotations:** you write the type explicitly
- **Type inference:** TypeScript figures out the type from context

### Type annotations

```ts
const name: string = "Akane"; // explicitly string
```

### Type inference

```ts
const name = "Akane"; // inferred as string
```

## Why

Explicit type annotations make intent crystal clear. But writing them everywhere gets tedious — so when TypeScript can infer the type reliably, you can leave the annotation off (though inference doesn't always work).

## How

### 1. Annotate functions — it's good practice

Argument types usually can't be omitted. Return types often can, but annotating them is still helpful.

```ts
function greet(name: string): string {
  return `Hello, ${name}`;
}
```

Now a bad call like `greet(100)` is caught at compile time.

### 2. Let local variables be inferred when it's obvious

```ts
const userName = "Akane"; // inferred as string
const message = greet(userName); // inferred as string from greet's return type
```

When the intent is clear without an annotation, inference keeps the code readable.

### 3. Add annotations when inference falls short

```ts
const names: string[] = []; // [] alone doesn't tell TS you want string[]
names.push("Akane");
names.push(123); // can't push a number
```

Empty arrays and similar cases don't communicate your intent — annotate them.

## Summary

- Type annotations make types explicit
- Type inference reduces boilerplate when the type is obvious
- Use both: annotate when needed, infer when it's clear
