# Autocomplete

## Overview

Autocomplete filters suggestion items from text input and quickly fills the input with a selected result.

## Usage

```vue
<script setup lang="ts">
import { SAutocomplete } from '@soybeanjs/ui';

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' }
];
</script>

<template>
  <SAutocomplete :items="items" placeholder="Search a fruit" />
</template>
```

> `SAutocomplete` now delegates its filtering and option aggregation to headless `AutocompleteCompact`. For unstyled, data-driven composition, import `AutocompleteCompact` from `@soybeanjs/headless/autocomplete`.

## Demos

```playground
basic
grouped
open-on-focus
disabled
custom-styling
```

## API

<ComponentApi component="autocomplete" />
