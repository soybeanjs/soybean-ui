# Label

## Overview

`SLabel` is a primitive component used to render accessible labels for form controls. It supports standard styled variants and integrates seamlessly with the design system.

## Usage

```vue
<script setup lang="ts">
import { SLabel, SInput } from '@soybeanjs/ui';
</script>

<template>
  <div class="grid gap-1.5">
    <SLabel htmlFor="email">Email</SLabel>
    <SInput id="email" type="email" placeholder="Email" />
  </div>
</template>
```

## API

<ComponentApi component="label" />
