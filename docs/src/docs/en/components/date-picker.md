# DatePicker

A date picker component that combines a text input with a calendar popup for selecting dates.

## Usage

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
| modelValue | `DateValue \| undefined` | `undefined` | The controlled value of the date picker |
| defaultValue | `DateValue \| undefined` | `undefined` | The default value when uncontrolled |
| placeholder | `DateValue \| undefined` | `undefined` | The controlled placeholder date |
| defaultPlaceholder | `DateValue \| undefined` | `undefined` | The default placeholder date when uncontrolled |
| defaultOpen | `boolean` | `false` | The default open state when uncontrolled |
| open | `boolean \| undefined` | `undefined` | The controlled open state |
| modal | `boolean` | `false` | Whether the picker should be modal |
| disabled | `boolean` | `false` | Whether the date picker is disabled |
| readonly | `boolean` | `false` | Whether the date picker is readonly |
| isDateUnavailable | `(date: DateValue) => boolean` | `undefined` | Function to determine if a date should be unavailable |
| minValue | `DateValue \| undefined` | `undefined` | The minimum allowed date |
| maxValue | `DateValue \| undefined` | `undefined` | The maximum allowed date |
| locale | `string \| undefined` | `undefined` | The locale to use for formatting dates |
| dir | `'ltr' \| 'rtl' \| undefined` | `undefined` | The reading direction |
| granularity | `Granularity \| undefined` | `undefined` | The granularity of the date picker |
| hourCycle | `12 \| 24 \| undefined` | `undefined` | The hour cycle to use |
| hideTimeZone | `boolean` | `false` | Whether to hide the time zone |
| class | `ClassValue` | `undefined` | Additional CSS classes |
| size | `ThemeSize` | `'md'` | The size of the date picker |
| ui | `Partial<DatePickerUi>` | `undefined` | Custom UI class overrides |
| triggerProps | `DatePickerTriggerProps` | `undefined` | Props to forward to the trigger |
| popupProps | `DatePickerPopupProps` | `undefined` | Props to forward to the popup |
| calendarProps | `CalendarProps` | `undefined` | Props to forward to the calendar |

</DataTable>

### Emits

<DataTable preset="emits">

| Name | Parameters | Description |
| --- | --- | --- |
| update:modelValue | `[date: DateValue \| undefined]` | Emitted when the selected date changes |
| update:placeholder | `[date: DateValue]` | Emitted when the placeholder date changes |
| update:open | `[open: boolean]` | Emitted when the open state changes |

</DataTable>

### Slots

<DataTable preset="slots">

| Name | Parameters | Description |
| --- | --- | --- |
| trigger | `{ open: boolean }` | Custom trigger content |
| default | `{ modelValue: DateValue \| undefined, open: boolean }` | Custom additional content |

</DataTable>

### UI Slots

<TypeTable>

| Slot | Description |
| --- | --- |
| root | The root container element |
| trigger | The trigger button element |
| popup | The popup container element |
| input | Individual input segment elements |
| calendar | The calendar element |

</TypeTable>
