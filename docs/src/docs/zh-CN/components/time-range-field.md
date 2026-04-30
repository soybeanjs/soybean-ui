# TimeRangeField

## 概述

TimeRangeField 是一个分段式时间范围输入组件，提供独立的开始和结束时间编辑分段，同时保留两侧原生表单提交值。

## 用法

```vue
<script setup lang="ts">
import { Time } from '@internationalized/date';
import { shallowRef } from 'vue';
import { STimeRangeField } from '@soybeanjs/ui';

const value = shallowRef({
  start: new Time(9, 0, 0),
  end: new Time(17, 30, 0)
});
</script>

<template>
  <STimeRangeField v-model="value" aria-label="Working hours" />
</template>
```

## 演示

```playground
basic
seconds
disabled
custom-styling
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根容器自定义类名。' },
  { name: 'modelValue', type: 'TimeRange', default: '-', description: '受控时间范围值。' },
  { name: 'defaultValue', type: 'TimeRange', default: '-', description: '非受控初始时间范围值。' },
  { name: 'defaultPlaceholder', type: 'TimeValue', default: '-', description: '无值时使用的初始占位时间。' },
  { name: 'placeholder', type: 'TimeValue', default: '-', description: '受控占位时间，用于格式化可见分段。' },
  { name: 'granularity', type: 'TimeGranularity', default: '`minute`', description: '可见分段精度。' },
  { name: 'hourCycle', type: '12 | 24 | undefined', default: '按 locale', description: '控制 12 小时或 24 小时制。' },
  { name: 'hideTimeZone', type: 'boolean', default: 'false', description: '对于带时区值时隐藏时区分段。' },
  { name: 'minValue', type: 'TimeValue', default: '-', description: '最小可选时间。' },
  { name: 'maxValue', type: 'TimeValue', default: '-', description: '最大可选时间。' },
  { name: 'isTimeUnavailable', type: '(time: TimeValue) => boolean', default: '-', description: '将匹配值标记为无效。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用。' },
  { name: 'readonly', type: 'boolean', default: 'false', description: '是否只读。' },
  { name: 'locale', type: 'string', default: '当前 locale', description: '用于决定分段顺序与格式。' },
  { name: 'dir', type: 'Direction', default: '继承', description: '分段导航的阅读方向。' },
  { name: 'startName', type: 'string', default: '-', description: '开始时间的原生字段名。' },
  { name: 'endName', type: 'string', default: '-', description: '结束时间的原生字段名。' },
  { name: 'required', type: 'boolean', default: 'false', description: '隐藏原生 input 是否必填。' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: '默认视觉尺寸。' },
  { name: 'separator', type: 'string', default: '`–`', description: '开始和结束时间分段之间的分隔文本。' },
  { name: 'ui', type: 'Partial<TimeRangeFieldUi>', default: '{}', description: '覆盖内部 slot 类名。' },
  { name: 'inputProps', type: `Omit<TimeRangeFieldInputProps, 'part' | 'type'>`, default: '{}', description: '透传给每个可见分段项的 props。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: TimeRange) => void', description: '组合后的时间范围变化时触发。' },
  { name: 'update:placeholder', parameters: '(value: TimeValue) => void', description: '可见占位时间变化时触发。' },
  { name: 'update:startValue', parameters: '(value: TimeValue | undefined) => void', description: '开始时间变化时触发。' },
  { name: 'update:endValue', parameters: '(value: TimeValue | undefined) => void', description: '结束时间变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: 'TimeRangeFieldSlotProps', description: '完全自定义开始和结束分段渲染。' },
  { name: 'separator', parameters: '-', description: '开始和结束时间之间的自定义分隔内容。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'TimeRangeFieldUi',
    description: '时间范围字段结构的类名映射。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'input', type: 'string', description: '开始和结束分段项类名。' },
      { name: 'separator', type: 'string', description: '分隔元素类名。' }
    ]
  },
  {
    name: 'TimeRange',
    description: '时间范围值结构。',
    fields: [
      { name: 'start', type: 'TimeValue | undefined', description: '开始时间值。' },
      { name: 'end', type: 'TimeValue | undefined', description: '结束时间值。' }
    ]
  }
]"/>
