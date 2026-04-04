---
description: 'Use when writing or refactoring TypeScript or Vue script code. Enforces functional programming style, concise code, low mutation, precise types, and readable small functions. Keywords: TypeScript, TS, functional programming, FP, concise code, refactor, composable, pure function.'
name: 'TypeScript Functional Style'
applyTo: '**/*.{ts,tsx,mts,cts,vue}'
---

# TypeScript Functional Style

Use these rules when creating or modifying TypeScript code in this workspace.

## Goals

- Prefer functions, composables, and data transformation over classes and mutable state.
- Keep code small, explicit, and easy to scan.
- Optimize for clarity first; do not force clever FP patterns when a direct implementation is easier to read.

## Core Rules

- Prefer pure functions when logic does not need framework lifecycle or I/O.
- When extracting a pure function, place business-specific helpers in a same-level `shared.ts`; place reusable generic helpers in the project's shared directories such as `headless/src/shared/` or other existing global shared locations.
- Prefer composition over inheritance; avoid classes unless the platform or an external API requires them.
- Keep functions focused on one job. Split code when a function mixes parsing, branching, mutation, and formatting.
- Prefer guard clauses and early return over deep nesting.
- Prefer `map`, `filter`, `find`, `some`, `every`, and small reducers over imperative loops when they improve readability.
- Avoid shared mutable state. Prefer derived values and immutable updates.
- Local mutation is acceptable only when it stays tightly scoped and is clearly simpler than the immutable alternative.
- Exported functions and public utilities should have precise parameter and return types.
- Do not use `any`, broad casts, or type assertions to skip modeling the data correctly.
- Avoid temporary variables that only rename an expression once. Extract a named helper only when it clarifies intent or removes duplication.
- Keep branching shallow. If conditional logic grows beyond a couple of cases, extract helpers with descriptive names.

## Vue-Specific Guidance

- Put derived state in `computed` instead of duplicating it in refs.
- Keep composables focused and side effects isolated.
- Move pure transformation logic out of SFC bodies into small helpers when it improves testability and readability.
- If the extracted helper only serves the current component or business module, keep it in a same-level `shared.ts` next to that module.
- If the extracted helper is broadly reusable, move it to an existing global shared directory instead of duplicating local helpers.
- Do not introduce watchers where a computed value or direct event flow is sufficient.

## Import Order

- Keep import statements ordered according to [.github/instructions/import-order.instructions.md](.github/instructions/import-order.instructions.md).
- Order value imports first as: builtin, external, internal, parent, sibling, index.
- Within the parent group, place farther parent paths above nearer ones, such as `../../bar` above `../foo`.
- When a module has both value imports and type-only imports, place the `import type` line directly below the value import from the same module.
- Use `import type` for type-only imports.
- Keep the overall module grouping order unchanged even when mixing value imports and adjacent type imports.

## Preferred Shape

```ts
export function resolveSelectedKeys(items: Item[], activeId: string | null): string[] {
  if (!activeId) {
    return [];
  }

  return items.filter(item => item.enabled && item.parentId === activeId).map(item => item.key);
}
```

## Avoid

```ts
export function resolveSelectedKeys(items: Item[], activeId: string | null) {
  const result: string[] = [];

  if (activeId) {
    for (const item of items) {
      if (item.enabled) {
        if (item.parentId === activeId) {
          result.push(item.key);
        }
      }
    }
  }

  return result;
}
```

## Review Heuristics

- Can this be expressed as a pure helper?
- If extracted, should it live in a local `shared.ts` or a global shared directory?
- Can nesting be replaced by a guard clause?
- Is there duplicated state that can be derived?
- Are imports ordered according to [.github/instructions/import-order.instructions.md](.github/instructions/import-order.instructions.md)?
- Is the type signature explicit enough for future callers?
- Is the shorter version still easier to understand?
