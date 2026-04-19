# DateField

## Overview

DateField is a segmented date input that keeps keyboard-editable parts for day, month, year, and optional time values while still submitting a native form value.

## Usage

```vue
<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';
import { SDateField } from '@soybeanjs/ui';

const value = shallowRef(new CalendarDate(2026, 4, 19));
</script>

<template>
  <SDateField v-model="value" aria-label="Event date" />
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
  { name: 'modelValue', type: 'DateValue', default: '-', description: 'Controlled date value.' },
  { name: 'defaultValue', type: 'DateValue', default: '-', description: 'Uncontrolled initial date value.' },
  { name: 'defaultPlaceholder', type: 'DateValue', default: '-', description: 'Initial placeholder date used before a value exists.' },
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
  { name: 'name', type: 'string', default: '-', description: 'Native form field name.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Whether the hidden native input is required.' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: 'Default visual size.' },
  { name: 'ui', type: 'Partial<DateFieldUi>', default: '{}', description: 'Override internal slot classes.' },
  { name: 'inputProps', type: `Omit<DateFieldInputProps, 'part'>`, default: '{}', description: 'Props forwarded to every visible segment item.' }
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: DateValue | undefined) => void', description: 'Emitted when the composed date value changes.' },
  { name: 'update:placeholder', parameters: '(value: DateValue) => void', description: 'Emitted when the visible placeholder date changes.' }
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: 'DateFieldSlotProps', description: 'Fully custom render function for segmented content.' }
]"/>

### Types

<TypeTable :data="[
  {
    name: 'DateFieldUi',
    description: 'Class mapping for the default segmented structure.',
    fields: [
      { name: 'root', type: 'string', description: 'Root container class.' },
      { name: 'input', type: 'string', description: 'Segment item class.' }
    ]
  },
  {
    name: 'DateFieldSlotProps',
    description: 'Scoped slot payload for custom rendering.',
    fields: [
      { name: 'modelValue', type: 'DateValue | undefined', description: 'Current composed date value.' },
      { name: 'segments', type: '{ part: SegmentPart; value: string }[]', description: 'Visible segment list in display order.' },
      { name: 'isInvalid', type: 'boolean', description: 'Whether the current composed value is invalid.' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="Theme size type" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
<UnionType name="Granularity" description="Displayed segment precision" type="'day' | 'hour' | 'minute' | 'second'" />
