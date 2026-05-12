# Affix

Source URL: https://ui.soybeanjs.cn/components/affix
Markdown URL: https://ui.soybeanjs.cn/components/affix.md
Category: Data Display
Description: Affix keeps content pinned to the top or bottom edge of the viewport or a custom scroll container while the target area is scrolling.

## Overview

Affix keeps content pinned to the top or bottom edge of the viewport or a custom scroll container while the target area is scrolling.

> Note: In addition to SAffix, the headless layer also exports AffixCompact for the default placeholder/content structure, plus AffixRoot, AffixPlaceholder, AffixContent, and provideAffixUi for fully custom composition and style injection.

## Usage

Usage examples for affix are rendered on the site.

## Demos

Interactive demos for affix are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (5): Affix, AffixCompact, AffixContent, AffixPlaceholder, AffixRoot.

### Affix

#### Props
Properties for the Affix component.
- `class`: Additional class names to apply to the content element. (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<AffixUi>`; optional)
- `placeholderProps`: Properties forwarded to the placeholder element. (type `AffixPlaceholderProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `AffixContentProps`; optional)
- `offsetTop`: The offset from the top of the target container when the element becomes affixed. (type `number`; default `0`; optional)
- `offsetBottom`: The offset from the bottom of the target container when the element becomes affixed. (type `number`; optional)
- `target`: The element that Affix listens to for scroll position updates. (type `AffixTarget | null`; default `window`; optional)
#### Emits
Events for the Affix component.
- `change`: Emitted when change occurs. (type `[affixed: boolean]`; parameters `affixed: boolean`)

### AffixCompact

#### Props
Properties for the AffixCompact component.
- `placeholderProps`: Properties forwarded to the placeholder element. (type `AffixPlaceholderProps`; optional)
- `contentProps`: Properties forwarded to the content element. (type `AffixContentProps`; optional)
- `offsetTop`: The offset from the top of the target container when the element becomes affixed. (type `number`; default `0`; optional)
- `offsetBottom`: The offset from the bottom of the target container when the element becomes affixed. (type `number`; optional)
- `target`: The element that Affix listens to for scroll position updates. (type `AffixTarget | null`; default `window`; optional)
#### Emits
Events for the AffixCompact component.
- `change`: Emitted when change occurs. (type `[affixed: boolean]`; parameters `affixed: boolean`)

### AffixContent

- No documented props, emits, slots, or slot props were available.

### AffixPlaceholder

- No documented props, emits, slots, or slot props were available.

### AffixRoot

#### Props
Properties for the AffixRoot component.
- `offsetTop`: The offset from the top of the target container when the element becomes affixed. (type `number`; default `0`; optional)
- `offsetBottom`: The offset from the bottom of the target container when the element becomes affixed. (type `number`; optional)
- `target`: The element that Affix listens to for scroll position updates. (type `AffixTarget | null`; default `window`; optional)
#### Emits
Events for the AffixRoot component.
- `change`: Emitted when change occurs. (type `[affixed: boolean]`; parameters `affixed: boolean`)

## Headless Composition

When the default placeholder/content structure is enough, import `AffixCompact` from `@soybeanjs/headless/affix`. If you need separate control over the root, placeholder, and content elements, compose the headless primitives directly:

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { AffixContent, AffixPlaceholder, AffixRoot, provideAffixUi } from '@soybeanjs/headless';

const ui = computed(() => ({
  content: 'data-[state=fixed]:z-50'
}));

provideAffixUi(ui);
</script>

<template>
  <AffixRoot :offset-top="24">
    <AffixPlaceholder />
    <AffixContent>
      <button type="button">Back to top</button>
    </AffixContent>
  </AffixRoot>
</template>
```
