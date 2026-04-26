# Input

## Overview

Displays a form input field or a component that looks like an input field. It supports standard input attributes, icons, and clearable functionality.

## Usage

```vue
<script setup lang="ts">
import { SInput } from '@soybeanjs/ui';

const value = ref('');
</script>

<template>
  <SInput v-model="value" placeholder="Type something..." />
</template>
```

## Demos

```playground
base
disabled
slot
clearable
```

## API

<ComponentApi component="input" />
