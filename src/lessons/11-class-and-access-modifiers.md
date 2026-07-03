# 11. Classes and Access Modifiers

This lesson is brief — `class` is used less often in modern JS/TS. Feel free to skim (save OOP deep-dives for Java or similar).

## What

TypeScript adds type information to JavaScript's `class` syntax. **Access modifiers** control who can read or write each member:

- `public` — accessible everywhere (default)
- `private` — only inside the class
- `protected` — inside the class and subclasses
- `readonly` — can't be reassigned after initialization

## Why

Access control helps **encapsulation** — protecting state from unintended changes:

- Hide values that shouldn't be mutated from outside
- Route all changes through specific methods

## How

### 1. Basic class definition

```ts
class User {
  public name: string;
  private loginCount: number;

  constructor(name: string) {
    this.name = name;
    this.loginCount = 0;
  }

  public login(): void {
    this.loginCount += 1;
  }

  public getLoginCount(): number {
    return this.loginCount;
  }
}
```

`loginCount` is `private`, so code outside the class can't change it directly.

### 2. Use `readonly`

```ts
class Lesson {
  public readonly id: number;
  public title: string;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }
}
```

`id` is set at construction and can't be changed afterward.

### 3. `protected` and inheritance

```ts
class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Dog extends Animal {
  bark(): string {
    return `${this.name} barked`; // accessible in subclass
  }
}
```

`protected` means hidden from the outside world but available to subclasses.

## Summary

- Classes bundle data and behavior
- Access modifiers control what can be changed and from where
- `private`, `protected`, and `readonly` help you build safer designs

## Exercises

### 1. Encapsulate a counter

Create a `Counter` class with:

- `private count: number` (starts at 0)
- `increment(): void`
- `getValue(): number`

Verify that `counter.count` is not accessible from outside the class.

### 2. `readonly` id

Add a `readonly id: string` set in the constructor. Try reassigning `id` after construction — what error appears?

### 3. `protected` in a subclass

Extend the `Animal` / `Dog` example from the lesson with a `Cat` class that uses `this.name` in a `meow()` method.

<details>
<summary>Answers</summary>

**1–3.** If your editor shows errors on invalid access and none on valid usage, you've got it.

</details>
