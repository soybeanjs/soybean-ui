# 滑块

## 概述

用于在连续范围内选择一个或多个数值的滑块组件，支持水平和垂直方向。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SSlider } from '@soybeanjs/ui';

const value = ref([40]);
</script>

<template>
  <SSlider v-model="value" :thumb-props="{ 'aria-label': 'Volume' }" />
</template>
```

## 演示

```playground
basic
range
size
color
disabled
orientation
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'number[]', default: '-', description: '受控的滑块值。' },
  { name: 'defaultValue', type: 'number[]', default: '[0]', description: '非受控模式下的默认值。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用。' },
  { name: 'orientation', type: '`horizontal` | `vertical`', default: '`horizontal`', description: '滑块方向。' },
  { name: 'dir', type: '`ltr` | `rtl`', default: '`ltr`', description: '阅读方向。' },
  { name: 'inverted', type: 'boolean', default: 'false', description: '是否反转数值方向。' },
  { name: 'min', type: 'number', default: '0', description: '最小值。' },
  { name: 'max', type: 'number', default: '100', description: '最大值。' },
  { name: 'step', type: 'number', default: '1', description: '步进值。' },
  { name: 'minStepsBetweenThumbs', type: 'number', default: '0', description: '多滑块之间的最小步进间隔。' },
  { name: 'class', type: 'ClassValue', default: '-', description: '根元素自定义类名。' },
  { name: 'color', type: 'ThemeColor', default: '`primary`', description: '滑块颜色。' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: '滑块尺寸。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '为内部元素自定义类名。' },
  { name: 'trackProps', type: 'SliderTrackProps', default: '{}', description: '传递给轨道元素的属性。' },
  { name: 'rangeProps', type: 'SliderRangeProps', default: '{}', description: '传递给范围元素的属性。' },
  { name: 'thumbProps', type: 'Omit<SliderThumbProps, `index`>', default: '{}', description: '传递给每个滑块拇指的属性。单滑块场景建议传入 `aria-label`。' },
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: number[]) => void', description: '值变化时触发。' },
  { name: 'valueCommit', parameters: '(value: number[]) => void', description: '拖拽或键盘操作提交时触发。' },
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ index, value, modelValue }', description: '自定义每个滑块拇指内容。' },
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Slider 的自定义类名映射。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'track', type: 'string', description: '轨道类名。' },
      { name: 'range', type: 'string', description: '已选范围类名。' },
      { name: 'thumb', type: 'string', description: '滑块拇指类名。' },
    ],
  }
]"/>
