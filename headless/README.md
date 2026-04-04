# @soybeanjs/headless

English | [中文](./README.zh-CN.md)

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![github stars](https://img.shields.io/github/stars/soybeanjs/soybean-ui)](https://github.com/soybeanjs/soybean-ui)

A collection of unstyled, accessible UI primitives for Vue 3.

## 📖 Introduction

`@soybeanjs/headless` provides the core logic and accessibility features for UI components, without any styles. It is designed for developers who want to build their own design systems with full control over the visual appearance.

## 📦 Installation

```bash
pnpm add @soybeanjs/headless
```

## 🚀 Usage

Import the components and compose them to build your UI.

```vue
<script setup>
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@soybeanjs/headless';
</script>

<template>
  <DialogRoot>
    <DialogTrigger>Open Dialog</DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 bg-black/50" />
      <DialogContent class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md">
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>Make changes to your profile here.</DialogDescription>
        <DialogClose>Save changes</DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
```

## ✨ Features

- **Unstyled**: No CSS included. You bring your own styles.
- **Accessible**: Handles WAI-ARIA roles, focus management, and keyboard navigation.
- **Composable**: Components are designed to be composed together.
- **Vue 3**: Built for Vue 3 using Composition API.

## 📚 Package Structure

```
headless/src/
├── components/    # 50 primitives (accordion, dialog, select…)
├── composables/   # 26 shared hooks (state, focus, floating, selection…)
├── shared/        # Pure TS utilities (DOM, focus, tree, form, guard)
├── constants/     # ARIA attributes, component keys
├── types/         # Global types (ClassValue, UiClass, PropsToContext…)
└── index.ts        # Main barrel export
```

### Sub-path Exports

```ts
import { AccordionRoot } from '@soybeanjs/headless'; // components + types
import { useControllableState } from '@soybeanjs/headless/composables'; // 26 composables
import { transformPropsToContext } from '@soybeanjs/headless/shared'; // pure TS utils
import * as H from '@soybeanjs/headless/namespaced'; // namespace object
import type { AccordionUiSlot } from '@soybeanjs/headless/accordion'; // per-component
```

## 🧩 Composables

26 hooks organized by category:

| Category      | Composables                                                    |
| ------------- | -------------------------------------------------------------- |
| **State**     | `useContext`, `useControllableState`, `useStateMachine`        |
| **Focus**     | `useFocusScope`, `useFocusGuards`, `useArrowNavigation`        |
| **Layer**     | `useDismissableLayer`, `useEscapeKeyDown`, `useBodyScrollLock` |
| **Floating**  | `useFloating`, `useGraceArea`, `usePopupEvents`                |
| **DOM**       | `useForwardElement`, `useExposedElement`, `useHideOthers`      |
| **Selection** | `useSelection`, `useCollection`, `useTypeahead`                |
| **Bridge**    | `useUiContext`, `useOmitProps`, `useForwardListeners`          |

## 🎨 Integrating Your Own Styled Layer

Every multi-slot component provides a `provide{Name}Ui` function. Call it at the top of your styled wrapper and pass a computed class map:

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { AccordionRoot, provideAccordionUi } from '@soybeanjs/headless';

const props = defineProps<{ size?: 'sm' | 'md' | 'lg' }>();

// Compute your own classes however you like (CSS modules, CVA, tv(), etc.)
const ui = computed(() => ({
  root: 'space-y-1',
  item: 'border rounded-md',
  trigger: `flex w-full items-center py-3 px-4 font-medium ${props.size === 'lg' ? 'text-lg' : 'text-sm'}`,
  content: 'px-4 pb-3 text-sm',
  header: 'flex',
  description: ''
}));

provideAccordionUi(ui);
</script>

<template>
  <AccordionRoot v-bind="$props">
    <slot />
  </AccordionRoot>
</template>
```

For single-element components (like `Button`), there is no UiContext — apply your classes directly via `:class`.

## 📖 Documentation

For full documentation and styled components, visit the [SoybeanUI repository](https://github.com/soybeanjs/soybean-ui).

## 💝 Credits

- [reka-ui](https://github.com/unovue/reka-ui)
- [oku-ui](https://github.com/oku-ui/primitives)
