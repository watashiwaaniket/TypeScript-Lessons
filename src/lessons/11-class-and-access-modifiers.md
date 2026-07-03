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
