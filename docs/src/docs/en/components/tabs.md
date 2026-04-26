# Tabs

## Overview

A set of layered sections of content—known as tab panels—that are displayed one at a time.

## Usage

```vue
<script setup lang="ts">
import { STabs } from '@soybeanjs/ui';

const value = ref('account');
const items = [
  { label: 'Account', value: 'account' },
  { label: 'Password', value: 'password' }
];
</script>

<template>
  <STabs v-model="value" :items="items">
    <template #content="{ value }">
      <div v-if="value === 'account'">Make changes to your account here.</div>
      <div v-else-if="value === 'password'">Change your password here.</div>
    </template>
  </STabs>
</template>
```

> `STabs` now delegates item iteration, default trigger/content composition, and indicator rendering to headless `TabsCompact`. For unstyled, data-driven usage, import `TabsCompact` from `@soybeanjs/headless/tabs`.

## Demos

```playground
horizontal
vertical
fill
custom
```

## API

<ComponentApi component="tabs" />
