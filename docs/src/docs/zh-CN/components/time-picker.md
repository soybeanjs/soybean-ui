# TimePicker

## 概述

TimePicker 用于在弹层时间列表中选择单个时间，并将结果保留为 `TimeValue`。

## 用法

```vue
<script setup lang="ts">
import { Time } from '@internationalized/date';
import { shallowRef } from 'vue';
import { STimePicker } from '@soybeanjs/ui';

const value = shallowRef(new Time(9, 30, 0));
</script>

<template>
  <STimePicker v-model="value" aria-label="Meeting time" />
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
  { name: 'modelValue', type: 'TimeValue', default: '-', description: '受控时间值。' },
  { name: 'defaultValue', type: 'TimeValue', default: '-', description: '非受控初始时间值。' },
  { name: 'defaultPlaceholder', type: 'TimeValue', default: '-', description: '无值时使用的初始占位时间。' },
  { name: 'placeholder', type: 'TimeValue', default: '-', description: '受控占位时间，用于决定当前聚焦的弹层选项。' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: '非受控初始弹层打开状态。' },
  { name: 'open', type: 'boolean', default: '-', description: '受控弹层打开状态。' },
  { name: 'granularity', type: 'TimeGranularity', default: '`minute`', description: '标签展示的时间精度。' },
  { name: 'step', type: 'DateStep', default: '未传时弹层默认使用 `30m`', description: '生成弹层选项的时间步长。' },
  { name: 'hourCycle', type: '12 | 24 | undefined', default: 'locale 默认值', description: '控制 12 小时或 24 小时制格式。' },
  { name: 'hideTimeZone', type: 'boolean', default: 'false', description: '对 zoned 值隐藏时区标签。' },
  { name: 'minValue', type: 'TimeValue', default: '-', description: '最小可选时间。' },
  { name: 'maxValue', type: 'TimeValue', default: '-', description: '最大可选时间。' },
  { name: 'isTimeUnavailable', type: '(time: TimeValue) => boolean', default: '-', description: '将命中的值从弹层选项列表中过滤掉。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用。' },
  { name: 'readonly', type: 'boolean', default: 'false', description: '是否只读。' },
  { name: 'locale', type: 'string', default: '当前 locale', description: '用于弹层标签格式化的 locale。' },
  { name: 'dir', type: 'Direction', default: '继承', description: '键盘交互阅读方向。' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: '默认视觉尺寸。' },
  { name: 'ui', type: 'Partial<TimePickerUi>', default: '{}', description: '覆盖内部 slot 类名。' },
  { name: 'triggerProps', type: 'TimePickerTriggerProps', default: '{}', description: '透传给 trigger 的 props。' },
  { name: 'popupProps', type: 'TimePickerPopupProps', default: '{}', description: '透传给 popup 的 props。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: TimeValue | undefined) => void', description: '选中时间变化时触发。' },
  { name: 'update:placeholder', parameters: '(value: TimeValue) => void', description: '聚焦的弹层选项变化时触发。' },
  { name: 'update:open', parameters: '(open: boolean) => void', description: '弹层打开状态变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '{ displayValue: string; modelValue: TimeValue | undefined; open: boolean }', description: '自定义 trigger 内容。' },
  { name: 'time', parameters: '{ disabled: boolean; focused: boolean; label: string; selected: boolean; time: TimeValue }', description: '自定义弹层时间选项内容。' },
  { name: 'default', parameters: '{ displayValue: string; modelValue: TimeValue | undefined; open: boolean }', description: '在根节点内追加的内容。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'TimePickerUi',
    description: '时间选择器结构的类名映射。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'trigger', type: 'string', description: '触发按钮类名。' },
      { name: 'popup', type: 'string', description: '弹层面板类名。' },
      { name: 'list', type: 'string', description: '弹层选项列表类名。' },
      { name: 'cellTrigger', type: 'string', description: '弹层选项按钮类名。' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
<UnionType name="TimeGranularity" description="展示时间精度" type="'hour' | 'minute' | 'second'" />
