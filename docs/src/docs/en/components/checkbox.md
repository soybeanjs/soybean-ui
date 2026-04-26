# Checkbox

## Overview

A control that allows the user to select one or more items from a set.

## Usage

```vue
<script setup lang="ts">
import { SCheckbox } from '@soybeanjs/ui';

const checked = ref(false);
</script>

<template>
  <SCheckbox v-model="checked" label="Accept terms" />
</template>
```

> `SCheckboxGroup` and `SCheckboxCardGroup` now delegate list iteration and default checkbox/card composition to headless `CheckboxGroupCompact` and `CheckboxCardGroupCompact`. For unstyled, data-driven usage, import them from `@soybeanjs/headless/checkbox`.

## Demos

```playground
single
color
size
shape
icon
group
card
card-group
```

## API

<ComponentApi component="checkbox" />
