# Password

## Overview

A password input field with a toggle button to show/hide the password.

## Usage

```vue
<script setup lang="ts">
import { SPassword } from '@soybeanjs/ui';

const password = ref('');
</script>

<template>
  <SPassword v-model="password" placeholder="Enter password" />
</template>
```

## Demos

```playground
base
disabled
clearable
icon
```

## API

<ComponentApi component="password" />
