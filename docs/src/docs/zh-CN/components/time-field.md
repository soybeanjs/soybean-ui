# TimeField

## 概述

TimeField 是一个分段式时间输入组件，支持编辑小时、分钟、可选秒数与本地化上午/下午，同时保留原生表单提交值。

## 用法

```vue
<script setup lang="ts">
import { Time } from '@internationalized/date';
import { shallowRef } from 'vue';
import { STimeField } from '@soybeanjs/ui';

const value = shallowRef(new Time(9, 30, 0));
</script>

<template>
  <STimeField v-model="value" aria-label="Meeting time" />
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
  { name: 'modelValue', type: 'TimeValue', default: '-', description: '受控时间值。' },
  { name: 'defaultValue', type: 'TimeValue', default: '-', description: '非受控初始时间值。' },
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
  { name: 'name', type: 'string', default: '-', description: '原生表单字段名。' },
  { name: 'required', type: 'boolean', default: 'false', description: '隐藏原生 input 是否必填。' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: '默认视觉尺寸。' },
  { name: 'ui', type: 'Partial<TimeFieldUi>', default: '{}', description: '覆盖内部 slot 类名。' },
  { name: 'inputProps', type: `Omit<TimeFieldInputProps, 'part'>`, default: '{}', description: '透传给每个可见分段项的 props。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: TimeValue | undefined) => void', description: '组合后的时间值变化时触发。' },
  { name: 'update:placeholder', parameters: '(value: TimeValue) => void', description: '可见占位时间变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: 'TimeFieldSlotProps', description: '完全自定义分段渲染。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'TimeFieldUi',
    description: '默认分段结构的类名映射。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'input', type: 'string', description: '分段项类名。' }
    ]
  },
  {
    name: 'TimeFieldSlotProps',
    description: '自定义渲染的作用域插槽参数。',
    fields: [
      { name: 'modelValue', type: 'TimeValue | undefined', description: '当前组合后的时间值。' },
      { name: 'segments', type: '{ part: SegmentPart; value: string }[]', description: '按展示顺序输出的可见分段列表。' },
      { name: 'isInvalid', type: 'boolean', description: '当前组合值是否无效。' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
<UnionType name="TimeGranularity" description="展示分段精度" type="'hour' | 'minute' | 'second'" />
