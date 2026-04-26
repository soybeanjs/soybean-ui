# Toggle

## 概述

一个可在按下和未按下之间切换的双态按钮。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SToggle } from '@soybeanjs/ui';

const pressed = ref(false);
</script>

<template>
  <SToggle v-model="pressed">Bold</SToggle>
</template>
```

## 演示

```playground
basic
variant
shape
size
disabled
```

## API

<ComponentApi component="toggle" />
