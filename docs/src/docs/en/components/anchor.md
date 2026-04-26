# Anchor

## Overview

Anchor provides in-page navigation for long content sections and keeps the current section highlighted while scrolling.

When the active item changes while scrolling, the hash in the address bar is also synchronized. Scroll-driven updates always use `history.replaceState` to avoid creating excessive history entries.

If the current URL already contains a hash on initial render, Anchor will scroll to the matching section after mount. When a custom scroll container becomes available later, Anchor will re-sync once that container is ready.

> `SAnchor` now delegates recursive item rendering to headless `AnchorCompact`. The same six `ui` slots are available from both `SAnchor` and `@soybeanjs/headless/anchor`.

## Usage

```vue
<script setup lang="ts">
import { shallowRef } from 'vue';
import { SAnchor } from '@soybeanjs/ui';

const containerRef = shallowRef<HTMLElement>();

const items = [
  { href: '#overview', title: 'Overview' },
  { href: '#api', title: 'API' }
];

const getContainer = () => containerRef.value ?? window;
</script>

<template>
  <div class="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
    <SAnchor :items="items" :get-container="getContainer" />
    <div ref="containerRef" class="max-h-80 overflow-auto">
      <section id="overview" class="min-h-60">...</section>
      <section id="api" class="min-h-60">...</section>
    </div>
  </div>
</template>
```

## Demos

```playground
basic
color
size
sticky
custom-styling
```

## API

<ComponentApi component="anchor" />
