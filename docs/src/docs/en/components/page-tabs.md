# PageTabs

## Overview

A tabbed interface designed for navigating between different pages or views. It supports features like closable tabs, context menus, and customizable styling.

## Usage

```vue
<script setup lang="ts">
import { SPageTabs } from '@soybeanjs/ui';
import { ref } from 'vue';

const tabs = ref([
  { label: 'Home', value: 'home', closable: false },
  { label: 'Profile', value: 'profile' },
  { label: 'Settings', value: 'settings' }
]);
const activeKey = ref('home');
</script>

<template>
  <SPageTabs v-model="activeKey" :tabs="tabs" />
</template>
```

## Demos

```playground
base
```
