# 数字输入框

## 概述

用于输入数值的输入框组件，支持步进与边界控制。

## 用法

```vue
<script setup lang="ts">
import { SNumberInput } from '@soybeanjs/ui';

const value = ref(0);
</script>

<template>
  <SNumberInput v-model="value" :min="0" :max="100" />
</template>
```

## 演示

```playground
base
center
slot
clearable
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'number', default: '-', description: '数值。', required: true },
  { name: 'min', type: 'number', default: '-', description: '最小值。' },
  { name: 'max', type: 'number', default: '-', description: '最大值。' },
  { name: 'step', type: 'number', default: '1', description: '步进值。' },
  { name: 'center', type: 'boolean', default: 'false', description: '文本居中对齐。' },
  { name: 'clearable', type: 'boolean', default: 'false', description: '是否显示清除按钮。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '输入框是否禁用。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '输入框尺寸。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: number) => void', description: '值变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'increment', parameters: '-', description: '自定义增加按钮。' },
  { name: 'decrement', parameters: '-', description: '自定义减少按钮。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'input', type: 'string', description: 'Input element class.' },
      { name: 'controls', type: 'string', description: 'Controls wrapper class.' },
      { name: 'increment', type: 'string', description: 'Increment button class.' },
      { name: 'decrement', type: 'string', description: 'Decrement button class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
