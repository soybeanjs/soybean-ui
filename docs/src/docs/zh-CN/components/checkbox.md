# 复选框

## 概述

用于在选中/未选中之间切换的复选框组件。

## 用法

```vue
<script setup lang="ts">
import { SCheckbox } from '@soybeanjs/ui';

const checked = ref(false);
</script>

<template>
  <SCheckbox v-model="checked" label="Accept terms" />
</template>
```

## 演示

```playground
single
color
size
shape
icon
group
card
card-group
```

## API

### SCheckbox Props

<DataTable preset="props" :data="[
  { name: 'checked', type: `boolean | 'indeterminate'`, default: '-', description: 'The checked state.' },
  { name: 'defaultChecked', type: 'boolean', default: '-', description: '默认选中状态。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '复选框是否禁用。' },
  { name: 'required', type: 'boolean', default: 'false', description: '复选框是否必填。' },
  { name: 'name', type: 'string', default: '-', description: 'The name of the checkbox.' },
  { name: 'value', type: 'string', default: 'on', description: 'The value given as data when submitted with a name.' },
  { name: 'id', type: 'string', default: '-', description: 'The unique id of the checkbox.' },
  { name: 'label', type: 'string', default: '-', description: 'Label text.' },
  { name: 'color', type: `'primary' \| 'destructive' \| 'success' \| 'warning' \| 'info' \| 'carbon' \| 'secondary' \| 'accent'`, default: `'primary'`, description: 'Checkbox color.' },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'Checkbox size.' },
  { name: 'shape', type: `'rounded' \| 'circle' \| 'square'`, default: `'rounded'`, description: 'Checkbox shape.' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### SCheckbox Emits

<DataTable preset="emits" :data="[
  { name: 'update:checked', parameters: '(checked: boolean) => void', description: '选中状态变化时触发。' }
]"/>

### SCheckboxGroup Props

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'any[]', default: '-', description: 'The value of the checkbox group.' },
  { name: 'items', type: 'CheckboxGroupOptionData[]', default: '-', description: 'The options to render.' },
  { name: 'color', type: 'ThemeColor', default: `'primary'`, description: 'Checkbox color.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Checkbox size.' }
]"/>

### SCheckboxCard Props

<DataTable preset="props" :data="[
  { name: 'icon', type: 'string', default: '-', description: 'Icon name (Iconify).' },
  { name: 'description', type: 'string', default: '-', description: 'Description text.' },
  { name: 'checked', type: 'boolean', default: '-', description: 'The checked state.' },
  { name: 'label', type: 'string', default: '-', description: 'Label text.' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根元素类名。' },
      { name: 'control', type: 'string', description: 'Checkbox control (box) class.' },
      { name: 'indicator', type: 'string', description: 'Check icon class.' },
      { name: 'label', type: 'string', description: 'Label text class.' },
    ]
  }
]"/>
