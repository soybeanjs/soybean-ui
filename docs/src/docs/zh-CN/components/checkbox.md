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

> `SCheckboxGroup` 和 `SCheckboxCardGroup` 现在会把列表遍历和默认复选框/卡片结构组合委托给 headless `CheckboxGroupCompact` 与 `CheckboxCardGroupCompact`。如果需要无样式、数据驱动的组合入口，可从 `@soybeanjs/headless/checkbox` 直接导入。

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
  { name: 'modelValue', type: `boolean | 'indeterminate'`, default: '-', description: '选中状态。' },
  { name: 'defaultValue', type: 'boolean', default: '-', description: '默认选中状态。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '复选框是否禁用。' },
  { name: 'required', type: 'boolean', default: 'false', description: '复选框是否必填。' },
  { name: 'name', type: 'string', default: '-', description: 'The name of the checkbox.' },
  { name: 'value', type: 'string', default: 'on', description: 'The value given as data when submitted with a name.' },
  { name: 'id', type: 'string', default: '-', description: 'The unique id of the checkbox.' },
  { name: 'label', type: 'string', default: '-', description: 'Label text.' },
  { name: 'color', type: `'primary' \| 'destructive' \| 'success' \| 'warning' \| 'info' \| 'carbon' \| 'secondary' \| 'accent'`, default: `'primary'`, description: 'Checkbox color.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Checkbox size.' },
  { name: 'shape', type: `'rounded' \| 'circle' \| 'square'`, default: `'rounded'`, description: 'Checkbox shape.' },
  { name: 'class', type: 'ClassValue', default: '-', description: '额外的根节点类名。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### SCheckbox Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: boolean | \"indeterminate\") => void', description: '选中状态变化时触发。' }
]"/>

### SCheckboxGroup Props

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'any[]', default: '-', description: 'The value of the checkbox group.' },
  { name: 'items', type: 'CheckboxGroupOptionData[]', default: '-', description: 'The options to render.' },
  { name: 'orientation', type: `'horizontal' \| 'vertical'`, default: `'horizontal'`, description: '复选框组布局方向。' },
  { name: 'color', type: 'ThemeColor', default: `'primary'`, description: 'Checkbox color.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Checkbox size.' },
  { name: 'shape', type: `'rounded' \| 'circle' \| 'square'`, default: `'rounded'`, description: 'Checkbox shape.' },
  { name: 'class', type: 'ClassValue', default: '-', description: '额外的分组根节点类名。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### SCheckboxCard Props

<DataTable preset="props" :data="[
  { name: 'icon', type: 'string', default: '-', description: 'Icon name (Iconify).' },
  { name: 'description', type: 'string', default: '-', description: 'Description text.' },
  { name: 'modelValue', type: 'boolean', default: '-', description: '选中状态。' },
  { name: 'label', type: 'string', default: '-', description: 'Label text.' }
]"/>

### SCheckboxCardGroup Props

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'any[]', default: '-', description: '选中的复选卡片值。' },
  { name: 'items', type: 'CheckboxCardGroupOptionData[]', default: '-', description: '要渲染的复选卡片选项。' },
  { name: 'color', type: 'ThemeColor', default: `'primary'`, description: 'Checkbox card color.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Checkbox card size.' },
  { name: 'shape', type: `'rounded' \| 'circle' \| 'square'`, default: `'rounded'`, description: 'Checkbox control shape.' },
  { name: 'class', type: 'ClassValue', default: '-', description: '额外的分组根节点类名。' },
  { name: 'ui', type: 'CheckboxCardUi', default: '{}', description: '自定义类名。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根元素类名。' },
      { name: 'groupRoot', type: 'string', description: '分组根元素类名。' },
      { name: 'control', type: 'string', description: 'Checkbox control (box) class.' },
      { name: 'indicator', type: 'string', description: 'Check icon class.' },
      { name: 'label', type: 'string', description: 'Label text class.' },
    ]
  }
]"/>

<TypeTable :data="[
  {
    name: 'CheckboxCardUi',
    description: '复选卡片的自定义样式类。',
    fields: [
      { name: 'groupRoot', type: 'string', description: '分组根元素类名。' },
      { name: 'root', type: 'string', description: '卡片根元素类名。' },
      { name: 'content', type: 'string', description: '卡片内容容器类名。' },
      { name: 'textContent', type: 'string', description: '文本内容容器类名。' },
      { name: 'icon', type: 'string', description: '卡片图标类名。' },
      { name: 'description', type: 'string', description: '描述文本类名。' },
      { name: 'control', type: 'string', description: '复选框控件类名。' },
      { name: 'indicator', type: 'string', description: '选中图标类名。' },
      { name: 'label', type: 'string', description: '标签文本类名。' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
