---
name: soybean-headless
description: Helps use @soybeanjs/headless in Vue apps, including choosing base primitives vs Compact components, composing custom-styled wrappers, using sub-path exports, and looking up headless component API summaries. Use when building custom-styled accessible components with @soybeanjs/headless or asking about Root/Trigger/Content primitives, Compact aggregations, locale registration, or accessibility behavior.
license: MIT
---

# SoybeanHeadless

Accessible, unstyled Vue 3 primitives from SoybeanUI.

## Quick start

- Use this skill when the user wants SoybeanUI logic and accessibility without the default styled layer.
- Load [REFERENCE.md](REFERENCE.md) for installation, sub-path exports, locale support, and styling boundaries.
- Load [references/composition.md](references/composition.md) for base primitives vs Compact components and how to style your own wrappers.
- Load [references/components.md](references/components.md) to browse component families.
- Then load the exact shared component reference files linked from that index.

## Available guidance

| File | Topics |
| --- | --- |
| [REFERENCE.md](REFERENCE.md) | Installation, sub-path exports, locale, docs routes, headless boundaries |
| [references/composition.md](references/composition.md) | Base primitives, Compact aggregations, custom styled wrappers, Ui injection |
| [references/components.md](references/components.md) | Shared component index for headless consumers |

## Loading files

- [ ] [REFERENCE.md](REFERENCE.md) first for setup or package-surface questions.
- [ ] [references/composition.md](references/composition.md) when the task is about composition patterns, `provide{Name}Ui`, or custom styling.
- [ ] [references/components.md](references/components.md) if you need to browse the available component families.
- [ ] Then load only the exact shared component reference files you need.

## Key concepts

| Concept | Description |
| --- | --- |
| Base primitives | Fine-grained parts such as `DialogRoot`, `DialogTrigger`, `DialogContent` |
| Compact components | Data-driven aggregates such as `AccordionCompact` and `TableCompact` |
| Sub-path exports | `@soybeanjs/headless/composables`, `shared`, `date`, `locale`, `types`, `namespaced` |
| Ui injection | Multi-slot wrappers can inject classes with `provide{Name}Ui(ui)` |
| Zero styles | Headless exports do not ship CSS; you bring your own styles |

## Basic patterns

```vue
<script setup>
import { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent } from '@soybeanjs/headless';
</script>

<template>
  <AccordionRoot>
    <AccordionItem value="item-1">
      <AccordionTrigger>Title</AccordionTrigger>
      <AccordionContent>Content</AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>
```

```vue
<script setup>
import { AccordionCompact } from '@soybeanjs/headless';

const items = [
  { value: 'item-1', title: 'Title', description: 'Content' }
];
</script>

<template>
  <AccordionCompact :items="items" />
</template>
```

## Notes

- Shared component reference files live under the `soybean-ui` skill because generated API summaries already include headless exports like `Root`, `Trigger`, `Content`, and `Compact` symbols.
- For ready-to-use styled components, use the `soybean-ui` skill instead.
