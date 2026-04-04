# 进度条

## 概述

用于展示任务完成进度的进度条组件，支持确定值和不确定状态。

## 用法

```vue
<script setup lang="ts">
import { SProgress } from '@soybeanjs/ui';
</script>

<template>
  <SProgress :model-value="45" />
</template>
```

## 演示

```playground
basic
size
color
state
slot
circle
```

## Progress API

### 属性

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'number | null | undefined', default: 'undefined', description: '当前进度值。`null` 或 `undefined` 时显示为不确定状态。' },
  { name: 'max', type: 'number', default: '100', description: '进度最大值。' },
  { name: 'class', type: 'string', default: '-', description: '根容器类名' },
  { name: 'color', type: `'primary' | 'destructive' | 'success' | 'warning' | 'info' | 'carbon' | 'secondary' | 'accent'`, default: 'primary', description: '进度指示器颜色。' },
  { name: 'size', type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'`, default: 'md', description: '进度条尺寸。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '为对应容器添加类名' },
  { name: 'indicatorProps', type: 'HTMLAttributes', default: '{}', description: '传递给指示器元素的属性。' },
  { name: 'getValueLabel', type: '(value, max) => string | undefined', default: '百分比格式化', description: '当前值的无障碍标签生成函数。' },
  { name: 'getValueText', type: '(value, max) => string | undefined', default: '-', description: '当前值的无障碍文本生成函数。' },
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ modelValue, max, progressState, valuePercent }', description: '自定义指示器内容。' },
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Progress 的自定义类名',
    fields: [
      { name: 'root', type: 'string', description: '为根容器添加类名' },
      { name: 'indicator', type: 'string', description: '为指示器容器添加类名' },
    ],
  },
  {
    name: 'ProgressState',
    description: '当前进度状态。',
    fields: [
      { name: 'indeterminate', type: 'string', description: '进度值不可用。' },
      { name: 'loading', type: 'string', description: '进度值位于 0 和 max 之间。' },
      { name: 'complete', type: 'string', description: '进度已达到最大值。' },
    ],
  }
]"/>

## 环形进度

```vue
<script setup lang="ts">
import { SProgressCircle } from '@soybeanjs/ui';
</script>

<template>
  <SProgressCircle :model-value="72" size="xl">
    <template #default="{ valuePercent }">
      {{ Math.round(valuePercent ?? 0) }}%
    </template>
  </SProgressCircle>
</template>
```

`SProgressCircle` 支持与 `SProgress` 相同的属性、事件、插槽参数和 `Ui` 类型，并额外提供以下属性：

<DataTable preset="props" :data="[
  { name: 'strokeWidth', type: 'number', default: '8', description: '环形指示器的描边宽度。' },
]"/>
