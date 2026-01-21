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

### 属性

<DataTable preset="props" :data="[
  { name: 'checked', type: 'boolean', default: '-', description: '受控的选中状态。' },
  { name: 'defaultChecked', type: 'boolean', default: 'false', description: '默认选中状态。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '开关是否禁用。' },
  { name: 'required', type: 'boolean', default: 'false', description: '开关是否必填。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '开关尺寸。' },
  { name: 'shape', type: `'rounded' \| 'square' \| 'circle'`, default: `'circle'`, description: '开关滑块形状。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:checked', parameters: '(checked: boolean) => void', description: '选中状态变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'thumb', parameters: '-', description: '自定义滑块内容（例如图标）。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根元素类名。' },
      { name: 'thumb', type: 'string', description: '滑块元素类名。' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
