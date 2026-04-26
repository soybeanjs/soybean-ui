# Switch

## Overview

A control that allows the user to toggle between checked and not checked.

## Usage

```vue
<script setup lang="ts">
import { SSwitch } from '@soybeanjs/ui';

const checked = ref(false);
</script>

<template>
  <SSwitch v-model="checked" />
</template>
```

## Demos

```playground
base
size
shape
slot
```

## API

<ComponentApi component="switch" />
