# DateRangePicker

A date range picker component that allows users to select a start and end date from a calendar popup.

## Usage

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

## Examples

```playground
basic
disabled
size
custom-styling
```

## API

### Props

<DataTable preset="props">

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| modelValue | `DateRange` | - | The selected date range |
| defaultValue | `DateRange` | - | The default date range |
| placeholder | `DateValue` | - | The placeholder date |
| defaultPlaceholder | `DateValue` | - | The default placeholder date |
| disabled | `boolean` | `false` | Whether the date range picker is disabled |
| readonly | `boolean` | `false` | Whether the date range picker is readonly |
| minValue | `DateValue` | - | The minimum selectable date |
| maxValue | `DateValue` | - | The maximum selectable date |
| locale | `string` | - | The locale for date formatting |
| granularity | `Granularity` | `'day'` | The granularity of the date picker |
| hourCycle | `HourCycle` | - | The hour cycle (12 or 24 hour) |
| hideTimeZone | `boolean` | `false` | Whether to hide the time zone |
| isDateUnavailable | `Matcher` | - | Function to determine if a date is unavailable |
| open | `boolean` | - | Whether the popup is open |
| defaultOpen | `boolean` | `false` | The default open state |
| modal | `boolean` | `false` | Whether the popup is modal |
| size | `ThemeSize` | `'md'` | The size of the date range picker |
| class | `ClassValue` | - | Additional CSS classes |
| ui | `Partial<DateRangePickerUi>` | - | Custom UI classes for slots |
| triggerProps | `DateRangePickerTriggerProps` | - | Props for the trigger button |
| popupProps | `DateRangePickerPopupProps` | - | Props for the popup |

</DataTable>

### Emits

<DataTable preset="emits">

| Name | Parameters | Description |
| --- | --- | --- |
| update:modelValue | `(range: DateRange)` | Emitted when the date range changes |
| update:placeholder | `(date: DateValue)` | Emitted when the placeholder changes |
| update:startValue | `(date: DateValue \| undefined)` | Emitted when the start date changes |
| update:endValue | `(date: DateValue \| undefined)` | Emitted when the end date changes |
| update:open | `(open: boolean)` | Emitted when the open state changes |

</DataTable>

### Slots

<DataTable preset="slots">

| Name | Props | Description |
| --- | --- | --- |
| trigger | `{ open: boolean }` | The trigger button slot |
| default | `{ modelValue: DateRange; open: boolean }` | The default slot |

</DataTable>

### UI Slots

<TypeTable>

| Slot | Description |
| --- | --- |
| root | The root element |
| trigger | The trigger button |
| popup | The popup container |
| calendar | The calendar component |

</TypeTable>
