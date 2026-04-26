# Textarea

## Overview

Multi-line text input field. Supports auto-resizing and character count.

## Usage

```vue
<script setup lang="ts">
import { STextarea } from '@soybeanjs/ui';

const value = ref('');
</script>

<template>
  <STextarea v-model="value" placeholder="Type your message here." />
</template>
```

## Demos

```playground
base
autosize
clearable
disabled
counter
footer
```

## API

<ComponentApi component="textarea" />
