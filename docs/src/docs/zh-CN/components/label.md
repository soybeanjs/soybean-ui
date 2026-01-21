# 标签

## 概述

用于为表单控件提供语义化标签与可点击关联的组件。

## 用法

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

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class name' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Label size' },
  { name: 'for', type: 'string', default: '-', description: 'ID of the associated form element' },
  { name: 'as', type: 'string | Component', default: `'label'`, description: 'Rendered element' },
  { name: 'asChild', type: 'boolean', default: 'false', description: '将属性合并到子元素' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Label content' }
]"/>

### 类型

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
