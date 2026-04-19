# DateField

## 概述

DateField 是一个分段式日期输入组件。它将日、月、年以及可选的时间段拆成可键盘编辑的片段，同时仍然保留可提交到表单中的原生输入值。

## 用法

```vue
<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';
import { SDateField } from '@soybeanjs/ui';

const value = shallowRef(new CalendarDate(2026, 4, 19));
</script>

<template>
  <SDateField v-model="value" aria-label="事件日期" />
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

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根容器自定义类名。' },
  { name: 'modelValue', type: 'DateValue', default: '-', description: '受控日期值。' },
  { name: 'defaultValue', type: 'DateValue', default: '-', description: '非受控初始日期值。' },
  { name: 'defaultPlaceholder', type: 'DateValue', default: '-', description: '在尚无值时使用的初始占位日期。' },
  { name: 'placeholder', type: 'DateValue', default: '-', description: '受控占位日期，用于决定可见片段的格式。' },
  { name: 'granularity', type: 'Granularity', default: '自动', description: '可见片段精度。日历日期默认使用 `day`，带时间的值默认使用 `minute`。' },
  { name: 'hourCycle', type: '12 | 24 | undefined', default: '跟随 locale', description: '时间片段显示 12 小时制还是 24 小时制。' },
  { name: 'hideTimeZone', type: 'boolean', default: 'false', description: '对带时区的日期值隐藏时区片段。' },
  { name: 'minValue', type: 'DateValue', default: '-', description: '最小可选日期。' },
  { name: 'maxValue', type: 'DateValue', default: '-', description: '最大可选日期。' },
  { name: 'isDateUnavailable', type: '(date: DateValue) => boolean', default: '-', description: '将命中的值标记为无效。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用。' },
  { name: 'readonly', type: 'boolean', default: 'false', description: '是否只读。' },
  { name: 'locale', type: 'string', default: '当前 locale', description: '控制片段顺序和格式的语言环境。' },
  { name: 'dir', type: 'Direction', default: '继承', description: '控制片段导航的阅读方向。' },
  { name: 'name', type: 'string', default: '-', description: '原生表单字段名。' },
  { name: 'required', type: 'boolean', default: 'false', description: '隐藏原生输入是否必填。' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: '默认视觉尺寸。' },
  { name: 'ui', type: 'Partial<DateFieldUi>', default: '{}', description: '覆盖内部 slot 类名。' },
  { name: 'inputProps', type: `Omit<DateFieldInputProps, 'part'>`, default: '{}', description: '透传给每个可见片段项的 props。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: DateValue | undefined) => void', description: '组合后的日期值变化时触发。' },
  { name: 'update:placeholder', parameters: '(value: DateValue) => void', description: '可见占位日期变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: 'DateFieldSlotProps', description: '完全自定义分段内容的渲染。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'DateFieldUi',
    description: '默认分段结构的类名映射。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'input', type: 'string', description: '片段项类名。' }
    ]
  },
  {
    name: 'DateFieldSlotProps',
    description: 'scoped slot 负载。',
    fields: [
      { name: 'modelValue', type: 'DateValue | undefined', description: '当前组合后的日期值。' },
      { name: 'segments', type: '{ part: SegmentPart; value: string }[]', description: '按显示顺序排列的可见片段列表。' },
      { name: 'isInvalid', type: 'boolean', description: '当前组合值是否无效。' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
<UnionType name="Granularity" description="显示片段精度" type="'day' | 'hour' | 'minute' | 'second'" />
