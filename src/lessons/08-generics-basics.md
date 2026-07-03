# 8. Generics Basics

## What

**Generics** let you treat types like parameters. Use them when the logic is the same but the data type should change.

```ts
function identity<T>(value: T): T {
  return value;
}
```

`T` is a type variable — the concrete type is chosen when you call the function.

## Why

Generics give you reusability **and** type safety. You can write generic functions without falling back to `any` and losing type information.

## How

### 1. Write a generic function

```ts
function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}

const firstNumber = firstItem([10, 20, 30]); // number | undefined
const firstText = firstItem(["a", "b", "c"]); // string | undefined
```

`T` is inferred automatically. For `firstNumber`, `T = number`; for `firstText`, `T = string`. Once `T` is known, the return type follows — and so does the variable's inferred type.

### 2. Use multiple type parameters

```ts
function pair<K, V>(key: K, value: V): { key: K; value: V } {
  return { key, value };
}

const item = pair("id", 1001); // { key: string; value: number }
```

### 3. Define generic types

```ts
type ApiResponse<T> = {
  data: T;
  message: string;
};

type User = {
  id: number;
  name: string;
};

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Akane" },
  message: "ok",
};
```

The response wrapper is shared; `T` specializes it for `User`.

### 4. Add constraints with `extends`

```ts
function printLength<T extends { length: number }>(value: T): void {
  console.log(value.length);
}
```

`extends` restricts `T` to types that have a `length` property.

## Summary

- Generics treat types as parameters
- They balance reuse and type safety
- Start with generic functions and generic types — they'll come up constantly
