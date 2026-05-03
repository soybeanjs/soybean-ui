# Affix

## Overview

Affix keeps content pinned to the top or bottom edge of the viewport or a custom scroll container while the target area is scrolling.

> Note: In addition to SAffix, the headless layer also exports AffixCompact for the default placeholder/content structure, plus AffixRoot, AffixPlaceholder, AffixContent, and provideAffixUi for fully custom composition and style injection.

## Usage

<UsageCode component="affix" />

## Demos

<PlaygroundGallery component="affix" />

## API

<ComponentApi component="affix" />

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
