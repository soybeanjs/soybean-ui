# Tags Input

## Overview

A composable multi-value input for adding, displaying, and removing tags, with support for object values, delimiter-based creation, and keyboard navigation.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { STagsInput, STagsInputInput, STagsInputItem, STagsInputItemDelete, STagsInputItemText } from '@soybeanjs/ui';

const tags = ref(['Vue', 'TypeScript']);
</script>

<template>
  <STagsInput v-model="tags">
    <template #default="{ modelValue }">
      <STagsInputItem v-for="tag in modelValue" :key="tag" :value="tag">
        <STagsInputItemText />
        <STagsInputItemDelete />
      </STagsInputItem>
      <STagsInputInput placeholder="Add a tag" aria-label="Add a tag" />
    </template>
  </STagsInput>
</template>
```

## Demo

```playground
basic
disabled
object-value
clear
```

## API

<ComponentApi component="tags-input" />
