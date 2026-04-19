# MonthRangePicker

## 概述

MonthRangePicker 用于在按年份切换的弹层中选择开始和结束月份，并将结果保留为锚定到各自月份第一天的 `DateValue`。

## 用法

```vue
<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';
import { SMonthRangePicker } from '@soybeanjs/ui';

const value = shallowRef({
  start: new CalendarDate(2026, 4, 1),
  end: new CalendarDate(2026, 6, 1)
});
</script>

<template>
  <SMonthRangePicker v-model="value" aria-label="Billing quarter" />
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
  { name: 'modelValue', type: 'DateRange', default: '-', description: '受控月份区间值。' },
  { name: 'defaultValue', type: 'DateRange', default: '-', description: '非受控初始月份区间。' },
  { name: 'placeholder', type: 'DateValue', default: '-', description: '受控可见月份，用于决定弹层当前年份。' },
  { name: 'defaultPlaceholder', type: 'DateValue', default: '-', description: '非受控初始可见月份。' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: '非受控初始打开状态。' },
  { name: 'open', type: 'boolean', default: '-', description: '受控弹层打开状态。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用。' },
  { name: 'readonly', type: 'boolean', default: 'false', description: '是否只读。' },
  { name: 'minValue', type: 'DateValue', default: '-', description: '最小可选月份。' },
  { name: 'maxValue', type: 'DateValue', default: '-', description: '最大可选月份。' },
  { name: 'locale', type: 'string', default: '当前 locale', description: '用于月份标签展示的 locale。' },
  { name: 'dir', type: 'Direction', default: '继承', description: '键盘导航阅读方向。' },
  { name: 'name', type: 'string', default: '-', description: '原生表单字段名。' },
  { name: 'required', type: 'boolean', default: 'false', description: '是否必填。' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: '默认视觉尺寸。' },
  { name: 'ui', type: 'Partial<MonthRangePickerUi>', default: '{}', description: '覆盖内部 slot 类名。' },
  { name: 'triggerProps', type: 'MonthRangePickerTriggerProps', default: '{}', description: '透传给 trigger 的 props。' },
  { name: 'popupProps', type: 'MonthRangePickerPopupProps', default: '{}', description: '透传给 popup 的 props。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: DateRange) => void', description: '选中月份区间变化时触发。' },
  { name: 'update:placeholder', parameters: '(value: DateValue) => void', description: '可见弹层月份变化时触发。' },
  { name: 'update:startValue', parameters: '(value: DateValue | undefined) => void', description: '开始月份变化时触发。' },
  { name: 'update:endValue', parameters: '(value: DateValue | undefined) => void', description: '结束月份变化时触发。' },
  { name: 'update:open', parameters: '(open: boolean) => void', description: '弹层打开状态变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '{ displayValue: string; modelValue: DateRange; open: boolean }', description: '自定义 trigger 内容。' },
  { name: 'heading', parameters: '{ headingValue: string }', description: '自定义弹层年份标题。' },
  { name: 'prev', parameters: '{ disabled: boolean }', description: '自定义上一年按钮内容。' },
  { name: 'next', parameters: '{ disabled: boolean }', description: '自定义下一年按钮内容。' },
  { name: 'month', parameters: '{ date: DateValue; label: string; disabled: boolean; focused: boolean; highlighted: boolean; rangeStart: boolean; rangeEnd: boolean; selected: boolean }', description: '自定义月份单元格内容。' },
  { name: 'default', parameters: '{ displayValue: string; modelValue: DateRange; open: boolean }', description: '在根节点内追加的内容。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'MonthRangePickerUi',
    description: '月份区间选择器结构的类名映射。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'trigger', type: 'string', description: '触发按钮类名。' },
      { name: 'popup', type: 'string', description: '弹层面板类名。' },
      { name: 'header', type: 'string', description: '弹层头部类名。' },
      { name: 'heading', type: 'string', description: '弹层年份标题类名。' },
      { name: 'prev', type: 'string', description: '上一年按钮类名。' },
      { name: 'next', type: 'string', description: '下一年按钮类名。' },
      { name: 'grid', type: 'string', description: '月份网格类名。' },
      { name: 'cellTrigger', type: 'string', description: '月份按钮类名。' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
