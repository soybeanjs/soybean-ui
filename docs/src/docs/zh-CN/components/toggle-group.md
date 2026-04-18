# ToggleGroup

## 概述

一组可切换开关状态的双态按钮，支持单选或多选模式。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SToggleGroup, SToggleGroupItem } from '@soybeanjs/ui';

const value = ref('bold');
</script>

<template>
  <SToggleGroup v-model="value">
    <SToggleGroupItem value="bold">Bold</SToggleGroupItem>
    <SToggleGroupItem value="italic">Italic</SToggleGroupItem>
    <SToggleGroupItem value="underline">Underline</SToggleGroupItem>
  </SToggleGroup>
</template>
```

## 演示

```playground
basic
multiple
variant
vertical
```

## API

### SToggleGroup 属性

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'string | string[]', default: '-', description: '受控选中值。' },
  { name: 'defaultValue', type: 'string | string[]', default: '-', description: '初始选中值。' },
  { name: 'multiple', type: 'boolean', default: 'false', description: '是否允许同时激活多个选项。' },
  { name: 'clearable', type: 'boolean', default: 'true', description: '单选模式下是否允许取消当前选中项。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用整个分组。' },
  { name: 'orientation', type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: '分组方向。' },
  { name: 'rovingFocus', type: 'boolean', default: 'true', description: '是否启用方向键焦点漫游。' },
  { name: 'loop', type: 'boolean', default: 'true', description: '焦点漫游是否循环。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '按钮尺寸。' },
  { name: 'variant', type: `'outline' | 'soft' | 'ghost'`, default: `'ghost'`, description: '视觉样式。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### SToggleGroup 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string | string[]) => void', description: '选中值变化时触发。' }
]"/>

### SToggleGroupItem 属性

<DataTable preset="props" :data="[
  { name: 'value', type: 'string | number', default: '-', description: '唯一选项值。', required: true },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用当前项。' },
  { name: 'class', type: 'ClassValue', default: '-', description: '自定义项类名。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ pressed: boolean; disabled: boolean }', description: 'Toggle item content.', required: true }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'item', type: 'string', description: '选项类名。' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
