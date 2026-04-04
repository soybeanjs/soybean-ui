---
description: 'Use when writing or refactoring TypeScript, JavaScript, or Vue files. Enforces import grouping and ordering for value imports and type imports. Keywords: import order, import sorting, import type, TypeScript, JavaScript, Vue.'
name: 'Import Order'
applyTo: '**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts,vue}'
---

# Import Order

Keep import statements grouped in this order:

- builtin
- external
- internal
- parent
- sibling
- index

## Group Details

### Builtin

Imports from Node.js built-in modules such as `fs`, `path`, and `node:path`.

### External

- Build tools and libraries related to the build process, such as `vite`, `vitest`, `unplugin-*`, webpack, rollup, and esbuild.
- Frameworks and framework ecosystems, such as:
  - Vue: `vue`, `@vue/*`, `vue-router`, `pinia`, `@vueuse/*`
  - Nuxt: `nuxt`, `@nuxt/*`
  - React: `react`, `react-dom`, `react-router`, `redux`, `@reduxjs/toolkit`, `@tanstack/react-query`, `@tanstack/react-table`
  - Next: `next`, `next/*`
  - Angular: `@angular/*`
- UI libraries and styling systems, such as `@soybeanjs/ui`, `@soybeanjs/*`, `ant-design`, `ant-design-vue`, `element-plus`, `material-ui`, `semi-design`, `tailwindcss`, `unocss`, and `@unocss/*`.
- Utility libraries such as `lodash`, `date-fns`, `axios`, and `es-toolkit`.

### Internal

Project-internal absolute imports, such as:

- `@/constants`
- `@/components`
- `@/composables`
- `@/shared`
- `@/styles`
- `@/types`
- any other `@/*` path alias import

### Parent

Imports from parent directories, such as `../foo` and `../../bar`.

- Within the parent group, sort farther paths above nearer paths.
- Example: `../../bar` should be placed above `../foo`.

### Sibling

Imports from sibling files in the same directory, such as `./shared`.

### Index

Imports from the current directory index, such as `./`.

## Type Imports

- Keep type-only imports adjacent to imports from the same module when both exist.
- For the same module, place the value import first and the `import type` line directly below it.
- Use `import type { Foo } from 'module'` for type-only imports.
- Keep the overall group ordering the same: builtin, external, internal, parent, sibling, index.
- Do not move a type import away from its matching module import just to build a separate type-only block.

Example:

```ts
import { computed } from 'vue';
import type { ComputedRef } from 'vue';
import { axios } from 'axios';
import type { Methods } from 'axios';
import { cn } from '@/theme';
import { mergeSlotVariants } from '../shared';
import type { ButtonProps } from './types';
```
