---
title: Installation
---

# Installation

SoybeanUI offers two ways to add components to your project. Choose the one that fits your workflow.

## Comparison

|                   | npm Package                             | CLI (sbean)                                          |
| ----------------- | --------------------------------------- | ---------------------------------------------------- |
| **How it works**  | Install `@soybeanjs/ui` as a dependency | Copy source code into your project                   |
| **Customization** | Configure via props and CSS variables   | Full source control — edit any file                  |
| **Updates**       | `pnpm update` pulls latest              | `sbean diff` shows changes, you choose what to merge |
| **Bundle size**   | Tree-shaking removes unused components  | Only the components you add exist in your project    |
| **Best for**      | Quick prototyping, standard setups      | Custom design systems, full control                  |
| **Setup**         | `pnpm add @soybeanjs/ui`                | `npx sbean init && npx sbean add button`             |

## npm Package (Recommended for most projects)

Install the styled component library with a single command:

```bash
pnpm add @soybeanjs/ui
```

Import styles:

```ts
import '@soybeanjs/ui/styles.css';
```

Import components directly from the package:

```vue
<script setup lang="ts">
import { SButton } from '@soybeanjs/ui';
</script>

<template>
  <SButton>Click me</SButton>
</template>
```

### Optional: Auto-import with unplugin-vue-components

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite';
import { SbeanResolver } from '@soybeanjs/ui/resolver';

export default defineConfig({
  plugins: [
    Components({
      resolvers: [SbeanResolver()]
    })
  ]
});
```

Now you can use components without importing them:

```vue
<template>
  <SButton>Click me</SButton>
  <!-- auto-imported -->
</template>
```

## CLI — Copy-Paste (shadcn-style)

Prefer full control over your component source code? Use the `sbean` CLI to copy components directly into your project.

### 1. Initialize

```bash
npx sbean init
```

This creates an `sbean.json` config file and sets up UnoCSS with the correct aliases.

### 2. Add Components

```bash
npx sbean add button
```

The component source files are copied to your project:

```
src/ui/
├── components/
│   └── button/
│       ├── button.vue
│       ├── index.ts
│       └── types.ts
├── styles/
│   └── button.ts
└── theme/
    └── index.ts
```

### 3. Use Components

All components use the `#ui` import alias:

```vue
<script setup lang="ts">
import SButton from '#ui/components/button';
</script>
```

### 4. Update Components

```bash
# See what changed
npx sbean diff button

# Update to latest
npx sbean add button --overwrite
```

### CLI Reference

See the [CLI documentation](/sbean) for a complete command reference.

## Next Steps

- [Quick Start](/overview/quick-start) — set up your project from scratch
- [Theming](/overview/theming) — customize colors, fonts, and sizes
- [Components](/components) — browse all available components
