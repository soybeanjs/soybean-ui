# Affix

## Overview

Affix keeps content pinned to the top or bottom edge of the viewport or a custom scroll container while the target area is scrolling.

> Note: In addition to SAffix, the headless layer also exports AffixCompact for the default placeholder/content structure, plus AffixRoot, AffixPlaceholder, AffixContent, and provideAffixUi for fully custom composition and style injection.

## Usage

```vue
<script setup lang="ts">
import { SAffix, SButton } from '@soybeanjs/ui';
</script>

<template>
  <SAffix :offset-top="24">
    <SButton>Back to top</SButton>
  </SAffix>
</template>
```

## Demos

```playground
basic
target
offset-bottom
custom-styling
```

## Affix API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class for the affixed content element' },
  { name: 'offsetTop', type: 'number', default: '0', description: 'Offset from the top edge before the content becomes affixed' },
  { name: 'offsetBottom', type: 'number', default: '-', description: 'Offset from the bottom edge before the content becomes affixed' },
  { name: 'target', type: 'AffixTarget', default: 'window', description: 'Scroll target to observe. Accepts a selector, element, window, or a function returning an element' },
  { name: 'ui', type: 'Partial<AffixUi>', default: '{}', description: 'Inject classes into the root, placeholder, and content elements' },
  { name: 'placeholderProps', type: 'AffixPlaceholderProps', default: '-', description: 'Native props forwarded to the placeholder element' },
  { name: 'contentProps', type: 'AffixContentProps', default: '-', description: 'Native props forwarded to the content element' },
]"/>

### Events

<DataTable preset="emits" :data="[
  { name: 'change', parameters: '(affixed: boolean) => void', description: 'Triggered when the affixed state changes' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ affixed: boolean }', description: 'Affixed content', required: true },
]"/>

### Types

<TypeTable :data="[
  {
    name: 'AffixTarget',
    description: 'Target type used to resolve the scroll container',
    fields: [
      { name: 'value', type: 'string | Window | HTMLElement | (() => HTMLElement)', description: 'Selector, window, element instance, or a function returning an element' },
    ],
  },
  {
    name: 'AffixUi',
    description: 'Custom classes for each Affix element',
    fields: [
      { name: 'root', type: 'ClassValue', description: 'Class for the root element' },
      { name: 'placeholder', type: 'ClassValue', description: 'Class for the placeholder element' },
      { name: 'content', type: 'ClassValue', description: 'Class for the content element' },
    ],
  }
]"/>

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
