# 输入框

## 概述

用于输入文本的基础输入框组件。

## 用法

```vue
<script setup lang="ts">
import { SInput } from '@soybeanjs/ui';

const value = ref('');
</script>

<template>
  <SInput v-model="value" placeholder="Type something..." />
</template>
```

## 演示

```playground
base
disabled
slot
clearable
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'v-model', type: 'string | number', default: '-', description: '输入框的值。', required: true },
  { name: 'type', type: 'string', default: `'text'`, description: '输入类型（例如文本、密码、邮箱）。' },
  { name: 'placeholder', type: 'string', default: '-', description: '占位符文本。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '输入框是否禁用。' },
  { name: 'readonly', type: 'boolean', default: 'false', description: '输入框是否只读。' },
  { name: 'clearable', type: 'boolean', default: 'false', description: '当有值时是否显示清除按钮。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '输入框尺寸。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '为内部元素自定义类名。' },
  { name: 'inputRef', type: '(el: HTMLInputElement) => void', default: '-', description: '用于获取原生 input 元素的函数。' }
]"/>

> Note: `SInput` inherits all native `<input>` attributes.

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string | number) => void', description: '输入值变化时触发。' },
  { name: 'change', parameters: '(event: Event) => void', description: '输入值变化时触发（懒触发）。' },
  { name: 'focus', parameters: '(event: FocusEvent) => void', description: '输入框获得焦点时触发。' },
  { name: 'blur', parameters: '(event: FocusEvent) => void', description: '输入框失去焦点时触发。' },
  { name: 'clear', parameters: '() => void', description: '点击清除按钮时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'leading', parameters: '-', description: '输入文本前的内容（例如图标）。' },
  { name: 'trailing', parameters: '-', description: '输入文本后的内容（例如图标）。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'input', type: 'string', description: 'Native input element class.' },
      { name: 'wrapper', type: 'string', description: 'Inner wrapper class.' },
      { name: 'leading', type: 'string', description: 'Leading slot container class.' },
      { name: 'trailing', type: 'string', description: 'Trailing slot container class.' },
      { name: 'clearable', type: 'string', description: 'Clear button class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
