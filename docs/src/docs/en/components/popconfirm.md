# Popconfirm

## Overview

A confirmation box component based on Popover, used for lightweight secondary confirmation operations.

## Usage

```vue
<script setup lang="ts">
import { SPopconfirm, SButton } from '@soybeanjs/ui';

function handleConfirm() {
  console.log('Confirmed!');
}

function handleCancel() {
  console.log('Cancelled!');
}
</script>

<template>
  <SPopconfirm
    title="Delete Item?"
    description="This action cannot be undone. Are you sure you want to delete this item?"
    type="destructive"
    :before-confirm="handleConfirm"
    :before-cancel="handleCancel"
  >
    <template #trigger>
      <SButton color="destructive">Delete</SButton>
    </template>
  </SPopconfirm>
</template>
```

## Playground

```playground
base
```

## API

<ComponentApi component="popconfirm" />
