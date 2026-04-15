<p align="center">
  <a href="https://github.com/soybeanjs/soybean-ui">
    <img src="./public/logo.svg" alt="Logo" width="150" />
  </a>
</p>

# SoybeanUI

English | [中文](./README.zh-CN.md)

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![github stars](https://img.shields.io/github/stars/soybeanjs/soybean-ui)](https://github.com/soybeanjs/soybean-ui)

SoybeanUI is an elegant, modern, accessible and high-quality UI component library with shadcn-like design for Vue 3, built on top of a robust headless foundation. It provides a comprehensive set of accessible, customizable, and performant components.

## 📚 Architecture

SoybeanUI is built on a strict **two-layer separation** model:

```
┌─────────────────────────────────────────┐
│           @soybeanjs/ui (src/)          │
│  S-prefixed components   (SButton…)     │
│  UnoCSS classes · tailwind-variants     │
│  provideXUi(ui)  ──────────────────┐    │
└────────────────────────────────────┼────┘
                                     │ style injection
┌────────────────────────────────────▼────┐
│        @soybeanjs/headless (headless/)  │
│  Logic · State · A11y · Keyboard nav    │
│  useUiContext() reads injected classes  │
│  Zero styles — works with any CSS       │
└─────────────────────────────────────────┘
```

### Packages

| Package                 | Role                              | Components                    |
| ----------------------- | --------------------------------- | ----------------------------- |
| **@soybeanjs/headless** | Logic, state, a11y. Zero styles.  | 50 primitives, 26 composables |
| **@soybeanjs/ui**       | Styled wrappers. UnoCSS + `tv()`. | 48 `S`-prefixed components    |

**Data flow is strictly one-way**: `headless` → `src`. The styled layer never imports from headless's internals — it injects style tokens via `provideXUi(computedUi)` which headless components read through `useUiContext()`.

Some multi-slot headless components also expose `Compact` aggregators, such as `AccordionCompact` and `TableCompact`. They keep item iteration and default content/icon composition inside headless, while the UI layer stays focused on styling and prop forwarding.

### Style Injection

Every multi-slot headless component exposes a `provide{Name}Ui` function. The styled wrapper computes classes using `tailwind-variants` and injects them:

```ts
// In the styled wrapper (src/)
const ui = computed(() =>
  mergeSlotVariants(
    accordionVariants({ size: props.size }), // tv() output
    props.ui, // user overrides
    { root: props.class } // class prop
  )
);
provideAccordionUi(ui); // headless reads this via useAccordionUi()
```

### Theme System

- **`ThemeColor`** — 8 semantic colors: `primary` · `destructive` · `success` · `warning` · `info` · `carbon` · `secondary` · `accent`
- **`ThemeSize`** — 6 sizes: `xs` · `sm` · `md` · `lg` · `xl` · `2xl` (base 16px at `md`)
- **`ConfigProvider`** — sets global `dir`, `locale`, `nonce`, and default `tooltip` config for the entire component tree
- **`cn()`** — Tailwind-aware class merge (`clsx` + `tailwind-merge`), used for conflict-free class composition

### Package Exports

**@soybeanjs/headless** ships fine-grained sub-paths:

```ts
import { AccordionRoot } from '@soybeanjs/headless'; // all components
import { useControllableState } from '@soybeanjs/headless/composables'; // 26 composables
import { transformPropsToContext } from '@soybeanjs/headless/shared'; // pure TS utils
import * as Headless from '@soybeanjs/headless/namespaced'; // namespace object
import type { AccordionUiSlot } from '@soybeanjs/headless/accordion'; // per-component
```

**@soybeanjs/ui** exports:

```ts
import { SButton, SAccordion } from '@soybeanjs/ui'; // all components
import '@soybeanjs/ui/styles.css'; // pre-built UnoCSS stylesheet
// Also: @soybeanjs/ui/nuxt · @soybeanjs/ui/resolver
```

## 📦 Installation

### Using the Styled UI Library (Recommended)

If you want ready-to-use components with a modern design:

```bash
pnpm add @soybeanjs/ui
```

### Using the Headless Library

If you want to build your own design system from scratch:

```bash
pnpm add @soybeanjs/headless
```

## 🚀 Usage

### @soybeanjs/ui

1. **Import Styles**

   Import the CSS file in your main entry file (e.g., `main.ts`):

```ts
import '@soybeanjs/ui/styles.css';
```

2. **Global Registration (Optional)**

   You can register components globally or import them on demand.

3. **On-demand Import (Recommended)**

   We recommend using `unplugin-vue-components` for auto-importing components.

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite';
import UiResolver from '@soybeanjs/ui/resolver';

export default defineConfig({
  plugins: [
    Components({
      resolvers: [UiResolver()]
    })
  ]
});
```

4. **Nuxt Module**

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@soybeanjs/ui/nuxt']
});
```

### @soybeanjs/headless

The headless components provide the functionality without the styles.

For data-driven multi-slot patterns, prefer the exported `Compact` variant when it exists. It is the headless entry point for opinionated composition, while the regular parts remain available for fully manual assembly.

```vue
<script setup>
import { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent } from '@soybeanjs/headless';
</script>

<template>
  <AccordionRoot>
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>
```

## ✨ Features

- **Accessible**: Follows WAI-ARIA patterns for roles, focus management, and keyboard navigation.
- **Headless-first**: Logic and styles are fully separated — use `@soybeanjs/headless` alone to build any design system.
- **Type Safe**: Written in strict TypeScript. All props, emits, slots, and context values are typed.
- **Customizable at every level**: Override individual slot classes via the `ui` prop, or swap the entire style layer.
- **Lightweight & Tree-shakable**: Import only the components you use. Each component is individually tree-shakable.
- **Nuxt ready**: First-class Nuxt module with auto-registration (`@soybeanjs/ui/nuxt`).
- **unplugin support**: Auto-import resolver for `unplugin-vue-components` (`@soybeanjs/ui/resolver`).

## 💝 Credits

- [reka-ui](https://github.com/unovue/reka-ui)
- [oku-ui](https://github.com/oku-ui/primitives)
- [shadcn-vue](https://github.com/unovue/shadcn-vue)
- [shadcn/ui](https://github.com/shadcn/ui)
- [nuxt-ui](https://github.com/nuxt/ui)
- [unocss](https://github.com/unocss/unocss)
