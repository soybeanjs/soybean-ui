# 密码

## 概述

用于输入密码的输入框组件，支持显示/隐藏切换等能力。

## 用法

```vue
<script setup lang="ts">
import { SPassword } from '@soybeanjs/ui';

const password = ref('');
</script>

<template>
  <SPassword v-model="password" placeholder="Enter password" />
</template>
```

## 演示

```playground
base
disabled
clearable
icon
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'string', default: '-', description: 'The password value.', required: true },
  { name: 'visible', type: 'boolean', default: 'false', description: '密码是否可见。' },
  { name: 'clearable', type: 'boolean', default: 'false', description: '是否显示清除按钮。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '输入框是否禁用。' },
  { name: 'placeholder', type: 'string', default: '-', description: '占位符文本。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '输入框尺寸。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: '值变化时触发。' },
  { name: 'update:visible', parameters: '(visible: boolean) => void', description: '可见性切换时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'leading', parameters: '-', description: 'Content before input.' },
  { name: 'visible-icon', parameters: '{ visible: boolean }', description: 'Custom visibility toggle icon.' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类 (inherits from Input Ui).',
    fields: [
      { name: 'visible', type: 'string', description: 'Visibility toggle button class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
