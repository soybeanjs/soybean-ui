# DatePicker 日期选择器

日期选择器组件，结合文本输入和日历弹出框来选择日期。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { CalendarDate } from '@internationalized/date';
import { SDatePicker } from '@soybeanjs/ui';

const date = ref<DateValue>();
</script>

<template>
  <SDatePicker v-model="date" :default-placeholder="new CalendarDate(2024, 1, 1)" />
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
| modelValue | `DateValue \| undefined` | `undefined` | 受控的日期选择器值 |
| defaultValue | `DateValue \| undefined` | `undefined` | 非受控时的默认值 |
| placeholder | `DateValue \| undefined` | `undefined` | 受控的占位日期 |
| defaultPlaceholder | `DateValue \| undefined` | `undefined` | 非受控时的默认占位日期 |
| defaultOpen | `boolean` | `false` | 非受控时的默认打开状态 |
| open | `boolean \| undefined` | `undefined` | 受控的打开状态 |
| modal | `boolean` | `false` | 选择器是否为模态 |
| disabled | `boolean` | `false` | 日期选择器是否禁用 |
| readonly | `boolean` | `false` | 日期选择器是否只读 |
| isDateUnavailable | `(date: DateValue) => boolean` | `undefined` | 判断日期是否不可用的函数 |
| minValue | `DateValue \| undefined` | `undefined` | 允许的最小日期 |
| maxValue | `DateValue \| undefined` | `undefined` | 允许的最大日期 |
| locale | `string \| undefined` | `undefined` | 用于格式化日期的区域设置 |
| dir | `'ltr' \| 'rtl' \| undefined` | `undefined` | 阅读方向 |
| granularity | `Granularity \| undefined` | `undefined` | 日期选择器的粒度 |
| hourCycle | `12 \| 24 \| undefined` | `undefined` | 使用的小时周期 |
| hideTimeZone | `boolean` | `false` | 是否隐藏时区 |
| class | `ClassValue` | `undefined` | 附加的 CSS 类名 |
| size | `ThemeSize` | `'md'` | 日期选择器的大小 |
| ui | `Partial<DatePickerUi>` | `undefined` | 自定义 UI 类覆盖 |
| triggerProps | `DatePickerTriggerProps` | `undefined` | 转发到触发器的属性 |
| popupProps | `DatePickerPopupProps` | `undefined` | 转发到弹出框的属性 |
| calendarProps | `CalendarProps` | `undefined` | 转发到日历的属性 |

</DataTable>

### 事件

<DataTable preset="emits">

| 名称 | 参数 | 描述 |
| --- | --- | --- |
| update:modelValue | `[date: DateValue \| undefined]` | 选中日期改变时触发 |
| update:placeholder | `[date: DateValue]` | 占位日期改变时触发 |
| update:open | `[open: boolean]` | 打开状态改变时触发 |

</DataTable>

### 插槽

<DataTable preset="slots">

| 名称 | 参数 | 描述 |
| --- | --- | --- |
| trigger | `{ open: boolean }` | 自定义触发器内容 |
| default | `{ modelValue: DateValue \| undefined, open: boolean }` | 自定义额外内容 |

</DataTable>

### UI 插槽

<TypeTable>

| 插槽 | 描述 |
| --- | --- |
| root | 根容器元素 |
| trigger | 触发按钮元素 |
| popup | 弹出容器元素 |
| input | 单个输入段元素 |
| calendar | 日历元素 |

</TypeTable>
