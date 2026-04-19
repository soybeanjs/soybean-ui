# YearPicker

## 概述

YearPicker 用于在分页年份网格中选择单个年份，并将结果保留为锚定到该年份第一天的 `DateValue`。

## 用法

```vue
<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';
import { SYearPicker } from '@soybeanjs/ui';

const value = shallowRef(new CalendarDate(2026, 1, 1));
</script>

<template>
  <SYearPicker v-model="value" aria-label="Fiscal year" />
</template>
```

## 演示

```playground
basic
size
disabled
custom-styling
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根容器自定义类名。' },
  { name: 'modelValue', type: 'DateValue', default: '-', description: '受控年份值，锚定到选中年份第一天。' },
  { name: 'defaultValue', type: 'DateValue', default: '-', description: '非受控初始年份值。' },
  { name: 'placeholder', type: 'DateValue', default: '-', description: '受控可见年份，用于决定当前年份页。' },
  { name: 'defaultPlaceholder', type: 'DateValue', default: '-', description: '非受控初始可见年份。' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: '非受控初始打开状态。' },
  { name: 'open', type: 'boolean', default: '-', description: '受控弹层打开状态。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用。' },
  { name: 'readonly', type: 'boolean', default: 'false', description: '是否只读。' },
  { name: 'minValue', type: 'DateValue', default: '-', description: '最小可选年份。' },
  { name: 'maxValue', type: 'DateValue', default: '-', description: '最大可选年份。' },
  { name: 'locale', type: 'string', default: '当前 locale', description: '用于年份标签展示的 locale。' },
  { name: 'dir', type: 'Direction', default: '继承', description: '键盘导航阅读方向。' },
  { name: 'name', type: 'string', default: '-', description: '原生表单字段名。' },
  { name: 'required', type: 'boolean', default: 'false', description: '是否必填。' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: '默认视觉尺寸。' },
  { name: 'ui', type: 'Partial<YearPickerUi>', default: '{}', description: '覆盖内部 slot 类名。' },
  { name: 'triggerProps', type: 'YearPickerTriggerProps', default: '{}', description: '透传给 trigger 的 props。' },
  { name: 'popupProps', type: 'YearPickerPopupProps', default: '{}', description: '透传给 popup 的 props。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: DateValue | undefined) => void', description: '选中年份变化时触发。' },
  { name: 'update:placeholder', parameters: '(value: DateValue) => void', description: '可见年份页变化时触发。' },
  { name: 'update:open', parameters: '(open: boolean) => void', description: '弹层打开状态变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '{ displayValue: string; modelValue: DateValue | undefined; open: boolean }', description: '自定义 trigger 内容。' },
  { name: 'heading', parameters: '{ headingValue: string }', description: '自定义弹层年份页标题。' },
  { name: 'prev', parameters: '{ disabled: boolean }', description: '自定义上一页按钮内容。' },
  { name: 'next', parameters: '{ disabled: boolean }', description: '自定义下一页按钮内容。' },
  { name: 'year', parameters: '{ date: DateValue; label: string; disabled: boolean; focused: boolean; selected: boolean }', description: '自定义年份单元格内容。' },
  { name: 'default', parameters: '{ displayValue: string; modelValue: DateValue | undefined; open: boolean }', description: '在根节点内追加的内容。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'YearPickerUi',
    description: '年份选择器结构的类名映射。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'trigger', type: 'string', description: '触发按钮类名。' },
      { name: 'popup', type: 'string', description: '弹层面板类名。' },
      { name: 'header', type: 'string', description: '弹层头部类名。' },
      { name: 'heading', type: 'string', description: '弹层标题类名。' },
      { name: 'prev', type: 'string', description: '上一页按钮类名。' },
      { name: 'next', type: 'string', description: '下一页按钮类名。' },
      { name: 'grid', type: 'string', description: '年份网格类名。' },
      { name: 'cellTrigger', type: 'string', description: '年份按钮类名。' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
