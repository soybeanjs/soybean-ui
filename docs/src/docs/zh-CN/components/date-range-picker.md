# DateRangePicker 日期范围选择器

日期范围选择器组件允许用户从日历弹出窗口中选择开始和结束日期。

## 用法

```vue
<script setup lang="ts">
import { shallowRef } from 'vue';
import { SDateRangePicker } from '@soybeanjs/ui';

const range = shallowRef();
</script>

<template>
  <SDateRangePicker v-model="range" />
</template>
```

## 示例

```playground
basic
disabled
size
custom-styling
```

## API

### 属性

<DataTable preset="props">

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| modelValue | `DateRange` | - | 选中的日期范围 |
| defaultValue | `DateRange` | - | 默认日期范围 |
| placeholder | `DateValue` | - | 占位日期 |
| defaultPlaceholder | `DateValue` | - | 默认占位日期 |
| disabled | `boolean` | `false` | 是否禁用日期范围选择器 |
| readonly | `boolean` | `false` | 是否只读 |
| minValue | `DateValue` | - | 最小可选日期 |
| maxValue | `DateValue` | - | 最大可选日期 |
| locale | `string` | - | 日期格式化的区域设置 |
| granularity | `Granularity` | `'day'` | 日期选择器的粒度 |
| hourCycle | `HourCycle` | - | 小时周期（12 或 24 小时） |
| hideTimeZone | `boolean` | `false` | 是否隐藏时区 |
| isDateUnavailable | `Matcher` | - | 判断日期是否不可用的函数 |
| open | `boolean` | - | 弹出窗口是否打开 |
| defaultOpen | `boolean` | `false` | 默认打开状态 |
| modal | `boolean` | `false` | 弹出窗口是否为模态 |
| size | `ThemeSize` | `'md'` | 日期范围选择器的大小 |
| class | `ClassValue` | - | 额外的 CSS 类名 |
| ui | `Partial<DateRangePickerUi>` | - | 插槽的自定义 UI 类 |
| triggerProps | `DateRangePickerTriggerProps` | - | 触发按钮的属性 |
| popupProps | `DateRangePickerPopupProps` | - | 弹出窗口的属性 |

</DataTable>

### 事件

<DataTable preset="emits">

| 名称 | 参数 | 描述 |
| --- | --- | --- |
| update:modelValue | `(range: DateRange)` | 日期范围改变时触发 |
| update:placeholder | `(date: DateValue)` | 占位日期改变时触发 |
| update:startValue | `(date: DateValue \| undefined)` | 开始日期改变时触发 |
| update:endValue | `(date: DateValue \| undefined)` | 结束日期改变时触发 |
| update:open | `(open: boolean)` | 打开状态改变时触发 |

</DataTable>

### 插槽

<DataTable preset="slots">

| 名称 | 属性 | 描述 |
| --- | --- | --- |
| trigger | `{ open: boolean }` | 触发按钮插槽 |
| default | `{ modelValue: DateRange; open: boolean }` | 默认插槽 |

</DataTable>

### UI 插槽

<TypeTable>

| 插槽 | 描述 |
| --- | --- |
| root | 根元素 |
| trigger | 触发按钮 |
| popup | 弹出窗口容器 |
| calendar | 日历组件 |

</TypeTable>
