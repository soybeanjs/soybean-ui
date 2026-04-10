# 标签输入

## 概述

用于输入、展示和删除多个标签值的组合组件，支持对象值、分隔符添加和键盘导航。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  STagsInput,
  STagsInputInput,
  STagsInputItem,
  STagsInputItemDelete,
  STagsInputItemText
} from '@soybeanjs/ui';

const tags = ref(['Vue', 'TypeScript']);
</script>

<template>
  <STagsInput v-model="tags">
    <template #default="{ modelValue }">
      <STagsInputItem v-for="tag in modelValue" :key="tag" :value="tag">
        <STagsInputItemText />
        <STagsInputItemDelete />
      </STagsInputItem>
      <STagsInputInput placeholder="添加标签" aria-label="添加标签" />
    </template>
  </STagsInput>
</template>
```

## 演示

```playground
basic
disabled
object-value
clear
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根容器自定义类名。' },
  { name: 'modelValue', type: 'T[]', default: '-', description: '受控标签值。' },
  { name: 'defaultValue', type: 'T[]', default: '[]', description: '非受控默认标签值。' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: '组件尺寸。' },
  { name: 'delimiter', type: 'string | RegExp', default: '`,`', description: '触发新增标签的分隔符。' },
  { name: 'duplicate', type: 'boolean', default: 'false', description: '是否允许重复标签。' },
  { name: 'max', type: 'number', default: '0', description: '最大标签数量，0 表示不限制。' },
  { name: 'addOnPaste', type: 'boolean', default: 'false', description: '是否在粘贴时自动拆分并添加标签。' },
  { name: 'addOnTab', type: 'boolean', default: 'false', description: '是否在按下 Tab 时添加标签。' },
  { name: 'addOnBlur', type: 'boolean', default: 'false', description: '是否在输入框失焦时添加标签。' },
  { name: 'convertValue', type: '(value: string) => T', default: '-', description: '将输入字符串转换为目标值，处理对象值时必填。' },
  { name: 'displayValue', type: '(value: T) => string', default: '-', description: '将标签值转换为展示文本。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用整个组件。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '为内部各个结构自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: T[]) => void', description: '标签值变化时触发。' },
  { name: 'addTag', parameters: '(value: T) => void', description: '新增标签成功时触发。' },
  { name: 'removeTag', parameters: '(value: T) => void', description: '删除标签时触发。' },
  { name: 'invalid', parameters: '(value: T) => void', description: '重复标签或超出数量限制时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ modelValue: T[] }', description: '渲染标签项、输入框和清空按钮。', required: true }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类映射。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'item', type: 'string', description: '标签项类名。' },
      { name: 'itemText', type: 'string', description: '标签文本类名。' },
      { name: 'itemDelete', type: 'string', description: '删除按钮类名。' },
      { name: 'input', type: 'string', description: '输入框类名。' },
      { name: 'clear', type: 'string', description: '清空按钮类名。' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
