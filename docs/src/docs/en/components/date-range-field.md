# DateRangeField

## Overview

DateRangeField is a segmented date range input that provides two sets of editable date segments for selecting a start and end date, while submitting native form values for both dates.

## Usage

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
  <SDateRangeField v-model="value" aria-label="Date range" />
</template>
```

## Demo

```playground
basic
with-time
disabled
custom-styling
```

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: 'Custom class for the root container.' },
  { name: 'modelValue', type: 'DateRange', default: '-', description: 'Controlled date range value with start and end dates.' },
  { name: 'defaultValue', type: 'DateRange', default: '-', description: 'Uncontrolled initial date range value.' },
  { name: 'defaultPlaceholder', type: 'DateValue', default: '-', description: 'Initial placeholder date used before values exist.' },
  { name: 'placeholder', type: 'DateValue', default: '-', description: 'Controlled placeholder date used to format visible segments.' },
  { name: 'granularity', type: 'Granularity', default: 'Auto', description: 'Visible segment precision. Uses `day` for calendar dates and `minute` for date-time values by default.' },
  { name: 'hourCycle', type: '12 | 24 | undefined', default: 'Locale default', description: 'Controls 12-hour or 24-hour hour segments when time is shown.' },
  { name: 'hideTimeZone', type: 'boolean', default: 'false', description: 'Hides the time zone segment for zoned date values.' },
  { name: 'minValue', type: 'DateValue', default: '-', description: 'Minimum selectable date.' },
  { name: 'maxValue', type: 'DateValue', default: '-', description: 'Maximum selectable date.' },
  { name: 'isDateUnavailable', type: '(date: DateValue) => boolean', default: '-', description: 'Marks matching values as invalid.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the field is disabled.' },
  { name: 'readonly', type: 'boolean', default: 'false', description: 'Whether the field is read-only.' },
  { name: 'locale', type: 'string', default: 'Current locale', description: 'Locale used for segment order and formatting.' },
  { name: 'dir', type: 'Direction', default: 'Inherited', description: 'Reading direction for segment navigation.' },
  { name: 'startName', type: 'string', default: '-', description: 'Native form field name for start date.' },
  { name: 'endName', type: 'string', default: '-', description: 'Native form field name for end date.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Whether the hidden native inputs are required.' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: 'Default visual size.' },
  { name: 'separator', type: 'string', default: '`–`', description: 'Separator text between start and end date segments.' },
  { name: 'ui', type: 'Partial<DateRangeFieldUi>', default: '{}', description: 'Override internal slot classes.' },
  { name: 'inputProps', type: `Omit<DateRangeFieldInputProps, 'part' | 'type'>`, default: '{}', description: 'Props forwarded to every visible segment item.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: DateRange) => void', description: 'Emitted when the composed date range changes.' },
  { name: 'update:placeholder', parameters: '(value: DateValue) => void', description: 'Emitted when the visible placeholder date changes.' },
  { name: 'update:startValue', parameters: '(value: DateValue | undefined) => void', description: 'Emitted when the start date changes.' },
  { name: 'update:endValue', parameters: '(value: DateValue | undefined) => void', description: 'Emitted when the end date changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: 'DateRangeFieldSlotProps', description: 'Fully custom render function for both start and end segmented content.' },
  { name: 'separator', parameters: '-', description: 'Custom separator content between start and end date segments.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'DateRangeFieldUi',
    description: 'Class mapping for the date range field structure.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'input', type: 'string', description: 'Segment item class for both start and end segments.' },
      { name: 'separator', type: 'string', description: 'Separator element class.' }
    ]
  },
  {
    name: 'DateRange',
    description: 'Date range value structure.',
    fields: [
      { name: 'start', type: 'DateValue | undefined', description: 'Start date value.' },
      { name: 'end', type: 'DateValue | undefined', description: 'End date value.' }
    ]
  }
]"/>
