# 日历

## 概述

用于按月浏览和选择日期，支持单选、多选、禁用日期、范围限制以及自定义头部与日期单元格渲染。

## 用法

```vue
<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';
import { SCalendar } from '@soybeanjs/ui';

const value = shallowRef(new CalendarDate(2026, 4, 18));
</script>

<template>
  <SCalendar v-model="value" :default-placeholder="value" />
</template>
```

## 演示

```playground
basic
multiple
disabled
custom-styling
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根元素类名。' },
  { name: 'v-model', type: 'DateValue | DateValue[]', default: '-', description: '受控日期值。' },
  { name: 'defaultValue', type: 'DateValue | DateValue[]', default: '-', description: '非受控初始日期值。' },
  { name: 'defaultPlaceholder', type: 'DateValue', default: '-', description: '默认展示月份。' },
  { name: 'placeholder', type: 'DateValue', default: '-', description: '受控展示月份。' },
  { name: 'multiple', type: 'boolean', default: 'false', description: '是否允许多选。' },
  { name: 'pagedNavigation', type: 'boolean', default: 'false', description: '翻页时是否按可见月份数翻动。' },
  { name: 'preventDeselect', type: 'boolean', default: 'false', description: '是否阻止取消当前选中。' },
  { name: 'weekStartsOn', type: '0 | 1 | 2 | 3 | 4 | 5 | 6', default: 'locale derived', description: '每周起始日。' },
  { name: 'weekdayFormat', type: `'narrow' | 'short' | 'long'`, default: `'narrow'`, description: '星期标题格式。' },
  { name: 'calendarLabel', type: 'string', default: `'Event Date'`, description: '可访问标签。' },
  { name: 'fixedWeeks', type: 'boolean', default: 'false', description: '是否固定渲染六周。' },
  { name: 'numberOfMonths', type: 'number', default: '1', description: '同时显示的月份数。' },
  { name: 'minValue', type: 'DateValue', default: '-', description: '最小可选日期。' },
  { name: 'maxValue', type: 'DateValue', default: '-', description: '最大可选日期。' },
  { name: 'locale', type: 'string', default: `'en'`, description: '日期格式化语言。' },
  { name: 'dir', type: `'ltr' | 'rtl'`, default: 'inherits', description: '方向。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用整个日历。' },
  { name: 'readonly', type: 'boolean', default: 'false', description: '是否只读。' },
  { name: 'initialFocus', type: 'boolean', default: 'false', description: '挂载后是否自动聚焦。' },
  { name: 'disableDaysOutsideCurrentView', type: 'boolean', default: 'false', description: '是否禁用当前月份之外的日期。' },
  { name: 'isDateDisabled', type: '(date: DateValue) => boolean', default: '-', description: '判断日期是否禁用。' },
  { name: 'isDateUnavailable', type: '(date: DateValue) => boolean', default: '-', description: '判断日期是否不可用。' },
  { name: 'prevPage', type: '(placeholder: DateValue) => DateValue', default: '-', description: '自定义上一页逻辑。' },
  { name: 'nextPage', type: '(placeholder: DateValue) => DateValue', default: '-', description: '自定义下一页逻辑。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '尺寸。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '内部元素类名覆盖。' },
  { name: 'headerProps', type: 'CalendarHeaderProps', default: '-', description: '头部 props。' },
  { name: 'headingProps', type: 'CalendarHeadingProps', default: '-', description: '标题 props。' },
  { name: 'prevProps', type: 'CalendarPrevProps', default: '-', description: '上一页按钮 props。' },
  { name: 'nextProps', type: 'CalendarNextProps', default: '-', description: '下一页按钮 props。' },
  { name: 'gridProps', type: 'CalendarGridProps', default: '-', description: '月份表格 props。' },
  { name: 'gridHeadProps', type: 'CalendarGridHeadProps', default: '-', description: '表头 props。' },
  { name: 'gridBodyProps', type: 'CalendarGridBodyProps', default: '-', description: '表体 props。' },
  { name: 'gridRowProps', type: 'CalendarGridRowProps', default: '-', description: '行 props。' },
  { name: 'headCellProps', type: 'CalendarHeadCellProps', default: '-', description: '星期单元格 props。' },
  { name: 'cellProps', type: 'CalendarCellProps', default: '-', description: '日期单元格 props。' },
  { name: 'cellTriggerProps', type: 'CalendarCellTriggerProps', default: '-', description: '日期按钮 props。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: DateValue | DateValue[] | undefined) => void', description: '选中值变化时触发。' },
  { name: 'update:placeholder', parameters: '(value: DateValue) => void', description: '展示月份变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'heading', parameters: '{ headingValue: string }', description: '自定义标题。' },
  { name: 'prev', parameters: '{ disabled: boolean }', description: '自定义上一页按钮内容。' },
  { name: 'next', parameters: '{ disabled: boolean }', description: '自定义下一页按钮内容。' },
  { name: 'head-cell', parameters: 'CalendarHeadCellSlotProps', description: '自定义星期标题。' },
  { name: 'day', parameters: 'CalendarDaySlotProps', description: '自定义日期按钮内容。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'CalendarHeadCellSlotProps',
    description: '星期标题插槽参数。',
    fields: [
      { name: 'date', type: 'DateValue', description: '当前月份占位日期。' },
      { name: 'index', type: 'number', description: '星期索引。' },
      { name: 'label', type: 'string', description: '星期文本。' }
    ]
  },
  {
    name: 'CalendarDaySlotProps',
    description: '日期插槽参数。',
    fields: [
      { name: 'day', type: 'DateValue', description: '当前日期值。' },
      { name: 'dayValue', type: 'string', description: '显示文本。' },
      { name: 'month', type: 'DateValue', description: '当前网格对应月份。' },
      { name: 'disabled', type: 'boolean', description: '是否禁用。' },
      { name: 'selected', type: 'boolean', description: '是否选中。' },
      { name: 'today', type: 'boolean', description: '是否今天。' },
      { name: 'outsideView', type: 'boolean', description: '是否当前月份外。' },
      { name: 'outsideVisibleView', type: 'boolean', description: '是否当前可见视图外。' },
      { name: 'unavailable', type: 'boolean', description: '是否不可用。' }
    ]
  },
  {
    name: 'Ui',
    description: '可覆盖的样式槽位。',
    fields: [
      { name: 'root', type: 'ClassValue', description: '根元素类名。' },
      { name: 'header', type: 'ClassValue', description: '头部类名。' },
      { name: 'heading', type: 'ClassValue', description: '标题类名。' },
      { name: 'prev', type: 'ClassValue', description: '上一页按钮类名。' },
      { name: 'next', type: 'ClassValue', description: '下一页按钮类名。' },
      { name: 'grid', type: 'ClassValue', description: '月份表格类名。' },
      { name: 'gridHead', type: 'ClassValue', description: '表头类名。' },
      { name: 'gridBody', type: 'ClassValue', description: '表体类名。' },
      { name: 'gridRow', type: 'ClassValue', description: '行类名。' },
      { name: 'headCell', type: 'ClassValue', description: '星期单元格类名。' },
      { name: 'cell', type: 'ClassValue', description: '日期单元格类名。' },
      { name: 'cellTrigger', type: 'ClassValue', description: '日期按钮类名。' }
    ]
  }
]" />
