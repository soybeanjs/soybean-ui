# 开关

## 概述

用于在选中与未选中之间切换的开关控件。

## 用法

```vue
<script setup lang="ts">
import { SSwitch } from '@soybeanjs/ui';

const checked = ref(false);
</script>

<template>
  <SSwitch v-model="checked" />
</template>
```

## 演示

```playground
base
size
shape
slot
```

## API

<ComponentApi component="switch" />
