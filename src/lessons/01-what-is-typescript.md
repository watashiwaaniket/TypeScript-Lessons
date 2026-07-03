# 1. What is TypeScript?

## What

TypeScript is JavaScript with a type system layered on top.

### What is a type?

A type describes what kind of data a value represents. For example, `"Akane"` is a string (`string`) and `29` is a number (`number`).

**What types give you:**

- Readers can immediately understand what a variable is meant to hold.
- Your editor understands what a variable can contain and helps you along the way.
- Assigning the wrong kind of value produces an error.

```ts
const userName: string = "Akane";
const age: number = 29;
```

### Static types vs dynamic types

JavaScript is dynamically typed. Type problems may only surface when the code actually runs.

```ts
let user: User = { name: "Akane" };
// ...
user = null;
// ...
console.log(user.name); // user is null! Runtime error!
```

TypeScript performs static type checking, so many problems are caught before execution.

```ts
let user: User = { name: "Akane" };
// ...
user = null; // You can't assign null to user in the first place
// ...
console.log(user.name);
```

- **Dynamic typing:** types (data representations) are determined and validated at runtime.
- **Static typing:** possible values are known during development; consistency is checked at build time.

These are fundamentally different ideas:

- **Dynamic types:** runtime information about how data is represented.
- **Static types:** possible values tracked during development — they do not exist at runtime.

Think of TypeScript as something that exists **while you write code** to improve safety, not as something that runs in the browser.

### What is transpilation?

Transpilation converts TypeScript code into JavaScript. Browsers cannot run TypeScript directly, so this step is required for frontend work.

The flow looks like this:

1. Write `.ts` files
2. `tsc` or Vite converts them to `.js`
3. The resulting `.js` runs in the browser

In the end, what actually executes is JavaScript.

## Why

The main reason to use types in TypeScript is to catch bugs **before** you run the code.

### Catch bugs earlier with types

Mixing up operations that only make sense for numbers vs strings happens all the time.

In JavaScript, you may not see an error until runtime — on a user's screen. That's a bad outcome.

TypeScript can flag the problem ahead of time:

```ts
const total: number = 100;
total.toUpperCase(); // Property 'toUpperCase' does not exist on type 'number'
```

As codebases grow, small mistakes compound and become harder to spot. Automated checks for inconsistencies are a huge help.

### Can't dynamic typing do this?

Not in the same way. The difference in how bugs are found:

- **JavaScript:** mostly through tests and runtime behavior
- **TypeScript:** additionally while editing, saving, and building

Dynamic typing tends to delay discovery of breakage as projects scale. TypeScript reduces that delay.

### Benefits beyond error detection

Static types help with more than catching mistakes:

- Stronger autocomplete (property suggestions, argument hints)
- Function signatures act as living documentation
- Easier to trace impact during refactors
- Safer collaboration in teams

The result: code that not only works, but stays maintainable over time.

## How

The minimal workflow is three steps:

1. Write `.ts` files
2. Run `tsc` for type checking and/or compilation
3. Execute the output `.js`

### What is tsc?

`tsc` is the TypeScript Compiler — the official compiler from the TypeScript team. Its two main jobs:

- Perform type checking
- Emit JavaScript when needed

Through `tsconfig.json`, you can control how strict the checks are (`strict`, etc.).

### Type-check only

```bash
npm exec tsc --noEmit
```

With `--noEmit`, no JavaScript files are written — only type checking runs. Handy while learning or in CI.

### Vite handles transpilation, but…

When using Vite, transpilation happens automatically during dev. For a thorough project-wide check, running `tsc --noEmit` separately is still the safer approach.

- **During development:** rely on Vite for fast feedback
- **For quality checks:** run `tsc --noEmit` across the whole project

Using both keeps speed and safety in balance.

### Tired of typing commands?

Add a script to `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "typecheck": "tsc --noEmit"
  }
}
```

Then run:

```bash
npm run typecheck
```

## Summary

- TypeScript adds a type system to JavaScript
- Types describe data kinds and help prevent unintended values
- `tsc` handles type checking and compilation
- `tsc --noEmit` is especially useful for final verification
