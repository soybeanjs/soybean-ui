# 文本域

## 概述

用于输入多行文本的文本域组件。

## 用法

```vue
<script setup lang="ts">
import { STextarea } from '@soybeanjs/ui';

const value = ref('');
</script>

<template>
  <STextarea v-model="value" placeholder="Type your message here." />
</template>
```

## 演示

```playground
base
autosize
clearable
disabled
counter
footer
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'string', default: '-', description: 'The text value.', required: true },
  { name: 'placeholder', type: 'string', default: '-', description: '占位符文本。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '输入框是否禁用。' },
  { name: 'readonly', type: 'boolean', default: 'false', description: '输入框是否只读。' },
  { name: 'autosize', type: 'boolean | { minRows?: number, maxRows?: number }', default: 'false', description: '文本域是否自适应高度。' },
  { name: 'resize', type: `'none' \| 'both' \| 'horizontal' \| 'vertical'`, default: `'vertical'`, description: 'CSS resize property (ignored if autosize is true).' },
  { name: 'clearable', type: 'boolean', default: 'false', description: '是否显示清除按钮。' },
  { name: 'showCounter', type: 'boolean', default: 'false', description: '是否显示 character count.' },
  { name: 'maxlength', type: 'number', default: '-', description: 'Maximum number of characters.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Textarea size.' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: '值变化时触发。' },
  { name: 'focus', parameters: '(event: FocusEvent) => void', description: 'Triggers on focus.' },
  { name: 'blur', parameters: '(event: FocusEvent) => void', description: 'Triggers on blur.' },
  { name: 'input', parameters: '(event: Event) => void', description: 'Triggers on input.' },
  { name: 'change', parameters: '(event: Event) => void', description: 'Triggers on change.' },
  { name: 'clear', parameters: '() => void', description: 'Triggers on clear.' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'footer', parameters: '-', description: 'Content below the textarea.' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'textarea', type: 'string', description: 'Textarea element class.' },
      { name: 'clearable', type: 'string', description: 'Clear button class.' },
      { name: 'count', type: 'string', description: 'Character count class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
