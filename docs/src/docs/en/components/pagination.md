# Pagination

## Overview

Pagination is used for splitting up content or data into several pages, with a control for navigating to the next or previous page.

## Usage

```vue
<script setup lang="ts">
import { SPagination } from '@soybeanjs/ui';

const page = ref(1);
</script>

<template>
  <SPagination v-model:page="page" :total="100" :items-per-page="10" />
</template>
```

## Demos

```playground
variant
size
shape
slot
action
show
```

## API

<ComponentApi component="pagination" />
