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

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '自定义类名。' },
  { name: 'variant', type: 'ToggleVariant', default: `'ghost'`, description: '视觉风格变体。' },
  { name: 'size', type: 'ToggleSize', default: `'md'`, description: '尺寸。' },
  { name: 'shape', type: 'ToggleShape', default: `'rounded'`, description: '圆角形状。' },
  { name: 'modelValue', type: 'boolean', default: '-', description: '受控按下状态。' },
  { name: 'defaultValue', type: 'boolean', default: 'false', description: '非受控模式下的初始按下状态。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用。' },
  { name: 'as', type: 'string | Component', default: `'button'`, description: '渲染的元素/组件。' },
  { name: 'asChild', type: 'boolean', default: 'false', description: '将属性和行为合并到子元素。' },
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: boolean) => void', description: '按下状态变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ modelValue: boolean; pressed: boolean; state: ToggleState; disabled: boolean }', description: 'Toggle 内容。', required: true }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'ToggleState',
    description: '通过 `data-state` 暴露的按下状态。',
    fields: [
      { name: 'on', type: 'string', description: '按下状态。' },
      { name: 'off', type: 'string', description: '未按下状态。' },
    ]
  }
]"/>

<UnionType name="ClassValue" description="类名值类型" type="string | null | undefined | Record<string, boolean> | ClassValue[]" />

<UnionType name="ToggleVariant" description="Toggle 变体" type="'outline' | 'soft' | 'ghost'" />

<UnionType name="ToggleShape" description="Toggle 形状" type="'rounded' | 'square' | 'pill'" />

<UnionType name="ToggleSize" description="Toggle 尺寸" type="'sm' | 'md' | 'lg'" />
