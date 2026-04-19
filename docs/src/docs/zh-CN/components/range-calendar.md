# RangeCalendar

## 概述

RangeCalendar 会渲染一个或多个按月排列的日期网格，用于直接选择起始日期和结束日期。

## 用法

```vue
<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';
import { SRangeCalendar } from '@soybeanjs/ui';

const value = shallowRef({
  start: new CalendarDate(2026, 4, 18),
  end: new CalendarDate(2026, 4, 22)
});
</script>

<template>
  <SRangeCalendar v-model="value" :default-placeholder="value.start" />
</template>
```

## 演示

```playground
basic
two-months
disabled
custom-styling
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根元素类名。' },
  { name: 'v-model', type: 'DateRange', default: '-', description: '受控日期范围。' },
  { name: 'defaultValue', type: 'DateRange', default: '-', description: '非受控初始范围。' },
  { name: 'defaultPlaceholder', type: 'DateValue', default: '-', description: '初始可见月份。' },
  { name: 'placeholder', type: 'DateValue', default: '-', description: '受控可见月份。' },
  { name: 'pagedNavigation', type: 'boolean', default: 'false', description: '是否按可见月份数量翻页。' },
  { name: 'preventDeselect', type: 'boolean', default: 'false', description: '是否阻止点击当前起始日期清空半选范围。' },
  { name: 'allowNonContiguousRanges', type: 'boolean', default: 'false', description: '是否允许范围内穿过 unavailable 日期。' },
  { name: 'maximumDays', type: 'number', default: '-', description: '范围允许的最大天数。' },
  { name: 'fixedDate', type: `'start' | 'end'`, default: '-', description: '重新选择时固定范围的一侧。' },
  { name: 'weekStartsOn', type: '0 | 1 | 2 | 3 | 4 | 5 | 6', default: '按 locale 推导', description: '一周起始日。' },
  { name: 'weekdayFormat', type: `'narrow' | 'short' | 'long'`, default: `'narrow'`, description: '星期标题格式。' },
  { name: 'calendarLabel', type: 'string', default: `'Event Date'`, description: '无障碍日历标签。' },
  { name: 'fixedWeeks', type: 'boolean', default: 'false', description: '是否始终渲染 6 周。' },
  { name: 'numberOfMonths', type: 'number', default: '1', description: '可见月份数量。' },
  { name: 'minValue', type: 'DateValue', default: '-', description: '最小可选日期。' },
  { name: 'maxValue', type: 'DateValue', default: '-', description: '最大可选日期。' },
  { name: 'locale', type: 'string', default: `'en'`, description: '格式化 locale。' },
  { name: 'dir', type: `'ltr' | 'rtl'`, default: '继承', description: '阅读方向。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否整体禁用。' },
  { name: 'readonly', type: 'boolean', default: 'false', description: '是否只读。' },
  { name: 'initialFocus', type: 'boolean', default: 'false', description: '挂载时是否把焦点移到活动日期。' },
  { name: 'disableDaysOutsideCurrentView', type: 'boolean', default: 'false', description: '是否禁用当前月份外的日期。' },
  { name: 'isDateDisabled', type: '(date: DateValue) => boolean', default: '-', description: '禁用日期判定函数。' },
  { name: 'isDateUnavailable', type: '(date: DateValue) => boolean', default: '-', description: '不可用日期判定函数。' },
  { name: 'isDateHighlightable', type: '(date: DateValue) => boolean', default: '-', description: '允许 unavailable 范围继续高亮的日期判定函数。' },
  { name: 'prevPage', type: '(placeholder: DateValue) => DateValue', default: '-', description: '自定义上一页解析函数。' },
  { name: 'nextPage', type: '(placeholder: DateValue) => DateValue', default: '-', description: '自定义下一页解析函数。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '日历尺寸。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '按 slot 覆盖类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: DateRange) => void', description: '选择范围变化时触发。' },
  { name: 'update:placeholder', parameters: '(value: DateValue) => void', description: '可见月份变化时触发。' },
  { name: 'update:startValue', parameters: '(value: DateValue | undefined) => void', description: '当前范围起点变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'heading', parameters: '{ headingValue: string }', description: '自定义标题内容。' },
  { name: 'prev', parameters: '{ disabled: boolean }', description: '自定义上一页按钮内容。' },
  { name: 'next', parameters: '{ disabled: boolean }', description: '自定义下一页按钮内容。' },
  { name: 'head-cell', parameters: 'RangeCalendarHeadCellSlotProps', description: '自定义星期标题内容。' },
  { name: 'day', parameters: 'RangeCalendarDaySlotProps', description: '自定义日期单元内容。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'RangeCalendarHeadCellSlotProps',
    description: '星期标题插槽参数。',
    fields: [
      { name: 'date', type: 'DateValue', description: '当前月份占位日期。' },
      { name: 'index', type: 'number', description: '星期索引。' },
      { name: 'label', type: 'string', description: '星期标签。' }
    ]
  },
  {
    name: 'RangeCalendarDaySlotProps',
    description: '日期插槽参数。',
    fields: [
      { name: 'day', type: 'DateValue', description: '当前日期值。' },
      { name: 'dayValue', type: 'string', description: '渲染后的日期文本。' },
      { name: 'month', type: 'DateValue', description: '当前网格所属月份。' },
      { name: 'disabled', type: 'boolean', description: '日期是否禁用。' },
      { name: 'selected', type: 'boolean', description: '日期是否属于已提交范围。' },
      { name: 'selectionStart', type: 'boolean', description: '日期是否为范围起点。' },
      { name: 'selectionEnd', type: 'boolean', description: '日期是否为范围终点。' },
      { name: 'highlighted', type: 'boolean', description: '日期是否属于 hover 预览范围。' },
      { name: 'highlightedStart', type: 'boolean', description: '日期是否为预览起点。' },
      { name: 'highlightedEnd', type: 'boolean', description: '日期是否为预览终点。' },
      { name: 'today', type: 'boolean', description: '日期是否为今天。' },
      { name: 'outsideView', type: 'boolean', description: '日期是否属于其它月份。' },
      { name: 'outsideVisibleView', type: 'boolean', description: '日期是否在当前渲染月份范围之外。' },
      { name: 'unavailable', type: 'boolean', description: '日期是否不可用。' }
    ]
  }
]" />
