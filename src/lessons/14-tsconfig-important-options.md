# 14. Important tsconfig Options

## What

`tsconfig.json` controls how the TypeScript compiler behaves. These three options define how strict type checking is:

- `strict`
- `noImplicitAny`
- `strictNullChecks`

## Why

Vague `tsconfig` settings mean the same code can pass or fail depending on the project. Aligning on a baseline early keeps the team experience consistent:

- Same strictness level everywhere
- Fewer implicit `any` and null-related bugs
- CI enforces the same rules mechanically

## How

### 1. Enable `strict`

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

`strict: true` turns on a bundle of strict checks. Start here, then tune individual flags if needed.

### 2. Understand `noImplicitAny`

```json
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}
```

Prevents places where TypeScript would silently fall back to `any`. Catches missing type information early.

### 3. Understand `strictNullChecks`

```json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

Forces explicit handling of `null` and `undefined`, reducing "accessing something that doesn't exist" bugs. Enabling `strict: true` also enables this.

### 4. Minimal example

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "strict": true,
    "noImplicitAny": true
  }
}
```

## Summary

- Start with `strict`, `noImplicitAny`, and `strictNullChecks`
- Build deeper understanding of other options over time

## Exercises

### 1. What does `strict` enable?

Look up (or toggle) what `strict: true` turns on besides `strictNullChecks` and `noImplicitAny`. Name two other flags it includes.

### 2. Predict with `strictNullChecks`

With `strictNullChecks: true`, which lines error?

```ts
let name: string = null;
function greet(user: { name: string } | null) {
  console.log(user.name);
}
```

### 3. Fix the null access

Rewrite `greet` so it safely handles `null` — either return early or provide a fallback string.

<details>
<summary>Answers</summary>

**1.** Examples: `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `noImplicitThis`, `alwaysStrict`, `useUnknownInCatchVariables`.

**2.** Both lines error — `null` isn't assignable to `string`, and `user` may be `null`.

**3.** Example: `if (user === null) return; console.log(user.name);`

</details>
