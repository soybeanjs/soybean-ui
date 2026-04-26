# 步骤条

## 概述

用于表示多步骤流程当前进度的步骤条组件。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SStepper } from '@soybeanjs/ui';

const value = ref(2);

const items = [
  { title: 'Account', description: 'Create your account' },
  { title: 'Profile', description: 'Complete your profile' },
  { title: 'Review', description: 'Confirm and submit' }
];
</script>

<template>
  <SStepper v-model="value" :items="items" />
</template>
```

## 演示

```playground
basic
vertical
linear
custom-styling
```

## API

<ComponentApi component="stepper" />
