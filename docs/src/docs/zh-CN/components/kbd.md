# 键盘按键

## 概述

用于表示键盘输入元素，常用于展示快捷键。

## 用法

```vue
<script setup lang="ts">
import { SKbd } from '@soybeanjs/ui';
</script>

<template>
  <SKbd>⌘</SKbd>
  +
  <SKbd>K</SKbd>
  <SKbd value="Ctrl" />
  <SKbd value="command" />
  <SKbd :raised="false" value="shift" />
</template>
```

## 演示

```playground
base
size
variant
raised
```

## API

<ComponentApi component="kbd" />
