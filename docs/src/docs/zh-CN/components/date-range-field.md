# DateRangeField

## 概览

DateRangeField 是一个分段日期范围输入组件，为选择开始日期和结束日期提供两组可编辑的日期段，同时为两个日期提交原生表单值。

## 用法

```vue
<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';
import { SDateRangeField } from '@soybeanjs/ui';

const value = shallowRef({
  start: new CalendarDate(2026, 4, 19),
  end: new CalendarDate(2026, 4, 26)
});
</script>

<template>
  <SDateRangeField v-model="value" aria-label="日期范围" />
</template>
```

## 演示

```playground
basic
with-time
disabled
custom-styling
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根容器的自定义类名。' },
  { name: 'modelValue', type: 'DateRange', default: '-', description: '受控的日期范围值，包含开始和结束日期。' },
  { name: 'defaultValue', type: 'DateRange', default: '-', description: '非受控的初始日期范围值。' },
  { name: 'defaultPlaceholder', type: 'DateValue', default: '-', description: '在值存在之前使用的初始占位符日期。' },
  { name: 'placeholder', type: 'DateValue', default: '-', description: '用于格式化可见段的受控占位符日期。' },
  { name: 'granularity', type: 'Granularity', default: '自动', description: '可见段的精度。日历日期默认使用 `day`，日期时间值默认使用 `minute`。' },
  { name: 'hourCycle', type: '12 | 24 | undefined', default: '区域默认', description: '显示时间时控制 12 小时或 24 小时制的小时段。' },
  { name: 'hideTimeZone', type: 'boolean', default: 'false', description: '隐藏带时区日期值的时区段。' },
  { name: 'minValue', type: 'DateValue', default: '-', description: '最小可选日期。' },
  { name: 'maxValue', type: 'DateValue', default: '-', description: '最大可选日期。' },
  { name: 'isDateUnavailable', type: '(date: DateValue) => boolean', default: '-', description: '将匹配的值标记为无效。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '字段是否被禁用。' },
  { name: 'readonly', type: 'boolean', default: 'false', description: '字段是否为只读。' },
  { name: 'locale', type: 'string', default: '当前区域', description: '用于段顺序和格式化的区域设置。' },
  { name: 'dir', type: 'Direction', default: '继承', description: '段导航的阅读方向。' },
  { name: 'startName', type: 'string', default: '-', description: '开始日期的原生表单字段名称。' },
  { name: 'endName', type: 'string', default: '-', description: '结束日期的原生表单字段名称。' },
  { name: 'required', type: 'boolean', default: 'false', description: '隐藏的原生输入是否必填。' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: '默认视觉尺寸。' },
  { name: 'separator', type: 'string', default: '`–`', description: '开始和结束日期段之间的分隔符文本。' },
  { name: 'ui', type: 'Partial<DateRangeFieldUi>', default: '{}', description: '覆盖内部插槽类名。' },
  { name: 'inputProps', type: `Omit<DateRangeFieldInputProps, 'part' | 'type'>`, default: '{}', description: '转发给每个可见段项的属性。' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: DateRange) => void', description: '当组合的日期范围更改时发出。' },
  { name: 'update:placeholder', parameters: '(value: DateValue) => void', description: '当可见的占位符日期更改时发出。' },
  { name: 'update:startValue', parameters: '(value: DateValue | undefined) => void', description: '当开始日期更改时发出。' },
  { name: 'update:endValue', parameters: '(value: DateValue | undefined) => void', description: '当结束日期更改时发出。' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: 'DateRangeFieldSlotProps', description: '开始和结束分段内容的完全自定义渲染函数。' },
  { name: 'separator', parameters: '-', description: '开始和结束日期段之间的自定义分隔符内容。' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'DateRangeFieldUi',
    description: '日期范围字段结构的类名映射。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'input', type: 'string', description: '开始和结束段的段项类名。' },
      { name: 'separator', type: 'string', description: '分隔符元素类名。' }
    ]
  },
  {
    name: 'DateRange',
    description: '日期范围值结构。',
    fields: [
      { name: 'start', type: 'DateValue | undefined', description: '开始日期值。' },
      { name: 'end', type: 'DateValue | undefined', description: '结束日期值。' }
    ]
  }
]"/>
